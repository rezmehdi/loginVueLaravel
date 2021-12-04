import {createWebHistory, createRouter} from "vue-router";

import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';
import Dashboard from '../pages/Dashboard.vue';

import Books from '../components/Books.vue';
import AddBook from '../components/AddBook.vue';
import EditBook from '../components/EditBook.vue';

import TemplateTodos from '../pages/todos/Template';
import IndexTodos from '../pages/todos/Index.vue';

export const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'about',
        path: '/about',
        component: About
    },
    {
        name: 'register',
        path: '/register',
        component: Register
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard
    },
    {
        name: 'books',
        path: '/books',
        component: Books
    },
    {
        name: 'addbook',
        path: '/books/add',
        component: AddBook
    },
    {
        name: 'editbook',
        path: '/books/edit/:id',
        component: EditBook
    },
    {
        path: '/todos', name: 'todosTemplate', component: TemplateTodos, children: [
            { path: '', name: 'todos', component: IndexTodos },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
