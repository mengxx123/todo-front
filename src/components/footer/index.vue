<template>
    <footer class="page-footer">
        <mu-bottom-nav :value="bottomNav" @change="handleChange">
            <mu-bottom-nav-item value="todo" title="待办事项" icon="restore" @click.native="view('todo')"/>
            <mu-bottom-nav-item value="tomato" title="番茄工作法" icon="favorite" @click.native="view('tomato')"/>
            <mu-bottom-nav-item value="help" title="帮助" icon="location_on" @click.native="view('help')"/>
            <mu-bottom-nav-item value="about" title="关于" icon="location_on" @click.native="view('about')"/>
        </mu-bottom-nav>
    </footer>
</template>

<script>
    export default {
        data () {
            return {
                bottomNav: 'todo'
            }
        },
        methods: {
            handleChange (val) {
                this.bottomNav = val
            },
            view(value) {
                this.bottomNav = value
                this.$router.push('/' + value)
            }
        }
    }
</script>
