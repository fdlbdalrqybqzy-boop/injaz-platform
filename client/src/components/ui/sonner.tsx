// توثيق عربي لملف client/src/components/ui/sonner.tsx.
// هذا الملف جزء من منصة إنجاز، ويحتوي على منطق أو تنسيقات مرتبطة بالمسار client/src/components/ui/sonner.tsx.
// التعليقات داخل الكود توضّح مسؤولية الأجزاء المهمة وتحافظ على سهولة الصيانة.

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
