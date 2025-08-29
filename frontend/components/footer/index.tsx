import { ILabelObj } from '@/types/dictionary';
import { HTMLBlock } from '@/ui/html-block/html-block';

export default async function Footer({
  dictionary,
}: {
  dictionary: ILabelObj;
}) {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <HTMLBlock
        className="mx-auto text-center text-sm"
        content={dictionary.copyright}
      />
    </footer>
  );
}
