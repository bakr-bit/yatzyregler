'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';
import { getAboutYatzyregler } from '@/lib/translations';

function getLocaleFromPath(pathname: string): string {
  if (pathname === '/' || pathname.startsWith('/yatzy-regler') || pathname.startsWith('/casino-') || pathname.startsWith('/kontakt') || pathname.startsWith('/privacy-') || pathname.startsWith('/artiklar')) {
    return 'sv';
  }
  if (pathname.startsWith('/da')) return 'da';
  if (pathname.startsWith('/no')) return 'no';
  if (pathname.startsWith('/fi')) return 'fi';
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/es')) return 'es';
  return 'sv'; // default to Swedish
}

export default function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const currentYear = new Date().getFullYear();
  const about = getAboutYatzyregler(locale);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <Image
            src="/images/yatzyregler.com-logga-transparent.webp"
            alt="Yatzyregler.com logga"
            width={200}
            height={60}
            className={styles.logo}
          />
        </div>

        <div className={styles.about}>
          <h3>{about.title}</h3>
          <p>{about.content}</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.column}>
            <h3>Språk</h3>
            <ul>
              <li><Link href="/">🇸🇪 Svenska</Link></li>
              <li><Link href="/da">🇩🇰 Dansk</Link></li>
              <li><Link href="/no">🇳🇴 Norsk</Link></li>
              <li><Link href="/fi">🇫🇮 Suomi</Link></li>
              <li><Link href="/en">🇺🇸 English</Link></li>
              <li><Link href="/es">🇪🇸 Español</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Info</h3>
            <ul>
              <li><Link href="/kontakt">Kontakt</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/casino-utan-svensk-licens">Casino utan svensk licens</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} Yatzyregler.com - Alla rättigheter förbehållna</p>
        </div>
      </div>
    </footer>
  );
}
