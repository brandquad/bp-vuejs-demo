<template>
  <article>
    <blockquote class="quote">{{ quote }}:</blockquote>
    <dropdown :class="demo.dropdown">
      <template slot="btn">Button text</template>
      <template slot="body">
        <ul style="margin:0;padding:0;list-style:none">
          <li v-for="i in [1, 2, 3, 4, 5]">
            <label :class="demo.label">
              <input type="checkbox" v-model="m[i]">item {{ i }}
            </label>
          </li>
          <li>
            <input type="checkbox">
            <dropdown :trigger="'hover'" :role="'sublist'" :unscroll="'body'">
              <template slot="btn">Sublist</template>
              <template slot="body">Sublist content</template>
            </dropdown>
          </li>
        </ul>
      </template>
    </dropdown>
    <pre><code class="code code--html">&lt;dropdown&gt;<br />  &lt;template slot="btn"&gt;Button text&lt;/template&gt;<br />  &lt;template slot="body"&gt;<br />    &lt;ul&gt;<br />      &lt;li v-for="i in [1, 2, 3, 4, 5]"&gt;<br />        &lt;label&gt;<br />          &lt;input type="checkbox"&gt;item {{ index }}<br />        &lt;/label&gt;<br />      &lt;/li&gt;<br />      &lt;li&gt;<br />        &lt;input type="checkbox"&gt;<br />        &lt;dropdown :trigger="'hover'" :role="'sublist'"&gt;<br />          &lt;template slot="btn"&gt;Sublist&lt;/template&gt;<br />          &lt;template slot="body"&gt;Sublist content&lt;/template&gt;<br />        &lt;/dropdown&gt;<br />      &lt;/li&gt;<br />    &lt;/ul&gt;<br />  &lt;/template&gt;</code></pre>
  </article>
</template>

<script>
  import Dropdown from './Dropdown'

  export default {
    components: { Dropdown },

    data() {
      return {
        quote: 'Default use',
        m: [false, false, false, false, false],
        index: '{{ i }}'
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

  ul li:last-child
    display: flex
    align-items: center
    input[type="checkbox"]
      margin-right: .5rem
</style>
