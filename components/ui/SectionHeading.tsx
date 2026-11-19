import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark = false,
  align = "left",
  highlight,
  action,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
  align?: "left" | "center";
  highlight?: string[];
  action?: ReactNode;
}) {
  const center = align === "center";
  return (
    <div
      className={`flex flex-col gap-8 ${center ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between"}`}
    >
      <div className={center ? "max-w-3xl" : "max-w-3xl"}>
        <Reveal>
          <p className={`eyebrow ${dark ? "text-brand" : "text-brand-deep"}`}>{eyebrow}</p>
        </Reveal>
        <SplitText
          text={title}
          highlight={highlight}
          className={`h-display mt-5 text-[clamp(2.1rem,4.6vw,4rem)] ${dark ? "text-white" : "text-ink"}`}
        />
        {intro && (
          <Reveal delay={0.15}>
            <p className={`mt-6 text-lg leading-relaxed ${dark ? "text-white/65" : "text-ink/65"} ${center ? "mx-auto" : ""} max-w-2xl`}>
              {intro}
            </p>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={0.2}>{action}</Reveal>}
    </div>
  );
}
