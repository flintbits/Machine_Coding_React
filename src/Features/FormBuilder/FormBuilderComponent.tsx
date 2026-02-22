import { useState } from "react"

export default function FormBuilderComponent() {
    const [tsBuildMode, setIsBuildMode] = useState<boolean>(false)


    return (
        <div style={styles.formBuilderContainer}>
            <h1>Form Builder Component</h1>
            <button style={styles.btn}>Add Section</button>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    formBuilderContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "600px",
        margin: "0 auto",
        background: "#ddd",
        flexDirection: "column",
        padding: 8
    },
    btn: {
        height: "60px",
        width: "100%",
        background: "white",
        border: "1px solid #bbb"
    }
}