<template>
  <section id="bp-dropdown">
    <h1>{{ title }}</h1>
    <hr>
    Easy to use
    <Install/>
    <DemoDefault/>
    <DemoAlign/>
    <DemoSublist/>
    <DemoCustomClass/>
    <DemoCallback/>
    <Api/>
  </section>
</template>

<script>
  import Install from '../components/dropdown/Install';
  import DemoDefault from '../components/dropdown/DemoDefault';
  import DemoAlign from '../components/dropdown/DemoAlign';
  import DemoSublist from '../components/dropdown/DemoSublist';
  import DemoCustomClass from '../components/dropdown/DemoCustomClass';
  import DemoCallback from '../components/dropdown/DemoCallback';
  import Api from '../components/dropdown/Api';

  export default {
    name: 'demo-dropdown',

    components: {
      Install,
      DemoDefault,
      DemoAlign,
      DemoSublist,
      DemoCustomClass,
      DemoCallback,
      Api
    },

    data() {
      return {
        title: 'Vuejs dropdown'
      }
    }
  }
</script>
