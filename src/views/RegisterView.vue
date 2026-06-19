<template>
  <div class="register-page">
    <div class="register-bg-glow"></div>

    <RouterLink to="/" class="back-btn">
      <span class="material-symbols-outlined">arrow_back</span>
      {{ $t('register.back') }}
    </RouterLink>

    <div class="register-container">
      <div class="register-card">
        <div class="logo-section">
          <RouterLink to="/" class="logo">EventFlow<span class="logo-dot">.</span></RouterLink>
        </div>

        <h1>{{ $t('register.title') }}</h1>
        <p class="subtitle">{{ $t('register.subtitle') }}</p>

        <form @submit.prevent="handleRegister">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">{{ $t('register.firstName') }}</label>
              <div class="input-wrap">
                <span class="material-symbols-outlined input-icon">person</span>
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  placeholder="John"
                  required
                  class="form-input"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="lastName">{{ $t('register.lastName') }}</label>
              <div class="input-wrap">
                <span class="material-symbols-outlined input-icon">person</span>
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  class="form-input"
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="email">{{ $t('register.email') }}</label>
            <div class="input-wrap">
              <span class="material-symbols-outlined input-icon">mail</span>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="you@example.com"
                required
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">{{ $t('register.password') }}</label>
            <div class="input-wrap">
              <span class="material-symbols-outlined input-icon">lock</span>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Min. 8 characters"
                required
                class="form-input"
              />
              <button type="button" class="toggle-pw" @click="showPassword = !showPassword">
                <span class="material-symbols-outlined">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
            <PasswordStrength :password="form.password" />
          </div>

          <div class="form-group">
            <label for="confirmPassword">{{ $t('register.confirmPassword') }}</label>
            <div class="input-wrap">
              <span class="material-symbols-outlined input-icon">lock_reset</span>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirm ? 'text' : 'password'"
                placeholder="Repeat your password"
                required
                class="form-input"
                :class="{ 'input-error': passwordMismatch }"
              />
              <button type="button" class="toggle-pw" @click="showConfirm = !showConfirm">
                <span class="material-symbols-outlined">{{ showConfirm ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
            <p v-if="passwordMismatch" class="field-error">Passwords do not match</p>
          </div>

          <label class="terms-check">
            <input v-model="form.terms" type="checkbox" required />
            <span>
              {{ $t('register.terms') }}
              <a href="#" class="link">{{ $t('register.termsLink') }}</a>
              {{ $t('register.and') }}
              <a href="#" class="link">{{ $t('register.privacyLink') }}</a>
            </span>
          </label>

          <button type="submit" class="btn-register" :disabled="passwordMismatch || !form.terms">
            {{ $t('register.createAccount') }}
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>

        <div class="divider"><span>or</span></div>

        <div class="social-btns">
          <button class="social-btn">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>
          <button class="social-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            Sign up with GitHub
          </button>
        </div>

        <div class="login-section">
          <p>
            {{ $t('register.haveAccount') }}
            <RouterLink to="/login" class="link-bold">{{ $t('register.signIn') }}</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PasswordStrength from '@/components/PasswordStrength.vue'

const { t: $t } = useI18n()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
})

const showPassword = ref(false)
const showConfirm = ref(false)

const passwordMismatch = computed(
  () => form.value.confirmPassword.length > 0 && form.value.password !== form.value.confirmPassword,
)

const handleRegister = () => {
  if (passwordMismatch.value) return
  console.log('Register:', form.value)
}
</script>

<style scoped>
.register-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--bg);
  padding: 5rem 1rem 2rem;
  position: relative;
}

.register-bg-glow {
  position: fixed;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.07) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.back-btn {
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s;
  z-index: 10;
}

.back-btn .material-symbols-outlined {
  font-size: 1.1rem;
}

.back-btn:hover {
  color: var(--emerald);
}

.register-container {
  width: 100%;
  max-width: 480px;
  position: relative;
  z-index: 1;
}

.register-card {
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: 24px;
  padding: 2.5rem 2.2rem;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(16, 185, 129, 0.06);
}

.logo-section {
  text-align: center;
  margin-bottom: 1.8rem;
}

.logo {
  font-family: 'Syne', sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.04em;
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  text-decoration: none;
}

.logo-dot {
  color: var(--emerald);
  font-size: 2.2rem;
  line-height: 1;
}

h1 {
  font-size: 1.6rem;
  color: var(--text);
  margin-bottom: 0.4rem;
  text-align: center;
}

.subtitle {
  color: var(--text-muted);
  text-align: center;
  font-size: 0.88rem;
  margin-bottom: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

label {
  color: var(--text);
  font-size: 0.875rem;
  font-weight: 600;
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 0.9rem;
  color: var(--text-dim);
  font-size: 1.05rem;
  pointer-events: none;
}

.form-input {
  width: 100%;
  padding: 0.82rem 1rem 0.82rem 2.8rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.92rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
  border-color: var(--emerald-border);
  box-shadow: 0 0 0 3px var(--emerald-glow);
}

.form-input::placeholder {
  color: var(--text-dim);
}

.form-input.input-error {
  border-color: rgba(239, 68, 68, 0.5);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.toggle-pw {
  position: absolute;
  right: 0.9rem;
  background: none;
  border: none;
  color: var(--text-dim);
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  transition: color 0.2s;
}

.toggle-pw:hover {
  color: var(--text-muted);
}

.toggle-pw .material-symbols-outlined {
  font-size: 1.05rem;
}

.field-error {
  font-size: 0.78rem;
  color: #ef4444;
  margin-top: 0.1rem;
}

.terms-check {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  color: var(--text-muted);
  font-size: 0.83rem;
  cursor: pointer;
  line-height: 1.4;
}

.terms-check input {
  accent-color: var(--emerald);
  margin-top: 0.15rem;
  flex-shrink: 0;
}

.link {
  color: var(--emerald);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.link:hover {
  color: var(--emerald-dim);
}

.btn-register {
  background: var(--emerald);
  color: #fff;
  border: none;
  padding: 0.9rem 1.5rem;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-register:hover:not(:disabled) {
  background: var(--emerald-dim);
  transform: translateY(-1px);
  box-shadow: 0 0 40px rgba(16, 185, 129, 0.45);
}

.btn-register:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.btn-register .material-symbols-outlined {
  font-size: 1rem;
}

.divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.4rem 0 1.1rem;
  color: var(--text-dim);
  font-size: 0.8rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.social-btns {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  padding: 0.75rem 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text-muted);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.social-btn:hover {
  border-color: var(--border-strong);
  color: var(--text);
  background: var(--bg-card);
}

.login-section {
  text-align: center;
  margin-top: 1.6rem;
  padding-top: 1.4rem;
  border-top: 1px solid var(--border);
}

.login-section p {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.link-bold {
  color: var(--emerald);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.link-bold:hover {
  color: var(--emerald-dim);
}

@media (max-width: 480px) {
  .register-card {
    padding: 2rem 1.3rem;
    border-radius: 16px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .back-btn {
    top: 1rem;
    left: 1rem;
  }
}
</style>
