// توثيق عربي لملف client/src/components/ui/separator.tsx.
// هذا الملف جزء من منصة إنجاز، ويحتوي على منطق أو تنسيقات مرتبطة بالمسار client/src/components/ui/separator.tsx.
// التعليقات داخل الكود توضّح مسؤولية الأجزاء المهمة وتحافظ على سهولة الصيانة.

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
