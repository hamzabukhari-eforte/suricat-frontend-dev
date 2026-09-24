"use client";

import { useEffect, useMemo, useState } from "react";
import { CtaBand } from "@/components/sections/CtaBand";
import { StickySubnav } from "@/components/layout/StickySubnav";
import { Container } from "@/components/ui/Container";
import { FaArrowRight, FaChevronRight } from "@/components/ui/icons";
import { useCompanySubnavLinks } from "@/lib/i18n/use-nav-links";
import { useTranslations } from "@/components/i18n/LocaleProvider";

type LeaderMeta = {
  id: string;
  name: string;
  linkedin: string;
  photo: string;
  modalPhoto: string;
  modalObjectClass?: string;
  /** Bio paragraph index emphasized as foundation line */
  foundationIndex: number;
};

const LEADERS: LeaderMeta[] = [
  {
    id: "mj",
    name: "MJ Khan",
    linkedin: "https://www.linkedin.com/in/mjkhan94306/",
    photo:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/oHFNZPCWjUWdWffoVEYsWvg5ha93%2F90840d48-de94-4db3-a62f-07cfcfdac528.png",
    modalPhoto:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/oHFNZPCWjUWdWffoVEYsWvg5ha93%2F6b87aed5-6614-48a3-a440-7effc3ad48d6.png",
    foundationIndex: 2,
  },
  {
    id: "fahad",
    name: "Fahad Ehsan",
    linkedin: "https://www.linkedin.com/in/fahadahsan/",
    photo:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/canvas-assets/oHFNZPCWjUWdWffoVEYsWvg5ha93/1777550966717_625cb318-74e5-4aba-beb8-561d65a51826.png",
    modalPhoto:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/canvas-assets/oHFNZPCWjUWdWffoVEYsWvg5ha93/1777544344748_b210ac02-be13-4cc9-8f41-6256ecad3e8d.png",
    foundationIndex: 1,
  },
  {
    id: "matthew",
    name: "Matthew Fortson",
    linkedin: "https://www.linkedin.com/in/matthew-fortson-85238b23/",
    photo:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/canvas-assets/oHFNZPCWjUWdWffoVEYsWvg5ha93/1777561540776_9100f72b-be2b-4c42-aa49-33bda02ea09f.png",
    modalPhoto:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/canvas-assets/oHFNZPCWjUWdWffoVEYsWvg5ha93/1777561805829_2c0ce225-0925-41d5-915a-2f54a260f0d6.png",
    foundationIndex: 1,
  },
  {
    id: "kim",
    name: "Kim Tompkins",
    linkedin: "https://www.linkedin.com/in/kimtompkins/",
    photo:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/canvas-assets/oHFNZPCWjUWdWffoVEYsWvg5ha93/1777561539326_c4f9c127-3420-4c90-8d7b-3765b51bec0f.png",
    modalPhoto:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/canvas-assets/oHFNZPCWjUWdWffoVEYsWvg5ha93/1777561789903_0ea7c960-9a24-4860-8de0-3ea8a71376c5.png",
    modalObjectClass: "object-[center_15%]",
    foundationIndex: 1,
  },
];

export function LeadershipContent() {
  const t = useTranslations();
  const tl = useTranslations("company.leadership");
  const companySubnavLinks = useCompanySubnavLinks();
  const [activeId, setActiveId] = useState<string | null>(null);

  const leaders = useMemo(
    () =>
      LEADERS.map((meta) => {
        const bioRaw = tl.raw(`leaders.${meta.id}.bio`);
        const bio = Array.isArray(bioRaw) ? (bioRaw as string[]) : [];
        return {
          ...meta,
          title: tl(`leaders.${meta.id}.title`),
          bio,
        };
      }),
    [tl],
  );

  const active = leaders.find((l) => l.id === activeId) ?? null;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <StickySubnav
        links={companySubnavLinks}
        category={t("nav.menus.company.label")}
        navLabel={t("nav.menus.company.label")}
      />
      <section className="pt-8">
        <Container>
          <div className="mb-6">
            <h1 className="mb-4 max-w-3xl text-[28px] font-bold leading-[36px] text-navy lg:text-[36px] lg:leading-[44px]">
              {tl("heroTitleBefore")}{" "}
              <span className="text-teal">{tl("heroTitleAccent")}</span>
            </h1>
            <p className="max-w-4xl text-base leading-relaxed text-navy lg:text-[22px] lg:leading-[30px]">
              {tl("heroSubtitle")}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 lg:flex-nowrap lg:justify-between lg:gap-x-6 xl:gap-x-8">
            {leaders.map((leader) => (
              <div
                key={leader.id}
                className="group flex w-56 cursor-pointer flex-col items-center text-center lg:min-w-0 lg:w-auto lg:flex-1 xl:max-w-64"
                onClick={() => setActiveId(leader.id)}
              >
                <div className="mb-6 h-56 w-56 overflow-hidden rounded-full border-8 border-gray-100 transition-colors duration-300 group-hover:border-teal lg:aspect-square lg:h-auto lg:w-full lg:max-w-56 xl:max-w-64">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-1 text-2xl font-bold text-navy">{leader.name}</h3>
                <p className="mb-4 text-sm text-navy">{leader.title}</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveId(leader.id);
                  }}
                  className="inline-flex items-center gap-2 font-bold text-teal hover:underline"
                >
                  {tl("readBio")}
                  <FaChevronRight className="text-[10px]" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {active ? (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="leader-bio-title"
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[4px] bg-[#f4f6f8] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex h-[400px] items-end justify-end overflow-hidden bg-navy p-8 md:h-[480px] lg:h-[400px]">
              <button
                type="button"
                onClick={() => setActiveId(null)}
                aria-label={tl("closeModal")}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-xl text-white hover:bg-black/70"
              >
                &times;
              </button>
              <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.photo}
                  alt={active.name}
                  className="h-full w-full object-cover md:hidden"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.modalPhoto}
                  alt=""
                  aria-hidden="true"
                  className={`hidden h-full w-full object-cover md:block ${active.modalObjectClass ?? "object-[center_5%]"}`}
                />
              </div>
              <div className="relative z-10 text-right text-white">
                <h2 id="leader-bio-title" className="mb-2 text-4xl font-bold">
                  {active.name}
                </h2>
                <p className="text-xl font-semibold">{active.title}</p>
              </div>
            </div>
            <div className="bg-[#f4f6f8] p-10">
              <div className="space-y-4 text-lg leading-relaxed text-gray-800">
                {active.bio.map((p, i) => (
                  <p
                    key={`${active.id}-bio-${i}`}
                    className={
                      i === active.foundationIndex
                        ? "font-semibold text-navy"
                        : undefined
                    }
                  >
                    {p}
                  </p>
                ))}
                <a
                  href={active.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="suricat-teal-btn leadership-profile-btn group inline-flex w-fit items-center gap-3 rounded-full px-6 py-2.5 text-sm font-bold transition-all md:text-base"
                >
                  {tl("readFullProfile")}
                  <FaArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <CtaBand />
    </>
  );
}
