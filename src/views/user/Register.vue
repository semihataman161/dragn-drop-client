<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10  class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
          <div class="position-relative image-side ">
            <p class=" text-white h2">{{ $t('dashboards.magic-is-in-the-details') }}</p>
              <p class="white mb-0">  Please use this form to register. <br />If you are a member, please
                <router-link to="/user/login" class="white">login</router-link>.
              </p>
          </div>
          <div class="form-side">
            <router-link to="/"><span class="logo-single"/></router-link>
            <h6 class="mb-4">{{ $t('user.register')}}</h6>
            <b-form @submit.prevent="formSubmit">
              <b-form-group :label="$t('user.user-name')" class="has-float-label mb-4">
                <b-form-input type="text" v-model="$v.form.userName.$model" :state="!$v.form.userName.$error" />
                <b-form-invalid-feedback v-if="!$v.form.userName.required">Please enter your user name</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('user.email')" class="has-float-label mb-4">
                <b-form-input type="text" v-model="$v.form.email.$model" :state="!$v.form.email.$error" />
                <b-form-invalid-feedback v-if="!$v.form.email.required">Please enter your email address</b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.form.email.email">Please enter a valid email address</b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.form.email.minLength">Your email must be minimum 4 characters</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('user.password')" class="has-float-label mb-4">
                <b-form-input type="password" v-model="$v.form.password.$model" :state="!$v.form.password.$error" />
                <b-form-invalid-feedback v-if="!$v.form.password.required">Please enter your password</b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.form.password.minLength || !$v.form.password.maxLength">Your password must be between 4 and 16 characters</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('user.confirm-password')" class="has-float-label mb-4">
                <b-form-input type="password" v-model="$v.form.confirmPassword.$model" :state="!$v.form.confirmPassword.$error" />
                <b-form-invalid-feedback v-if="!$v.form.confirmPassword.required">Please enter your password</b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.form.confirmPassword.sameAsPassword">Password mismatch</b-form-invalid-feedback>
              </b-form-group>
              <div class="d-flex justify-content-end align-items-center">
                  <b-button type="submit" variant="primary" size="lg" class="btn-shadow">{{ $t('user.register-button')}}</b-button>
              </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import { adminRoot } from '../../constants/config'
import { register } from '@/service/user.service';
import { validationMixin } from "vuelidate";
const {
  required,
  maxLength,
  minLength,
  email,
  sameAs
} = require("vuelidate/lib/validators");

export default {
  data () {
    return {
      form: {
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
    }
  },
  mixins: [validationMixin],
  validations: {
    form: {
      userName: {
        required,
      },
      email: {
        required,
        email,
        minLength: minLength(4)
      },
      password: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(4),
      },
      confirmPassword:{
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    async formSubmit () {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      delete this.form.confirmPassword;

      try {
        await register(this.form);
        this.$router.push('login');
      } catch(error) {
        return;
      }
    }
  }
}
</script>
