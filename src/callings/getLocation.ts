import { convertToCoreMessages, generateObject } from 'ai'
import z from 'zod'

import { openaiModel } from '../models/gpt.js'

const validationSchema = z.object({
  latitude: z
    .number()
    .describe('It should be addressed based on the location from user input. '),
  longitude: z
    .number()
    .describe('It should be addressed based on the location from user input.'),
})

export const getLocation = async ({ userMessage }: { userMessage: string }) => {
  try {
    const result = await generateObject({
      model: openaiModel,
      messages: convertToCoreMessages([
        { role: 'assistant', content: userMessage },
      ]),
      system:
        'it should be used to get latest weather information. Latitude and longitude should be suggested.',
      maxRetries: 3,
      schema: validationSchema,
    })
    return result
  } catch (e) {
    console.error(e)
  }
}
