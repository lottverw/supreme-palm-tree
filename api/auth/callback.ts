import type { VercelRequest, VercelResponse } from '@vercel/node'
import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
const CLIENT_ID = process.env.GITHUB_CLIENT_ID
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { code } = request.query

  // Debug log to check environment variables
  console.log('Environment check:', {
    hasClientId: !!CLIENT_ID,
    hasClientSecret: !!CLIENT_SECRET,
    actualClientId: CLIENT_ID,  // Be careful with logging secrets in production
    actualClientSecret: CLIENT_SECRET?.slice(0, 4) + '...'  // Only log first 4 chars
  })

  if (!code) {
    return response.status(400).json({ error: 'Code parameter is required' })
  }

  try {
    const tokenResponse = await fetch(`https://github.com/login/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code
      }),
    })

    const data = await tokenResponse.json()

    console.log("data", data)
    if (data.error) {
      console.log(data.error);
      return response.redirect(`/auth?error=${data.error_description || 'Authentication failed'}`)

    }

    return response.redirect(`http://localhost:5173/auth?token=${data.access_token}`)
  } catch (error) {
    console.error('Auth error:', error)
    return response.redirect('/auth?error=Authentication failed')
  }
}
