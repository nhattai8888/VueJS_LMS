<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserViewModel } from '@/viewmodels/user';

const { users, loading, error, loadUsers, deleteUser } = useUserViewModel();

onMounted(loadUsers);
</script>

<template>
  <div>
    <h2>User List</h2>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
    <ul>
      <li v-for="user in users" :key="user._id">
        {{ user.full_name }} - {{ user.role }}
        <button @click="deleteUser(user._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>
