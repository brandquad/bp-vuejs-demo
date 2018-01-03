<template>
  <aside :class="sidebar.container">
    <nav :class="sidebar.list">
      <router-link :to="{ name: 'home' }" :class="sidebar.item" tag="li">
        <a :class="sidebar.link">Home</a>
      </router-link>
      <router-link :to="{ name: 'dropdown' }" :class="sidebar.item" tag="li">
        <a :class="sidebar.link">Dropdown</a>
        <ul v-if="$route.name && $route.name.includes('dropdown')" :class="sidebar.sublist">
          <router-link :to="{ name: 'dropdown-demo', params: { anchor: 'install' }, props: true }"
                       :class="sidebar.item" tag="li">
            <a :class="sidebar.link">Install</a>
          </router-link>
          <router-link :to="{ name: 'dropdown-demo', params: { anchor: 'default' }, props: true }"
                       :class="sidebar.item" tag="li">
            <a :class="sidebar.link">Default use</a>
          </router-link>
          <router-link :to="{ name: 'dropdown-demo', params: { anchor: 'align' }, props: true }"
                       :class="sidebar.item" tag="li">
            <a :class="sidebar.link">Custom align</a>
          </router-link>
          <router-link :to="{ name: 'dropdown-demo', params: { anchor: 'sublist' }, props: true }"
                       :class="sidebar.item" tag="li">
            <a :class="sidebar.link">With sublist</a>
          </router-link>
          <router-link :to="{ name: 'dropdown-demo', params: { anchor: 'customclass' }, props: true }"
                       :class="sidebar.item" tag="li">
            <a :class="sidebar.link">Custom class</a>
          </router-link>
          <router-link :to="{ name: 'dropdown-demo', params: { anchor: 'callback' }, props: true }"
                       :class="sidebar.item" tag="li">
            <a :class="sidebar.link">Custom callback</a>
          </router-link>
          <router-link :to="{ name: 'dropdown-demo', params: { anchor: 'api' }, props: true }"
                       :class="sidebar.item" tag="li">
            <a :class="sidebar.link">Api</a>
          </router-link>
        </ul>
      </router-link>
    </nav>
  </aside>
</template>

<script>
  export default {
    name: 'sidebar'
  }
</script>

<style lang="stylus" module="sidebar">
  .container
    padding: $padding
    border: .1rem solid $border-color
    border-radius: $border-radius

  .list
    list-style: none

  .link
    color: $color-default
    &:hover
      color: $color-default

  .sublist
    padding-left: 3rem
</style>

<style lang="stylus" scoped>
  .router-link-exact-active
    > a
      text-decoration: underline
</style>
