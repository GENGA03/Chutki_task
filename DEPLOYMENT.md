# 🚀 Deployment Guide

This guide will help you deploy the Food Menu Extractor to Vercel.

## Prerequisites

- GitHub account
- Vercel account
- OpenAI API key
- Vercel Postgres database

## Step 1: Prepare Your Repository

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Food Menu Extractor"
   git branch -M main
   git remote add origin https://github.com/yourusername/food-menu-extractor.git
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

## Step 3: Set Up Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

### Required Variables

```env
OPENAI_API_KEY=your_openai_api_key_here
POSTGRES_URL=your_vercel_postgres_url_here
POSTGRES_PRISMA_URL=your_vercel_postgres_prisma_url_here
POSTGRES_URL_NO_SSL=your_vercel_postgres_url_no_ssl_here
POSTGRES_URL_NON_POOLING=your_vercel_postgres_url_non_pooling_here
POSTGRES_USER=your_postgres_user_here
POSTGRES_HOST=your_postgres_host_here
POSTGRES_PASSWORD=your_postgres_password_here
POSTGRES_DATABASE=your_postgres_database_here
```

## Step 4: Set Up Vercel Postgres

1. In your Vercel project dashboard
2. Go to **Storage** tab
3. Click **Create Database** → **Postgres**
4. Choose a name for your database
5. Select a region close to your users
6. Click **Create**
7. Copy the connection details to your environment variables

## Step 5: Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to **API Keys** section
4. Click **Create new secret key**
5. Copy the key and add it to your Vercel environment variables

## Step 6: Deploy and Test

1. **Redeploy** your project after adding environment variables
2. Visit your deployed URL
3. Test the application:
   - Upload the provided `sample-menu.txt` file
   - Verify menu items are extracted correctly
   - Test search and filter functionality

## Step 7: Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS settings as instructed
4. Wait for SSL certificate to be issued

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Verify TypeScript configuration
   - Check build logs in Vercel dashboard

2. **Environment Variable Issues**
   - Ensure all variables are set correctly
   - Check for typos in variable names
   - Redeploy after adding new variables

3. **Database Connection Issues**
   - Verify Postgres connection string
   - Check database is active in Vercel
   - Ensure all required environment variables are set

4. **OpenAI API Issues**
   - Verify API key is correct
   - Check you have sufficient credits
   - Ensure API key has proper permissions

### Debugging

1. **Check Function Logs**
   - Go to Vercel dashboard → Functions
   - View logs for your API routes
   - Look for error messages

2. **Test API Endpoints**
   ```bash
   # Test extract-menu endpoint
   curl -X POST https://your-app.vercel.app/api/extract-menu \
     -F "file=@sample-menu.txt"

   # Test menu-items endpoint
   curl https://your-app.vercel.app/api/menu-items
   ```

## Performance Optimization

1. **Enable Edge Functions** (if needed)
2. **Configure Caching** for static assets
3. **Monitor Performance** in Vercel dashboard
4. **Set up Alerts** for errors

## Security Considerations

1. **Environment Variables** are automatically secured by Vercel
2. **API Keys** should never be committed to code
3. **Database** connections are encrypted
4. **CORS** is configured for API routes

## Monitoring

1. **Vercel Analytics** - Built-in performance monitoring
2. **Function Logs** - Real-time error tracking
3. **Database Metrics** - Monitor query performance

## Scaling

- **Automatic Scaling** - Vercel handles this automatically
- **Database Scaling** - Upgrade Postgres plan as needed
- **CDN** - Global edge network for fast loading

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **OpenAI Documentation**: https://platform.openai.com/docs

---

**Your Food Menu Extractor is now live! 🎉**

Visit your deployed URL and start extracting menu data from text files.
