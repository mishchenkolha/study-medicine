import Register from '@/components/register';
import { getDictionary } from '@/services/dictionary.service';
import { Suspense } from 'react';

export default async function LoginPage() {
  const dictionaryPromise = getDictionary();
  const dictionary = await dictionaryPromise;

  return (
    <Suspense>
      <h1 className="pt-20 pb-2 text-center header1 animate-fade-in-up">
        {dictionary.register}
      </h1>
      <Register dictionary={dictionary} />
    </Suspense>
  );
}
