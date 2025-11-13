/** @type {import('next').NextConfig} */
const nextConfig = {
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
      // Add trailing slash to casino page
      {
        source: '/casino-utan-svensk-licens',
        destination: '/casino-utan-svensk-licens/',
        permanent: true, // 301 redirect
      },
      // Redirect all Swedish casino pages to the main casino page with trailing slash
      {
        source: '/casino-pa-natet',
        destination: '/casino-utan-svensk-licens/',
        permanent: true, // 301 redirect
      },
      {
        source: '/casino-med-swish',
        destination: '/casino-utan-svensk-licens/',
        permanent: true,
      },
      {
        source: '/mga-casino',
        destination: '/casino-utan-svensk-licens/',
        permanent: true,
      },
      {
        source: '/vad-ar-nytt-i-kasinovarlden-ta-reda-pa-det-med-casinon-com',
        destination: '/casino-utan-svensk-licens/',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
