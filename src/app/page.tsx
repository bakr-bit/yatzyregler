import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getContentBySlug } from '@/lib/markdown';
import TableOfContents from '@/components/TableOfContents';
import AuthorBox from '@/components/AuthorBox';
import { ArticleSchema, AuthorSchema } from '@/components/Schema';
import { getAuthorDescription } from '@/lib/translations';
import styles from './[slug]/page.module.css';
import type { Heading } from '@/lib/markdown';

// Generate metadata for SEO
export async function generateMetadata() {
  const content = await getContentBySlug('yatzy-regler', 'sv');

  if (!content) {
    return { title: 'Page Not Found' };
  }

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      url: 'https://yatzyregler.com/',
      siteName: 'Yatzy Regler',
      locale: 'sv_SE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
    },
    alternates: {
      canonical: 'https://yatzyregler.com/',
      languages: {
        'sv': 'https://yatzyregler.com/',
        'da': 'https://yatzyregler.com/da',
        'no': 'https://yatzyregler.com/no',
        'fi': 'https://yatzyregler.com/fi',
        'en': 'https://yatzyregler.com/yahtzee-rules',
        'es': 'https://yatzyregler.com/es',
        'x-default': 'https://yatzyregler.com/',
      },
    },
  };
}

export default async function Home() {
  // Load multiple articles for the homepage
  const articles = [
    'yatzy-regler',
    'maxpoang-yatzy',
    'maxi-yatzy-regler',
    'barn-yatzy-regler',
    'faq'
  ];

  // Banner images for each article
  const bannerImages: Record<string, string> = {
    'yatzy-regler': '/images/officiella-yatzy-regler.webp',
    'maxpoang-yatzy': '/images/Maxpoang-Yatzy.png',
    'maxi-yatzy-regler': '/images/officiella-maxi-yatzy-regler.webp',
    'barn-yatzy-regler': '/images/barn-yatzy-regler.png',
    'faq': '/images/Yatzy-FAQ-vanliga-fragor.webp',
  };

  const contents = await Promise.all(
    articles.map(slug => getContentBySlug(slug, 'sv'))
  );

  // Check if any content failed to load
  if (contents.some(content => !content)) {
    notFound();
  }

  // Get the first article for the hero
  const firstContent = contents[0]!;

  // Combine all headings for the table of contents
  const allHeadings: Heading[] = contents.flatMap(content => content?.headings || []);

  return (
    <>
      {/* Structured Data */}
      <ArticleSchema
        title={firstContent.title}
        description={firstContent.description}
        url="/"
      />
      <AuthorSchema
        name="Fredrik"
        description={getAuthorDescription('sv')}
      />

      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1>{firstContent.title}</h1>
          {(firstContent.hero || firstContent.description) && (
            <p className={styles.subtitle}>{firstContent.hero || firstContent.description}</p>
          )}
          <div className={styles.authorInfo}>
            <Image
              src="/images/fredrik-30x30.webp"
              alt="Fredrik"
              width={30}
              height={30}
              className={styles.authorAvatar}
            />
            <span className={styles.authorName}>Fredrik</span>
            <span className={styles.separator}>•</span>
            <span className={styles.lastUpdated}>Last updated: 2025-11-01</span>
          </div>
        </div>
        <svg className={styles.wave} viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,64 C360,0 1080,128 1440,64 L1440,120 L0,120 Z" fill="#ffffff" />
        </svg>
      </section>

      <div className={styles.contentWrapper}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <article className={styles.article}>
              {contents.map((content, index) => (
                content && (
                  <div key={content.slug}>
                    {/* Banner image before article (except first one) */}
                    {index > 0 && bannerImages[content.slug] && (
                      <div className={styles.bannerContainer}>
                        <Image
                          src={bannerImages[content.slug]}
                          alt={content.title}
                          width={1300}
                          height={400}
                          className={styles.bannerImage}
                          priority={index === 1}
                        />
                      </div>
                    )}

                    <div
                      className={styles.content}
                      style={{ marginTop: index > 0 ? '3rem' : '0' }}
                      dangerouslySetInnerHTML={{ __html: content.htmlContent }}
                    />
                  </div>
                )
              ))}
            </article>

            <aside>
              <AuthorBox locale="sv" />
              {allHeadings.length > 0 && (
                <TableOfContents headings={allHeadings} locale="sv" />
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
