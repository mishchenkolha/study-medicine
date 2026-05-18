'use client';
import { ILabelObj } from '@/types/dictionary';
import { Button, VARIANTS } from '@/ui/button';
import { setTemplateData } from '@/utils';
import { Modal } from '../modal';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function BuyCourse({
  name,
  price,
  dictionary,
}: {
  name: string;
  price: number;
  dictionary: ILabelObj;
}) {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('success');
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(isSuccess === 'false');
  const [showSuccessModal, setShowSuccessModal] = useState(
    isSuccess === 'true',
  );
  const onShowModal = async () => {
    if (!price || !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      setShowModal(true);
      return;
    }
    // instead we implemented autopayment
    const currentUrl = window.location.href;
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Обов'язково вказуємо тип контенту
        },
        body: JSON.stringify({
          name,
          price,
          referrerUrl: currentUrl, // Передаємо поточну адресу
        }),
      });

      const data = await res.json();

      window.location.href = data.url;
    } catch (error) {
      setShowErrorModal(true);
    }
  };
  const onCloseErrorModal = () => {
    setShowErrorModal(false);
  };
  const onCloseSuccessModal = () => {
    setShowSuccessModal(false);
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
      {showErrorModal && (
        <Modal
          title={dictionary.buy_course_error}
          message={
            <div className="pt-2">
              {setTemplateData(dictionary.buy_course_error_details, { name })}
            </div>
          }
          onClose={onCloseErrorModal}
        />
      )}
      {showSuccessModal && (
        <Modal
          title={dictionary.buy_course_success}
          message={
            <div className="pt-2">
              {setTemplateData(dictionary.buy_course_success_details, { name })}
            </div>
          }
          onClose={onCloseSuccessModal}
        />
      )}
      <Button onClick={onShowModal} variant={VARIANTS.DANGER}>
        {dictionary.buy_course}
      </Button>
    </>
  );
}
