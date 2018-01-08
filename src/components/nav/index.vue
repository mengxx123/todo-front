<template>
    <nav class="page-nav">
        <ui-list>
            <ui-list-item title="待办事项" to="/">
            </ui-list-item>
            <ui-list-item title="番茄工作法" to="/tomato">
            </ui-list-item>
            <ui-list-item title="帮助" to="/help">
            </ui-list-item>
            <ui-list-item title="关于" to="/about">
            </ui-list-item>
        </ui-list>
        <ui-list v-if="categories.length">
            <mu-sub-header>清单</mu-sub-header>
            <ui-list-item :title="category.name" :to="`/categories/${category.id}`"
                          v-for="category in categories" :key="category.id"></ui-list-item>
        </ui-list>
        <ui-list class="bottom-list">
            <ui-list-item title="新建清单" @click="open">
                <ui-icon slot="left" value=":icon icon-add"/>
            </ui-list-item>
        </ui-list>
        <ui-dialog :dialogClass="['list-dialog']" :open="dialog" title="新建清单" @close="close">
            <ui-text-field v-model="name" hintText="清单名称"/>
            <ui-flat-button slot="actions" @click="close" primary label="取消"/>
            <ui-flat-button slot="actions" primary @click="save" label="保存"/>
        </ui-dialog>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                categories: [],
                dialog: false,
                name: ''
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
                    name: this.name
                })
                this.$storage.set('categories', this.categories)
                this.name = ''
            },
            open () {
                this.dialog = true
            },
            close () {
                this.dialog = false
            }
        }
    }
</script>

<style>
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
