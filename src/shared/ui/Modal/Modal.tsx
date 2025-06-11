"use client";

import { useEffect, useCallback } from "react";
import s from "./Modal.module.css";
import clsx from "clsx";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  className?: string;
}

export const Modal = ({ children, onClose, isOpen, className }: ModalProps) => {
  const onKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("keydown", onKeydown);
      return () => document.removeEventListener("keydown", onKeydown);
    }
  }, [onKeydown]); //  [] - Иначе обработчик onKeydown может добавляться заново при каждом ререндере. убери если не нужно.

  if (!isOpen) return null;

  // обязательно прописывать e.stopPropagation() в каждом дочернем элементе
  return (
    <div className={s.modal_container} onClick={onClose}>
      <div
        className={clsx(s.container, className)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
