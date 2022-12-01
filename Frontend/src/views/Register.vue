<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div className="register">
        <form @submit.prevent="Register">
            <br>
            <h1 class="text-center mb-5">Regiter</h1>
            <div class="form-group mt-5">
                <label>Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Register</button>
            <p class="mt-5">Have an account? <router-link to="/login">Login</router-link></p>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase/compat';
import { ref } from "vue";

export default {
    setup() {
        const email = ref("");
        const password = ref("");

        const Register = () => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then(user => {
                    alert("Account successfully created!");
                    console.log(user);
                })
                .catch(err => alert(err.message));
        }
        return {
            Register,
            email,
            password
        }
    }
}
</script>

<style>
.register {
    margin-left: 25%;
    margin-right: 25%;
    font-size: 20px;
}
</style>