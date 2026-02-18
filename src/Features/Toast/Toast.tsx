import React from 'react'
import type { Toast as ToastType } from './Context/ToastProvider'

type ToastProps = {
    toast: ToastType
    removeToast: (id: string) => void
}

export default function Toast({ toast, removeToast }: ToastProps) {
    return (
        <div style={{ ...styles.toast, ...styles[toast.type] }}>
            <span>{toast.message}</span>

            <button style={styles.btn} onClick={() => removeToast(toast.id)}>X</button>
        </div >
    )
}


const styles: Record<string, React.CSSProperties> = {
    toast: {
        width: "250px",
        maxWidth: "320px",
        margin: "10px",
        padding: "12px 14px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "14px",
        color: "#ddd"
    },


    success: { background: "green" },
    error: { background: "crimson" },
    info: { background: "dodgerblue" },
    warning: { background: "orange" },

    btn: {
        background: "transparent",
        border: "none",
        color: "white",
        cursor: "pointer",
        fontSize: "14px"
    }
}