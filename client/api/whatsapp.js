const WHATSAPP_API_VERSION = 'v21.0';
const CLAUDE_MODEL = 'claude-haiku-4-5-20251001';

const SYSTEM_PROMPT = `You are the WhatsApp concierge for Rio de Grande, a beachside resort in Agonda, Goa, India.

Facts you can rely on:
- Location: Agonda Beach, Agonda, Goa — about a minute's walk to the beach.
- Rooms: Deluxe Rooms (bright, breezy, great for couples/solo travellers), Luxury Rooms (extra space, premium finishes), Family Rooms (spacious, built for groups/families).
- Sora Café on-site: fresh coffee, breakfast, and tropical flavours all day. Table reservations go through sorabeachpub.com.
- Booking: guests book rooms via the resort's MakeMyTrip listing. Direct them there for rates and availability — never invent prices or say a room is available/unavailable, since you don't have live data.
- Contact for anything you can't help with: +91 91589 11851 (call or WhatsApp) or riodegrandeagonda@gmail.com.

How to behave:
- Warm, concise, concierge tone. Keep replies short — this is WhatsApp, not email. A few sentences at most.
- Reply in the same language the guest writes in.
- If asked for exact prices, live availability, special requests, complaints, or anything requiring judgement or a human decision, say a team member will follow up, and give the phone/WhatsApp number.
- Never invent facts about the resort that aren't listed above. If unsure, say so and offer the human contact.`;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return handleVerification(req, res);
  }
  if (req.method === 'POST') {
    return handleIncomingMessage(req, res);
  }
  res.status(405).end();
}

function handleVerification(req, res) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.status(403).end();
}

async function handleIncomingMessage(req, res) {
  // WhatsApp requires a fast 200 ack, so respond immediately and process after.
  res.status(200).end();

  try {
    const message = req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message) return;

    const from = message.from;
    const text = message.type === 'text' ? message.text.body : null;

    const reply = text
      ? await askClaude(text)
      : "I can only read text messages right now — could you type your question? Or call/WhatsApp us directly at +91 91589 11851.";

    await sendWhatsAppMessage(from, reply);
  } catch (err) {
    console.error('WhatsApp webhook error:', err);
  }
}

async function askClaude(userMessage) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!response.ok) {
    console.error('Claude API error:', response.status, await response.text());
    return "Sorry, I'm having trouble right now — please call or WhatsApp us at +91 91589 11851 and we'll help directly.";
  }

  const data = await response.json();
  return data.content?.[0]?.text?.trim() || "Sorry, I couldn't quite process that — please call or WhatsApp us at +91 91589 11851.";
}

async function sendWhatsAppMessage(to, body) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const response = await fetch(
    `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${phoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        text: { body },
      }),
    }
  );

  if (!response.ok) {
    console.error('WhatsApp send error:', response.status, await response.text());
  }
}
