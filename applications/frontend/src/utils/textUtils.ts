export const highlightSearch = (text: string, searchQuery: string) => {
  if (!searchQuery) return text
  const regex = new RegExp(`(${searchQuery})`, 'gi')
  return text.replace(
    regex,
    '<span style="background-color: yellow;">$1</span>'
  )
}
