import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

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
    // Use SITE_URL so the sitemap URL stays correct on the workers.dev
    // preview pre-DNS-swap. Once NEXT_PUBLIC_SITE_URL is set in
    // Cloudflare to https://denverflooringcollective.com (post-swap)
    // this flips automatically.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
