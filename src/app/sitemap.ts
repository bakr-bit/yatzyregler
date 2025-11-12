import { MetadataRoute } from 'next';
import { getAllContentSlugs, getAvailableLocales } from '@/lib/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.yatzyregler.com';
  const currentDate = new Date();

  const routes: MetadataRoute.Sitemap = [];

  // Homepage
  routes.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // Get all available locales
  const locales = getAvailableLocales();

  // Add locale homepages (da, no, fi, en, es - but not sv as that's the homepage)
  for (const locale of locales) {
    if (locale !== 'sv') {
      routes.push({
        url: `${baseUrl}/${locale}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  // Get all Swedish content pages
  const svSlugs = getAllContentSlugs('sv');
  for (const slug of svSlugs) {
    // Skip index.md as it's the homepage
    if (slug === 'index') continue;

    // Skip old unused files
    if (slug === 'cusl' || slug === 'casino_utan_svensk_licens_2025_svenska') continue;

    // Set priority based on page importance
    let priority = 0.6;
    let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'monthly';

    // Main yatzy rules pages get higher priority
    if (slug.includes('yatzy-regler') || slug === 'maxi-yatzy-regler' || slug === 'barn-yatzy-regler') {
      priority = 0.9;
      changeFrequency = 'monthly';
    }
    // Important content pages
    else if (slug === 'casino-utan-svensk-licens' || slug === 'faq' || slug === 'artiklar') {
      priority = 0.7;
      changeFrequency = 'weekly';
    }
    // Privacy and contact pages
    else if (slug === 'privacy-policy' || slug === 'kontakt') {
      priority = 0.5;
      changeFrequency = 'yearly';
    }

    routes.push({
      url: `${baseUrl}/${slug}`,
      lastModified: currentDate,
      changeFrequency,
      priority,
    });
  }

  // Get all English content pages
  const enSlugs = getAllContentSlugs('en');
  for (const slug of enSlugs) {
    // Skip the locale homepage file (en.md is accessed as /en)
    if (slug === 'en') continue;

    let priority = 0.7;
    let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'monthly';

    if (slug === 'yahtzee-rules') {
      priority = 0.9;
      changeFrequency = 'monthly';
    }

    routes.push({
      url: `${baseUrl}/${slug}`,
      lastModified: currentDate,
      changeFrequency,
      priority,
    });
  }

  // Get Danish content pages
  const daSlugs = getAllContentSlugs('da');
  for (const slug of daSlugs) {
    // Skip the locale homepage file
    if (slug === 'da') continue;

    routes.push({
      url: `${baseUrl}/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return routes;
}
