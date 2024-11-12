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

  if (!code) {
    return response.status(400).json({ error: 'Code parameter is required' })
  }

  console.log('BULLE');
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

    if (data.error) {
      console.log(data.error);
      return response.redirect(`/auth?error=${data.error_description || 'Authentication failed'}`)

    }

    return response.redirect(`${process.env.DOMAIN}/auth?token=${data.access_token}`)
  } catch (error) {
    console.error('Auth error:', error)
    return response.redirect(`${process.env.DOMAIN}/auth?error=Authentication failed`)
  }
}
