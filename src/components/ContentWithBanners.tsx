import SectionBanner from './SectionBanner';

interface BannerConfig {
  beforeSection: string; // Text to match in h2 heading
  imageSrc: string;
  title: string;
  alt: string;
  overlayColor?: string;
}

interface ContentWithBannersProps {
  htmlContent: string;
  banners: BannerConfig[];
}

function splitContentBySections(html: string, banners: BannerConfig[]): { content: string; banner?: BannerConfig }[] {
  const sections: { content: string; banner?: BannerConfig }[] = [];

  // Split by h2 tags
  const h2Pattern = /(<h2[^>]*>.*?<\/h2>)/gi;
  const parts = html.split(h2Pattern);

  let currentContent = '';

  for (const part of parts) {
    if (part.match(h2Pattern)) {
      // This is an h2 heading
      const matchingBanner = banners.find(b =>
        part.toLowerCase().includes(b.beforeSection.toLowerCase())
      );

      if (matchingBanner) {
        // Save previous content if any
        if (currentContent) {
          sections.push({ content: currentContent });
          currentContent = '';
        }
        // Add banner section
        sections.push({ content: part, banner: matchingBanner });
      } else {
        currentContent += part;
      }
    } else {
      currentContent += part;
    }
  }

  // Add remaining content
  if (currentContent) {
    sections.push({ content: currentContent });
  }

  return sections;
}

export default function ContentWithBanners({ htmlContent, banners }: ContentWithBannersProps) {
  const sections = splitContentBySections(htmlContent, banners);

  return (
    <>
      {sections.map((section, index) => (
        <div key={index}>
          {section.banner && (
            <SectionBanner
              imageSrc={section.banner.imageSrc}
              title={section.banner.title}
              alt={section.banner.alt}
              overlayColor={section.banner.overlayColor}
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: section.content }} />
        </div>
      ))}
    </>
  );
}
