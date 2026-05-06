/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL || 'https://heynova.io',
  generateRobotsTxt: true,
  exclude: [
    '/icon.png',
    '/*/home',
    '/*/test-page',
    '/*/services/test-service',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/private'],
      },
    ],
  },
};