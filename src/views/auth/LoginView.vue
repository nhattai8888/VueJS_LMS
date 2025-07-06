<script setup lang="ts">

import { useAuthViewModel } from '@/viewmodels/auth';
import { useReactiveForm } from '@/core/form/reactiveForm';
import { Validators } from '@/core/validation/validators';
const form = useReactiveForm(
  {email:"", password:""},
  {
  email:[Validators.email, Validators.required], password:[Validators.password, Validators.minLength(6), Validators.maxLength(18), Validators.required]
})
const { login, loading, error } = useAuthViewModel();

const onLogin = async () => {
  form.validateAll()
  if(!form.errors.value.email && !form.errors.value.password){
    console.log("Submit Ok")
  }
  console.log(form.values.value.email)
  // await login(form.values.value, form.values.value)
};


</script>

<template>
  <div>
    <input v-model="form.values.value.email" placeholder="Email" />
    <span v-if="form.touched.value.email && form.errors.value.email" style ="color: red">{{ form.errors.value.email }}</span>
    <input v-model="form.values.value.password" type="password" placeholder="Password" />
    <span v-if="form.touched.value.password && form.errors.value.password" style ="color: red">{{ form.errors.value.password }}</span>
    <button @click="onLogin" :disabled="loading">Login</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
