type BlogPostContentProps = {
  intro?: string;
  sections?: {
    heading?: string;
    paragraphs: string[];
    image?: string;
  }[];
  closing?: string;
  locale?: string;
};

export default function BlogPostContent({
  intro = "",
  sections = [],
  closing = "",
  locale = "",
}: BlogPostContentProps) {
  const resolveLocale = (text: string) =>
    text.replaceAll("{{locale}}", locale);

  const renderParagraph = (paragraph: string) => {
    const content = resolveLocale(paragraph);
    if (content.includes("<a ")) {
      return <span dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return content;
  };

  return (
    <section className="category-page-section pb-16 md:pb-20 lg:pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
        {intro ? (
          <p className="text-lg leading-[1.8] text-[#1a1a1a]/78 md:text-[1.3125rem] md:leading-[1.85]">
            {resolveLocale(intro)}
          </p>
        ) : null}

        <div className="mt-12 space-y-14 md:mt-16 md:space-y-16">
          {sections.map((block, index) => (
            <div key={index} className="space-y-6 md:space-y-8">
              {block.heading ? (
                <h2 className="font-theater text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-[#1a1a1a]">
                  {block.heading}
                </h2>
              ) : null}
              <div className="space-y-5">
                {block.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="text-lg leading-[1.8] text-[#1a1a1a]/72 md:text-[1.3125rem] md:leading-[1.85]"
                  >
                    {renderParagraph(paragraph)}
                  </p>
                ))}
              </div>
              {block.image ? (
                <div className="relative aspect-video overflow-hidden rounded-[28px] md:rounded-[32px]">
                  <img
                    src={block.image}
                    alt={block.heading || "Journal image"}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {closing ? (
          <p className="mt-14 text-lg leading-[1.8] text-[#1a1a1a]/72 md:mt-16 md:text-[1.3125rem] md:leading-[1.85]">
            {resolveLocale(closing)}
          </p>
        ) : null}
      </div>
    </section>
  );
}
