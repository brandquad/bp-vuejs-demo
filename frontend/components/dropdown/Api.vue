<template>
  <article id="api">
    <blockquote class="quote">{{ quote }}:</blockquote>
    <div :class="api.props" v-for="(prop, i) in props" :key="`prop-${i}`">
      <h3 :class="api.title">{{ prop.name }}</h3>
      <ul :class="api.list">
        <li>Type: <code>{{ prop.type }}</code></li>
        <li>Default: <code>{{ prop.default }}</code></li>
      </ul>
      <p>{{ prop.desc }}</p>
      <pre>
        <code v-for="(code, key) of prop.code" class="code" :class="`code--${key}`" v-html="code"></code>
      </pre>
    </div>
    <div :class="api.props">
      <h3 :class="api.title">Close dropdown programmatically</h3>
      <pre>
        <code class="code code--js">// global<br>$root.$emit('bp-dropdown:hide')<br>// local<br>&lt;dropdown ref="dropdown"&gt;&lt;/dropdown&gt;<br>$refs.dropdown.isHidden = true</code>
      </pre>
    </div>
  </article>
</template>

<script>
  export default {
    data() {
      return {
        quote: 'API',
        props: [
          {
            name: 'role',
            type: 'string',
            default: '\'\'',
            code: {
              html: '&lt;dropdown :role="\'sublist\'"&gt;&lt;/dropdown&gt;'
            },
            desc: 'For create sublists'
          },
          {
            name: 'unscroll',
            type: '[HTMLElement, String]',
            default: 'null',
            code: {
              html: '&lt;dropdown :unscroll="element"&gt;&lt;/dropdown&gt;<br>&lt;dropdown :unscroll="\'selector\'"&gt;&lt;/dropdown&gt;'
            },
            desc: 'If you want to add the "overflow: hidden" property when dropdown open'
          },
          {
            name: 'align',
            type: 'string',
            default: 'bottom',
            code: {
              html: '&lt;dropdown :align="\'top/right/left\'"&gt;&lt;/dropdown&gt;'
            },
            desc: 'Dropdown body positioning'
          },
          {
            name: 'x',
            type: 'number',
            default: '0',
            code: {
              html: '&lt;dropdown :x="-10"&gt;&lt;/dropdown&gt;'
            },
            desc: 'Offset x'
          },
          {
            name: 'y',
            type: 'number',
            default: '0',
            code: {
              html: '&lt;dropdown :y="25"&gt;&lt;/dropdown&gt;'
            },
            desc: 'Offset y'
          },
          {
            name: 'beforeOpen',
            type: 'function',
            default: 'resolve => resolve()',
            code: {
              html: '&lt;dropdown :before-open="callback"&gt;&lt;/dropdown&gt;',
              js: 'callback: resolve =&gt; {<br />  setTimeout(() =&gt; {<br />    console.log(\'I\\\'m called!\');<br />    resolve(); // don\'t forget call resolve!<br />  }, 1000);<br />}'
            },
            desc: 'Promise\'s callback. Its called before open dropdown'
          },
          {
            name: 'trigger',
            type: 'string',
            default: 'click',
            code: {
              html: '&lt;dropdown :trigger="\'hover\'"&gt;&lt;/dropdown&gt;'
            },
            desc: 'Open dropdown trigger'
          },
          {
            name: 'closeOnClick',
            type: 'boolean',
            default: 'false',
            code: {
              html: '&lt;dropdown :close-on-click="true"&gt;&lt;/dropdown&gt;'
            },
            desc: 'Close dropdown on body clicked'
          },
          {
            name: 'isIcon',
            type: 'boolean',
            default: 'true',
            code: {
              html: '&lt;dropdown :is-icon="false"&gt;&lt;/dropdown&gt;<br>// or<br>&lt;slot name="icon"&gt;custom icon&lt;/slot&gt;'
            },
            desc: 'Dropdown button icon'
          },
          {
            name: 'className',
            type: 'string',
            default: '',
            code: {
              html: '&lt;dropdown :class-name="\'my-class\'"&gt;&lt;/dropdown&gt;',
              css: '// output<br>.my-class {}<br>.my-class-bp__btn {}<br />.my-class-bp__btn--active {}<br />.my-class-bp__body {}'
            },
            desc: 'Custom class name for dropdown elements'
          }
        ]
      }
    }
  }
</script>

<style lang="stylus" module="api">
  .props
    p
      margin-bottom: 0
      margin-left: .5rem
      + pre > code
        margin-bottom: .5rem
        &:last-child
          margin-bottom: 0

  .title
    position: relative
    &::before
      content: ':'
      font-size: 1.2em
      margin-right: .5rem

  .list
    li
      display: list-item !important
      > code
        color: #e96900
        padding: .3rem .5rem
        border-radius: .2rem
        white-space: nowrap
</style>
