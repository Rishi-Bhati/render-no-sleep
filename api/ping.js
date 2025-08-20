import fetch from 'node-fetch';

export default async function handler(req, res) {
  const healthUrl = 'https://thenagger.onrender.com/health';
  
  try {
    console.log(`Pinging ${healthUrl} at ${new Date().toISOString()}`);
    
    const response = await fetch(healthUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Render-Keep-Alive/1.0'
      },
      // Set timeout to 8 seconds (Vercel functions have 10s limit)
      signal: AbortSignal.timeout(8000)
    });
    
    const responseText = await response.text();
    
    console.log(`Ping successful: ${response.status} ${response.statusText}`);
    
    res.status(200).json({
      success: true,
      message: 'Ping successful',
      timestamp: new Date().toISOString(),
      response: {
        status: response.status,
        statusText: response.statusText,
        body: responseText.substring(0, 100) // First 100 chars of response
      }
    });
  } catch (error) {
    console.error('Ping failed:', error);
    
    res.status(200).json({
      success: false,
      message: 'Ping failed',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
}
