<template>
    <ui-page name="about" title="关于">
        <div class="about-box">
            <img class="logo" src="/static/img/logo.jpg">
            <div class="version">TODO v1.1.2</div>
            <div class="copyright">© 2018 <a href="https://yunser.com">云设</a></div>
        </div>
    </ui-page>
</template>

<script>
    export default {
        data () {
            return {
            }
        }
    }
</script>

<style lang="scss" scoped>
    .about-box {
        text-align: center;
    }
    .logo {
        display: block;
        margin: 80px auto 16px auto;
    }
    .version {
        color: #999;
    }
    .copyright {
        position: absolute;
        bottom: 16px;
        width: 100%;
        text-align: center;
        a {
            color: inherit;
        }
    }
</style>
