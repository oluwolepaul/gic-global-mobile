const API_VERSION = 'v2025-02-19';

const eventQuery = `*[_type == "churchEvent" && isPublished == true && endDate >= $today] | order(startDate asc) {
  "id": _id,
  campusId,
  title,
  startDate,
  endDate,
  "date": displayDate,
  time,
  place,
  theme,
  speaker,
  description,
  "imageUrl": image.asset->url,
  "secondaryImageUrl": secondaryImage.asset->url
}`;

const weeklyWordQuery = `*[_type == "weeklyPost" && isPublished == true] | order(publishedAt desc) {
  "id": _id,
  title,
  speaker,
  scripture,
  excerpt,
  introduction,
  discussion,
  parable,
  habits[] { title, reference, text },
  prayer,
  publishedAt,
  "thumbnailUrl": thumbnail.asset->url
}`;

async function querySanity(projectId, dataset, query, params = {}) {
  const endpoint = new URL(`https://${projectId}.apicdn.sanity.io/${API_VERSION}/data/query/${encodeURIComponent(dataset)}`);
  endpoint.searchParams.set('query', query);
  for (const [key, value] of Object.entries(params)) endpoint.searchParams.set(`$${key}`, JSON.stringify(value));

  const response = await fetch(endpoint, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('Content service request failed.');
  const result = await response.json();
  return Array.isArray(result.result) ? result.result : [];
}

module.exports = async function contentHandler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || 'production';
  if (!projectId) {
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return res.status(200).json({ configured: false, events: [], weeklyPosts: [] });
  }

  const today = new Date().toISOString().slice(0, 10);
  try {
    const [events, weeklyPosts] = await Promise.all([
      querySanity(projectId, dataset, eventQuery, { today }),
      querySanity(projectId, dataset, weeklyWordQuery),
    ]);

    res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=600');
    return res.status(200).json({ configured: true, events, weeklyPosts });
  } catch {
    return res.status(502).json({ error: 'Church updates are temporarily unavailable.' });
  }
};
