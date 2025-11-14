import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getContentBySlug } from '@/lib/markdown';
import AuthorBox from '@/components/AuthorBox';
import { ArticleSchema, AuthorSchema, HowToSchema, FAQSchema, GameSchema } from '@/components/Schema';
import { getAuthorDescription } from '@/lib/translations';
import styles from './[slug]/page.module.css';

// Generate metadata for SEO
export async function generateMetadata() {
  const content = await getContentBySlug('yatzy-senaste', 'sv');

  if (!content) {
    return { title: 'Page Not Found' };
  }

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      url: 'https://www.yatzyregler.com/',
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
      canonical: 'https://www.yatzyregler.com/',
      languages: {
        'sv': 'https://www.yatzyregler.com/',
        'da': 'https://www.yatzyregler.com/da',
        'no': 'https://www.yatzyregler.com/no',
        'fi': 'https://www.yatzyregler.com/fi',
        'en': 'https://www.yatzyregler.com/en',
        'es': 'https://www.yatzyregler.com/es',
        'x-default': 'https://www.yatzyregler.com/',
      },
    },
  };
}

export default async function Home() {
  // Load the new comprehensive guide
  const content = await getContentBySlug('yatzy-senaste', 'sv');

  if (!content) {
    notFound();
  }

  // Define HowTo steps for structured data
  const howToSteps = [
    {
      name: 'Förbered spelet',
      text: 'Samla 5 tärningar, ett poängprotokoll och en penna. Bestäm vem som börjar genom att kasta en tärning var.',
      image: '/images/Bestam-vem-som-borjar.webp',
    },
    {
      name: 'Förstå protokollet',
      text: 'Protokollet är uppdelat i en övre sektion (Ettor till Sexor) och en nedre sektion (Par, Två par, Triss, Fyrtal, Stegar, Kåk, Chans, Yatzy). Målet är att nå 63+ poäng i övre delen för att få 50 bonuspoäng.',
      image: '/images/Yatzy-protokollet.webp',
    },
    {
      name: 'Kasta tärningarna - Första kastet',
      text: 'Kasta alla fem tärningar. Välj vilka tärningar du vill spara och lägga åt sidan.',
      image: '/images/Forsta-kastet.webp',
    },
    {
      name: 'Andra kastet',
      text: 'Kasta om de tärningar du inte sparade. Du kan ändra dig och kasta om tärningar du tidigare sparat.',
      image: '/images/Andra-kastet.webp',
    },
    {
      name: 'Tredje kastet',
      text: 'Din sista chans att få önskad kombination. Kasta om de tärningar du vill.',
      image: '/images/Tredje-kastet.webp',
    },
    {
      name: 'Fyll i protokollet',
      text: 'Efter dina tre kast (eller färre om du är nöjd tidigare) måste du fylla i en kategori i protokollet. Räkna samman poängen enligt kategorins regler.',
      image: '/images/Rakna-ihop-poangen.webp',
    },
    {
      name: 'Sikta på bonusen',
      text: 'I övre delen: försök få minst 63 poäng totalt för att få 50 bonuspoäng. Det innebär i genomsnitt tre av varje tal (3×1=3, 3×2=6, 3×3=9, 3×4=12, 3×5=15, 3×6=18, totalt 63).',
      image: '/images/den-ovre-delen-av-yatzy-protokollet.webp',
    },
    {
      name: 'Använd nedre sektionen strategiskt',
      text: 'I nedre delen: samla höga poäng genom att fylla i Par, Två par, Triss, Fyrtal, Stegar, Kåk och Chans strategiskt. Yatzy (fem lika) ger alltid 50 poäng.',
      image: '/images/Nedre-delen-av-protokollet.webp',
    },
    {
      name: 'Räkna ihop slutpoängen',
      text: 'När alla rutor är fyllda: summera övre delen + bonus (om du nått 63+) + nedre delen = totalpoäng. Den med högst totalpoäng vinner.',
    },
  ];

  // Define FAQ items for structured data
  const faqItems = [
    {
      question: 'Hur får man bonus i Yatzy?',
      answer: 'Du får bonusen (50 poäng) om du får totalt 63 poäng eller mer i den övre delen av protokollet (Ettor till Sexor).',
    },
    {
      question: 'Måste man ha tre av varje för bonus?',
      answer: 'Nej, det är en myt. Du behöver bara nå 63 poäng totalt, oavsett hur du får dem (t.ex. fem sexor och fem femmor räcker).',
    },
    {
      question: 'Hur många poäng är Yatzy?',
      answer: 'Yatzy (fem lika tärningar) ger alltid 50 poäng.',
    },
    {
      question: 'Hur många tärningar använder man?',
      answer: '5 tärningar i klassisk Yatzy (6 tärningar i Maxi-Yatzy).',
    },
    {
      question: 'Vad händer om Yatzy-rutan redan är fylld?',
      answer: 'Du får använda kastet i en annan ruta, eller stryka en ruta.',
    },
    {
      question: 'Vad är maxpoäng i Yatzy?',
      answer: '374 poäng teoretiskt, 250–300 är mycket bra i praktiken.',
    },
    {
      question: 'Kan Triss användas som Par?',
      answer: 'Ja, du väljer vilka tärningar du räknar.',
    },
    {
      question: 'När används Chans?',
      answer: 'När inget annat passar eller vid höga kast där du vill räkna summan av alla tärningar.',
    },
    {
      question: 'Skillnaden på Kåk och Två Par?',
      answer: 'Kåk = Triss + Par (t.ex. tre 5:or och två 3:or). Två Par = två olika par (t.ex. två 5:or och två 3:or).',
    },
    {
      question: 'Chansen för Yatzy på ett kast?',
      answer: 'Cirka 1 på 1296 (0,08 %).',
    },
    {
      question: 'Vem uppfann Yatzy?',
      answer: 'Ett kanadensiskt par uppfann spelet 1954, och det blev populärt genom Edwin S. Lowe 1956.',
    },
  ];

  return (
    <>
      {/* Structured Data */}
      <ArticleSchema
        title={content.title}
        description={content.description}
        url="/"
        publishedDate="2024-01-01T00:00:00Z"
        modifiedDate="2025-11-10T00:00:00Z"
        imageUrl="/images/Yatzy-regler-svensk-guide.webp"
      />
      <AuthorSchema
        name="Fredrik"
        description={getAuthorDescription('sv')}
      />
      <HowToSchema
        name="Hur man spelar Yatzy: Steg för steg guide"
        description="Lär dig spela Yatzy från grunden. Denna guide täcker allt från förberedelser till att räkna ihop slutpoängen och vinna spelet."
        steps={howToSteps}
        totalTime="PT30M"
        supply={['5 tärningar', 'Poängprotokoll', 'Penna']}
      />
      <FAQSchema items={faqItems} />
      <GameSchema
        name="Yatzy"
        description="Yatzy är ett klassiskt tärningsspel där spelarna kastar fem tärningar upp till tre gånger per omgång för att skapa olika kombinationer och samla poäng."
        numberOfPlayers="2 eller fler spelare"
        playTime="20-30 minuter"
        gameCategory="Tärningsspel"
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
            <span className={styles.lastUpdated}>Senast uppdaterad: 10 november 2025</span>
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
              <AuthorBox locale="sv" />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
