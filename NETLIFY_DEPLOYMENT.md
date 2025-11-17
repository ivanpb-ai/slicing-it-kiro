# Netlify Deployment Guide

## Setup Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables in Netlify**
   - Go to your Netlify site settings
   - Navigate to "Environment variables"
   - Add all required environment variables (DATABASE_URL, etc.)

3. **Deploy Settings**
   - Build command: `npm run build`
   - Publish directory: `dist/public`
   - Functions directory: `netlify/functions`

## Important Notes

### File Uploads
The current implementation uses local file storage which **won't work on Netlify** (serverless functions are stateless). You need to:

1. Use a cloud storage service (AWS S3, Cloudinary, etc.)
2. Update `server/routes.ts` to use cloud storage instead of local filesystem

### Database
Make sure your database (Neon/PostgreSQL) is accessible from Netlify's servers.

### WebSockets
If your app uses WebSockets, note that Netlify Functions don't support persistent connections. Consider using:
- Pusher
- Ably
- Socket.io with a separate WebSocket server

## Troubleshooting 404 Errors

If you're getting 404 errors:

1. **Check build logs** - Ensure the build completes successfully
2. **Verify publish directory** - Should be `dist/public` and contain `index.html`
3. **Check redirects** - The `netlify.toml` handles SPA routing
4. **API routes** - Should be prefixed with `/api/` to route to serverless functions

## Local Testing

Test the production build locally:
```bash
npm run build:local
npm start
```

For Netlify Functions locally:
```bash
netlify dev
```
(Requires Netlify CLI: `npm install -g netlify-cli`)
