<template>
  <article id="sublist">
    <blockquote class="quote">{{ quote }}:</blockquote>
    <dropdown :class="demo.dropdown">
      <template slot="btn">Sublist button</template>
      <template slot="body">
        <ul :class="demo.list" style="margin:0;padding:0;list-style:none">
          <li>Custom item</li>
          <li>
            <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'">
              <template slot="btn">Sublist right</template>
              <template slot="body">
                <ul style="margin:0;padding:0;list-style:none">
                  <li>Custom subitem</li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'">
                    <template slot="btn">Sublist right</template>
                    <template slot="body">Sublist content</template>
                  </dropdown>
                </ul>
              </template>
            </dropdown>
          </li>
          <li>Custom item</li>
          <li>
            <dropdown :trigger="'hover'" :role="'sublist'" :align="'left'">
              <template slot="btn">Sublist left</template>
              <template slot="body">Sublist content</template>
            </dropdown>
          </li>
        </ul>
      </template>
    </dropdown>
    <pre><code class="code code--html">&lt;dropdown&gt;<br />  &lt;template slot="btn"&gt;Sublist button&lt;/template&gt;<br />  &lt;template slot="body"&gt;<br />    &lt;ul&gt;<br />      &lt;li&gt;Custom item&lt;/li&gt;<br />      &lt;li&gt;<br />        &lt;dropdown :trigger="'hover'" :role="'sublist'" :align="'right'"&gt;<br />          &lt;template slot="btn"&gt;Sublist right&lt;/template&gt;<br />          &lt;template slot="body"&gt;<br />            Sublist content<br />            &lt;ul&gt;<br />              &lt;li&gt;Custom subitem&lt;/li&gt;<br />              &lt;dropdown :trigger="'hover'" :role="'sublist'" :align="'right'"&gt;<br />                &lt;template slot="btn"&gt;Sublist right&lt;/template&gt;<br />                &lt;template slot="body"&gt;Sublist content&lt;/template&gt;<br />              &lt;/dropdown&gt;<br />            &lt;/ul&gt;<br />          &lt;/template&gt;<br />        &lt;/dropdown&gt;<br />      &lt;/li&gt;<br />      &lt;li&gt;Custom item&lt;/li&gt;<br />      &lt;li&gt;<br />        &lt;dropdown :trigger="'hover'" :role="'sublist'" :align="'left'"&gt;<br />          &lt;template slot="btn"&gt;Sublist left&lt;/template&gt;<br />          &lt;template slot="body"&gt;Sublist content&lt;/template&gt;<br />        &lt;/dropdown&gt;<br />      &lt;/li&gt;<br />    &lt;/ul&gt;<br />  &lt;/template&gt;<br />&lt;/dropdown&gt;</code></pre>
  </article>
</template>

<script>
  import Dropdown from 'bp-vuejs-dropdown/Dropdown';

  export default {
    components: { Dropdown },

    data() {
      return {
        quote: 'With sublist'
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
    li:last-child
      display: flex
      align-items: center
      input[type="checkbox"]
        margin-right: .5rem
</style>
