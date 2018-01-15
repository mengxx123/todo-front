<template>
    <my-page name="todo" title="待办事项">
        <div class="todo-box">
            <form name="myForm">
                <div class="input-group">
                    <input class="form-control" type="text" placeholder="输入待办事项后回车" v-model="input" ng-keydown="inputEnter($event)" />
                    <div class="input-group-btn">
                        <button class="btn btn-success" @click.prevent="add()">添加</button>
                    </div>
                </div>
            </form>
            <div class="todo-list-empty" v-if="!todos.length">没有待办事项</div>
        </div>
        <section class="todo-box">
            <ui-list class="todo-list">
                <ui-list-item disableRipple :title="todo.text" :class="{'done': todo.isDone}" @click="doCheck(todo)" v-for="todo in todos" :key="todo.id">
                    <ui-checkbox class="checkbox" v-model="todo.isDone" slot="left"/>
                    <ui-icon value="delete" slot="right" @click.stop="remove(todo)"/>
                </ui-list-item>
            </ui-list>
        </section>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                input: '',
                todos: [],
                showTip: false
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            // 初始化
            init() {
                // 初始化待办事项
                let todos = this.$storage.get('todos')
                if (todos) {
                    this.todos = todos
                } else {
                    this.todos = [
                        {
                            id: this.getId(),
                            text: '这是一个示范用例',
                            isDone: false
                        }
                    ]
                }
            },
            add() {
                if (!this.input) {
                    // alert('请输入内容'); // TODO 输入框输入回车后也会执行到这里
                    return
                }
                this.dealInput()
            },
            doCheck(todo) {
                for (let i = 0; i < this.todos.length; i++) {
                    if (this.todos[i].id === todo.id) {
                        this.todos[i].isDone = !this.todos[i].isDone
                        this.updateStorage()
                        break
                    }
                }
            },
            remove(todo) {
                for (var i = 0; i < this.todos.length; i++) {
                    if (this.todos[i].id === todo.id) {
                        this.todos.splice(i, 1)
                        this.updateStorage()
                        return
                    }
                }
            },
            // 根据待办事项输入框的值添加待办事项
            dealInput() {
                if (this.input.length) {
                    this.todos.unshift({
                        id: this.getId(),
                        text: this.input,
                        isDone: false
                    })
                    this.updateStorage()
                    this.input = ''
                }
            },
            // 获取唯一ID
            getId() {
                return '' + new Date().getTime()
            },
            updateStorage() {
                this.$storage.set('todos', this.todos)
            }
        }
    }
</script>

<style scoped>
</style>
