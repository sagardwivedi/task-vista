import { XIcon } from 'lucide-react';
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  setClose: () => void;
  side?: 'left' | 'right' | 'center';
  description?: string;
}

export function Modal({
  children,
  isOpen,
  setClose,
  side = 'right',
  title,
  description,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  const bgColor = 'bg-gray-800';
  const textColor = 'text-gray-200';
  const buttonColor = 'bg-blue-500';
  const buttonHoverColor = 'hover:bg-blue-600';

  const positioningClasses = `fixed ${
    side === 'left'
      ? 'left-0 rounded-r-md'
      : side === 'center'
        ? 'left-1/2 -translate-x-1/2 my-auto rounded-md h-min'
        : 'right-0'
  } top-0 h-full max-w-[30rem] w-full transform overflow-y-auto ${bgColor} transition-transform duration-500 ${
    isOpen
      ? 'translate-x-0'
      : side === 'left'
        ? '-translate-x-full'
        : side === 'center'
          ? 'translate-x-full'
          : 'translate-x-full'
  } z-10`; // Apply entrance animation class

  return (
    <div>
      <div
        className={`fixed inset-0 ${bgColor} bg-opacity-90 ${isOpen ? 'block' : 'hidden'}`}
        onClick={setClose}
      ></div>

      <div
        className={positioningClasses}
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <button
          onClick={setClose}
          className={`absolute right-2 top-2 rounded-full p-2 ${buttonColor} ${buttonHoverColor}`}
        >
          <XIcon />
        </button>

        <div
          className={`max-w-[45rem] overflow-auto p-6 ${bgColor} rounded-lg`}
        >
          <h2
            id="modal-title"
            className={`mb-2 text-2xl font-bold ${textColor}`}
          >
            {title}
          </h2>
          {description && (
            <p id="modal-description" className={`mb-4 text-gray-400`}>
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
