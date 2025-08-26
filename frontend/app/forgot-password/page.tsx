import ForgotPassword from '@/components/forgot-password';
import { getDictionary } from '@/services/dictionary.service';
import { Suspense } from 'react';

export default async function ForgotPasswordPage() {
  const dictionaryPromise = getDictionary();
  const dictionary = await dictionaryPromise;

  return (
    <Suspense>
      <h1 className="pt-20 pb-2 text-center header1 animate-fade-in-up">
        {dictionary.password_recovery}
      </h1>
      <ForgotPassword dictionary={dictionary} />
    </Suspense>
  );
}
