import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    'GPTBot',
    'ChatGPT-User',
    'ClaudeBot',
    'anthropic-ai',
    'PerplexityBot',
    'Google-Extended',
    'Bytespider',
    'FacebookBot',
    'OAI-SearchBot',
  ];
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/thanks', '/lp/'],
      },
      ...aiBots.map((bot) => ({ userAgent: bot, allow: '/' })),
    ],
    sitemap: 'https://denverflooringcollective.com/sitemap.xml',
  };
}
