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

export type FormResult = { ok: true } | { ok: false; error: string };

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** TODO: wire API */
export async function submitDesignPartnerStub(
  payload: DesignPartnerPayload,
): Promise<FormResult> {
  await delay(800);
  if (
    !payload.companyName ||
    !payload.contactName ||
    !payload.contactEmail ||
    !payload.ackDesignPartner ||
    !payload.ackNda
  ) {
    return { ok: false, error: "Please complete all required fields." };
  }
  return { ok: true };
}
