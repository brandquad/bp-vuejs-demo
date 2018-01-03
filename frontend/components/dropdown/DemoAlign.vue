<template>
  <article id="align">
    <blockquote class="quote">{{ quote }}:</blockquote>
    <dropdown :class="demo.dropdown" :align="'top'">
      <template slot="btn">Top</template>
      <template slot="body">Top align content</template>
    </dropdown>
    <dropdown :class="demo.dropdown" :align="'right'">
      <template slot="btn">Right</template>
      <template slot="body">Right align content</template>
    </dropdown>
    <dropdown :class="demo.dropdown">
      <template slot="btn">Bottom</template>
      <template slot="body">Bottom align content</template>
    </dropdown>
    <dropdown :class="demo.dropdown" :align="'left'">
      <template slot="btn">Left</template>
      <template slot="body">Left align content</template>
    </dropdown>
    <pre><code class="code code--html">&lt;dropdown :class="demo.dropdown" :align="align"&gt;<br />  &lt;template slot="btn"&gt;Align&lt;/template&gt;<br />  &lt;template slot="body"&gt;Custom align content&lt;/template&gt;<br />&lt;/dropdown&gt;</code></pre>
  </article>
</template>

<script>
  import Dropdown from 'bp-vuejs-dropdown/Dropdown';

  export default {
    components: { Dropdown },

    data() {
      return {
        quote: 'Custom align content - top, right, bottom (default), left'
      }
    }
  }
</script>

<style lang="stylus" module="demo">
  .dropdown
    display: inline-block
    margin: 1rem
    margin-left: 0
</style>
