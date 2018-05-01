<template>
    <ui-page :title="title || page.title" :page="page" ref="page">
        <div slot="drawer">
            <ui-list @itemClick="toggle()">
                <ui-list-item title="待办事项" to="/">
                </ui-list-item>
                <ui-list-item title="番茄工作法" to="/tomato">
                </ui-list-item>
                <ui-list-item title="帮助" to="/help">
                </ui-list-item>
                <ui-list-item title="关于" to="/about">
                </ui-list-item>
            </ui-list>
            <ui-list v-if="categories.length" @itemClick="toggle()">
                <ui-sub-header>清单</ui-sub-header>
                <ui-list-item :title="category.name" :to="`/categories/${category.id}`"
                              v-for="category in categories" :key="category.id"></ui-list-item>
            </ui-list>
            <ui-list class="bottom-list" @itemClick="toggle()">
                <ui-list-item title="新建清单" @click="openDialog">
                    <ui-icon slot="left" value=":icon icon-add"/>
                </ui-list-item>
            </ui-list>
            <ui-dialog :dialogClass="['list-dialog']" :open="dialog" title="新建清单" @close="close">
                <ui-text-field v-model="categoryName" hintText="清单名称"/>
                <ui-flat-button slot="actions" @click="close" primary label="取消"/>
                <ui-flat-button slot="actions" primary @click="save" label="保存"/>
            </ui-dialog>
        </div>
        <slot></slot>
    </ui-page>
</template>

<script>
    export default {
        data() {
            return {
                categories: [],
                dialog: false,
                categoryName: ''
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
            this.init()
        },
        methods: {
            init() {
                this.categories = this.$storage.get('categories')
                if (!this.categories) {
                    this.categories = []
                }
            },
            save() {
                this.dialog = false

                this.categories.push({
                    id: '' + new Date().getTime(),
                    name: this.categoryName
                })
                this.$storage.set('categories', this.categories)
                this.categoryName = ''
            },
            openDialog () {
                this.dialog = true
            },
            close () {
                this.dialog = false
            },
            toggle(flag) {
                this.open = !this.open
                this.docked = !flag
            }
        }
    }
</script>

<style lang="scss">
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

    .list-dialog {
        width: 300px;
    }
    .page-nav {
        position: absolute;
        top: 0;
        width: 256px;
        bottom: 0;
        border-right: 1px solid #eee;
    }
    .bottom-list {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }
</style>
