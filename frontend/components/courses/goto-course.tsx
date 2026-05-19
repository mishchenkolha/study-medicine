'use client';
import { ILabelObj } from '@/types/dictionary';
import { Button } from '@/ui/button';
import { setTemplateData } from '@/utils';
import { Modal } from '../modal';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DOMAIN_URL } from '@/utils/constants';
import { ROUTES } from '@/utils/routes';

export default function GotoCourse({
  dictionary,
  slug,
  name,
}: {
  dictionary: ILabelObj;
  slug: string;
  name: string;
}) {
  const url = `${DOMAIN_URL}${ROUTES.COURSES}/private/${slug}`;
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('success');
  const [showErrorModal, setShowErrorModal] = useState(isSuccess === 'false');
  const [showSuccessModal, setShowSuccessModal] = useState(
    isSuccess === 'true',
  );

  const onCloseErrorModal = () => {
    setShowErrorModal(false);
    window.history.replaceState({}, '', url);
  };
  const onCloseSuccessModal = () => {
    setShowSuccessModal(false);
    window.history.replaceState({}, '', url);
  };

  return (
    <>
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
      <Button href={url}>{dictionary.view_private_course}</Button>
    </>
  );
}
