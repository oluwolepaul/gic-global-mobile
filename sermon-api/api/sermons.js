const YOUTUBE_CHANNEL_HANDLE = '@GicglobalTX';

module.exports = async function sermonsHandler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'The sermon feed is not configured yet.' });

  try {
    const channelUrl = new URL('https://www.googleapis.com/youtube/v3/channels');
    channelUrl.search = new URLSearchParams({ part: 'contentDetails', forHandle: YOUTUBE_CHANNEL_HANDLE, key: apiKey }).toString();
    const channelResponse = await fetch(channelUrl);
    if (!channelResponse.ok) throw new Error('Channel lookup failed.');
    const channelData = await channelResponse.json();
    const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) return res.status(404).json({ error: 'The GIC YouTube channel could not be found.' });

    const playlistUrl = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    playlistUrl.search = new URLSearchParams({ part: 'snippet', playlistId: uploadsPlaylistId, maxResults: '25', key: apiKey }).toString();
    const playlistResponse = await fetch(playlistUrl);
    if (!playlistResponse.ok) throw new Error('Video list request failed.');
    const playlistData = await playlistResponse.json();
    const videos = (playlistData.items || [])
      .map((item) => {
        const snippet = item.snippet || {};
        const id = snippet.resourceId?.videoId;
        if (!id || ['Private video', 'Deleted video'].includes(snippet.title)) return null;
        return {
          id,
          title: snippet.title || 'GIC message',
          description: snippet.description || '',
          publishedAt: snippet.publishedAt || '',
          thumbnail: snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || '',
          url: `https://www.youtube.com/watch?v=${id}`,
        };
      })
      .filter(Boolean);

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({ channel: 'GIC Global', videos });
  } catch {
    return res.status(502).json({ error: 'Could not load the GIC sermon feed. Please try again later.' });
  }
};
