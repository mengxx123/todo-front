<template>
    <div class="ui-page" :class="['page-' + name]">
        <ui-nav></ui-nav>
        <div class="page-content">
            <ui-header :title="title || page.title"></ui-header>
            <main class="page-body">
                <div class="page-container container-main">
                    <slot></slot>
                </div>
            </main>
            <ui-footer></ui-footer>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                open: false,
                docked: true
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: 'default'
            },
            page: {
                type: Object,
                default: function () {
                    return {
                        title: '云设'
                    }
                }
            },
            backable: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
        },
        methods: {
            toggle(flag) {
                this.open = !this.open
                this.docked = !flag
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ui-page {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .page-body {
        min-height: 500px;
    }
    .container-main {
        padding-top: 16px;
    }
    .page-content {
        position: absolute;
        top: 0;
        left: 256px;
        right: 0;
        bottom: 0;
    }
    .page-container {
        padding: 16px;
    }
    .admin-container {
        padding: 16px;
    }
</style>
