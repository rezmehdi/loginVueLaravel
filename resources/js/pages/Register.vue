<template>
    <div class="form-wrapper">
        <div class="container-fluid mt-2">
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="card card-border bg-light">
                        <div class="card-body c-p">
                            <div class="d-flex justify-content-center" id="logo">
                                <img class="logo my-4" src="./logo-site.png" alt="image"/>
                            </div>
                            <h4 class="text-center">Wellcome</h4>
                            <form>
                                <div class="mb-3 mt-2">
                                    <label for="name" class="form-label"
                                    >Name:</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="name"
                                        name="name"
                                        aria-describedby="emailHelp"
                                        placeholder="Name"
                                        v-model="input.name"
                                        @focus="clearError('name')"
                                        @blur="name_check"
                                        :class="{ red: error.name !== '' }"
                                        autofocus
                                    />
                                </div>
                                <div class="mb-3 mt-2">
                                    <label for="username" class="form-label"
                                    >Email address:</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="username"
                                        name="username"
                                        aria-describedby="emailHelp"
                                        placeholder="Email"
                                        v-model="input.email"
                                        @focus="clearError('username')"
                                        @blur="username_check"
                                        :class="{ red: error.username !== '' }"
                                        autofocus
                                    />
                                </div>
                                <div class="mb-3">
                                    <label for="Password1" class="form-label">Password:</label>
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

                                <!--                                <div class="form-group">-->
                                <!--                                    <div class="mb-3">-->
                                <!--                                        <label for="password2" class="form-label">-->
                                <!--                                            Confirm Password:</label-->
                                <!--                                        >-->
                                <!--                                        <input-->
                                <!--                                            type="password"-->
                                <!--                                            v-model="input.match_password"-->
                                <!--                                            @focus="clearError('passwordMatch')"-->
                                <!--                                            @blur="match_check"-->
                                <!--                                            @keyup.enter="newUser"-->
                                <!--                                            placeholder="Confirm your password"-->
                                <!--                                            class="form-control"-->
                                <!--                                            name="password2"-->
                                <!--                                            id="password2"-->
                                <!--                                            autocomplete="off"-->
                                <!--                                        />-->
                                <!--                                    </div>-->
                                <!--                                </div>-->
                                <input
                                    type="button"
                                    v-on:click="newUser()"
                                    class="btn btn-primary mt-2"
                                    id="submit"
                                    data-loading-text=""
                                    value="submit"
                                />
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
                                <router-link to="/login" class="text-center d-block"
                                >Already have an account?
                                </router-link
                                >
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--    <div class="container">-->
    <!--        <div class="row justify-content-center">-->
    <!--            <div class="col-md-8">-->

    <!--                <div class="alert alert-danger " role="alert" v-if="error !== null">-->
    <!--                    {{ error }}-->
    <!--                </div>-->

    <!--                <div class="card card-default">-->
    <!--                    <div class="card-header">Register</div>-->
    <!--                    <div class="card-body">-->
    <!--                        <form>-->
    <!--                            <div class="form-group row">-->
    <!--                                <label for="name" class="col-sm-4 col-form-label text-md-right">Name</label>-->
    <!--                                <div class="col-md-6">-->
    <!--                                    <input id="name" type="text" class="form-control mb-3" v-model="name" required-->
    <!--                                           autofocus autocomplete="off">-->
    <!--                                </div>-->
    <!--                            </div>-->

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

    <!--                                <div class="form-group row mb-0">-->
    <!--                                    <div class="col-md-8 offset-md-4">-->
    <!--                                        <button type="submit" class="btn btn-primary" @click="handleSubmit">-->
    <!--                                            Register-->
    <!--                                        </button>-->
    <!--                                    </div>-->
    <!--                                </div>-->
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


    setup() {
        const input = reactive({
            name: "",
            email: "",
            password: "",
            // match_password: "",
            error: null
        });
        const error = reactive({
            password: "",
            // passwordMatch: "",
            username: "",
            name: ""
        });
        const router = useRouter();

        // function match_check() {
        //     error.passwordMatch = "";
        //     if (input.password !== input.match_password)
        //         error.passwordMatch = "Passwords do not match";
        //     return error.passwordMatch !== "";
        // }

        function clearError(field) {
            error[field] = "";
        }

        function username_check() {
            error.username = "";
            if (!validEmail(input.email))
                error.username = "Enter a valid e-mail address";
            if (input.email === "") error.username = "Enter an e-mail";
            return error.username !== "";
        }

        function name_check() {
            error.name = "";
            if (input.name === "")
                error.name = "Enter an name";
            return error.name !== "";
        }


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


        // function newUser(e) {
        //     e.preventDefault()
        //     if (username_check(), name_check(), password_check());
        //     axios.get('/sanctum/csrf-cookie').then(response => {
        //         axios.post('api/register', {
        //             name: input.name,
        //             email: input.email,
        //             password: input.password,
        //         }).then(response => {
        //             console.log(response)
        //             if (response.data.success) {
        //                 window.location.href = "/login"
        //             } else {
        //                 input.error = response.data.message
        //             }
        //         })
        //             .catch(function (error) {
        //                 console.error(error);
        //             });
        //     })
        // }
        function newUser() {

            if (username_check(), name_check(), password_check()) return;
            {
                axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post('api/register', {
                        name: input.name,
                        email: input.email,
                        password: input.password,
                    })
                        .then(response => {
                            console.log(response)
                            if (response.data.success) {
                                window.location.href = "/login"
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


        //     // TODO: cadastrar e redirecionar
        //     router.replace({name: "login"});
        //     return error === "";
        // }


        // data() {
        //     return {
        //         name: "",
        //         email: "",
        //         password: "",
        //         error: null
        //     }
        // },
        // methods: {
        //     handleSubmit(e) {
        //         e.preventDefault()
        //         if (this.password.length > 8) {
        //             axios.get('/sanctum/csrf-cookie').then(response => {
        //                 axios.post('api/register', {
        //                     name: this.name,
        //                     email: this.email,
        //                     password: this.password
        //                 })
        //                     .then(response => {
        //                         if (response.data.success) {
        //                             window.location.href = "/login"
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

        return {
            input,
            error,
            // match_check,
            clearError,
            password_check,
            username_check,
            newUser,
            name_check
        };
    },


    beforeRouteEnter(to, from, next) {
        if (window.Laravel.isLoggedin) {
            return next('dashboard');
        }
        next();
    }
}

</script>
