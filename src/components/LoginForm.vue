<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['submit'])

const email = ref('')
const password = ref('')

const isValidEmail = computed(() => {
  return /\S+@\S+\.\S+/.test(email.value)
})

const canSubmit = computed(() => {
  return isValidEmail.value && password.value.length > 0
})

function handleSubmit() {

  if (!canSubmit.value) return

  emit('submit', {
    email: email.value.trim(),
    password: password.value
  })

  password.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit">

    <div class="form-group">
      <label>Email</label>
      <input
        data-testid="email"
        type="email"
        v-model="email"
      />
    </div>

    <div class="form-group">
      <label>Password</label>
      <input
        data-testid="password"
        type="password"
        v-model="password"
      />
    </div>

    <p
      v-if="email && !isValidEmail"
      data-testid="error"
      role="alert"
      class="invalido"
    >
      Email inválido
    </p>

    <button
      data-testid="submit"
      type="submit"
      :disabled="!canSubmit"
    >
      Ingresar
    </button>

  </form>
</template>

<style>
form{
  max-width: 500px;
  margin: 3em auto;
  padding: 1em;
  border: solid 1px darkslateblue;
  border-radius: 5px;
  background-color: rgb(232, 239, 241);
}

.form-group{
  display:flex;
  flex-direction: column;
}
input{
  margin-bottom: 1em;
  padding: 0.3em;
}

button{
  padding: 0.25em 0.5em;
}

.invalido{
  color: red;
}
</style>

