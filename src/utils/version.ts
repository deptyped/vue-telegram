function compareVersions(version1: string, version2: string) {
  const parts1 = (version1 || '').trim().split('.').map(Number)
  const parts2 = (version2 || '').trim().split('.').map(Number)
  const maxLength = Math.max(parts1.length, parts2.length)

  for (let i = 0; i < maxLength; i++) {
    const p1 = parts1[i] || 0
    const p2 = parts2[i] || 0
    if (p1 !== p2)
      return p1 > p2 ? 1 : -1
  }

  return 0
}

export function isVersionGreaterOrEqual(version1: string, version2: string) {
  return compareVersions(version1, version2) >= 0
}

export function getHighestVersion(version1: string, version2: string): string {
  const comparisonResult = compareVersions(version1, version2)
  return comparisonResult >= 0 ? version1 : version2
}
