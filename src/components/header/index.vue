<template>
    <header class="page-header">
        <mu-appbar :title="title">
            <mu-icon-button icon="menu" slot="left"/>
        </mu-appbar>
    </header>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>
