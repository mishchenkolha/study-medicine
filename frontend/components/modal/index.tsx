'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@/ui/icons';
import { IconType } from '@/ui/icons/IconType';

type ModalProps = {
  title?: string;
  message: React.ReactNode;
  onClose?: () => void;
};

export const Modal = ({ title, message, onClose }: ModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onCloseOutside = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.currentTarget as HTMLElement).id === 'overlay') {
      if (onClose) {
        onClose();
      } else {
        onCloseModal();
      }
    }
  };
  const onStopPropagation = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  useEffect(() => {
    setMounted(true);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (onClose) {
          onClose();
        } else {
          onCloseModal();
        }
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!mounted || !showModal) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center w-full h-full"
      onClick={onCloseOutside}
      id="overlay"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-xl shadow-lg p-6 z-10 max-w-md w-full mx-4 mb-[30vh] flex flex-col"
        onClick={onStopPropagation}
      >
        <button
          className="absolute top-3 right-3 cursor-pointer"
          onClick={onClose || onCloseModal}
        >
          <Icon type={IconType.Close} width="16px" height="16px" />
        </button>
        {Boolean(title) && <div className="h6 text-center">{title}</div>}
        <div>{message}</div>
      </div>
    </div>,
    document.body,
  );
};
