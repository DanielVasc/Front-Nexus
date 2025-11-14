<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../plugins/axios' // seu Axios configurado

const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const submitForm = async () => {
  if (!validarFormulario()) {
    alert('Por favor, preencha todos os campos corretamente.')
    return
  }
  try {
    const response = await api.post('http://127.0.0.1:8000/api/token/', {
      email: form.value.email,
      password: form.value.password
    })

    // Guardar tokens no localStorage
    localStorage.setItem('accessToken', response.data.access)
    localStorage.setItem('refreshToken', response.data.refresh)

    console.log('Login bem-sucedido!', response.data)
    resetForm()
    router.push('/pagInicial') // redireciona após login
  } catch (error) {
    console.error('Erro no login:', error.response.data)
    alert('Usuário e/ou senha incorreto(s).')
  }
}

const validarFormulario = () => {
  const f = form.value
  return f.email && f.password
}

const resetForm = () => {
  form.value = { email: '', password: '' }
}
</script>
<template>
  <main>
    <div class="container">
      <div class="background-form">
        <div class="transition-Page">
          <div class="signIn"><router-link to="/" style="color: white; text-decoration: none;">Sign In</router-link></div>
          <div class="signUp"><router-link to="/cadastroUser" style="color: black; text-decoration: none;">Sign Up</router-link></div>
        </div>
        <form @submit.prevent="submitForm">
          <div class="email-login">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="form.email" required />
            <a href="#" style="color: white; font-size: 11px; text-decoration: none;">Forgot Email?</a>
          </div>
          <div class="password-login">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="form.password" required />
            <a href="#" style="color: white; font-size: 11px; text-decoration: none;">Forgot Password?</a>
          </div>
          <div class="submit-login">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
<style scoped>
.container {
  width: auto;
  height: 100%;
  margin: auto;
  padding: 16px;
  background-color: #333;
}
.background-form {
  width: 400px;
  margin: 210px auto;
  padding: 24px;
  border-radius: 8px;
  background: linear-gradient(to bottom right, #9E0E2B, #38050F);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Times New Roman', Times, serif;
}

.transition-Page {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
  color: rgb(0, 0, 0);
  background-color: white;
  border-radius: 50px;
  width: 240px;
  height: 40px;
}
.signIn {
  width: 120px;
  height: 40px;
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  background-color: #9E0E2B;
  color: white;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.signUp {
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  margin-left: 20px;
}

form {
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255, 0);

}

.email-login, .password-login, .submit-login {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  color: white;
}

label {
  margin-bottom: 4px;
}

input {
  width: 240px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 12px;
  background-color: #9E0E2B;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  font-family: 'Times New Roman', Times, serif;
}

button:hover {
  background-color: #38050F;
}

@media (max-width: 500px) {
  .background-form {
    border-radius: 10px;
    margin: 10px;
    padding: 16px;
    max-width: 300px;
  }
  .transition-Page {
    max-width: 300px;
    height: 40px;
  }

  .signIn, .signUp {
    font-size: 1rem;
    width: 110px;
  }

  input {
    width: 100%;
  }
}
</style>
