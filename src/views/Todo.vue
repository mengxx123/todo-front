<template>
    <my-page name="todo" title="待办事项" :page="page">
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
        <ui-drawer class="io-box" right :open="open" :docked="false" @close="toggle()">
            <ui-appbar title="导入导出">
                <ui-icon-button icon="close" slot="left" @click="toggle" />
                <ui-icon-button icon="check" slot="right" @click="finish" />
            </ui-appbar>
            <div class="body">
                <textarea class="form-control" v-model="ioData"></textarea>
            </div>
        </ui-drawer>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                input: '',
                todos: [],
                showTip: false,
                open: false,
                ioData: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'import_export',
                            click: this.importExport,
                            title: '导入导出'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            toggle () {
               this.open = !this.open
            },
            init() {
                this.todos = this.$storage.get('todos', [
                    {
                        id: this.getId(),
                        text: '这是一个示范用例',
                        isDone: false
                    }
                ])
            },
            importExport() {
                this.ioData = this.todos.map(item => '* ' + item.text).join('\n')
                this.open = true
            },
            finish() {
                let arr = this.ioData.split('\n')
                this.todos = []
                for (let item of arr) {
                    this.todos.push({
                        id: this.getId(),
                        text: item.replace(/[*]\s+/, ''),
                        isDone: false // TODO
                    })
                }
                this.$storage.set('todos', this.todos)
                this.open = false
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

<style lang="scss" scoped>
.io-box {
    width: 100%;
    max-width: 400px;
    .body {
        position: absolute;
        top: 64px;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 16px;
        overflow: auto;
    }
    textarea {
        height: 100%;
        max-height: 400px;
    }
}
</style>
