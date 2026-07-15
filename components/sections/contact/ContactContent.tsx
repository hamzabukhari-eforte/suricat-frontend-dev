import { CtaBand } from "@/components/sections/CtaBand";
import { StickySubnav } from "@/components/layout/StickySubnav";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { companySubnavLinks } from "@/lib/navigation";
import {
  MdOutlineEmail,
  MdOutlineLanguage,
  MdOutlineLocationOn,
} from "@/components/ui/icons";
import type { ReactNode } from "react";

function ContactIcon({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] border border-gray-200 bg-white shadow-sm text-teal">
      {children}
    </div>
  );
}

export function ContactContent() {
  return (
    <>
      <StickySubnav
        links={companySubnavLinks}
        category="Company"
        navLabel="Company pages"
      />
      <section className="bg-gray-50 py-8">
        <Container>
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block rounded-full py-1.5 text-sm font-bold uppercase tracking-wider text-teal">
                  Contact
                </span>
                <h1 className="text-[40px] font-bold leading-[1.1] tracking-tight text-navy md:text-[32px]">
                  Start A Conversation.
                </h1>
                <p className="max-w-xl text-[20px] leading-[30px] text-navy">
                  Whether you have a general inquiry, are exploring a Design
                  Partner engagement, or want to learn more about the Compliance
                  Intelligence Layer, we would be glad to hear from you.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <ContactIcon>
                    <MdOutlineLocationOn className="h-5 w-5" aria-hidden="true" />
                  </ContactIcon>
                  <div>
                    <h3 className="text-lg font-bold text-navy">
                      Global Headquarters
                    </h3>
                    <p className="text-navy">
                      Palo Alto, California 94306,
                      <br />
                      USA
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <ContactIcon>
                    <MdOutlineLocationOn className="h-5 w-5" aria-hidden="true" />
                  </ContactIcon>
                  <div>
                    <h3 className="text-lg font-bold text-navy">
                      European Headquarters
                    </h3>
                    <p className="text-navy">
                      Akadeemia tee 12618,
                      <br />
                      Tallinn, Estonia
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="ml-14 text-lg font-bold text-navy">
                    Contact Information
                  </h3>
                  <div className="flex items-start gap-4">
                    <ContactIcon>
                      <MdOutlineEmail className="h-5 w-5" aria-hidden="true" />
                    </ContactIcon>
                    <div>
                      <h3 className="text-lg font-bold text-navy">Email</h3>
                      <p className="text-navy">
                        <a
                          href="mailto:info@suricat.ai"
                          className="text-teal hover:underline"
                        >
                          info@suricat.ai
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <ContactIcon>
                      <MdOutlineLanguage className="h-5 w-5" aria-hidden="true" />
                    </ContactIcon>
                    <div>
                      <h3 className="text-lg font-bold text-navy">Website</h3>
                      <p className="text-navy">
                        <a
                          href="https://www.suricat.ai"
                          className="text-teal hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          www.suricat.ai
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[4px] border border-gray-200 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
