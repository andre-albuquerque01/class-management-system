import { jwtVerify } from 'jose'

export default async function verifyToken(token: string): Promise<boolean> {
  if (!token) return false
  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(
        'a54GZV1p3vD8RJsyiHF1K09QASPq8v67iG4Uh2xjzmNRwWENtewk9N7wT2YZWSuc',
      ),
      { algorithms: ['HS256'] },
    )
    return true
  } catch (error) {
    return false
  }
}
