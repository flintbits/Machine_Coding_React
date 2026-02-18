import { useToast } from "./Context/ToastContext"

export default function ToastComponent() {
    const toast = useToast()
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <button onClick={() => toast.success("Saved Successfully!")}>
                Success Toast
            </button>

            <button onClick={() => toast.error("Something failed!")}>
                Error Toast
            </button>

            <button onClick={() => toast.info("New update available!")}>
                Info Toast
            </button>

            <button onClick={() => toast.warning("Storage almost full!")}>
                Warning Toast
            </button>

            <button onClick={() => toast.success("Profile updated!")}>
                Profile Updated
            </button>

            <button
                onClick={() =>
                    toast.success("This toast stays for 10 seconds!", { duration: 10000 })
                }
            >
                Long Toast (10s)
            </button>

        </div >
    )
}
