"use client";

import { useMemo } from "react";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import {
  buildCompanySubnavLinks,
  buildIndustrySubnavLinks,
  buildPricingSubnavLinks,
  buildSolutionNavLinks,
  type NavLink,
} from "@/lib/navigation";

export function useCompanySubnavLinks(): NavLink[] {
  const t = useTranslations();
  return useMemo(() => buildCompanySubnavLinks(t), [t]);
}

export function useIndustrySubnavLinks(): NavLink[] {
  const t = useTranslations();
  return useMemo(() => buildIndustrySubnavLinks(t), [t]);
}

export function useSolutionNavLinks(): NavLink[] {
  const t = useTranslations();
  return useMemo(() => buildSolutionNavLinks(t), [t]);
}

export function usePricingSubnavLinks(): NavLink[] {
  const t = useTranslations();
  return useMemo(() => buildPricingSubnavLinks(t), [t]);
}
