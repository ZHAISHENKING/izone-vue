<template>
  <div id="app">
      <div class="layout">
          <Layout>
              <Header>
                  <NavMenu/>
              </Header>
              <Content :style="{padding: '0 50px'}">
                  <router-view></router-view>
              </Content>
          </Layout>
          <Footer class="layout-footer-center">2019 &copy; ZHAISHENKING</Footer>
      </div>
  </div>
</template>

<script>
import NavMenu from './components/NavMenu.vue'

export default {
  name: 'app',
  components: {
      NavMenu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
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
