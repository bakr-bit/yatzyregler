interface FAQItem {
  question: string;
  answer: string;
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  publishedDate?: string;
  modifiedDate?: string;
  authorName?: string;
  imageUrl?: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

interface AuthorSchemaProps {
  name: string;
  description: string;
  imageUrl?: string;
}

interface ToplistItem {
  name: string;
  url: string;
  image?: string;
  description?: string;
}

interface ToplistSchemaProps {
  items: ToplistItem[];
}

export function ArticleSchema({
  title,
  description,
  url,
  publishedDate = new Date().toISOString(),
  modifiedDate = new Date().toISOString(),
  authorName = 'Fredrik',
  imageUrl = '/images/fredrik-200x200.webp',
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: `https://www.yatzyregler.com${url}`,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      '@type': 'Person',
      name: authorName,
      image: `https://www.yatzyregler.com${imageUrl}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yatzyregler.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.yatzyregler.com/favicon.ico',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.yatzyregler.com${url}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ items }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function AuthorSchema({
  name,
  description,
  imageUrl = '/images/fredrik-200x200.webp',
}: AuthorSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    description: description,
    image: `https://www.yatzyregler.com${imageUrl}`,
    jobTitle: 'Yatzy Expert',
    worksFor: {
      '@type': 'Organization',
      name: 'Yatzyregler.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ToplistSchema({ items }: ToplistSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Thing',
        name: item.name,
        url: item.url,
        ...(item.image && { image: item.image }),
        ...(item.description && { description: item.description }),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
