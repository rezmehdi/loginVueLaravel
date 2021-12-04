<template>


    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse">
            <a class="navbar-brand ms-3" href="#"> Mehdi</a>
            <!-- for logged-in user-->
            <div class="navbar-nav" v-if="isLoggedIn">
                <router-link to="/dashboard" class="nav-item nav-link">Dashboard</router-link>
                <router-link to="/books" class="nav-item nav-link">Books</router-link>
                <router-link to="/todos" class=" nav-item nav-link">Todos</router-link>
                <a class="nav-item nav-link" style="cursor: pointer;" @click="logout">Logout</a>
            </div>
            <!-- for non-logged user-->
            <div class="navbar-nav" v-else>
                <router-link to="/" class="nav-item nav-link">Home</router-link>
                <router-link to="/login" class="nav-item nav-link">Login</router-link>
                <router-link to="/register" class="nav-item nav-link">Register</router-link>
                <router-link to="/about" class="nav-item nav-link">About</router-link>

            </div>
        </div>
    </nav>


</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            isLoggedIn: false,
        }
    },
    created() {
        if (window.Laravel.isLoggedin) {
            this.isLoggedIn = true
        }
    },
    methods: {
        logout(e) {
            console.log('ss')
            e.preventDefault()
            this.$axios.get('/sanctum/csrf-cookie').then(response => {
                this.$axios.post('/api/logout')
                    .then(response => {
                        if (response.data.success) {
                            window.location.href = "/"
                        } else {
                            console.log(response)
                        }
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            })
        }
    },
};

</script>

<style scoped>
.router-link-active {
    color: rgba(0, 0, 0, 0.9) !important;
    border-bottom: 2px solid rgba(0, 0, 0, 0.9) !important;
}

</style>
