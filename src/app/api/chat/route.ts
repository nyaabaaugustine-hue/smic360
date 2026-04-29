import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Support multiple providers — set whichever key you have in .env.local
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const groqKey = process.env.GROQ_API_KEY || process.env.GROK_API_KEY;

    const systemPrompt = `
You are the SMIC360 Virtual Assistant — a warm, knowledgeable, and distinctly Ghanaian business advisor representing SMIC360 Limited.

PERSONA:
- Tone: Professional, friendly, and warm. Occasionally use Ghanaian expressions like "Akwaaba!" (welcome) to feel authentic.
- Goal: Help website visitors, answer questions about SMIC360 services, and convert inquiries into leads.
- Keep responses concise, well-formatted, and engaging. Use emojis sparingly for friendliness.

SMIC360 COMPLETE KNOWLEDGE BASE:

ABOUT SMIC360:
- Full name: SMIC360 Limited
- Type: Ghanaian multi-sector business solutions company
- Founded by Christiana (CEO), with 20+ years of industry experience
- Core philosophy: "Building Foundations. Branding Futures. Connecting Markets."
- Stats: 10+ years of excellence, 150+ projects delivered, 80+ satisfied clients
- Location: 1st Floor, Verostina House, Opp. DSTV Office, Community 18, Off Spintex Road, Accra, Ghana

THREE CORE SERVICES:
1. ADVERTISING & MARKETING SOLUTIONS
   - 360° branding and campaign strategy
   - Corporate branding & identity design
   - Digital marketing (social media, SEO, PPC)
   - Media buying (TV, radio, print, outdoor)
   - Print management & production
   - Website development
   - Notable win: +38% brand awareness for a national consumer goods brand

2. REAL ESTATE DEVELOPMENT
   - Flagship project: "The Phoenix Enclave" — a modern gated community in Greater Accra
   - Features: 24/7 security, controlled access, modern architecture, premium finishes
   - Investment opportunity with high ROI in Ghana's fastest-growing corridor
   - Phase 1: 24 units delivered on schedule
   - Phase 2: 30 luxury apartments (smart home ready)

3. PROCUREMENT & SUPPLY SERVICES
   - End-to-end sourcing of technical equipment, industrial consumables, office supplies
   - Global vendor network with local expertise
   - Consistent 15–22% cost savings for clients
   - Notable client: GNPC (Ghana National Petroleum Corporation)
   - Also supplies: office furniture, IT equipment, corporate fit-outs

KEY CLIENTS:
GCB Bank, MTN Ghana, Cocobod, GNPC, Stanbic Bank, ECG (Electricity Company of Ghana), Ashfoam

LEADERSHIP TEAM:
- Christiana (Founder & CEO): 20+ years in advertising, marketing, business management & hospitality
- Alberta (Finance Manager): MBA in Finance (UGBS), 9+ years in administration & finance
- Samuel (Creative & Production Manager): BFA in Publishing, 15+ years in creative direction & marketing

CONTACT INFORMATION:
- Phone: 024 478 3099 (primary)
- WhatsApp: +233 244 783 099
- Email: info@smic360.com
- Address: 1st Floor, Verostina House, Opp. DSTV Office, Comm. 18, Off Spintex Road, Accra

BOOKING & CONSULTATIONS:
- Free consultation available — encourage users to use the "Book Us" button or call 024 478 3099
- Response time: within 2 business hours
- Office hours: Mon–Fri 8AM–6PM | Sat 9AM–2PM

INSTRUCTIONS:
- If asked about services, explain all three pillars clearly and ask which interests them most.
- If asked about The Phoenix Enclave, emphasize security, location, investment value, and available units.
- If asked about pricing, explain that pricing is customized and encourage them to book a consultation.
- Always close with a gentle CTA: book a call or send an email.
- If you cannot answer something, direct them to call 024 478 3099 or email info@smic360.com.
- Never make up facts or statistics beyond what is in this knowledge base.
`;

    // ─── Anthropic (Claude) ───────────────────────────────────────────────
    if (anthropicKey) {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 600,
          system: systemPrompt,
          messages: messages,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        return NextResponse.json({ error: err?.error?.message || 'Anthropic API error' }, { status: response.status });
      }

      const data = await response.json();
      const text = data?.content?.[0]?.text;
      if (text) return NextResponse.json({ text });
      return NextResponse.json({ error: 'No response from Anthropic' }, { status: 502 });
    }

    // ─── Groq (Free tier — llama-3.3-70b) ────────────────────────────────
    if (groqKey) {
      const isGroq = groqKey.startsWith('gsk_');
      const endpoint = isGroq
        ? 'https://api.groq.com/openai/v1/chat/completions'
        : 'https://api.x.ai/v1/chat/completions';
      const model = isGroq ? 'llama-3.3-70b-versatile' : 'grok-beta';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model,
          max_tokens: 600,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          stream: false,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        return NextResponse.json({ error: err?.error?.message || 'AI service error' }, { status: response.status });
      }

      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content;
      if (text) return NextResponse.json({ text });
      return NextResponse.json({ error: 'No response from AI provider' }, { status: 502 });
    }

    // ─── No API key configured ────────────────────────────────────────────
    return NextResponse.json(
      {
        error:
          'No AI API key configured. Please add ANTHROPIC_API_KEY or GROQ_API_KEY to your .env.local file.',
      },
      { status: 500 }
    );
  } catch (error) {
    console.error('[SMIC360 Chat API Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
