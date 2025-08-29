'use server';
import { saveUserResults } from '@/services/courses.service';
import { IQuestion } from '@/types/courses';
import { ILabelObj } from '@/types/dictionary';
import { Button, VARIANTS } from '@/ui/button';
import { HTMLBlock } from '@/ui/html-block/html-block';
import { isNumber } from '@/utils';
import { scoreQuiz } from '@/utils/quiz';
import { ROUTES } from '@/utils/routes';
import { redirect } from 'next/navigation';

export default async function Quiz({
  questions,
  dictionary,
  slug,
}: {
  questions: IQuestion[];
  dictionary: ILabelObj;
  slug: string;
}) {
  async function handleSubmit(formData: FormData) {
    'use server';
    const answers: { [key: string]: number[] } = {};
    const quizId = questions[0]?.quiz?.documentId;
    formData.forEach((value, key) => {
      if (isNumber(key)) {
        if (!answers[key]) {
          answers[key] = [];
        }
        answers[key].push(Number(value));
      }
    });
    const selections = questions.map((q) => answers[q.id] || []);
    const answersToDB = Object.entries(answers).map(([qId, aIndexes]) => {
      const question =
        questions.find((q) => q.id === Number(qId)) ?? ({} as IQuestion);

      const answers =
        question?.answers
          ?.filter((_, index) => aIndexes.includes(index))
          .map((answer) => answer.title) || [];

      const correctAnswers =
        question?.answers
          ?.filter(
            (_, index) =>
              aIndexes.includes(index) && question?.answers?.[index]?.correct,
          )
          .map((answer) => answer.title) || [];

      return {
        question: question?.text || '',
        answers,
        correctAnswers,
      };
    });

    const score = scoreQuiz(questions, selections);
    try {
      const treshold = questions[0]?.quiz?.min_percent_treshold ?? 0;
      const isTestFailed = score < treshold;
      await saveUserResults({
        quizId,
        answers: answersToDB,
        score: Math.round(score * 100) / 100,
        isPassed: !isTestFailed,
      });
      redirect(`${ROUTES.COURSES}/private/${slug}/result`);
    } catch (e: unknown) {
      console.error(
        e instanceof Error ? e.message : dictionary.somethingWentWrong,
      );
    }
  }
  return (
    <form
      className="space-y-6 w-full py-4 md:py-5 xl:py-6"
      action={handleSubmit}
    >
      <h2 className="header3 font-semibold text-gray-800 mb-2">
        {dictionary.quiz}
      </h2>
      <HTMLBlock
        className="text-sm text-gray-500 mb-6"
        content={dictionary.quizDescription}
      />

      {questions.map((question, qIndex) => (
        <div
          key={question.id}
          className="p-5 border border-gray-200 rounded-xl bg-gray-50 shadow-sm"
        >
          {/* Question text */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {qIndex + 1}. {question.text}
          </h3>

          {/* Render answers based on type */}
          <div className="space-y-3">
            {question.type === 'single-choise' &&
              question.answers.map((answer, aIndex) => (
                <label
                  key={answer.id}
                  className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <input
                    type="radio"
                    name={`${question.id}`}
                    value={aIndex}
                    className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">{answer.title}</span>
                </label>
              ))}

            {question.type === 'multiple-choise' &&
              question.answers.map((answer, aIndex) => (
                <label
                  key={answer.id}
                  className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <input
                    type="checkbox"
                    name={`${question.id}`}
                    value={aIndex}
                    className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">{answer.title}</span>
                </label>
              ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <Button type="submit" variant={VARIANTS.SUCCESS}>
          {dictionary.send}
        </Button>
      </div>
    </form>
  );
}
