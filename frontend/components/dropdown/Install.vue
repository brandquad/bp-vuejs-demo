<template>
  <article id="install">
    <blockquote class="quote">{{ quote }}:</blockquote>
    <pre><code class="code">npm i -D bp-vuejs-dropdown</code></pre>
    <pre><code class="code code--js">import Vue from 'vue';<br>import Dropdown from 'bp-vuejs-dropdown';<br><br>// global<br>Vue.use(Dropdown)<br><br>// local<br>components: { Dropdown }</code></pre>
  </article>
</template>

<script>
  export default {
    data() {
      return {
        quote: 'Install'
      }
    }
  }
</script>
