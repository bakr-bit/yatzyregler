import Link from 'next/link';
import styles from './TableOfContents.module.css';
import { getTocTitle } from '@/lib/translations';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  locale?: string;
}

export default function TableOfContents({ headings, locale = 'sv' }: TableOfContentsProps) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className={styles.toc}>
      <h3 className={styles.title}>{getTocTitle(locale)}</h3>
      <nav>
        <ul className={styles.list}>
          {headings.map((heading, index) => (
            <li
              key={`${heading.id}-${index}`}
              className={heading.level === 3 ? styles.subItem : ''}
            >
              <a href={`#${heading.id}`}>
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
