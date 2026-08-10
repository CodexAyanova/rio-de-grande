# WhatsApp AI Concierge — Setup Guide

The bot code is done (`client/api/whatsapp.js`) and deploys automatically with the rest of the
site on Vercel. What's left is account setup on Meta's and Anthropic's side — steps only you
can do, since they involve creating accounts and entering billing details.

## What you're setting up

- A **Meta Business** + **Meta for Developers** account (free)
- A **WhatsApp Business Platform** app with a new, dedicated phone number
- An **Anthropic Console** account for the Claude API (separate from your Claude Pro subscription)
- Three environment variables in your **Vercel** project

## Step 1 — Get a phone number for the bot

Use a number that is **not** currently active in the regular WhatsApp consumer app — a new SIM
or a number you can dedicate to this. This will become the bot's WhatsApp number, separate
from your existing +91 91589 11851 guest-contact line.

## Step 2 — Create the Meta app

1. Go to [developers.facebook.com](https://developers.facebook.com) and log in / create an account.
2. Click **My Apps → Create App**. Choose **Business** as the app type.
3. Once created, in the app dashboard, find **WhatsApp** under "Add products to your app" and set it up.
4. Meta will walk you through creating a **WhatsApp Business Account** if you don't have one, and
   registering your dedicated phone number (Step 1) to it — you'll verify it by SMS/call.

## Step 3 — Get your credentials

In the app's **WhatsApp → API Setup** page, you'll find:

- **Temporary access token** (valid ~24h, for testing) — for production, generate a
  **permanent token** instead: go to **Business Settings → System Users**, create a system user,
  assign it to the app with `whatsapp_business_messaging` permission, and generate a token there.
- **Phone number ID** — shown on the same API Setup page, a numeric ID (not the phone number itself).

Keep both of these somewhere safe for Step 5 — don't paste them into chat with me, just note them down.

## Step 4 — Get a Claude API key

1. Go to [console.anthropic.com](https://console.anthropic.com) and create an account (separate
   from claude.ai / Claude Pro).
2. Add billing (a card, or prepaid credits).
3. Go to **API Keys → Create Key**, copy it.

## Step 5 — Add environment variables in Vercel

Go to your project at [vercel.com/ayan-khan2/rio-de-grande/settings/environment-variables](https://vercel.com/ayan-khan2/rio-de-grande/settings/environment-variables)
and add:

| Name | Value |
|---|---|
| `WHATSAPP_ACCESS_TOKEN` | the permanent token from Step 3 |
| `WHATSAPP_PHONE_NUMBER_ID` | the phone number ID from Step 3 |
| `WHATSAPP_VERIFY_TOKEN` | any random string you make up yourself, e.g. `rio-de-grande-9f8x2` — you'll reuse this in Step 6 |
| `ANTHROPIC_API_KEY` | the key from Step 4 |

After adding them, **redeploy** the project (Vercel → Deployments → ⋯ → Redeploy) so the
function picks up the new variables.

## Step 6 — Point Meta's webhook at your bot

1. Back in the Meta app, go to **WhatsApp → Configuration**.
2. Set **Callback URL** to: `https://<your-vercel-domain>/api/whatsapp`
   (use your actual deployed domain, e.g. `https://rio-de-grande.vercel.app/api/whatsapp`,
   or your custom domain once that's live)
3. Set **Verify Token** to the exact same string you used for `WHATSAPP_VERIFY_TOKEN` in Step 5.
4. Click **Verify and Save** — Meta will send a GET request to confirm; if it fails, double-check
   the verify token matches exactly and that the deployment picked up the env var.
5. Under **Webhook fields**, subscribe to **messages**.

## Step 7 — Test it

WhatsApp yourself a message from a different phone to the bot's number. The bot should reply
within a few seconds. Check **Vercel → your project → Logs** if something doesn't work — errors
from both the WhatsApp send call and the Claude API call are logged there.

## Notes

- The bot has no memory between messages — each message is answered independently. Fine for
  simple FAQs; if you want it to hold a conversation across multiple messages later, that needs
  a small storage layer (e.g. Vercel KV) added on top.
- It never invents room prices or availability — it always points guests to the MakeMyTrip
  listing or to your phone number for anything it can't answer confidently.
- Meta gives 1,000 free service conversations/month right now, but starts charging for these
  from **October 1, 2026** — see the cost breakdown discussed earlier in this project for rough numbers.
