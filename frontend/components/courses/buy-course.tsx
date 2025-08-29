'use client';
import { ILabelObj } from '@/types/dictionary';
import { Button, VARIANTS } from '@/ui/button';
import { setTemplateData } from '@/utils';
import { info } from '@/utils/toast';

export default function BuyCourse({
  name,
  dictionary,
}: {
  name: string;
  dictionary: ILabelObj;
}) {
  return (
    <Button
      onClick={() =>
        info(`${setTemplateData(dictionary.buyCourseDetails, { name })}`)
      }
      variant={VARIANTS.DANGER}
    >
      {dictionary.buyCourse}
    </Button>
  );
}
