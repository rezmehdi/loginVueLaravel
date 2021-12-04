<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card card-border bg-light">
                    <div class="card-body c-p">
                        <div>
                            <h4 class="text-center">Edit Book</h4>
                            <div>
                                <form @submit.prevent="updateBook">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <input type="text" class="form-control bg-b mb-2" v-model="book.name">
                                    </div>
                                    <div class="form-group">
                                        <label>Author</label>
                                        <input type="text" class="form-control bg-b" v-model="book.author">
                                    </div>
                                    <button type="submit" class="btn btn-primary my-2">Update Book</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
export default {
    data() {
        return {
            book: {}
        }
    },
    created() {
        this.$axios.get('/sanctum/csrf-cookie').then(response => {
            this.$axios.get(`/api/books/edit/${this.$route.params.id}`)
                .then(response => {
                    this.book = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        })
    },
    methods: {
        updateBook() {
            this.$axios.get('/sanctum/csrf-cookie').then(response => {
                this.$axios.post(`/api/books/update/${this.$route.params.id}`, this.book)
                    .then(response => {
                        this.$router.push({name: 'books'});
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            })
        }
    },
    beforeRouteEnter(to, from, next) {
        if (!window.Laravel.isLoggedin) {
            window.location.href = "/";
        }
        next();
    }
}
</script>
