import { readdir } from 'mz/fs'

const nameRegex = /^(.*)\.md/
const titleRegex = /h1.+?>(.*?)</m

export default async () => {
  const files = await readdir('assets/contents')
  const pages = await Promise.all(
    files.map(async (file) => {
      const name = file.match(nameRegex)[1]
      const contents = await import(`~/assets/contents/${file}`)
      const title = contents.default.match(titleRegex)[1]
      return { name, title }
    })
  )
  return pages
}
