import { TokenStorage } from '@/core/plugins/persistence/TokenStorage';
import { type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router';

export function authGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const token = TokenStorage.getToken();
  if (!token) {
    next('/login');
  } else {
    next();
  }
}
