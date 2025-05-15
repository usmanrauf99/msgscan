import React, { useEffect, useRef } from "react";

interface GoogleReCaptchaProps {
  onVerify: (token: string) => void;
  siteKey?: string;
}

const GoogleReCaptcha: React.FC<GoogleReCaptchaProps> = ({
  onVerify,
  siteKey = process.env.NEXT_PUBLIC_GOOGLE_SITE_KEY as string,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
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

    const renderReCaptcha = () => {
      if (rendered.current || !containerRef.current) return;

      if (window.grecaptcha && window.grecaptcha.render) {
        window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          callback: onVerify,
        });
        rendered.current = true;
      } else {
        setTimeout(renderReCaptcha, 100);
      }
    };

    if (window.grecaptcha && window.grecaptcha.ready) {
      window.grecaptcha.ready(renderReCaptcha);
    } else {
      window.onload = renderReCaptcha;
    }

    return () => {
      if (window.onload === renderReCaptcha) {
        window.onload = null;
      }
    };
  }, [siteKey, onVerify]);

  return <div ref={containerRef} className="g-recaptcha mb-4"></div>;
};

export default GoogleReCaptcha;

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
