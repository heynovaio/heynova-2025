/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://heynova.io',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/private'],
      },
    ],
  },
  additionalPaths: async (config) => {
    const paths = [];

    try {
      const { createClient } = require('@prismicio/client');
      const client = createClient({
        repositoryName: process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || 'heynova',
      });

      // Fetch all insights with all languages
      const insights = await client.getAllByType('insight', {
        lang: '*',
        pageSize: 100,
      });

      // Add each insight page to sitemap
      insights.forEach((insight) => {
        // Get categories for this insight
        const categories = insight.data.categories || [];
        
        if (categories.length > 0) {
          categories.forEach((categoryItem) => {
            if (categoryItem.category?.uid) {
              paths.push({
                loc: `/${insight.lang}/insights/${categoryItem.category.uid}/${insight.uid}`,
                changefreq: 'monthly',
                priority: 0.6,
                lastmod: insight.last_publication_date
                  ? new Date(insight.last_publication_date).toISOString()
                  : new Date().toISOString(),
              });
            }
          });
        }
      });
    } catch (error) {
      console.error('Error generating sitemap paths for insights:', error);
    }

    return paths;
  },
};