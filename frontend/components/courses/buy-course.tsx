'use client';
import { ILabelObj } from '@/types/dictionary';
import { Button, VARIANTS } from '@/ui/button';
import { setTemplateData } from '@/utils';
import { Modal } from '../modal';
import { useState } from 'react';

export default function BuyCourse({
  name,
  dictionary,
}: {
  name: string;
  dictionary: ILabelObj;
}) {
  const [showModal, setShowModal] = useState(false);
  const onShowModal = () => {
    setShowModal(true);
  };
  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal
          title={dictionary.buy_course}
          message={
            <div className="pt-2">
              {setTemplateData(dictionary.buy_course_details, { name })}
            </div>
          }
          onClose={onCloseModal}
        />
      )}
      <Button onClick={onShowModal} variant={VARIANTS.DANGER}>
        {dictionary.buy_course}
      </Button>
    </>
  );
}
