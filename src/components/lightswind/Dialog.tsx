import * as React from "react";

import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface DialogContextType {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined);

interface DialogProps {
    children: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const Dialog: React.FC<DialogProps> = ({
    children,
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
}) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const setOpen = React.useCallback(
        (value: boolean | ((prev: boolean) => boolean)) => {
            if (!isControlled) {
                setUncontrolledOpen(value);
            }
            if (onOpenChange) {
                const newValue = typeof value === "function" ? value(open) : value;
                onOpenChange(newValue);
            }
        },
        [isControlled, onOpenChange, open]
    );

    // Блокировка скролла при открытой модалке
    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
};

interface DialogTriggerProps {
    children: React.ReactNode;
    asChild?: boolean;
}
const DialogTrigger = React.forwardRef<
    HTMLDivElement,
    DialogTriggerProps & React.HTMLAttributes<HTMLDivElement>
>(({ children, asChild = false, onClick, ...props }, ref) => {
    const context = React.useContext(DialogContext);
    if (!context) {
        throw new Error("DialogTrigger must be used within a Dialog");
    }

    const { setOpen } = context;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOpen(true);

        if (onClick) {
            onClick(e);
        }
    };

    if (asChild) {
        return (
            <div ref={ref} onClick={handleClick} {...props}>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            ...(child.props as React.HTMLProps<HTMLElement>),
                        });
                    }
                    return child;
                })}
            </div>
        );
    }

    return (
        <div ref={ref} onClick={handleClick} {...props}>
            {children}
        </div>
    );
});
DialogTrigger.displayName = "DialogTrigger";

// Тип для исключения конфликтующих атрибутов с framer-motion
type OmittedDialogContentHTMLAttributes = Omit<
    React.HTMLAttributes<HTMLDivElement>,
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
    | "onTransitionEnd"
    | "onDrag"
    | "onDragEnd"
    | "onDragEnter"
    | "onDragExit"
    | "onDragLeave"
    | "onDragOver"
    | "onDragStart"
    | "onDrop"
    | "onMouseDown"
    | "onMouseEnter"
    | "onMouseLeave"
    | "onMouseMove"
    | "onMouseOut"
    | "onMouseOver"
    | "onMouseUp"
    | "onTouchCancel"
    | "onTouchEnd"
    | "onTouchMove"
    | "onTouchStart"
    | "onPointerDown"
    | "onPointerMove"
    | "onPointerUp"
    | "onPointerCancel"
    | "onPointerEnter"
    | "onPointerLeave"
    | "onPointerOver"
    | "onPointerOut"
    | "onGotPointerCapture"
    | "onLostPointerCapture"
>;

const DialogContent = React.forwardRef<HTMLDivElement, OmittedDialogContentHTMLAttributes>(
    ({ className, children, ...props }, ref) => {
        const context = React.useContext(DialogContext);
        if (!context) {
            throw new Error("DialogContent must be used within a Dialog");
        }

        const { open /*, setOpen*/ } = context;

        return (
            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        {/* Backdrop Overlay без обработчика клика */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        // onClick={() => setOpen(false)} // Убираем закрытие по клику на фон
                        />

                        {/* Dialog Content */}
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className={cn(
                                "relative z-50 w-full max-w-lg rounded-lg border-1 border-[#3cb755] bg-transparent p-6 ",
                                className
                            )}
                            style={{ boxShadow: "0 25px 50px -12px rgb(120 185 132 / 0.4)" }}
                            role="dialog"
                            aria-modal="true"
                            {...(props as HTMLMotionProps<"div">)}
                        >
                            {children}

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        );
    }
);
DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
            {...props}
        />
    )
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h2
            ref={ref}
            className={cn("text-lg font-semibold leading-none tracking-tight", className)}
            {...props}
        />
    )
);
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    )
);
DialogDescription.displayName = "DialogDescription";

const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
            {...props}
        />
    )
);
DialogFooter.displayName = "DialogFooter";

export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
};
