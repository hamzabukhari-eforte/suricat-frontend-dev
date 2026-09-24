import type { ReactNode } from "react";

const TEAL = "#19D3C5";
const ORANGE = "#FF6B35";

function ToneIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="1em"
      height="1em"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function RequirementIcon() {
  return (
    <ToneIcon>
      <path
        stroke={TEAL}
        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375"
      />
      <path stroke={ORANGE} strokeWidth="2" d="M8.1 16.35 9.7 17.95 13.35 13.7" />
    </ToneIcon>
  );
}

export function ProcedureIcon() {
  return (
    <ToneIcon>
      <path
        stroke={TEAL}
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292"
      />
      <path stroke={ORANGE} strokeWidth="2" d="M12 6.042v14.25" />
    </ToneIcon>
  );
}

export function RiskIcon() {
  return (
    <ToneIcon>
      <path
        stroke={TEAL}
        d="M12 2.964A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Z"
      />
      <path stroke={ORANGE} strokeWidth="2" d="M12 9v3.6" />
      <circle cx="12" cy="16.55" r="0.95" fill={ORANGE} stroke="none" />
    </ToneIcon>
  );
}

export function ControlIcon() {
  return (
    <ToneIcon>
      <path
        stroke={TEAL}
        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
      />
      <circle cx="12" cy="15.15" r="1.2" stroke={ORANGE} strokeWidth="2" />
      <path stroke={ORANGE} strokeWidth="2" d="M12 16.35v1.8" />
    </ToneIcon>
  );
}

export function DesignIcon() {
  return (
    <ToneIcon>
      <path
        stroke={TEAL}
        d="M2.25 7.5 12 2.25 21.75 7.5 12 12.75 2.25 7.5Z"
      />
      <path stroke={ORANGE} strokeWidth="2" d="M2.25 12 12 17.25 21.75 12" />
      <path stroke={TEAL} d="M2.25 16.5 12 21.75 21.75 16.5" />
    </ToneIcon>
  );
}

export function VvIcon() {
  return (
    <ToneIcon>
      <path
        stroke={TEAL}
        d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
      />
      <path stroke={ORANGE} strokeWidth="2" d="M6.2 16.35h11.6" />
    </ToneIcon>
  );
}

export function TrainingIcon() {
  return (
    <ToneIcon>
      <path
        stroke={TEAL}
        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342"
      />
      <path
        stroke={ORANGE}
        strokeWidth="2"
        d="M6.75 13.5a.75.75 0 1 1 0 1.5m0-1.5a.75.75 0 1 0 0 1.5m0-1.5v-2.232A55.378 55.378 0 0 1 12 8.443M6.75 15v.75a5.981 5.981 0 0 1-1.757 4.2"
      />
    </ToneIcon>
  );
}

export function EvidenceIcon() {
  return (
    <ToneIcon>
      <path
        stroke={TEAL}
        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
      />
      <path stroke={ORANGE} strokeWidth="2" d="M10 11.25h4" />
    </ToneIcon>
  );
}
