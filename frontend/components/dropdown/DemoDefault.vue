<template>
  <article id="default">
    <blockquote class="quote">{{ quote }}:</blockquote>
    <dropdown :class="demo.dropdown">
      <template slot="btn">Custom btn text</template>
      <template slot="body">
        <ul :class="demo.list">
          <li v-for="i in [1, 2, 3, 4, 5]">
            <label :class="demo.label">
              <input type="checkbox" v-model="m[i]">item {{ i }}
            </label>
          </li>
        </ul>
      </template>
    </dropdown>
    <pre><code class="code code--html">&lt;dropdown&gt;<br />  &lt;template slot="btn"&gt;Button text&lt;/template&gt;<br />  &lt;template slot="body"&gt;<br />    &lt;ul&gt;<br />      &lt;li v-for="i in [1, 2, 3, 4, 5]"&gt;<br />        &lt;label&gt;<br />          &lt;input type="checkbox"&gt;item {{ index }}<br />        &lt;/label&gt;<br />      &lt;/li&gt;<br />    &lt;/ul&gt;<br />  &lt;/template&gt;<br>&lt;/dropdown&gt;</code></pre>
  </article>
</template>

<script>
  import Dropdown from 'bp-vuejs-dropdown';

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

  .list
    margin: 0
    padding: 0
    list-style:none
    li:last-child
      display: flex
      align-items: center
      input[type="checkbox"]
        margin-right: .5rem
</style>
