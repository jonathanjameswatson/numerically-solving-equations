import { readdir } from 'mz/fs'

const nameRegex = /^(.*)\.md/

export default async () => {
  const files = await readdir('assets/contents')
  const pages = files.map((file) => file.match(nameRegex)[1])
  return pages
}
