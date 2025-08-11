import { ILabelObj } from '@/types/dictionary';

export default async function Footer({
  dictionary,
}: {
  dictionary: ILabelObj;
}) {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="mx-auto text-center text-sm">
        &copy; {dictionary.copyright}
      </div>
    </footer>
  );
}
