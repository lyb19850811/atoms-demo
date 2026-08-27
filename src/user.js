const KEY = 'atoms_user'

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || 'null')
  } catch {
    return null
  }
}

export function setCurrentUser(user) {
  localStorage.setItem(KEY, JSON.stringify(user))
}

export function clearCurrentUser() {
  localStorage.removeItem(KEY)
}
