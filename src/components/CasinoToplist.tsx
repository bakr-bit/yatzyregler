import Image from 'next/image';
import styles from './CasinoToplist.module.css';

interface CasinoItem {
  image: string;
  title: string;
  features: string[];
  rating: number;
  link: string;
}

const casinos: CasinoItem[] = [
  {
    image: '/images/tabell-bast-casino.webp',
    title: 'Bästa Casino Utan Svensk Licens',
    features: [
      'Bäst Casino Utan Svensk Licens',
      'Generösa Bonusar & Free Spins',
      '100% Skattefritt'
    ],
    rating: 5.0,
    link: 'https://toptaxfreecasinos.com/'
  },
  {
    image: '/images/tabell-nya-casinon.webp',
    title: 'Nya Casinon utan svensk licens',
    features: [
      'Spela Trots Spelpaus',
      'Stora Bonusar + Spins',
      'Skattefria vinster'
    ],
    rating: 5.0,
    link: 'https://toptaxfreecasinos.com/'
  },
  {
    image: '/images/tabell-pay-n-play.webp',
    title: 'Pay N Play med trustly',
    features: [
      'Spela på en gång',
      'Stora Välkomstbonusar',
      'Trustly + Instant banking'
    ],
    rating: 5.0,
    link: 'https://toptaxfreecasinos.com/'
  },
  {
    image: '/images/tabell-cash-back.webp',
    title: 'Bäst Cash Back & Bonusar',
    features: [
      'Få Cashback bonusar',
      'Stora Bonusar & Free spins',
      'Smidiga transaktioner'
    ],
    rating: 5.0,
    link: 'https://toptaxfreecasinos.com/'
  },
  {
    image: '/images/tabell-snabba-uttag.webp',
    title: 'Snabba Uttag & Insättningar',
    features: [
      'Snabba uttag & insättningar',
      'Enorma bonusar',
      'Spela utan begränsningar'
    ],
    rating: 5.0,
    link: 'https://toptaxfreecasinos.com/'
  },
  {
    image: '/images/tabell-odds.webp',
    title: 'Bäst Odds utan Spelpaus',
    features: [
      'Bettingbonusar',
      'Bättre odds',
      'Spela utan Licens'
    ],
    rating: 5.0,
    link: 'https://toptaxfreecasinos.com/'
  },
  {
    image: '/images/tabell-Utan-Spelpaus.webp',
    title: 'Spela utan Spelpaus',
    features: [
      'Spela trots Spelpaus',
      'Hämta Stora bonusar',
      'Spela tryggt på testade sidor'
    ],
    rating: 5.0,
    link: 'https://toptaxfreecasinos.com/'
  },
  {
    image: '/images/tabell-alla-casino-utan-svensk-licens.webp',
    title: 'Alla casinon utan svensk licens',
    features: [
      'Välj bland alla casinon',
      'Inga begränsningar',
      'Alla är skattefria'
    ],
    rating: 5.0,
    link: 'https://toptaxfreecasinos.com/'
  }
];

export default function CasinoToplist() {
  return (
    <div className={styles.toplist}>
      {casinos.map((casino, index) => (
        <div key={index} className={styles.casinoCard}>
          <div className={styles.imageWrapper}>
            <Image
              src={casino.image}
              alt={casino.title}
              width={200}
              height={120}
              className={styles.casinoImage}
            />
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>{casino.title}</h3>
            <ul className={styles.features}>
              {casino.features.map((feature, idx) => (
                <li key={idx}>✓ {feature}</li>
              ))}
            </ul>
          </div>
          <div className={styles.sidebar}>
            <div className={styles.rating}>
              <span className={styles.ratingNumber}>{casino.rating}</span>
              <div className={styles.stars}>★★★★★</div>
            </div>
            <a
              href={casino.link}
              className={styles.button}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              SPELA HÄR
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
