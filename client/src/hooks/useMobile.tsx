// توثيق عربي لملف client/src/hooks/useMobile.tsx.
// هذا الملف جزء من منصة إنجاز، ويحتوي على منطق أو تنسيقات مرتبطة بالمسار client/src/hooks/useMobile.tsx.
// التعليقات داخل الكود توضّح مسؤولية الأجزاء المهمة وتحافظ على سهولة الصيانة.

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
