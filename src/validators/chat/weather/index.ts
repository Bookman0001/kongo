import z from 'zod'
import type { Context } from 'hono'

const validationSchema = z.object({
  message: z.string().min(1, 'at least one character'),
})

export const validateSchema = ({
  value,
  c,
}: {
  value: unknown
  c: Context
}) => {
  const validation = validationSchema.safeParse(value)
  if (!validation.success) {
    return c.text(validation.error.message, 400)
  }
  return {
    userMessage: validation.data.message,
  }
}
