<template>
    <ui-page class="page-about">
        <main class="page-body">
            <div class="container">
                <div>登陆回调</div>
            </div>
        </main>
    </ui-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                version: ''
            }
        },
        mounted() {
//            let code = this.$route.query.code
//            let state = this.$route.query.state
            let accessToken = this.$route.query.accessToken
            this.$storage.set('accessToken', accessToken)
            
            console.log('获取cookie')
            console.log(this.$cookie.get('accessToken'))

            this.$http.get('/login/access_token?access_token=' + accessToken).then(
                response => {
                    let data = response.data
                    this.$storage.set('user', data.user)
                    this.$cookie.set('accessToken', data.accessToken)
                    this.$store.state.user = data.user
                    this.redirect()
                },
                response => {
                    console.log(response)
                })
        },
        methods: {
            redirect() {
                let redirectUri = this.$route.query.redirect_uri
                console.log('准备重定向', redirectUri)
                if (this.getHost(redirectUri) === location.host) {
                    console.log('同样')
                    this.$router.push(redirectUri.replace(location.origin, ''))
                } else {
                    // location.href = redirectUri
                }
                console.log(this.getHost(redirectUri) === location.host, this.getHost(redirectUri), location.host)

            },
            getHost(url) {
                let arr = url.split('/')
                console.log(arr)
                // http://localhost:8080/
                return arr[2]
            }
        }
    }
</script>

<style scoped>
</style>
