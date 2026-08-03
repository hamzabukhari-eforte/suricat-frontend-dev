import Image from "next/image";
import { ComingSoonDots } from "@/components/sections/coming-soon/ComingSoonDots";

export function ComingSoonContent() {
  return (
    <section className="bg-gradient-hero relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <ComingSoonDots />
      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        <Image
          src="/assets/images/Suricat-logo-light.svg"
          alt="Suricat"
          width={180}
          height={184}
          className="h-auto w-24 sm:w-32"
          priority
        />
        <h1 className="text-5xl font-bold text-white">
          Coming Soon ...
        </h1>
      </div>
    </section>
  );
}
