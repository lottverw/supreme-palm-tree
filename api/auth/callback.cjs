// eslint-disable-next-line @typescript-eslint/no-require-imports
const dotenv = require('dotenv')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path')

//const fetch = require('node-fetch')

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
const CLIENT_ID = process.env.GITHUB_CLIENT_ID
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const BASE_URL = process.env.BASE_URL;
module.exports = async function handler(request, response) {
  const { code } = request.query

  if (!code) {
    return response.status(400).json({ error: 'Code parameter is required' })
  }

  try {
    const tokenResponse = await fetch(`https://github.com/login/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
      }),
    })

    const data = await tokenResponse.json()

    if (data.error) {
      return response.redirect(`/auth?error=${data.error_description || 'Authentication failed'}`)
    }

    return response.redirect(`${BASE_URL}?token=${data.access_token}`)
  } catch (error) {
    return response.redirect(`/auth?error=Authentication failed`)
  }
}
