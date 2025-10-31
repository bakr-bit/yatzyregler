/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['yatzyregler.com'],
  },

  async redirects() {
    return [
      // Redirect all Swedish casino pages to the main casino page
      {
        source: '/casino-pa-natet',
        destination: '/casino-utan-svensk-licens',
        permanent: true, // 301 redirect
      },
      {
        source: '/casino-med-swish',
        destination: '/casino-utan-svensk-licens',
        permanent: true,
      },
      {
        source: '/mga-casino',
        destination: '/casino-utan-svensk-licens',
        permanent: true,
      },
      {
        source: '/vad-ar-nytt-i-kasinovarlden-ta-reda-pa-det-med-casinon-com',
        destination: '/casino-utan-svensk-licens',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
