<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="about text-center">
        <h1>Profile</h1>
        <h2 class="mt-3">Email: {{ name }}</h2>
        <br>
        <button class="logout btn btn-primary w-10 mt-3" @click="Logout">Logout</button>
    </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import firebase from "firebase/compat";
import { useRoute, useRouter } from "vue-router";

export default {
    setup () {
        const name = ref("");
        const router = useRouter();
        const route = useRoute();

        onBeforeMount(() => {
            firebase.auth().onAuthStateChanged((user) => {
                if(!user) {
                    router.replace("/login");
                } else if (route.path == "/login" || route.path == "/register") {
                    router.replace("/");
                }
            });

            const user = firebase.auth().currentUser;
            if (user) {
                name.value = user.email.split('@')[0];
            }
        });

        const Logout = () => {
            firebase
                .auth()
                .signOut()
                .then(() => console.log("Signed out"))
                .catch(err => alert(err.message));
        }

        return {
            Logout,
            name
        }
        
    }
}
</script>

<style>
.about {
    margin-top: 20%;
}
</style>