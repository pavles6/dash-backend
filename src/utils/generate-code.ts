export const generateCode = () => {
  const range = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
  const length = 6

  let result = ''

  for (var i = 0; i < length; i++) {
    const x = Math.floor(Math.random() * range.length)
    result += range[x]
  }

  return result
}
