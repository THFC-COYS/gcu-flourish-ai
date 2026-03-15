import type { VercelRequest, VercelResponse } from '@vercel/node';

// Minimal RSS item parser — handles most standard RSS 2.0 feeds
function extractBetween(str: string, open: string, close: string): string {
  const start = str.indexOf(open);
  if (start === -1) return '';
  const end = str.indexOf(close, start + open.length);
  if (end === -1) return '';
  return str.slice(start + open.length, end).trim();
}

function stripCdata(s: string): string {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, '').trim();
}

function parseRss(xml: string, count: number) {
  // Split into <item> blocks
  const items: { title: string; link: string; pubDate: string; description: string }[] = [];
  const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;
  while ((match = itemRegex.exec(xml)) !== null && items.length < count) {
    const block = match[1];
    const title = stripTags(stripCdata(extractBetween(block, '<title>', '</title>')));
    const link =
      extractBetween(block, '<link>', '</link>') ||
      extractBetween(block, '<link', '/>').replace(/^[^>]*>/, '') ||
      '';
    const pubDate = extractBetween(block, '<pubDate>', '</pubDate>');
    const description = stripTags(
      stripCdata(
        extractBetween(block, '<description>', '</description>') ||
        extractBetween(block, '<content:encoded>', '</content:encoded>')
      )
    ).slice(0, 120) + '…';
    items.push({ title, link: link.trim(), pubDate, description });
  }
  return items;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const rssUrl = req.query['rss_url'];
  const count = parseInt((req.query['count'] as string) || '5', 10);

  if (!rssUrl || typeof rssUrl !== 'string') {
    return res.status(400).json({ error: 'Missing rss_url parameter' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=180, stale-while-revalidate=300');

  try {
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; JARVIS-Dashboard/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return res.status(502).json({ error: `Feed returned ${response.status}` });
    }

    const xml = await response.text();
    const items = parseRss(xml, count);

    return res.json({ status: 'ok', items });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return res.status(502).json({ error: message });
  }
}
