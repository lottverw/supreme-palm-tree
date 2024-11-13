// eslint-disable-next-line @typescript-eslint/no-require-imports
const dotenv = require('dotenv')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fetch = require('node-fetch');


dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
const CLIENT_ID = process.env.GITHUB_CLIENT_ID
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

module.exports = async function handler(request, response) {
  const { code } = request.query
  console.log('het werkt')
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
      console.log(data.error)
      return response.redirect(`/auth?error=${data.error_description || 'Authentication failed'}`)
    }

    return response.redirect(`/auth?token=${data.access_token}`)
  } catch (error) {
    console.error('Auth error:', error)
    return response.redirect(`${process.env.DOMAIN}/auth?error=Authentication failed`)
  }
}
