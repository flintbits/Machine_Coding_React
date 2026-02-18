import { createPortal } from "react-dom";
import type { Toast as ToastType } from "./Context/ToastProvider";
import Toast from "./Toast";


type ToastContainerProps = {
    toasts: ToastType[],
    removeToast: (id: string) => void
}

export default function ToastContainer({ toasts, removeToast }: ToastContainerProps) {

    const toastRoot = document.getElementById("toast-root")

    if (!toastRoot) return null
    return createPortal(
        <div style={styles.container}>
            {toasts.map((toast) =>
                <Toast key={toast.id} toast={toast} removeToast={removeToast} />)}
        </div>
        , toastRoot)
}


const styles: Record<string, React.CSSProperties> = {
    cotainer: {
        position: "fixed",
        bottom: 20,
        right: 20,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        zIndex: 9999
    }
}


