// توثيق عربي لملف client/src/components/ui/skeleton.tsx.
// هذا الملف جزء من منصة إنجاز، ويحتوي على منطق أو تنسيقات مرتبطة بالمسار client/src/components/ui/skeleton.tsx.
// التعليقات داخل الكود توضّح مسؤولية الأجزاء المهمة وتحافظ على سهولة الصيانة.

import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
