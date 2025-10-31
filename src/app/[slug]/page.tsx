import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getContentBySlug, getAllContentSlugs, getAvailableLocales } from '@/lib/markdown';
import TableOfContents from '@/components/TableOfContents';
import AuthorBox from '@/components/AuthorBox';
import { ArticleSchema, AuthorSchema } from '@/components/Schema';
import { getAuthorDescription } from '@/lib/translations';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all content
export async function generateStaticParams() {
  const locales = getAvailableLocales();
  const params = [];

  // Add Swedish content pages
  const svSlugs = getAllContentSlugs('sv');
  for (const slug of svSlugs) {
    params.push({ slug });
  }

  // Add English content pages
  const enSlugs = getAllContentSlugs('en');
  for (const slug of enSlugs) {
    params.push({ slug });
  }

  // Add locale homepages (da, no, fi, en, es)
  for (const locale of locales) {
    if (locale !== 'sv') {
      params.push({ slug: locale });
    }
  }

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const locales = getAvailableLocales();

  // Check if slug is a locale
  if (locales.includes(slug) && slug !== 'sv') {
    const content = await getContentBySlug(slug, slug);
    if (!content) {
      return { title: 'Page Not Found' };
    }

    // For locale pages, link to homepage equivalents
    return {
      title: content.title,
      description: content.description,
      alternates: {
        canonical: `https://yatzyregler.com/${slug}`,
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

  // Otherwise treat as Swedish content
  const content = await getContentBySlug(slug, 'sv');
  if (!content) {
    return { title: 'Page Not Found' };
  }

  // Check if English translation exists
  const enContent = await getContentBySlug(slug, 'en');
  const languages: Record<string, string> = {
    'sv': `https://yatzyregler.com/${slug}`,
    'x-default': `https://yatzyregler.com/${slug}`,
  };

  // Add English version if it exists
  if (enContent) {
    languages['en'] = `https://yatzyregler.com/${slug}`;
  }

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: `https://yatzyregler.com/${slug}`,
      languages,
    },
  };
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const locales = getAvailableLocales();

  // Check if slug is a locale (e.g., 'da', 'no', 'fi', 'en', 'es')
  if (locales.includes(slug) && slug !== 'sv') {
    // Load the locale's homepage (e.g., da/da.md)
    const content = await getContentBySlug(slug, slug);

    if (!content) {
      notFound();
    }

    return (
      <>
        {/* Structured Data */}
        <ArticleSchema
          title={content.title}
          description={content.description}
          url={`/${slug}`}
        />
        <AuthorSchema
          name="Fredrik"
          description={getAuthorDescription(content.locale)}
        />

        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <h1>{content.title}</h1>
            {(content.hero || content.description) && (
              <p className={styles.subtitle}>{content.hero || content.description}</p>
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
                <div
                  className={styles.content}
                  dangerouslySetInnerHTML={{ __html: content.htmlContent }}
                />
              </article>

              <aside>
                {slug !== 'kontakt' && slug !== 'privacy-policy' && <AuthorBox locale={content.locale} />}
                {slug !== 'privacy-policy' && content.headings.length > 0 && (
                  <TableOfContents headings={content.headings} locale={content.locale} />
                )}
              </aside>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Otherwise, treat as Swedish content
  let content = await getContentBySlug(slug, 'sv');

  // If not found in Swedish, try English
  if (!content) {
    content = await getContentBySlug(slug, 'en');
  }

  if (!content) {
    notFound();
  }

  return (
    <>
      {/* Structured Data */}
      <ArticleSchema
        title={content.title}
        description={content.description}
        url={`/${slug}`}
      />
      <AuthorSchema
        name="Fredrik"
        description={getAuthorDescription(content.locale)}
      />

      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1>{content.title}</h1>
          {(content.hero || content.description) && (
            <p className={styles.subtitle}>{content.hero || content.description}</p>
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
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: content.htmlContent }}
              />
            </article>

            <aside>
              {slug !== 'kontakt' && slug !== 'privacy-policy' && <AuthorBox locale={content.locale} />}
              {slug !== 'privacy-policy' && content.headings.length > 0 && (
                <TableOfContents headings={content.headings} locale={content.locale} />
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
