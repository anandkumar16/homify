"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalsProps {
  isopen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionlabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modals: React.FC<ModalsProps> = ({
  isopen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionlabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isopen);
  useEffect(() => {
    setShowModal(isopen);
  }, [isopen]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isopen) return null;
  return (
    <>
  <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-800/70">
  <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto max-h-[90vh]">
      <div
        className={`
            translate
            duration-300
            ${showModal ? "opacity-100" : "opacity-0"}
            ${showModal ? "translate-y-0" : "translate-y-full"}
          `}
      >
        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
            <button
              className="p-1 border-0 hover:opacity-70 transition absolute left-9"
              onClick={handleClose}
            >
              <IoMdClose size={18} />
            </button>
            <div className="text-xl font-semibold">{title}</div>
          </div>
          <div className="relative p-6 flex-auto overflow-y-auto">{body}</div> 
          <div className="flex flex-col gap-2 p-3">
            <div className="flex flex-row items-center gap-4 w-full">
              {secondaryAction && secondaryActionLabel && (
                <Button
                  outline
                  disabled={disabled}
                  label={secondaryActionLabel}
                  onClick={handleSecondaryAction}
                />
              )}
              <Button
                disabled={disabled}
                label={actionlabel}
                onClick={handleSubmit}
              />
            </div>
            {footer}
          </div>
        </div>
      </div>
    </div>
  </div> 
    </>
  );
};

export default Modals;
