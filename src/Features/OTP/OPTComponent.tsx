import Otp from "./Otp";

const OTPLENGTH = 6
export default function OPTComponent() {
  const validateOtp = (otp: number[]) => {
    console.log("Entered otp is :: ", otp.join(''))
  }
  return <div>
    <p>OTP Component</p>
    <Otp
      otpLength={OTPLENGTH}
      validateOtp={validateOtp}
    />
  </div>;
}
