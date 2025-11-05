import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getContentBySlug } from '@/lib/markdown';
import TableOfContents from '@/components/TableOfContents';
import AuthorBox from '@/components/AuthorBox';
import { ArticleSchema, AuthorSchema, ToplistSchema, FAQSchema } from '@/components/Schema';
import { getAuthorDescription } from '@/lib/translations';
import CasinoToplist from '@/components/CasinoToplist';
import styles from '../[slug]/page.module.css';

// Casino toplist data for schema
const casinoToplistData = [
  {
    name: 'Bästa Casino Utan Svensk Licens',
    url: 'https://toptaxfreecasinos.com/',
    description: 'Bäst Casino Utan Svensk Licens med Generösa Bonusar & Free Spins, 100% Skattefritt'
  },
  {
    name: 'Nya Casinon utan svensk licens',
    url: 'https://toptaxfreecasinos.com/',
    description: 'Spela Trots Spelpaus med Stora Bonusar + Spins och Skattefria vinster'
  },
  {
    name: 'Pay N Play med trustly',
    url: 'https://toptaxfreecasinos.com/',
    description: 'Spela på en gång med Stora Välkomstbonusar och Trustly + Instant banking'
  },
  {
    name: 'Bäst Cash Back & Bonusar',
    url: 'https://toptaxfreecasinos.com/',
    description: 'Få Cashback bonusar med Stora Bonusar & Free spins och Smidiga transaktioner'
  },
  {
    name: 'Snabba Uttag & Insättningar',
    url: 'https://toptaxfreecasinos.com/',
    description: 'Snabba uttag & insättningar med Enorma bonusar och Spela utan begränsningar'
  },
  {
    name: 'Bäst Odds utan Spelpaus',
    url: 'https://toptaxfreecasinos.com/',
    description: 'Bettingbonusar med Bättre odds och Spela utan Licens'
  },
  {
    name: 'Spela utan Spelpaus',
    url: 'https://toptaxfreecasinos.com/',
    description: 'Spela trots Spelpaus med Stora bonusar och Spela tryggt på testade sidor'
  },
  {
    name: 'Alla casinon utan svensk licens',
    url: 'https://toptaxfreecasinos.com/',
    description: 'Välj bland alla casinon utan Inga begränsningar, Alla är skattefria'
  }
];

// FAQ data for schema
const casinoFAQData = [
  {
    question: 'Vad är ett casino utan svensk licens?',
    answer: 'Ett casino utan svensk licens är en spelsajt som inte följer svensk lag och Spelinspektionens regler. Istället för den svenska licensen är det en annan myndighet utomlands som övervakar verksamheten. Som svensk spelare behöver du då själv hantera ansvarsfullt spelande och beakta skatteregler.'
  },
  {
    question: 'Varför söker inte alla casinon svensk licens?',
    answer: 'Att ansöka om svensk licens innebär höga avgifter, en enda bonus per spelare och krav på Spelpaus. För vissa operatörer blir kostnaderna för höga och begränsningarna för strikta. Därför vänder de sig till marknader där de kan erbjuda fler bonusar, friare reklam och slippa BankID-krav.'
  },
  {
    question: 'Är det lagligt för mig som svensk att spela på ett casino utan svensk licens?',
    answer: 'Ja, enligt Spelinspektionen är det inte olagligt att som privatperson välja ett casino utan svensk licens. Du har dock inget skydd från de svenska systemen likt Spelpaus och du behöver betala skatt på vinster som kommer från länder utanför EU/EES eller sajter riktade mot Sverige.'
  },
  {
    question: 'Vilka bonusar kan jag få hos casino utan svensk licens?',
    answer: 'Eftersom svenska regler inte gäller kan du stöta på välkomstpaket för flera insättningar, löpande reload bonusar och VIP-program med regelbundna kampanjer. En del sajter har också kryptoerbjudanden och cashback. Det är viktigt att alltid läsa villkoren om omsättningskrav och tidsfrister för att undvika obehagliga överraskningar.'
  },
  {
    question: 'Vad händer med mina vinster i skattehänseende?',
    answer: 'Inom EU/EES är vinster skattefria för svenska spelare så länge casinot inte riktar sig specifikt mot Sverige. Om licensen kommer från exempelvis Curacao, Komorerna eller andra nationer utanför EU/EES gäller 30 % skatt på vinsterna. Du ansvarar själv för att deklarera dessa belopp enligt svensk skattelag.'
  },
  {
    question: 'Saknas verkligen Spelpaus helt på dessa sidor?',
    answer: 'Ja, Spelpaus är en nationell funktion skapad för svenska licensierade casinon. Hos utländska operatörer existerar inte detta system. Istället kan du själv kontakta varje enskilt casino för att stänga av dig eller använda tredjepartsprogram som GamBan och BetBlocker för att blockera spelsajter på din enhet.'
  },
  {
    question: 'Hur verifierar jag mig utan BankID?',
    answer: 'På casinon utan svensk licens sker registrering och verifiering i regel manuellt. Du skapar ett konto med e-post och lösenord. Sedan ombeds du ladda upp ID-handlingar, räkningar eller andra dokument. Uttag och KYC-processer kan ta några timmar eller dagar beroende på hur snabb kundtjänsten är.'
  }
];

export async function generateMetadata() {
  const content = await getContentBySlug('casino-utan-svensk-licens', 'sv');

  if (!content) {
    return { title: 'Page Not Found' };
  }

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      url: 'https://www.yatzyregler.com/casino-utan-svensk-licens',
      siteName: 'Yatzy Regler',
      locale: 'sv_SE',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
    },
    alternates: {
      canonical: 'https://www.yatzyregler.com/casino-utan-svensk-licens',
      languages: {
        'sv': 'https://www.yatzyregler.com/casino-utan-svensk-licens',
        'x-default': 'https://www.yatzyregler.com/casino-utan-svensk-licens',
      },
    },
  };
}

export default async function CasinoPage() {
  const content = await getContentBySlug('casino-utan-svensk-licens', 'sv');

  if (!content) {
    notFound();
  }

  return (
    <>
      <ArticleSchema
        title={content.title}
        description={content.description}
        url="/casino-utan-svensk-licens"
      />
      <AuthorSchema
        name="Fredrik"
        description={getAuthorDescription('sv')}
      />
      <ToplistSchema items={casinoToplistData} />
      <FAQSchema items={casinoFAQData} />

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
              <div className={styles.content}>
                <p>
                  Casino utan svensk licens och casino utan Spelpaus har blivit allt mer populära bland svenska spelare som vill spela lagligt online utan de regler och begränsningar som finns på den svenska spelmarknaden. Dessa casinon har licenser från andra länder som Curacao, Malta eller Estland, vilket innebär större bonusar, färre restriktioner och möjligheten att spela även om du är registrerad hos Spelpaus.se.
                </p>
                <p>
                  Att välja ett casino utan svensk licens ger dig en friare och mer flexibel spelupplevelse med fler kampanjer, exklusiva VIP-program och snabba uttag. Allt fler svenska spelare föredrar dessa utländska casinon tack vare deras generösare villkor och bredare utbud. Nedan hittar du de mest populära och rekommenderade alternativen just nu.
                </p>
              </div>

              <CasinoToplist />

              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: content.htmlContent }}
              />
            </article>

            <aside>
              <AuthorBox locale="sv" />
              {content.headings.length > 0 && (
                <TableOfContents headings={content.headings} locale="sv" />
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
