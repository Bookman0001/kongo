import { generateObject } from 'ai'

import { openaiModel } from '../../models/gpt.js'
import { validationSchema } from './schema.js'

export const getLocation = async ({ userMessage }: { userMessage: string }) => {
  try {
    const result = await generateObject({
      model: openaiModel,
      messages: [{ role: 'assistant', content: userMessage }],
      system:
        'it should be used to get latest weather information. The latitude and longitude should be suggested.',
      schema: validationSchema,
      maxRetries: 3,
    })
    return { status: 'ok' as const, locationInfo: result?.object }
  } catch (error) {
    console.error(error)
    return { status: 'error' as const, errorMessage: 'system error occured.' }
  }
}
