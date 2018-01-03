<template>
  <article id="callback">
    <blockquote class="quote">{{ quote }}:</blockquote>
    <dropdown :class="demo.dropdown" :before-open="callback">
      <template slot="btn">Custom callback</template>
      <template slot="body">Callback called!</template>
    </dropdown>
    <pre><code class="code code--html">&lt;dropdown :class="demo.dropdown" :before-open="callback"&gt;<br />  &lt;template slot="btn"&gt;Custom callback&lt;/template&gt;<br />  &lt;template slot="body"&gt;Callback called!&lt;/template&gt;<br />&lt;/dropdown&gt;</code></pre>
    <pre><code class="code code--js">callback: resolve =&gt; {<br />  setTimeout(() =&gt; {<br />    console.log('I\'m called!');<br />    resolve(); // don't forget call resolve!<br />  }, 1000);<br />}</code></pre>
  </article>
</template>

<script>
  import Dropdown from './Dropdown'

  export default {
    components: { Dropdown },

    data() {
      return {
        quote: 'Custom callback',
        callback: resolve => {
          setTimeout(() => {
            console.log('I\'m called!');
            resolve(); // don't forget call resolve!
          }, 1000);
        }
      }
    }
  }
</script>

<style lang="stylus" module="demo">
  .dropdown
    margin: 1rem 0

  .label
    display: flex
    align-items: center
    cursor: pointer
    input[type="checkbox"]
      margin-right: .5rem
</style>
