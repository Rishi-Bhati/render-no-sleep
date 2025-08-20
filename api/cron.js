import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Verify this is a cron job request from Vercel
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const healthUrl = 'https://thenagger.onrender.com/health';
  
  try {
    console.log(`[CRON] Pinging ${healthUrl} at ${new Date().toISOString()}`);
    
    const response = await fetch(healthUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Render-Keep-Alive-Cron/1.0'
      },
      // Set timeout to 8 seconds (Vercel functions have 10s limit)
      signal: AbortSignal.timeout(8000)
    });
    
    const responseText = await response.text();
    
    console.log(`[CRON] Ping successful: ${response.status} ${response.statusText}`);
    
    // Log to Vercel's function logs
    console.log({
      type: 'cron_ping',
      success: true,
      timestamp: new Date().toISOString(),
      status: response.status,
      responsePreview: responseText.substring(0, 50)
    });
    
    res.status(200).json({
      success: true,
      message: 'Cron ping successful',
      timestamp: new Date().toISOString(),
      response: {
        status: response.status,
        statusText: response.statusText
      }
    });
  } catch (error) {
    console.error('[CRON] Ping failed:', error);
    
    // Still return 200 to prevent Vercel from retrying
    res.status(200).json({
      success: false,
      message: 'Cron ping failed',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
}
