// /components/captcha.tsx
"use client";

import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface CaptchaProps {
  onVerify: (token: string | null) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onVerify }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleCaptchaChange = (token: string | null) => {
    onVerify(token);
  };

  const handleExpired = () => {
    onVerify(null);
  };

  return (
    <div className="my-4">
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        ref={recaptchaRef}
        onChange={handleCaptchaChange}
        onExpired={handleExpired}
      />
    </div>
  );
};

export default Captcha;
