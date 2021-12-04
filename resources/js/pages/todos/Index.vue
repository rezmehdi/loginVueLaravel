<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card card-border bg-light">
                    <div class="card-body c-p">
                        <h4 class="mb-3">Add a todo :</h4>

                        <form @submit.prevent="validate">
                            <input
                                type="text"
                                class="form-control bg-b animate__animated animate__fadeInDown"
                                v-model.lazy.trim="state.todos.title"
                                @keydown.enter="addTodo"
                                autofocus
                            />
                            <div class="form-text text-danger">
                                {{ state.titleerorrtext }}
                            </div>
                            <div class="float-end fw-bold mx-1 mt-2">
                                {{ state.todos.length }}
                            </div>
                        </form>
                        <button
                            className="border-0 bg-light float-end  mx-2 mt-2"
                            @click="tododeleteall()"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Delete All Todo"
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="loading" class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div v-else class="row justify-content-center">
                <div class="col-md-6 my-3 px-2 h-25">
                    <div class="card card-border">
                        <div class="card-body">
                            <p v-if="state.todos.length === 0" class="text-center">
                                Empty list.
                            </p>
                            <ul class="list-group list-group-flush">
                                <li
                                    class="list-group-item animate__animated animate__backInDown"
                                    v-for="todo in state.todos"
                                    :key="todo.id"
                                >
                                    <div>
                                        <button
                                            class="border-0 bg-light float-end "
                                            @click="tododelete(todo.id)"
                                        >
                                            <i class="fa fa-trash"></i>
                                        </button>

                                        <input
                                            class="form-check-input float-end mx-2 "
                                            type="checkbox"
                                            name="checkbox"
                                            value=""

                                            v-model="todo.completed"
                                            @change="completeTodo(todo)"
                                            v-bind:id="todo.id"
                                            checked=""

                                        />
                                    </div>
                                    <div style="width: 88%">
                                        <input
                                            v-show="!todo.completed"
                                            v-model.lazy.trim="todo.title"
                                            class="border-0"
                                            type="text"
                                            @change="changeTitle(todo)"
                                        />
                                        <span v-show="todo.completed"
                                        ><del> {{ todo.title }} </del></span
                                        >
                                    </div>


                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {reactive, ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2"
// import {createRouter} from 'vue-router';


export default {
    name: "Todo",

    setup() {
        const state = reactive({
            todos: [],
            titleerorrtext: "",
        });
        const loading = ref(true);

        // const router = createRouter({})

        function validate() {
            if (state.todos.title === "" || state.todos.title === " " || state.todos.title.length < 3 ) {
                state.titleerorrtext = "Title is required!";
            } else {
                state.titleerorrtext = "";
            }

            if (state.todos.title !== "") {
                loading.value = true;
                addtodo();
            }
        }

        function addtodo() {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post("/api/todos/create", {
                    title: state.todos.title,
                    completed: false,
                    userId: 1,
                })
                    .then(function (response) {
                        // handle success
                        loading.value = false;
                        console.log(response),
                            (state.todos.title = ""),
                            getTodos(),
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                text: "Todo created successfully",
                                width: "20rem",

                                showConfirmButton: false,
                                timer: 2000,
                                showClass: {
                                    popup: "animate__animated animate__fadeInDown",
                                },
                                hideClass: {
                                    popup: "animate__animated animate__fadeOutUp",
                                },
                            });
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
            })
        }


        function tododelete(id) {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios
                    .get(`api/todos/destroy/${id}`)
                    .then(function (response) {
                        console.log(response)
                        let i = state.todos.map(item => item.id).indexOf(id); // find index of your object
                        state.todos.splice(i, 1)
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            text: "Todo deleted successfully",
                            showConfirmButton: false,
                            timer: 2000,
                            showClass: {
                                popup: "animate__animated animate__fadeInDown",
                            },
                            hideClass: {
                                popup: "animate__animated animate__fadeOutUp",
                            },
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
        }

        function tododeleteall() {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios
                    .get(`api/todos/destroy-all`)
                    .then(function (response) {
                        console.log(response);
                        getTodos(),
                            Swal.fire({
                                position: "top-end",
                                icon: "error",
                                text: " Todos deleted successfully",
                                showConfirmButton: false,
                                timer: 2000,
                                showClass: {
                                    popup: "animate__animated animate__fadeInDown",
                                },
                                hideClass: {
                                    popup: "animate__animated animate__fadeOutUp",
                                },
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
        }

        function completeTodo(todo) {
            axios.get('/sanctum/csrf-cookie').then(response => {
                console.log(todo);
                axios
                    .post(`api/todos/done/`, {
                        id: todo.id,
                        completed: todo.completed,
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
        }

        function changeTitle(todo) {
            console.log(todo);
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios
                    .post(`api/todos/update/`, {
                        id: todo.id,
                        title: todo.title,
                    })
                    .then(function (response) {
                        console.log(response),
                            Swal.fire({
                                position: "top-end",
                                icon: "error",
                                text: "Todo change successfully",
                                showConfirmButton: false,
                                timer: 2000,
                                showClass: {
                                    popup: "animate__animated animate__fadeInDown",
                                },
                                hideClass: {
                                    popup: "animate__animated animate__fadeOutUp",
                                },
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
        }


        function getTodos() {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios
                    .get("/api/todos")
                    .then(function (response) {
                        // handle success
                        console.log(response);
                        state.todos = response.data;
                        loading.value = false;
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
            })
        }

        getTodos();

        // router.beforeRouteEnter((to, from, next) => {
        //     if (!window.Laravel.isLoggedin) {
        //         window.location.href = "/";
        //     }
        //     next();
        // })
        return {
            addtodo,
            state,
            loading,
            validate,
            tododelete,
            completeTodo,
            tododeleteall,
            changeTitle
        };
    },
};
</script>

<style>
</style>
