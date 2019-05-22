<template>
    <div id="app" class="app">
        <router-view :key="$route.fullPath + $store.state.loginState"/>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>
