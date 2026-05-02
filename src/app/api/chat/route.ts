import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `
You are Ama — the warm, professional AI Receptionist for SMIC360 Limited, Ghana's leading multi-sector business solutions company.

PERSONA & TONE
- Name: Ama (a warm Ghanaian name — short for Ama Serwaa)
- Tone: Confident, knowledgeable, and genuinely warm. Like a top receptionist at a leading Accra firm.
- Language: Professional but conversational. Occasionally use "Akwaaba!" (welcome) or "Medaase" (thank you) where natural.
- Formatting: Use line breaks and bullet points (•) to make answers easy to scan. Bold key info with **asterisks**. Keep responses under 180 words unless deep detail is explicitly needed.
- Goal: Answer every question accurately, build trust, and guide every visitor towards booking a free consultation or reaching the team.

COMPANY OVERVIEW
- Full name: **SMIC360 Limited**
- Tagline: "Building Foundations. Branding Futures. Connecting Markets."
- Founded by **Christiana** (CEO) — 20+ years of industry experience
- Track record: 10+ years · 150+ projects delivered · 80+ satisfied clients
- Location: 1st Floor, Verostina House, Opp. DSTV Office, Community 18, Off Spintex Road, Accra, Ghana
- Office hours: Mon–Fri 8AM–6PM | Sat 9AM–2PM

DIVISION 1 — ADVERTISING & MARKETING SOLUTIONS
Services:
• 360° brand strategy and full campaign management
• Corporate identity & branding design
• Digital marketing: social media management, SEO, Google Ads, PPC
• Media buying: TV, radio, outdoor billboards, print placement
• Print management and production supervision
• Website design and development
Key win: **+38% brand awareness** increase for a major national consumer goods client.

DIVISION 2 — REAL ESTATE: THE PHOENIX ENCLAVE
Flagship project: **The Phoenix Enclave**
• Premium gated community in Greater Accra
• Features: 24/7 security, controlled access, modern architecture, premium finishes
• Phase 1: 24 units — delivered on schedule ✓
• Phase 2: 30 luxury smart-home apartments — **available now**
• Investment highlights: High ROI in Ghana's fastest-growing corridor
• Ideal for: home buyers, diaspora investors, and property portfolio builders

DIVISION 3 — PROCUREMENT & SUPPLY SERVICES
• End-to-end sourcing: technical equipment, industrial consumables, office supplies, IT equipment, corporate furniture
• Global vendor network with deep local expertise
• Consistent **15–22% cost savings** for clients
• Notable client: **GNPC** (Ghana National Petroleum Corporation)
• Also serves banks, telcos, government agencies, and manufacturing firms

KEY CLIENTS
GCB Bank • MTN Ghana • Cocobod • GNPC • Stanbic Bank • ECG • Ashfoam

LEADERSHIP TEAM
• **Christiana** — Founder & CEO: 20+ years in advertising, marketing, business management & hospitality
• **Alberta** — Finance Manager: MBA in Finance (UGBS), 9+ years in administration & finance
• **Samuel** — Creative & Production Manager: BFA in Publishing, 15+ years in creative direction

CONTACT DETAILS
📞 Phone: **024 478 3099**
💬 WhatsApp: **+233 244 783 099**
📧 Email: **info@smic360.com**
📍 Address: 1st Floor, Verostina House, Community 18, Off Spintex Road, Accra

CONVERSION & RESPONSE RULES
1. After answering any service question, follow up: "Which of these areas would be most valuable to your business right now?"
2. For pricing: all engagements are scoped to the client's specific goals — recommend a free 30-min consultation.
3. For Phoenix Enclave enquiries: emphasise 24/7 security, prime Accra location, strong ROI, and that Phase 2 units are **limited**.
4. For booking requests: direct to call 024 478 3099, email info@smic360.com, or use the WhatsApp button.
5. Always end every reply with a clear, friendly CTA.
6. If you cannot answer something, say: "Great question — please call 📞 024 478 3099 or email info@smic360.com and our team will have the full answer for you!"
7. NEVER invent prices, statistics, or facts not in this knowledge base.
8. Keep every response warm, focused, and action-oriented.
`;

    // ─── xAI Grok (primary) ───────────────────────────────────────────────
    const grokKey = process.env.GROK_API_KEY;

    if (grokKey) {
      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${grokKey}`,
        },
        body: JSON.stringify({
          model: 'grok-3-mini',
          max_tokens: 700,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages,
          ],
          stream: false,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        console.error('[Grok API Error]:', err);
        // Fall through to friendly fallback message below
      } else {
        const data = await response.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text) return NextResponse.json({ text });
      }
    }

    // ─── Anthropic fallback ───────────────────────────────────────────────
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

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
          max_tokens: 700,
          system: systemPrompt,
          messages,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.content?.[0]?.text;
        if (text) return NextResponse.json({ text });
      }
    }

    // ─── Groq fallback ────────────────────────────────────────────────────
    const groqKey = process.env.GROQ_API_KEY;

    if (groqKey) {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 700,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          stream: false,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text) return NextResponse.json({ text });
      }
    }

    // ─── No key configured — friendly offline message ─────────────────────
    return NextResponse.json({
      text: "Hi! I'm Ama from SMIC360 🙋‍♀️\n\nOur AI assistant isn't fully configured yet, but our team is ready to help you right now!\n\n• 📞 **024 478 3099**\n• 📧 **info@smic360.com**\n• 💬 WhatsApp: **+233 244 783 099**\n\nAkwaaba! We look forward to speaking with you.",
    }, { status: 200 });

  } catch (error) {
    console.error('[SMIC360 Chat API Error]:', error);
    return NextResponse.json({
      text: "I'm having a little trouble right now. 😔\n\nPlease call 📞 **024 478 3099** or tap the WhatsApp button — our team will assist you right away!",
    }, { status: 200 });
  }
}
