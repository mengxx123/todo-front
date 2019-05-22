<template>
    <my-page name="todo" title="待办" :page="page">
        <div class="common-container container">
            <a href="javascript:;" v-if="!$store.state.user" @click="login">点击登陆</a>
            <!-- <a href="javascript:;" v-if="$store.state.user" @click="login">已登陆</a> -->

                <div class="search-box">
                    <input class="input" v-model="input" @keydown="keydown($event)" placeholder="输入待办事项">
                    <ui-icon-button icon="add" title="添加" primary @click="add" />
                </div>
                <div class="todo-list-empty" v-if="!todos.length">没有待办事项</div>
            <section class="todo-box">
                <ui-checkbox class="show-done" v-model="showDone" @change="onShowDoneChange" label="显示已完成" />
                <div class="total">数量：{{ total }}</div>
                <ui-list class="todo-list">
                    <ui-list-item disableRipple :title="todo.title" :class="{'done': todo.isDone}" @click="doCheck(todo)" v-for="todo in todos" :key="todo.id">
                        <ui-checkbox class="checkbox" v-model="todo.isDone" slot="left" @change="value => doCheck(todo)" />
                        <ui-icon value="delete" slot="right" @click.stop="remove(todo)"/>
                    </ui-list-item>
                </ui-list>
            </section>
        </div>
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
    import oss from '@/util/oss'

    export default {
        data () {
            return {
                showDone: false,
                input: '',
                total: 0,
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
                        },
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com/?utm_source=todo',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            onShowDoneChange(val) {
                this.showDone = val
                this.init()
            },
            toggle () {
               this.open = !this.open
            },
            init() {
                if (this.$store.state.user) {
                    this.$http.get(`/todos?page_size=100&isDone=${this.showDone ? '' : '0'}`).then(
                        response => {
                            let data = response.data
                            console.log(data)
                            this.total = response.headers['x-total']
                            this.todos = data
                            // this.myObject.buyTime = moment(this.myObject.buyTime).format('YYYY-MM-DD HH:mm:ss')
                        },
                        response => {
                            console.log(response)
                            this.loading = false
                        })
                } else {
                    this.todos = this.$storage.get('todos', [
                        {
                            id: this.getId(),
                            title: '这是一个示范用例',
                            isDone: false
                        }
                    ])
                }
            },
            importExport() {
                this.ioData = this.todos.map(item => '* ' + item.title).join('\n')
                this.open = true
            },
            finish() {
                let arr = this.ioData.split('\n')
                this.todos = []
                for (let item of arr) {
                    this.todos.push({
                        id: this.getId(),
                        title: item.replace(/[*]\s+/, ''),
                        isDone: false // TODO
                    })
                }
                this.$storage.set('todos', this.todos)
                this.open = false
            },
            keydown(e) {
                console.log(e.keyCode)
                if (e.keyCode === 13) {
                    this.add()
                }
            },
            add() {
                if (!this.input) {
                    this.$message({
                        type: 'danger',
                        text: '请输入内容'
                    })
                    return
                }
                this.dealInput()
            },
            doCheck(todo) {
                if (this.$store.state.user) {
                    this.$http.put(`/todos/${todo.id}`, {
                        isDone: !todo.isDone
                    }).then(
                        response => {
                            this.init()
                        },
                        response => {
                            console.log(response)
                            this.loading = false
                        })
                } else {
                    for (let i = 0; i < this.todos.length; i++) {
                        if (this.todos[i].id === todo.id) {
                            this.todos[i].isDone = !this.todos[i].isDone
                            this.updateStorage()
                            break
                        }
                    }
                }
            },
            onItemChange() {

            },
            onChange() {

            },
            remove(todo) {
                let ret = confirm(`确认删除${todo.title}？`)
                if (!ret) {
                    return
                }
                if (this.$store.state.user) {
                    this.$http.delete(`/todos/${todo.id}`, {
                        title: this.input
                    }).then(
                        response => {
                            this.init()
                        },
                        response => {
                            console.log(response)
                            this.loading = false
                        })
                } else {
                    for (var i = 0; i < this.todos.length; i++) {
                        if (this.todos[i].id === todo.id) {
                            this.todos.splice(i, 1)
                            this.updateStorage()
                            return
                        }
                    }
                }
            },
            // 根据待办事项输入框的值添加待办事项
            dealInput() {
                if (this.$store.state.user) {
                    this.$http.post(`/todos`, {
                        title: this.input
                    }).then(
                        response => {
                            this.init()
                            this.input = ''
                        },
                        response => {
                            console.log(response)
                            this.loading = false
                        })
                } else {
                    this.todos.unshift({
                        id: this.getId(),
                        title: this.input,
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
            },
            login() {
                location.href = oss.getOauthUrl()
            }
        }
    }
</script>

<style lang="scss" scoped>
.container {
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
}
.show-done {
    margin-left: 16px;
}
.search-box {
    display: flex;
    width: 400px;
    max-width: 100%;
    margin-bottom: 16px;
    // border: 1px solid #eee;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    background-color: #fff;
    &:hover {
        box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
    }
    .input {
        flex-grow: 1;
        display: block;
        height: 48px;
        padding: 0 16px;
        line-height: 48px;
        border: none;
        outline: none;
    }
}
.form-control {
    display: block;
    width: 100%;
    height: 33px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42;
    color: #55595c;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 2px;
}
textarea.form-control {
    height: auto;
}
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
