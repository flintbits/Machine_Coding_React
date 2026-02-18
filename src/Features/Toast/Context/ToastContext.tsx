import { createContext, useContext } from "react";
import type { ToastType } from "./ToastProvider";

type AddToastOPtions = {
    type?: ToastType,
    duration?: number
}

type ToastContextType = {
    success: (msg: string, opts?: AddToastOPtions) => string;
    error: (msg: string, opts?: AddToastOPtions) => string;
    info: (msg: string, opts?: AddToastOPtions) => string;
    warning: (msg: string, opts?: AddToastOPtions) => string
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
    const ctx = useContext(ToastContext);

    if (!ctx) {
        throw new Error("useToast must be used inside the toast provider")
    }

    return ctx
}