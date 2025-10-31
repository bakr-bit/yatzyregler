'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/yatzyregler.com-logga-transparent.webp"
            alt="Yatzy Regler"
            width={180}
            height={60}
            priority
          />
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li><Link href="/" onClick={closeMenu}>🇸🇪 Svenska</Link></li>
            <li><Link href="/da" onClick={closeMenu}>🇩🇰 Dansk</Link></li>
            <li><Link href="/no" onClick={closeMenu}>🇳🇴 Norsk</Link></li>
            <li><Link href="/fi" onClick={closeMenu}>🇫🇮 Suomi</Link></li>
            <li><Link href="/en" onClick={closeMenu}>🇺🇸 English</Link></li>
            <li><Link href="/es" onClick={closeMenu}>🇪🇸 Español</Link></li>
            <li><Link href="/kontakt" onClick={closeMenu}>👉 Kontakt</Link></li>
          </ul>
        </nav>

        <button
          className={`${styles.mobileToggle} ${isMenuOpen ? styles.mobileToggleOpen : ''}`}
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
