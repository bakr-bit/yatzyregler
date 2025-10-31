import Image from 'next/image';
import styles from './CasinoCard.module.css';

interface CasinoCardProps {
  title: string;
  image: string;
  features: string[];
  rating?: number;
  buttonText?: string;
  buttonLink?: string;
}

export default function CasinoCard({
  title,
  image,
  features,
  rating = 5.0,
  buttonText = 'SPELA HÄR',
  buttonLink = '#',
}: CasinoCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <ul className={styles.features}>
          {features.map((feature, index) => (
            <li key={index}>
              <span className={styles.checkmark}>✓</span>
              {feature}
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <div className={styles.rating}>{rating.toFixed(1)}</div>
          <a
            href={buttonLink}
            className={styles.button}
            target="_blank"
            rel="noopener noreferrer"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}
