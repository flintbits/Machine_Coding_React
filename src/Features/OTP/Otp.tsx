import { useRef, useState } from "react"

type OtpProps = {
    otpLength: number
    validateOtp: (otp: number[]) => void
}

export default function Otp({ otpLength, validateOtp }: OtpProps) {
    const [otp, setOtp] = useState<(number | null)[]>(() => new Array(otpLength).fill(null))
    const inputRef = useRef<HTMLInputElement[]>([])
    const historyRef = useRef<(number | null)[][]>([])


    const handleOtpChange = (value: string, i: number) => {
        const otpDigt = Number(value[value.length - 1])

        //checks for non number elements
        if (isNaN(otpDigt)) return otp;

        setOtp((prev) => {
            historyRef.current.push([...prev])
            const updatedOtp = [...prev];

            //adds the new otp digit
            updatedOtp[i] = otpDigt

            //shift the input focus
            if (!isNaN(otpDigt) && i < otpLength - 1) {
                inputRef.current[i + 1]?.focus()
            }

            //call the validation function
            if (updatedOtp.every((d): d is number => d != null)) {
                validateOtp(updatedOtp)
            }

            return updatedOtp
        })
    }


    const handleOtpKeyboard = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {

        if ((e.ctrlKey || e.metaKey) && e.key === "z") {
            e.preventDefault();
            const last = historyRef.current.pop()
            if (last) {
                setOtp(last)
            }
        }

        console.log(e.key)
        switch (e.key) {
            case "Backspace":
                if (i >= otpLength) return;

                setOtp((prev) => {
                    const updatedOtp = [...prev];

                    //clears otp
                    updatedOtp[i] = null

                    //shift the input focus
                    if (!updatedOtp[i] && i > 0) {
                        inputRef.current[i - 1]?.focus()
                    }

                    return updatedOtp;
                })
                break;

            case "ArrowLeft":
                if (i > 0) {
                    inputRef.current[i - 1]?.focus()
                }
                break;

            case "ArrowRight":
                if (i < otpLength - 1) {
                    inputRef.current[i + 1]?.focus()
                }
                break;

            case "Control" + "z":

                break;

            default:
                return
        }
    }



    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>, i: number) => {
        e.preventDefault();

        const pasted = e.clipboardData.getData("text");

        const digits = (pasted.match(/\d/g) || []).map(Number)


        if (digits.length === 0) return;

        setOtp((prev) => {
            historyRef.current.push([...prev])
            const updatedOtp = [...prev];

            for (let j = 0; j < digits.length && i + j < otpLength; j++) {
                updatedOtp[i + j] = digits[j];
            }

            let lastDigit = Math.min(otpLength - 1, i + digits.length - 1)

            inputRef.current[lastDigit]?.focus();
            return updatedOtp
        })
    }


    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div>
                {otp.map((_, i) => <input
                    key={i}
                    ref={(elem) => {
                        if (elem) {
                            inputRef.current[i] = elem
                        }
                    }}
                    value={otp[i] ?? ""}
                    type="text"
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    style={{ height: 40, width: 40, margin: 6, textAlign: "center" }}
                    onKeyDown={(e) => handleOtpKeyboard(e, i)}
                    onPaste={(e) => handleOtpPaste(e, i)}
                />)}
            </div>
        </div>
    )
}