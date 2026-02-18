import { useCallback, useState, type ReactNode } from "react";
import { ToastContext } from "./ToastContext";
import ToastContainer from "../ToastContainer";


export type ToastType = "success" | "error" | "info" | "warning";

export type Toast = {
    id: string
    message: string
    type: ToastType
    duration: number
}

type ToastProviderProps = {
    children: ReactNode;
}

type AddToastOPtions = {
    type?: ToastType,
    duration?: number
}

export default function ToastProvider({ children }: ToastProviderProps) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    const addToast = useCallback((message: string, options: AddToastOPtions = {}) => {
        const id = crypto.randomUUID();

        const toast: Toast = {
            id,
            message,
            type: options.type || "info",
            duration: options.duration || 1000
        }

        setToasts((prev) => [...prev, toast]);

        setTimeout(() => {
            removeToast(id);
        }, toast.duration)

        return id
    }, [removeToast])


    const success = useCallback((msg: string, opts: AddToastOPtions = {}) => addToast(msg, { ...opts, type: "success" }), [addToast])

    const error = useCallback((msg: string, opts: AddToastOPtions = {}) => addToast(msg, { ...opts, type: "error" }), [addToast])

    const info = useCallback((msg: string, opts: AddToastOPtions = {}) => addToast(msg, { ...opts, type: "info" }), [addToast])

    const warning = useCallback((msg: string, opts: AddToastOPtions = {}) => addToast(msg, { ...opts, type: "warning" }), [addToast])

    return (
        <ToastContext.Provider value={{ success, error, info, warning }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    )
}