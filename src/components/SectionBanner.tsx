import Image from 'next/image';
import styles from './SectionBanner.module.css';

interface SectionBannerProps {
  imageSrc: string;
  title: string;
  alt: string;
  overlayColor?: string;
}

export default function SectionBanner({ imageSrc, title, alt, overlayColor = 'rgba(27, 185, 152, 0.75)' }: SectionBannerProps) {
  return (
    <div className={styles.banner}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={alt}
          fill
          style={{ objectFit: 'contain' }}
          priority={false}
        />
        <div className={styles.overlay} style={{ backgroundColor: overlayColor }} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
      </div>
    </div>
  );
}
