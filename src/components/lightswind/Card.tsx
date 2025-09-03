"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";
import { X } from "lucide-react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (isOpen) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = "hidden";

            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [isOpen]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown);
            const focusedBeforeOpen = document.activeElement as HTMLElement | null;

            setTimeout(() => {
                modalRef.current?.focus();
            }, 0);

            return () => {
                window.removeEventListener("keydown", onKeyDown);
                focusedBeforeOpen?.focus();
            };
        }
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                    aria-modal="true"
                    role="dialog"
                    aria-labelledby="modal-title"
                    tabIndex={-1}
                >
                    <FocusTrap
                        focusTrapOptions={{
                            clickOutsideDeactivates: true,
                            escapeDeactivates: false,
                        }}
                    >
                        <motion.div
                            ref={modalRef}
                            className="bg-white/80 rounded-3xl w-full max-w-4xl min-h-[80%] flex flex-col items-start justify-start p-2 relative outline-none"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            onClick={(e) => e.stopPropagation()}
                            tabIndex={-1}
                            style={{ overflow: "hidden" }}
                        >
                            <button
                                onClick={onClose}
                                aria-label="Закрыть модалку"
                                className="absolute top-2 right-6 text-gray-500 hover:text-gray-800 transition text-[26px]"
                            >
                                <X />
                            </button>

                            <div className="w-full flex flex-col items-center justify-center overflow-visible">
                                {children}
                            </div>
                        </motion.div>
                    </FocusTrap>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
