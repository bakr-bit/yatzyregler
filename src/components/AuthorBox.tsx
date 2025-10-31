import Image from 'next/image';
import styles from './AuthorBox.module.css';
import { getAuthorDescription } from '@/lib/translations';

interface AuthorBoxProps {
  locale?: string;
}

const subtitles: Record<string, string> = {
  sv: 'Om författaren',
  en: 'About the author',
  no: 'Om forfatteren',
  da: 'Om forfatteren',
  fi: 'Kirjoittajasta',
  es: 'Sobre el autor',
};

export default function AuthorBox({ locale = 'sv' }: AuthorBoxProps) {
  const subtitle = subtitles[locale] || subtitles.sv;
  const description = getAuthorDescription(locale);

  return (
    <aside className={styles.authorBox}>
      <div className={styles.header}>
        <Image
          src="/images/fredrik-48x48.webp"
          alt="Fredrik"
          width={48}
          height={48}
          className={styles.avatar}
        />
        <div>
          <h4 className={styles.name}>Fredrik</h4>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
      <p className={styles.bio}>
        {description}
      </p>
    </aside>
  );
}
