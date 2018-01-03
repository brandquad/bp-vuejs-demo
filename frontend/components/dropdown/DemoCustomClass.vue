<template>
  <article id="customclass">
    <blockquote class="quote">{{ quote }}:</blockquote>
    <dropdown :class="demo.dropdown" :class-name="'my-class'" :unscroll="'main'">
      <template slot="body">
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut dolore, eveniet excepturi facere fugiat id
          itaque necessitatibus sit suscipit! Amet assumenda commodi doloremque ducimus eveniet maxime neque obcaecati
          voluptate.
        </div>
      </template>
    </dropdown>
    <pre><code class="code code--html">&lt;dropdown :class-name="'my-class'" :unscroll="'main'"&gt;<br />  &lt;template slot="body"&gt;Lorem...&lt;/template&gt;<br />&lt;/dropdown&gt;</code></pre>
    <pre><code class="code code--css">.my-class-bp__btn {<br />  background: lightgray;<br />}<br /><br />.my-class-bp__btn--active {<br />  background: #fff;<br />}<br /><br />.my-class-bp__body {<br />  width: 20rem; <br />  padding: 2rem; <br />  font-size: 1.6rem;<br />}</code></pre>
  </article>
</template>

<script>
  import Dropdown from 'bp-vuejs-dropdown';

  export default {
    components: { Dropdown },

    data() {
      return {
        quote: 'Custom class (my-class)'
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

<style>
  .my-class-bp__btn {
    background: lightgray;
  }

  .my-class-bp__btn--active {
    background: #fff;
  }

  .my-class-bp__body {
    width: 30rem;
    padding: 2rem;
    font-size: 1.6rem;
  }
</style>
