import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { validator } from 'hono/validator'

import { validateSchema } from './validators/index.js'
import { getLocation } from './callings/getLocation.js'

const app = new Hono({ strict: true })

app.use(
  '*',
  cors({
    origin: ['http://localhost:3000'],
    allowHeaders: ['Content-Type'],
    allowMethods: ['POST', 'OPTIONS'],
    credentials: true,
    maxAge: 300,
  })
)

app.post(
  '/api/chat/weather',
  validator('json', (value, c) => {
    return validateSchema({ value, c })
  }),
  async (c) => {
    const { userMessage } = c.req.valid('json')
    const location = await getLocation({ userMessage })
    if (location?.object) {
      const { latitude, longitude } = location.object
      console.log(latitude, longitude)
      // TO DO: create the fetching function for weather
      return c.text('fetched', 200)
    }
    return c.text('LLM failed to create location info', 500)
  }
)

app.notFound((c) => {
  return c.text('Not found API endpoint', 404)
})

app.onError((err, c) => {
  console.error(err)
  return c.text('Oops! internal error occured!', 500)
})

serve({
  fetch: app.fetch,
  port: 8080,
})
