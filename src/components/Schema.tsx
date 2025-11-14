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

interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
  estimatedCost?: string;
  supply?: string[];
  tool?: string[];
}

export function HowToSchema({
  name,
  description,
  steps,
  totalTime,
  estimatedCost,
  supply,
  tool,
}: HowToSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    ...(totalTime && { totalTime: totalTime }),
    ...(estimatedCost && { estimatedCost: { '@type': 'MonetaryAmount', currency: 'SEK', value: estimatedCost } }),
    ...(supply && supply.length > 0 && {
      supply: supply.map(item => ({
        '@type': 'HowToSupply',
        name: item,
      })),
    }),
    ...(tool && tool.length > 0 && {
      tool: tool.map(item => ({
        '@type': 'HowToTool',
        name: item,
      })),
    }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: {
          '@type': 'ImageObject',
          url: `https://www.yatzyregler.com${step.image}`,
        },
      }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface GameSchemaProps {
  name: string;
  description: string;
  numberOfPlayers: string;
  playTime: string;
  gameCategory: string;
}

export function GameSchema({
  name,
  description,
  numberOfPlayers,
  playTime,
  gameCategory,
}: GameSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: name,
    description: description,
    numberOfPlayers: numberOfPlayers,
    playTime: playTime,
    gameCategory: gameCategory,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
