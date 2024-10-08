import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useModal = (modal) => {
  const { body } = document;
  const router = useRouter();

  useEffect(() => {
    if (modal) {
      const { scrollY } = window;
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
      body.style.overflow = 'hidden';
    } else {
      const scrollY = body.style.top;
      body.style.position = '';
      body.style.top = '';
      body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.overflow = '';
    };
  }, [modal]);

  useEffect(() => {
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    body.style.overflow = '';
  }, [router.asPath]);
};

export default useModal;
