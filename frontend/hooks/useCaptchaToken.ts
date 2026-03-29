import { CLOUDFLARE_SITE_KEY } from '@/utils/constants';
import { useEffect, useRef, useState } from 'react';

export const useCaptchaToken = () => {
  const [initLoad, setInitLoad] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string>('');

  useEffect(() => {
    if (ref.current && window.turnstile && !initLoad) {
      setInitLoad(true);
      window.turnstile.render(ref.current, {
        sitekey: CLOUDFLARE_SITE_KEY as string,
        callback: (t: string) => setCaptchaToken(t),
      });
    }
  }, [ref?.current, window?.turnstile, initLoad]);

  return { captchaToken, captchaRef: ref };
};
