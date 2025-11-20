# Google Workspace Email Setup Guide

This guide will help you configure your contact form to use Google Workspace (formerly G Suite) email via SMTP.

## Prerequisites

- A Google Workspace account with admin access
- The email address you want to use (e.g., `info@masteryourface.cz`)

## Step-by-Step Setup

### Step 1: Enable 2-Step Verification

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Sign in with your Google Workspace admin account
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the prompts to enable 2-Step Verification
   - You'll need to verify your phone number
   - You may need to enter a verification code sent to your phone

### Step 2: Generate an App Password

1. After enabling 2-Step Verification, go back to [Google Account Security](https://myaccount.google.com/security)
2. Scroll down to "2-Step Verification" section
3. Click on **App passwords** (you may need to search for it)
4. If you don't see "App passwords":
   - Make sure 2-Step Verification is enabled
   - You may need to sign in again
5. Click **Select app** and choose **Mail**
6. Click **Select device** and choose **Other (Custom name)**
7. Enter a name like: `Master Your Face Contact Form`
8. Click **Generate**
9. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)
   - ⚠️ **Important**: You won't be able to see this password again, so copy it now!
   - Remove the spaces when using it (e.g., `abcdefghijklmnop`)

### Step 3: Configure Vercel Environment Variables

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

#### Required Variables:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `SMTP_HOST` | `smtp.gmail.com` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` | `587` |
| `SMTP_USER` | Your Google Workspace email | `info@masteryourface.cz` |
| `SMTP_PASSWORD` | Your 16-character app password | `abcdefghijklmnop` |
| `CONTACT_EMAIL` | Where to receive form submissions | `info@masteryourface.cz` |

#### Optional Variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `SMTP_SECURE` | `false` | Set to `true` if using port 465 (not recommended) |

### Step 4: Deploy to Vercel

1. Push your code to GitHub (if not already done)
2. Vercel will automatically detect the `api/` folder and deploy the serverless function
3. After deployment, go to **Settings** → **Environment Variables** and make sure your variables are set
4. If you added variables after deployment, you may need to **Redeploy** your project

### Step 5: Test the Contact Form

1. Go to your deployed website
2. Fill out the contact form
3. Submit it
4. Check your email inbox (and spam folder) for the form submission

## Troubleshooting

### "Email service not configured" Error

- **Check**: All environment variables are set in Vercel
- **Solution**: Make sure `SMTP_USER` and `SMTP_PASSWORD` are both set
- **Note**: After adding environment variables, you may need to redeploy

### "Invalid login" or Authentication Failed

- **Check**: Your app password is correct (no spaces, all 16 characters)
- **Check**: 2-Step Verification is enabled on your Google account
- **Check**: You're using the correct email address in `SMTP_USER`
- **Solution**: Generate a new app password and update `SMTP_PASSWORD`

### Emails Not Arriving

- **Check**: Spam/junk folder
- **Check**: `CONTACT_EMAIL` is set correctly
- **Check**: Vercel function logs (Dashboard → Your Project → Functions → View Logs)
- **Solution**: Check the Vercel function logs for error messages

### "Less secure app access" Error

- **Note**: Google Workspace doesn't use "less secure apps" anymore
- **Solution**: You MUST use App Passwords (not your regular password)
- **Solution**: Make sure 2-Step Verification is enabled

### Port 587 Not Working

- **Alternative**: Try port `465` with `secure: true`
- **Update**: Set `SMTP_PORT` to `465` in Vercel
- **Note**: Port 587 is recommended and should work with the current setup

## Multiple Recipients

To send emails to multiple recipients, you can modify the `api/contact.ts` file:

```typescript
// In api/contact.ts, change:
to: recipientEmail,

// To:
to: ['info@masteryourface.cz', 'another@email.com'],
```

Or set `CONTACT_EMAIL` to a comma-separated list (though this may require code changes).

## Security Best Practices

1. ✅ **Never commit** your app password to Git
2. ✅ **Use environment variables** for all sensitive data
3. ✅ **Rotate app passwords** periodically (every 6-12 months)
4. ✅ **Use a dedicated email** for form submissions (not your personal email)
5. ✅ **Monitor** your Google Workspace account for unusual activity

## Google Workspace Admin Settings

If you're the Google Workspace admin and need to enable app passwords for your organization:

1. Go to [Admin Console](https://admin.google.com)
2. Navigate to **Security** → **Access and data control** → **API controls**
3. Ensure "Less secure app access" is not blocking app passwords
4. Users can then generate their own app passwords

## Alternative: OAuth2 (Advanced)

For production environments with high volume, consider using OAuth2 instead of app passwords. This requires more setup but is more secure. Contact your developer if you need this setup.

## Support

If you continue to have issues:
1. Check Vercel function logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test with a simple email client (like Thunderbird) using the same SMTP settings
4. Contact Google Workspace support if authentication issues persist

---

**Quick Reference:**

- **SMTP Host**: `smtp.gmail.com`
- **SMTP Port**: `587` (recommended) or `465`
- **Security**: TLS (port 587) or SSL (port 465)
- **Authentication**: Required (use App Password, not regular password)

