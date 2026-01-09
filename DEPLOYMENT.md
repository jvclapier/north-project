# Deployment Guide - North Project

## Deploying to Vercel

### Prerequisites
- Vercel account (sign up at https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)

### Step 1: Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: North Project website"
```

### Step 2: Push to GitHub/GitLab/Bitbucket

```bash
# Create a new repository on GitHub/GitLab/Bitbucket
# Then connect it:

git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

**Option A: Via Vercel Dashboard (Recommended)**
1. Go to https://vercel.com/new
2. Import your Git repository
3. Vercel will auto-detect Next.js settings
4. Click "Deploy"

**Option B: Via Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# For production
vercel --prod
```

### Step 4: Connect Custom Domain

1. In Vercel Dashboard, go to your project → Settings → Domains
2. Add your domain (e.g., `northproject.com`)
3. Follow Vercel's DNS configuration instructions:
   - Add an A record pointing to Vercel's IP
   - Or add a CNAME record pointing to `cname.vercel-dns.com`
4. Vercel will automatically provision SSL certificate

### Environment Variables

No environment variables needed for this project currently.

### Build Settings

Vercel will auto-detect:
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### Post-Deployment Checklist

- [ ] Test the homepage at `/`
- [ ] Test the waiver page at `/group-ride-waiver`
- [ ] Test the studio page at `/studio`
- [ ] Verify images are loading correctly
- [ ] Check mobile responsiveness
- [ ] Verify domain is connected and SSL is active

### Troubleshooting

**Build fails:**
- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (Vercel uses Node 18+ by default)

**Images not loading:**
- Verify images are in the `public/` directory
- Check image paths are correct (should start with `/`)

**Domain not connecting:**
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Verify domain is verified in Vercel dashboard

