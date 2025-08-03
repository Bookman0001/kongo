import { z } from 'zod'

export const validationSchema = z.object({
  latitude: z
    .number()
    .describe('It should be addressed based on the location from user input.'),
  longitude: z
    .number()
    .describe('It should be addressed based on the location from user input.'),
})
