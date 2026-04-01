import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function ZhLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader locale="zh" />
      <main className="flex-1">{children}</main>
      <SiteFooter locale="zh" />
    </>
  );
}
