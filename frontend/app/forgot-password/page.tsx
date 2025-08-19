import ForgotPassword from '@/components/forgot-password';
import { Suspense } from 'react';

export default async function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPassword />
    </Suspense>
  );
}
