import { useUserStore } from '../stores/user'

export function usePermission() {
  const userStore = useUserStore()

  const hasAnyRole = (roles = []) => {
    if (!userStore.roles || userStore.roles.length === 0) return false
    return roles.some(role => userStore.roles.includes(role))
  }

  return { hasAnyRole }
}
