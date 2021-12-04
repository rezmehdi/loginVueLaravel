<template>

    <div class="form-wrapper">
        <div class="container-fluid my-3">
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="card card-border bg-light">
                        <div class="card-body c-p">
                            <div class="d-flex justify-content-center" id="logo">
                                <img class="logo my-4" src="./logo-site.png" alt="image"/>
                            </div>
                            <h4 class="mb-3">login</h4>
                            <hr/>
                            <form>
                                <div class="mb-3 mt-2">
                                    <!-- <label for="exampleInputEmail1" class="form-label"
                                    >Email address</label
                                  > -->
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="username"
                                        name="username"
                                        aria-describedby="emailHelp"
                                        placeholder="Email"
                                        v-model="input.username"
                                        @focus="clearError('username')"
                                        @blur="username_check"
                                        :class="{ red: error.username !== '' }"
                                        autofocus
                                    />
                                    <div id="emailHelp" class="form-text">
                                        We'll never share your email with anyone else.
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <!-- <label for="exampleInputPassword1" class="form-label"
                                    >Password</label
                                  > -->
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="Password1"
                                        placeholder="Password"
                                        name="password1"
                                        v-model="input.password"
                                        @blur="password_check"
                                        @focus="clearError()"
                                        @keyup.enter="login"
                                        autocomplete="off"
                                    />
                                </div>

                                <div class="form-group d-flex justify-content-between my-3">
                                    <div class="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            checked=""
                                            id="customCheck1"
                                        />
                                        <label class="custom-control-label mx-2" for="customCheck1"
                                        >Check me out</label
                                        >
                                    </div>
                                    <a href="recover-password.html">Remember password</a>
                                </div>
                                <button
                                    type="button"
                                    v-on:click="login()"
                                    class="btn btn-primary mt-2"
                                    id="submit"
                                    data-loading-text="Cadastrando..."
                                    value="submit"
                                >
                                    Submit
                                </button>
                                <transition-group name="fade" class="error-block d-block">
                  <span
                      class="error-message"
                      :key="index + 'error'"
                      v-for="(errorName, index) in error"
                      v-show="errorName !== ''"
                  >{{ errorName }}</span
                  >
                                </transition-group>
                                <hr/>

                                <!-- <p class="text-muted text-center">login with Google</p>
                                <ul class="list-inline text-center">
                                  <li class="list-inline-item">
                                    <a href="#" class="btn btn-floating">
                                      <i class="fa fa-facebook"></i>
                                    </a>
                                  </li>

                                  <li class="list-inline-item">
                                    <a href="#" class="btn btn-floating">
                                      <i class="fa fa-google"></i>
                                    </a>
                                  </li>
                                </ul>
                                <hr /> -->

                                <router-link
                                    to="/register"
                                    class="text-link d-block text-right text-center"
                                >No account yet?
                                </router-link
                                >
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <ul class="list-group list-group-flush">
            <li class="list-group-item">body : {{ post.body }}</li>
            </ul> -->
        </div>
    </div>
    <!--    <div class="container">-->
    <!--        <div class="row justify-content-center">-->
    <!--            <div class="col-md-8">-->

    <!--                <div class="alert alert-danger" role="alert" v-if="error !== null">-->
    <!--                    {{ error }}-->
    <!--                </div>-->

    <!--                <div class="card card-default">-->
    <!--                    <div class="card-header">Login</div>-->
    <!--                    <div class="card-body">-->
    <!--                        <form>-->
    <!--                            <div class="form-group row">-->
    <!--                                <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail Address</label>-->
    <!--                                <div class="col-md-6">-->
    <!--                                    <input id="email" type="email" class="form-control mb-3" v-model="email" required-->
    <!--                                           autofocus autocomplete="off">-->
    <!--                                </div>-->
    <!--                            </div>-->

    <!--                            <div class="form-group row">-->
    <!--                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>-->
    <!--                                <div class="col-md-6">-->
    <!--                                    <input id="password" type="password" class="form-control mb-3" v-model="password"-->
    <!--                                           required autocomplete="off">-->
    <!--                                </div>-->
    <!--                            </div>-->

    <!--                            <div class="form-group row mb-0">-->
    <!--                                <div class="col-md-8 offset-md-4">-->
    <!--                                    <button type="submit" class="btn btn-primary" @click="handleSubmit">-->
    <!--                                        Login-->
    <!--                                    </button>-->
    <!--                                </div>-->
    <!--                            </div>-->
    <!--                        </form>-->
    <!--                    </div>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->
    <!--    </div>-->
</template>

<script>


import {reactive} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";


export default {
    name: "Login",

    setup() {
        const input = reactive({
            username: "",
            password: "",
            error: null
        });

        const error = reactive({
            password: "",
            username: "",
        });
        const router = useRouter();


        function validEmail(email) {
            const re =
                /^(([^<>()[\]\\.,;:@"]+(\.[^<>()[\]\\.,;:@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return re.test(email);
        }

        function password_check() {
            error.password = "";
            if (input.password === "") error.password = "Enter a password";

            if (input.password.length < 8)
                error.password = "Enter a password 8 character";
            return error.password !== "";
        }

        function username_check() {
            error.username = "";
            if (!validEmail(input.username))
                error.username = "Enter a valid e-mail address";
            if (input.username === "") error.username = "Enter an e-mail";
            return error.username !== "";
        }

        function login() {
            if (username_check(), password_check()) return;{
                axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post('api/login', {
                        email: input.username,
                        password: input.password
                    })
                        .then(response => {
                            console.log(response.data)
                            if (response.data.success) {
                                router.go('/dashboard')
                            } else {
                                input.error = response.data.message
                            }
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                })
            }
        }

        // // TODO: cadastrar e redirecionar
        // router.replace({name: "users"});
        // return error === "";


        function clearError(field) {
            error[field] = "";
        }

        return {
            input,
            error,
            clearError,
            password_check,
            username_check,
            login,
        };


    },
    beforeRouteEnter(to, from, next) {
        if (window.Laravel.isLoggedin) {
            return next('dashboard');
        }
        next();
    }
}
// data() {
//     return {
//         email: "",
//         password: "",
//         error: null
//     }
// },
// methods: {
//     handleSubmit(e) {
//         e.preventDefault()
//         if (this.password.length > 0) {
//             this.$axios.get('/sanctum/csrf-cookie').then(response => {
//                 this.$axios.post('api/login', {
//                     email: this.email,
//                     password: this.password
//                 })
//                     .then(response => {
//                         console.log(response.data)
//                         if (response.data.success) {
//                             this.$router.go('/dashboard')
//                         } else {
//                             this.error = response.data.message
//                         }
//                     })
//                     .catch(function (error) {
//                         console.error(error);
//                     });
//             })
//         }
//     }
// },
// beforeRouteEnter(to, from, next) {
//     if (window.Laravel.isLoggedin) {
//         return next('dashboard');
//     }
//     next();
// }

</script>
