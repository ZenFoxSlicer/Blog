# Deployment Guide

This guide provides detailed instructions for deploying your Angular blog application to various platforms.

## Prerequisites

Before deploying, ensure you have:

1. **Git installed** on your system
2. **Node.js 18+** installed
3. **A Git repository** (GitHub, GitLab, or Bitbucket)
4. **A hosting account** (choose one of the options below)

## Step 1: Install Git (if not already installed)

### Windows:
1. Download Git from https://git-scm.com/download/win
2. Run the installer and follow the setup wizard
3. Open Command Prompt or PowerShell and verify installation:
   ```bash
   git --version
   ```

### macOS:
```bash
# Using Homebrew
brew install git

# Or download from https://git-scm.com/download/mac
```

### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install git
```

## Step 2: Initialize Git Repository

1. **Open Command Prompt/PowerShell in your project directory:**
   ```bash
   cd C:\Users\Fox\blog-app
   ```

2. **Initialize Git repository:**
   ```bash
   git init
   ```

3. **Add all files to Git:**
   ```bash
   git add .
   ```

4. **Create initial commit:**
   ```bash
   git commit -m "Initial commit: Angular blog app"
   ```

## Step 3: Create Remote Repository

### Option A: GitHub (Recommended)

1. Go to https://github.com
2. Click "New repository"
3. Name it "blog-app" or similar
4. Don't initialize with README (we already have one)
5. Click "Create repository"
6. Copy the repository URL

### Option B: GitLab

1. Go to https://gitlab.com
2. Click "New project"
3. Choose "Create blank project"
4. Name it "blog-app"
5. Click "Create project"
6. Copy the repository URL

## Step 4: Connect Local Repository to Remote

```bash
# Add remote origin (replace with your actual repository URL)
git remote add origin https://github.com/yourusername/blog-app.git

# Push to remote repository
git push -u origin main
```

## Step 5: Choose Deployment Platform

### Option 1: Netlify (Easiest for Static Sites)

1. **Go to https://netlify.com**
2. **Sign up/Login** with your Git provider
3. **Click "New site from Git"**
4. **Connect your repository**
5. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist/blog-app/browser`
6. **Click "Deploy site"**

**Advantages:**
- Free tier available
- Automatic deployments on Git push
- Custom domain support
- SSL certificates included

### Option 2: Vercel (Great for Angular)

1. **Go to https://vercel.com**
2. **Sign up/Login** with your Git provider
3. **Import your repository**
4. **Configure settings:**
   - Framework Preset: Angular
   - Build Command: `npm run build`
   - Output Directory: `dist/blog-app/browser`
5. **Click "Deploy"**

**Advantages:**
- Excellent Angular support
- Serverless functions
- Global CDN
- Automatic deployments

### Option 3: GitHub Pages (Free)

1. **Go to your repository on GitHub**
2. **Click "Settings" tab**
3. **Scroll to "Pages" section**
4. **Source: Deploy from a branch**
5. **Branch: main, folder: / (root)**
6. **Create a GitHub Action workflow:**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist/blog-app/browser
```

### Option 4: Traditional Server (VPS/Cloud)

1. **Set up a server** (DigitalOcean, AWS, Google Cloud, etc.)
2. **Install Node.js 18+** on the server
3. **Clone your repository:**
   ```bash
   git clone https://github.com/yourusername/blog-app.git
   cd blog-app
   ```
4. **Install dependencies:**
   ```bash
   npm install
   ```
5. **Build the application:**
   ```bash
   npm run build
   ```
6. **Install PM2 for process management:**
   ```bash
   npm install -g pm2
   ```
7. **Start the application:**
   ```bash
   pm2 start npm --name "blog-app" -- run serve:ssr:blog-app
   pm2 save
   pm2 startup
   ```

### Option 5: Docker Deployment

1. **Build Docker image:**
   ```bash
   docker build -t blog-app .
   ```

2. **Run container:**
   ```bash
   docker run -p 4000:4000 blog-app
   ```

3. **For production with docker-compose:**
   ```bash
   docker-compose up -d
   ```

## Step 6: Configure Custom Domain (Optional)

### For Netlify:
1. Go to Site settings → Domain management
2. Add your custom domain
3. Update DNS records as instructed

### For Vercel:
1. Go to Project settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## Step 7: Set Up Continuous Deployment

### Automatic Deployments:
- **Netlify/Vercel:** Automatic on every push to main branch
- **GitHub Pages:** Automatic with the workflow file provided above
- **Manual:** Push changes and redeploy manually

## Step 8: Environment Variables (if needed)

Create environment-specific configurations:

1. **Create `.env.production`:**
   ```env
   NODE_ENV=production
   PORT=4000
   API_URL=https://your-api-domain.com
   ```

2. **Update your build process** to use these variables

## Step 9: Monitoring and Maintenance

### Set up monitoring:
1. **Uptime monitoring:** UptimeRobot, Pingdom
2. **Error tracking:** Sentry, LogRocket
3. **Analytics:** Google Analytics, Mixpanel

### Regular maintenance:
1. **Keep dependencies updated:**
   ```bash
   npm audit
   npm update
   ```

2. **Monitor performance:**
   - Use Lighthouse for performance audits
   - Monitor Core Web Vitals

## Troubleshooting

### Common Issues:

1. **Build fails:**
   - Check Node.js version (needs 18+)
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`

2. **404 errors on refresh:**
   - Configure server to serve index.html for all routes
   - Use Angular's HashLocationStrategy if needed

3. **CORS issues:**
   - Configure your server to handle CORS properly
   - Update API endpoints to allow your domain

4. **Performance issues:**
   - Enable production optimizations
   - Use lazy loading for routes
   - Optimize images and assets

## Security Considerations

1. **Enable HTTPS** (most platforms do this automatically)
2. **Set up proper CORS policies**
3. **Use environment variables** for sensitive data
4. **Regular security updates** for dependencies
5. **Implement proper authentication** if needed

## Cost Estimation

- **Netlify:** Free tier (100GB bandwidth, 300 build minutes)
- **Vercel:** Free tier (100GB bandwidth, 100GB-hours)
- **GitHub Pages:** Free
- **VPS:** $5-20/month depending on provider
- **Domain:** $10-15/year

## Next Steps After Deployment

1. **Test all functionality** on the live site
2. **Set up Google Analytics** for tracking
3. **Configure SEO** meta tags
4. **Set up backup strategy**
5. **Document any custom configurations**
6. **Train team members** on deployment process

## Support

If you encounter issues during deployment:

1. Check the platform's documentation
2. Review error logs in your hosting platform
3. Test locally first: `npm run build && npm run serve:ssr:blog-app`
4. Check browser console for client-side errors
5. Verify all environment variables are set correctly

Remember to replace placeholder URLs and usernames with your actual values throughout this process.
