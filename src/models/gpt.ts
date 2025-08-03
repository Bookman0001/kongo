import 'dotenv/config'
import { createOpenAI } from '@ai-sdk/openai'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const openaiModel = openai('gpt-4o')
