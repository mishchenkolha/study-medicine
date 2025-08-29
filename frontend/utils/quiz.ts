import { IQuestion, QuestionType } from '@/types/courses';

type TSelection = number[]; // індекси обраних варіантів для цього питання

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

const penaltyFactor = (d: number): number => {
  switch (d) {
    case 1:
      return 1.1; // легкі — суворіше
    case 2:
      return 1.0; // середні — як є
    case 3:
      return 0.8; // складні — поблажливіше
    case 0:
    default:
      return 1.0; // ігноруємо складність
  }
};

function scoreQuestion(q: IQuestion, selected: TSelection): number {
  const correctIdx = q.answers
    .map((a, i) => (a.correct ? i : -1))
    .filter((i) => i >= 0);
  const N = q.answers.length;
  const C = correctIdx.length;
  const D = q.difficulty_level;

  if (q.type === QuestionType.SINGLE_CHOICE) {
    if (selected.length !== 1) return 0;
    const isCorrect = q.answers[selected[0]]?.correct === true;
    return isCorrect ? 1 : 0;
  }

  // multiple-choise (кілька правильних)
  const selectedSet = new Set(selected);
  let tp = 0,
    fp = 0;

  for (let i = 0; i < N; i++) {
    const chosen = selectedSet.has(i);
    if (!chosen) continue;
    if (q.answers[i].correct) tp += 1;
    else fp += 1;
  }

  if (C === 0 || C === N) {
    // вироджені випадки; віддати бінарно
    return tp > 0 && fp === 0 ? 1 : 0;
  }

  const pf = penaltyFactor(D);
  const pos = tp / C;
  const neg = N - C > 0 ? fp / (N - C) : 0;

  return clamp01(pos - pf * neg);
}

export function scoreQuiz(
  questions: IQuestion[],
  selections: TSelection[],
): number {
  const qCount = Math.min(questions.length, selections.length);
  if (qCount === 0) return 0;

  let sum = 0;
  for (let i = 0; i < qCount; i++) {
    sum += scoreQuestion(questions[i], selections[i]);
  }
  return (100 * sum) / qCount;
}
