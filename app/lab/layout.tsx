import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab · Wine CTA Comparison | Edmar Travel",
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100svh] bg-[#F7F5F1] text-[#2C2420]">{children}</div>
  );
}
