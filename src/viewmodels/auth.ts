import { ref } from 'vue';
import { AuthService } from '@/services/auth';
import { useRouter } from 'vue-router';
import { validateField, Validators } from '@/core/validation/validators';

export function useAuthViewModel() {
  const loading = ref(false);
  const error = ref('');
  const router = useRouter();

  const login = async (email: string, password: string) => {
    loading.value = true;
    
    try {
      const res = await AuthService.login(email, password);
      localStorage.setItem('token', res.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      error.value = err.message || 'Login failed';
    } finally {
      loading.value = false;
    }
  };

  return { login, loading, error };
}
