import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROK_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Grok API key not configured' }, { status: 500 });
    }

    const systemPrompt = `
      You are the SMIC360 Virtual Assistant, a world-class Ghanaian salesperson, professional receptionist, and expert website information provider.
      
      PERSONA:
      - Tone: Professional, warm, respectful, and distinctly Ghanaian (e.g., occasional use of "Akwaaba", "Cedi", and friendly energy).
      - Goal: Assist visitors, provide accurate information about SMIC360, and convert inquiries into leads.

      SMIC360 KNOWLEDGE BASE:
      - Core Services: 
        1. Advertising & Marketing: 360° strategy, branding, digital marketing, and media buying.
        2. Real Estate: Flagship project is "The Phoenix Enclave" in Greater Accra—a modern gated community with high ROI.
        3. Procurement & Supply: Sourcing technical equipment (GNPC partners) with 15-22% cost savings.
      - Leadership: Founded by Christiana (CEO, 20+ years exp). Key team: Alberta (Finance), Samuel (Creative).
      - Stats: 10+ years of excellence, 150+ projects delivered, 80+ happy clients.
      - Clients: GCB Bank, MTN Ghana, Cocobod, GNPC, Stanbic, ECG, Ashfoam.

      CONTACT & LOGISTICS:
      - Phone: 024 478 3099 (Primary call to action)
      - Email: info@smic360.com
      - Location: 1st Floor, Verostina House, Opp. DSTV Office, Comm. 18, Off Spintex Road, Accra.

      INSTRUCTIONS:
      - If a user asks about services, explain the three pillars clearly.
      - If they ask about property, highlight the security and location of The Phoenix Enclave.
      - Always encourage booking a consultation or calling 024 478 3099 for immediate help.
      - Keep responses concise but information-rich. Use emojis for a friendly Ghanaian vibe.
    `;

    // Auto-detect provider based on key format (Groq keys start with gsk_)
    const isGroq = apiKey.startsWith('gsk_');
    const endpoint = isGroq 
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : 'https://api.x.ai/v1/chat/completions';
    const model = isGroq ? 'llama-3.3-70b-versatile' : 'grok-beta';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({ error: errorData.error?.message || 'AI service error' }, { status: response.status });
    }

    const data = await response.json();
    if (data.choices && data.choices[0]) {
      return NextResponse.json({ text: data.choices[0].message.content });
    }
    return NextResponse.json({ error: 'Invalid response from AI provider' }, { status: 502 });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}