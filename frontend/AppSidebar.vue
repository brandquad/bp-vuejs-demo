<template>
  <aside :class="sidebar.container">
    <nav :class="sidebar.list">
      <router-link v-for="(route, i) in routes"
                   :key="`route-${i}`"
                   :to="{ name: route.name }"
                   :class="sidebar.item"
                   tag="li">
        <a :class="sidebar.link">
          {{ route.name | upperFirstLetter }}
        </a>
      </router-link>
    </nav>
  </aside>
</template>

<script>
  import routes from './routes';

  export default {
    name: 'sidebar',

    filters: {
      upperFirstLetter(name) {
        return name.slice(0, 1).toUpperCase() + name.slice(1);
      }
    },

    computed: {
      routes() {
        const arr = routes.slice();
        arr.pop();
        return arr;
      }
    }
  }
</script>

<style lang="stylus" module="sidebar">
  .container
    padding: $padding
    border: .1rem solid $border-color
    border-radius: $border-radius

  .list
    list-style: none

  .item
    &.active
      display: none
      a
        text-decoration: underline

  .link
    color: $color-default
    &:hover
      color: $color-default
</style>

<style lang="stylus" scoped>
  .router-link-exact-active
    text-decoration: underline
</style>
