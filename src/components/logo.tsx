import Image from "next/image";
import { cn } from "@/utils/tailwind";

type HeroLogoProps = {
  className?: string;
};

export function HeroLogo({ className }: HeroLogoProps) {
  return (
    <div
      className={cn(
        "w-[280px] sm:w-[350px] lg:w-[450px] h-auto flex flex-col items-center",
        className
      )}
    >
      <Image
        src="/images/zodiaca_wheel_1.png"
        alt="Zodiaca Wheel"
        width={225}
        height={225}
        className="sm:w-[225px] sm:h-[225px] w-[140px] h-[140px]"
        priority
      />

      <h1 className="flex flex-col items-center sm:-mt-14 -mt-10">
        <span className="font-heading text-3xl sm:text-5xl text-white/75 uppercase leading-snug">
          Stockholms Astrologiska
        </span>{" "}
        <span className="font-accent text-3xl sm:text-5xl text-accent">
          Konferens
        </span>
      </h1>
    </div>
  );
}
