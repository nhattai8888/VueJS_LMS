import { ref } from 'vue';
import { UserService } from '@/services/user';
import {type IUser } from '@/models/IUser';

export function useUserViewModel() {
  const users = ref<IUser[]>([]);
  const loading = ref(false);
  const error = ref('');

  const loadUsers = async () => {
    loading.value = true;
    try {
      users.value = await UserService.getUsers();
    } catch (err: any) {
      error.value = err.message || 'Failed to load users';
    } finally {
      loading.value = false;
    }
  };


  const createUsers = async(data: IUser) => {
    loading.value = true
    try {
      const res = await UserService.createUser(data)
      if (res.status == 200){
        return 
      }
    } catch (e) {
      
    }
  }

  const deleteUser = async (id: string) => {
    await UserService.deleteUser(id);
    await loadUsers();
  };

  return {
    users,
    loading,
    error,
    loadUsers,
    deleteUser
  };
}
