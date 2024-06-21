export default function ApiAction(path: string, init?: RequestInit) {
  const baseUrl = 'http://127.0.0.1:8000'
  const apiPrefix = '/api/v1/'
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}
