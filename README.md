# Render No-Sleep

Keep your Render.com free tier services awake by pinging them every 10 minutes using Vercel's cron jobs.

## Features

- 🔄 Automatic pinging every 10 minutes using Vercel Cron Jobs
- 📊 Monitor page to check ping status
- 🚀 Zero configuration needed after deployment
- 💰 Completely free (uses Vercel's free tier)

## How It Works

This project uses Vercel's serverless functions and cron jobs to ping your Render service's health endpoint every 10 minutes, preventing it from going to sleep due to inactivity.

## Deployment Instructions

### 1. Deploy to Vercel

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Deploy the project:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Link to existing project? **No**
   - What's your project's name? **render-no-sleep** (or your preferred name)
   - In which directory is your code located? **./** (current directory)
   - Want to override the settings? **No**

4. For production deployment:
   ```bash
   vercel --prod
   ```

### 2. (Optional) Add Cron Secret

For added security, you can add a cron secret to ensure only Vercel can trigger your cron jobs:

1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Go to "Environment Variables"
4. Add a new variable:
   - Name: `CRON_SECRET`
   - Value: Generate a random string (e.g., using `openssl rand -hex 32`)
   - Environment: Production

### 3. Verify It's Working

1. Visit your deployed site at `https://your-project.vercel.app`
2. Click on the monitor page or go to `/monitor.html`
3. Check the ping status and logs
4. The cron job will automatically run every 10 minutes

## Project Structure

```
render-no-sleep/
├── api/
│   ├── cron.js      # Cron job handler (runs every 10 minutes)
│   └── ping.js      # Manual ping endpoint
├── index.html       # Landing page for Naggering Bot
├── monitor.html     # Monitoring dashboard
├── package.json     # Node.js dependencies
├── vercel.json      # Vercel configuration with cron schedule
└── README.md        # This file
```

## Monitoring

- The cron job runs every 10 minutes (configured in `vercel.json`)
- You can check the logs in your Vercel dashboard under "Functions" tab
- The `/monitor.html` page shows real-time ping status
- Manual pinging is available through the monitor page

## Customization

To ping a different URL, modify the `healthUrl` variable in:
- `api/cron.js`
- `api/ping.js`

To change the ping frequency, modify the cron schedule in `vercel.json`:
- `*/10 * * * *` = every 10 minutes
- `*/5 * * * *` = every 5 minutes
- `*/15 * * * *` = every 15 minutes

## Troubleshooting

1. **Pings are failing**: Check if your Render service is running and the health endpoint is accessible
2. **Cron not running**: Check the Functions tab in Vercel dashboard for any errors
3. **Unauthorized errors**: If you set a CRON_SECRET, make sure it's properly configured

## License

MIT
