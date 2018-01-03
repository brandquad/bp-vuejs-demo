<template>
  <section id="bp-vuejs-app" :class="app.wrapper">
    <Sidebar :class="app.sidebar"/>
    <main :class="app.center">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </main>
  </section>
</template>

<script>
  import Sidebar from './AppSidebar';

  export default {
    name: 'app',

    components: { Sidebar }
  }
</script>

<style lang="stylus" src="./main.styl"></style>

<style lang="stylus" module="app">
  .wrapper
    display: flex
    height: 100vh
    padding: $padding
    overflow: hidden

  .sidebar
    flex-basis: 15rem

  .center
    flex: 1 0 auto
    padding: $padding
    overflow: auto
</style>
