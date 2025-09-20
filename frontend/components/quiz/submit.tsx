'use client';

import { ILabelObj } from '@/types/dictionary';
import { Button, VARIANTS } from '@/ui/button';
import { cn } from '@/utils';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({
  dictionary,
}: {
  dictionary: ILabelObj;
}) {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-end">
      <Button
        type="submit"
        variant={VARIANTS.SUCCESS}
        disabled={pending}
        className={cn(pending && 'opacity-50 cursor-default')}
      >
        {pending ? dictionary.sending : dictionary.send}
      </Button>
    </div>
  );
}
