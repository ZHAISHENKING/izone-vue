<template>
    <div>
        <div class="layout">
            <Layout>
                <Header>
                    <NavMenu/>
                </Header>
                <Content style="padding: 60px 100px; min-height:550px;">
                    <router-view></router-view>
                </Content>
            </Layout>
            <Footer class="layout-footer-center">2019 &copy; ZHAISHENKING</Footer>
        </div>
    </div>
</template>

<script>
    import NavMenu from '../components/NavMenu.vue'

    export default {
        name: 'home',
        data(){
            return {
            }
        },
        components: {
            NavMenu
        },
        methods:{
            routeChange(){}
        },
        watch:{
            '$route':"routeChange"
        }
    }
</script>

<style>
    [v-cloak]{
        display: none;
    }

    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>