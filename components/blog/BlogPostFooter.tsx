import Link from "next/link";

type BlogPostFooterProps = {
  href?: string;
  label?: string;
};

export default function BlogPostFooter({
  href = "/blog",
  label = "Back to journal",
}: BlogPostFooterProps) {
  return (
    <section className="category-page-section border-t border-[#1a1a1a]/8 py-14 md:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
        <Link
          href={href}
          className="inline-flex text-sm font-medium tracking-[0.04em] text-[#1a1a1a]/65 transition-colors duration-500 hover:text-[#1a1a1a]"
        >
          ← {label}
        </Link>
      </div>
    </section>
  );
}
