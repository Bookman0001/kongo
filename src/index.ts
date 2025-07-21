import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { validator } from 'hono/validator'
import { serve } from '@hono/node-server'

import { validateSchema } from './validators/chat/weather/index.js'
import { getLocation } from './callings/location/getLocation.js'

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
    const result = await getLocation({ userMessage })
    if (result.status === 'error') {
      return c.text(result.errorMessage, 500)
    }
    const { latitude, longitude } = result.locationInfo
    // TO DO: create the fetching function for weather
    console.log(latitude, longitude)
    return c.text('fetched', 200)
  }
)

app.notFound((c) => {
  return c.text('Not found API endpoint', 404)
})

app.onError((err, c) => {
  return c.text('Oops! internal error occured!', 500)
})

serve({
  fetch: app.fetch,
  port: 8080,
})
