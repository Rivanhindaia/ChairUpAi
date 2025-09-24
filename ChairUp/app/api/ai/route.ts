import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const q = String(form.get('q') || 'Help me book a haircut tomorrow at 3pm near El Cajon.')
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: "You are ChairUp's AI booking assistant. Be concise and helpful." },
        { role: 'user', content: q }
      ]
    })
    const answer = completion.choices[0]?.message?.content ?? 'Sorry, no answer.'
    return NextResponse.json({ ok: true, answer })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
