import { postInquiry, type FormResult } from "@/lib/api/client";

export type DesignPartnerPayload = {
  companyName: string;
  companyWebsite: string;
  employeeCount: string;
  deviceCategory: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhoneCode: string;
  contactPhone: string;
  qms: string;
  docSystems: string[];
  docSystemsOther?: string;
  complianceChallenge: string;
  inspectionTimeframe: string;
  designPartnerInterest: string;
  ackDesignPartner: boolean;
  ackNda: boolean;
};

export type { FormResult };

export async function submitDesignPartner(
  payload: DesignPartnerPayload,
): Promise<FormResult> {
  if (
    !payload.companyName ||
    !payload.contactName ||
    !payload.contactEmail ||
    !payload.ackDesignPartner ||
    !payload.ackNda
  ) {
    return { ok: false, error: "Please complete all required fields." };
  }

  return postInquiry("design-partner", payload);
}

/** @deprecated Use submitDesignPartner */
export const submitDesignPartnerStub = submitDesignPartner;
