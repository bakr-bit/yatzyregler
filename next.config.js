/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,

  images: {
    domains: ['www.yatzyregler.com', 'yatzyregler.com'],
  },

  async redirects() {
    return [
      // Redirect English page from old URL to new URL
      {
        source: '/yahtzee-rules',
        destination: '/en',
        permanent: true, // 301 redirect
      },
      // Redirect all Swedish casino pages to the casino subdomain
      {
        source: '/casino-pa-natet',
        destination: 'https://casino.yatzyregler.com',
        permanent: true, // 301 redirect
      },
      {
        source: '/casino-med-swish',
        destination: 'https://casino.yatzyregler.com',
        permanent: true,
      },
      {
        source: '/mga-casino',
        destination: 'https://casino.yatzyregler.com',
        permanent: true,
      },
      {
        source: '/vad-ar-nytt-i-kasinovarlden-ta-reda-pa-det-med-casinon-com',
        destination: 'https://casino.yatzyregler.com',
        permanent: true,
      },
      // Redirect main casino page to subdomain
      {
        source: '/casino-utan-svensk-licens',
        destination: 'https://casino.yatzyregler.com',
        permanent: true, // 301 redirect
      },
      {
        source: '/casino-utan-svensk-licens/',
        destination: 'https://casino.yatzyregler.com',
        permanent: true, // 301 redirect
      },
    ];
  },
}

module.exports = nextConfig
