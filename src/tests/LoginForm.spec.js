import { mount } from '@vue/test-utils'
import LoginForm from '../components/LoginForm.vue'

describe('LoginForm', () => {

  test('render inicial: inputs y botón deshabilitado', () => {

    const wrapper = mount(LoginForm)

    expect(wrapper.get('[data-testid="email"]').exists()).toBe(true)
    expect(wrapper.get('[data-testid="password"]').exists()).toBe(true)

    const button = wrapper.get('[data-testid="submit"]')

    expect(button.attributes('disabled')).toBeDefined()
  })

  test('muestra error si email es inválido', async () => {

    const wrapper = mount(LoginForm)

    await wrapper.get('[data-testid="email"]').setValue('correo-invalido')
    await wrapper.get('[data-testid="password"]').setValue('123')

    const error = wrapper.get('[data-testid="error"]')

    expect(error.text()).toContain('Email inválido')
  })

  test('habilita botón con email válido y password', async () => {

    const wrapper = mount(LoginForm)

    await wrapper.get('[data-testid="email"]').setValue('test@mail.com')
    await wrapper.get('[data-testid="password"]').setValue('123456')

    const button = wrapper.get('[data-testid="submit"]')

    expect(button.attributes('disabled')).toBeUndefined()
  })

  test('emite submit con email.trim() y password', async () => {

    const wrapper = mount(LoginForm)

    await wrapper.get('[data-testid="email"]').setValue('   test@mail.com ')
    await wrapper.get('[data-testid="password"]').setValue('123456')

    await wrapper.get('form').trigger('submit.prevent')

    const emitted = wrapper.emitted('submit')

    expect(emitted).toBeTruthy()

    expect(emitted[0][0]).toEqual({
      email: 'test@mail.com',
      password: '123456'
    })
  })

  test('password se limpia después del envío', async () => {

    const wrapper = mount(LoginForm)

    await wrapper.get('[data-testid="email"]').setValue('test@mail.com')
    await wrapper.get('[data-testid="password"]').setValue('123456')

    await wrapper.get('form').trigger('submit.prevent')

    const password = wrapper.get('[data-testid="password"]')

    expect(password.element.value).toBe('')
  })

})