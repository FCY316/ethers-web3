import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

const useBodyBackground = (pathsWithBackground: string[]) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const bodyClass = "body-with-bg";
    if (pathsWithBackground.includes(pathname)) {
      document.body.classList.add(bodyClass);
    } else {
      document.body.classList.remove(bodyClass);
    }
    return () => {
      document.body.classList.remove(bodyClass); // 防止旧 class 残留
    };
  }, [pathname, pathsWithBackground]);
};

export default useBodyBackground;
