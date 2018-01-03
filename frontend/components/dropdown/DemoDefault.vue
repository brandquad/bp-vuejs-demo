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
        </ul>
      </template>
    </dropdown>
    <pre><code class="code code--html">&lt;dropdown&gt;
  &lt;template slot="btn"&gt;Button text&lt;/template&gt;
  &lt;template slot="body"&gt;
      &lt;ul style="margin:0;padding:0;list-style:none"&gt;
      &lt;li&gt;&lt;input type="checkbox"&gt;item 1&lt;/li&gt;
      &lt;li&gt;&lt;input type="checkbox"&gt;item 2&lt;/li&gt;
      &lt;li&gt;&lt;input type="checkbox"&gt;item 3&lt;/li&gt;
      &lt;/ul&gt;
  &lt;/template&gt;
&lt;/dropdown&gt;</code></pre>
  </article>
</template>

<script>
  import Dropdown from './Dropdown'

  export default {
    components: { Dropdown },

    data() {
      return {
        quote: 'Default use',
        m: [false, false, false, false, false]
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
