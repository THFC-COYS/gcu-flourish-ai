const HEYGEN_BASE = 'https://api.heygen.com';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.HEYGEN_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'HEYGEN_API_KEY not configured' });
  }

  const { action, ...payload } = req.body;

  const routes: Record<string, string> = {
    new: '/v1/streaming.new',
    start: '/v1/streaming.start',
    task: '/v1/streaming.task',
    ice: '/v1/streaming.ice',
    stop: '/v1/streaming.stop',
  };

  const path = routes[action];
  if (!path) {
    return res.status(400).json({ error: `Unknown action: ${action}` });
  }

  try {
    const upstream = await fetch(`${HEYGEN_BASE}${path}`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await upstream.json();
    res.setHeader('Cache-Control', 'no-store');
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to reach HeyGen API' });
  }
}
