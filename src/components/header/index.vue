<template>
    <header class="page-header">
        <ui-appbar :title="title">
            <ui-icon-button icon="menu" slot="left"/>
        </ui-appbar>
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
