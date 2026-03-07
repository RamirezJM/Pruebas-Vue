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

    <div>
      <label>Email</label>
      <input
        data-testid="email"
        type="email"
        v-model="email"
      />
    </div>

    <div>
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

