import React, { useEffect, useRef } from "react";

interface GoogleReCaptchaProps {
  onVerify: (token: string) => void;
  siteKey?: string;
}

const GoogleReCaptcha: React.FC<GoogleReCaptchaProps> = ({
  onVerify,
  siteKey = process.env.NEXT_PUBLIC_GOOGLE_SITE_KEY as string, // This is Google's test key
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    // Add the Google reCAPTCHA script if it doesn't exist
    if (
      !window.grecaptcha &&
      !document.querySelector("#google-recaptcha-script")
    ) {
      const script = document.createElement("script");
      script.id = "google-recaptcha-script";
      script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    // Initialize reCAPTCHA when the script is loaded
    const renderReCaptcha = () => {
      if (rendered.current || !containerRef.current) return;

      if (window.grecaptcha && window.grecaptcha.render) {
        window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          callback: onVerify,
        });
        rendered.current = true;
      } else {
        // If grecaptcha is not ready yet, wait and try again
        setTimeout(renderReCaptcha, 100);
      }
    };

    if (window.grecaptcha && window.grecaptcha.ready) {
      window.grecaptcha.ready(renderReCaptcha);
    } else {
      // Add listener for when the script loads
      window.onload = renderReCaptcha;
    }

    return () => {
      // Clean up
      if (window.onload === renderReCaptcha) {
        window.onload = null;
      }
    };
  }, [siteKey, onVerify]);

  return <div ref={containerRef} className="g-recaptcha mb-4"></div>;
};

export default GoogleReCaptcha;

// Add the necessary type definitions for grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          callback: (token: string) => void;
        }
      ) => void;
    };
    onload: (() => void) | null;
  }
}
