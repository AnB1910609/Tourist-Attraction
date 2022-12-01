<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div className="login">
        <form @submit.prevent="Login">
            <br>
            <h1 class="text-center mb-5">Login</h1>
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
            <button type="submit" class="btn btn-primary">Login</button>
            <p class="mt-5">Need an account? <router-link to="/register">Regiter</router-link></p>
        </form>
    </div>
</template>

<script>
import {ref} from "vue";
import firebase from "firebase/compat/app";
export default {
    setup () {
        const email = ref("");
        const password = ref("");

        const Login = () => {
            firebase
                .auth()
                .signInWithEmailAndPassword(email.value,password.value)
                .then(data => console.log(data))
                .catch(err => alert(err.message));
        }

        return {
            Login,
            email,
            password
        }
    }
}
</script>
<style>
.login {
    margin-left: 25%;
    margin-right: 25%;
    font-size: 20px;
}
</style>