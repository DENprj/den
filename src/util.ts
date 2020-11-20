const regex = /[^*].(yaml|yml)/;
export const isYamlFile = (p?: string): boolean => {
  if (p === undefined) {
    return false
  }
  const result = p.match(regex)
  if (result === null) {
    return false
  }
  return true
}
