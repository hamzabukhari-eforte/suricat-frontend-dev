import { Suspense } from "react";
import { DiscussionConfirmedContent } from "@/components/sections/forms/DiscussionConfirmedContent";
import { LoginSlimHeader } from "@/components/sections/forms/LoginForm";
import { pageSeo } from "@/lib/seo/metadata";

export const metadata = pageSeo.discussionConfirmed;

export default function DiscussionConfirmedPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LoginSlimHeader />
      <Suspense
        fallback={
          <section className="py-8 w-full bg-[#f5f7fa] min-h-[70vh] flex items-center justify-center">
            <p className="text-navy text-sm">Loading confirmation…</p>
          </section>
        }
      >
        <DiscussionConfirmedContent />
      </Suspense>
    </div>
  );
}
