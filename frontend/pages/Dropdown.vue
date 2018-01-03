<template>
  <section id="bp-dropdown">
    <h1>{{ title }}</h1>
    <hr>
    <DemoDefault/>
  </section>
</template>

<script>
  import DemoDefault from '../components/dropdown/DemoDefault';

  export default {
    name: 'demo-dropdown',

    components: {
      DemoDefault
    },

    data() {
      return {
        title: 'Vuejs dropdown'
      }
    }
  }
</script>
