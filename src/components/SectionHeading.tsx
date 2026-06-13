import { ChikanDivider } from "./Heritage";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  urdu,
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  urdu?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      {eyebrow && (
        <p className={cn("font-deco uppercase tracking-[0.3em] text-sm", light ? "text-gold-light" : "text-gold")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn("mt-2 font-display text-3xl sm:text-4xl", light ? "text-ivory" : "text-maroon")}>
        {title}
      </h2>
      {urdu && (
        <p className={cn("mt-1 font-royal text-lg", light ? "text-gold-light/80" : "text-gold/80")} dir="rtl" lang="ur">
          {urdu}
        </p>
      )}
      <ChikanDivider className={cn("mx-auto mt-4 w-48", light ? "text-gold-light/50" : "text-gold/50")} />
    </div>
  );
}
