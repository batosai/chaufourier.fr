export const getFramentHTML = async ({ url, target }) => {
  const response = await fetch(url)
  const html = await response.text()
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const elmt = doc.querySelector(target)
  return elmt.outerHTML
}
