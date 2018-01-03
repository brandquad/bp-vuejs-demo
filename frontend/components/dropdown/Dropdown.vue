<docs>
  Dropdown.vue

  This had better be a single object written in Vue, if you like your job.
  Polluting the global space with objects is not good citizenship.
  Have a nice day.
  -- Management

  @license The Unlicense, http://unlicense.org/
  @version 1.0
  @author  The Boris Butenko Authors, https://github.com/borisbutenko/
  @updated 2018-01-03
  @link    url goes here
</docs>

<template>
  <div class="bp-dropdown" :class="className">
    <span class="bp-dropdown__btn"
          :class="{ ['bp-dropdown__btn--active']: !isHidden, [`${className}-bp__btn`]: className }"
          @click="toggle"
          @mouseenter=""
          @mouseleave="">
      <slot name="btn"></slot>
      <slot v-if="isArrow" name="icon">
        <svg class="bp-dropdown__icon"
             viewBox="0 0 256 512">
            <path fill="currentColor" d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z"></path>
        </svg>
      </slot>
    </span>
    <transition name="fade">
      <keep-alive>
        <div class="bp-dropdown__body"
             v-if="!isHidden"
             :id="id"
             :style="{ minWidth: `${width}px`, top: `${top}px`, left: `${left}px` }"
             :class="{ [`${className}-bp__body`]: className }"
             @click=""
             @mouseleave="">
          <slot name="body"></slot>
        </div>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'bp-vuejs-dropdown',

    props: {
      beforeOpen: {
        type: Function,
        required: false,
        default: resolve => resolve()
      },
      trigger: {
        type: String,
        required: false,
        default: 'click'
      },
      closeOnClick: {
        type: Boolean,
        required: false,
        default: false
      },
      isArrow: {
        type: Boolean,
        required: false,
        default: true
      },
      className: {
        type: String,
        required: false,
        default: ''
      },
    },

    data() {
      return {
        isHidden: true,
        isAppended: false,

        id: null,

        top: undefined,
        right: undefined,
        bottom: undefined,
        left: undefined,
        width: undefined
      }
    },

    created() {
      const $root = this.$root;

      // --- hide dropdown if other dropdowns show
      // --- or document clicked
      $root.$on('bq-dropdown:open', () => this.isHidden = true);
      $root.$on('bq-dropdown:hide', () => this.isHidden = true);

      // --- hide dropdown on document click event
      if (this.trigger === 'click' && !$root['is-bp-dropdown']) {
        Object.defineProperty($root, 'is-bp-dropdown', {
          enumerable: false,
          configurable: false,
          writable: false,
          value: true
        });

        document.onclick = (e) => {
          const target = e.target;
          const dropdown = target.closest('.bp-dropdown__btn') || target.closest('.bp-dropdown__body');

          if (!dropdown) {
            $root.$emit('bq-dropdown:hide')
          }
        }
      }

      this.id = 'bq-dropdown-' + this.generateRandomId();
    },

    methods: {
      // --- generate random id for query selector
      generateRandomId() {
        return Math.random().toString(36).substr(2, 10);
      },

      toggle() {
        if (this.trigger !== 'click') {
          return;
        }

        this.checkCustomCallback();
      },

      checkCustomCallback() {
        if (!this.isHidden) {
          this.prepare();
          return;
        }

        // --- custom callback before open
        const promise = new Promise(resolve => {
          this.beforeOpen.call(this, resolve);
        });

        // --- hide dropdown if other dropdowns show
        promise.then(() => {
          this.$root.$emit('bq-dropdown:open');
          setTimeout(this.prepare, 0);
        });

        promise.catch(() => { throw Error('bq-dropdown promise error') });
      },

      prepare() {
        this.isHidden = !this.isHidden;
        if (!this.isHidden) {
          this.$nextTick(() => {
            const button = this.$el.firstElementChild;
            const container = document.getElementById(this.id);

            // --- if not in body
            if (!this.isAppended) {
              this.isAppended = true;
              document.body.appendChild(container);
            }

            this.setWidth(button.offsetWidth);
            this.setPosition(button, container);
          });
        }
      },

      setWidth(width) {
        this.width = width;
      },

      setPosition(btn, body) {
        const coords = this.getCoords(btn);

        // --- current position
        const currentTop = coords.top;
        const currentLeft = coords.left;

        // --- btn size
        const btnWidth = btn.offsetWidth;
        const btnHeight = btn.offsetHeight;

        // --- body size
        const bodyWidth = body.offsetWidth;
        const bodyHeight = body.offsetHeight;

        this.top =
          // --- if behind bottom
          ((currentTop + btnHeight + bodyHeight) >= innerHeight) ?
            (currentTop + pageYOffset - bodyHeight) :
            (currentTop + pageYOffset + btnHeight);

        this.left =
          // --- if behind left
          ((currentLeft + bodyWidth) >= innerWidth) ?
            (currentLeft + pageXOffset - bodyWidth + btnWidth) :
            (currentLeft + pageXOffset);
      },

      getCoords(el) {
        el = el.getBoundingClientRect();
        return {
          top: el.top,
          left: el.left
        };
      }
    }
  }
</script>

<!--<script>-->
  <!--export default {-->
    <!--name: 'bp-vuejs-dropdown',-->

    <!--props: {-->
      <!--beforeOpen: {-->
        <!--type: Function,-->
        <!--required: false,-->
        <!--default: resolve => resolve()-->
      <!--},-->
      <!--trigger: {-->
        <!--type: String,-->
        <!--required: false,-->
        <!--default: 'click'-->
      <!--},-->
      <!--closeOnClick: {-->
        <!--type: Boolean,-->
        <!--required: false,-->
        <!--default: false-->
      <!--},-->
      <!--isArrow: {-->
        <!--type: Boolean,-->
        <!--required: false,-->
        <!--default: true-->
      <!--},-->
      <!--className: {-->
        <!--type: String,-->
        <!--required: false,-->
        <!--default: ''-->
      <!--},-->
    <!--},-->

    <!--data() {-->
      <!--return {-->
        <!--isHidden: true,-->
        <!--isAppended: false,-->
        <!--generatedId: undefined,-->
        <!--positionTop: undefined,-->
        <!--positionLeft: undefined,-->
        <!--minWidth: undefined-->
      <!--}-->
    <!--},-->

    <!--created() {-->
      <!--const $root = this.$root;-->
      <!--// -&#45;&#45; hide dropdown on show other dropdowns-->
      <!--$root.$on('bq-dropdown:hide', () => this.isHidden = true);-->
      <!--// -&#45;&#45; hide dropdown on document click event-->
      <!--if (this.trigger === 'click' && !$root.bqDropdown) {-->
        <!--$root.bqDropdown = true;-->
        <!--document.onclick = (e) => {-->
          <!--let target = e.target;-->
          <!--let dropdown = target.closest('.bp-dropdown__btn') || target.closest('.bp-dropdown__body');-->
          <!--if (dropdown) {-->
            <!--return;-->
          <!--}-->
          <!--this.$root.$emit('bq-dropdown:hide');-->
        <!--}-->
      <!--}-->
      <!--this.generateRandomId();-->
    <!--},-->

    <!--methods: {-->
      <!--// -&#45;&#45; generate random id for dropdown body position-->
      <!--generateRandomId() {-->
        <!--this.generatedId = `bq-dropdown-${Math.random().toString(36).substr(2, 10)}`;-->
      <!--},-->

      <!--toggle() {-->
        <!--if (this.trigger !== 'click') {-->
          <!--return;-->
        <!--}-->
        <!--this.checkCustomCallback();-->
      <!--},-->

      <!--_onMouseenter() {-->
        <!--if (this.trigger !== 'hover' || !this.isHidden) {-->
          <!--return;-->
        <!--}-->
        <!--this.checkCustomCallback();-->
      <!--},-->

      <!--_onMouseleave(e) {-->
        <!--if (this.trigger !== 'hover') {-->
          <!--return;-->
        <!--}-->
        <!--let toElement = e.toElement;-->
        <!--if (!toElement) {-->
          <!--return;-->
        <!--}-->
        <!--let isDropdown = toElement.closest('.bp-dropdown__btn') || toElement.closest('.bp-dropdown__body');-->
        <!--if (isDropdown) {-->
          <!--return;-->
        <!--}-->
        <!--this.prepare();-->
      <!--},-->

      <!--_onBodyClick() {-->
        <!--if (this.closeOnClick) {-->
          <!--this.isHidden = true;-->
        <!--}-->
      <!--},-->

      <!--checkCustomCallback() {-->
        <!--if (this.isHidden) {-->
          <!--// -&#45;&#45; custom callback before open-->
          <!--new Promise((resolve, reject) => {-->
            <!--this.beforeOpen.call(this, resolve);-->
          <!--}).then(() => {-->
            <!--// -&#45;&#45; hide dropdown on show other dropdowns-->
            <!--this.$root.$emit('bq-dropdown:hide');-->
            <!--this.prepare();-->
          <!--})-->
            <!--.catch(() => { throw Error('bq-dropdown promise error') });-->
        <!--}-->
        <!--else {-->
          <!--this.prepare();-->
        <!--}-->
      <!--},-->

      <!--prepare() {-->
        <!--// -&#45;&#45; because we're have promise-->
        <!--setTimeout(() => {-->
          <!--this.isHidden = !this.isHidden;-->
          <!--if (!this.isHidden) {-->
            <!--// -&#45;&#45; because body is not in DOM-->
            <!--setTimeout(this.setPosition, 0);-->
          <!--}-->
        <!--});-->
      <!--},-->

      <!--setPosition() {-->
        <!--const button = this.$el.firstElementChild;-->
        <!--const container = document.getElementById(this.generatedId);-->
        <!--// -&#45;&#45; if already in body-->
        <!--if (!this.isAppended) {-->
          <!--document.body.appendChild(container);-->
          <!--this.isAppended = true;-->
        <!--}-->
        <!--const windowWidth = innerWidth;-->
        <!--const windowHeight = innerHeight;-->
        <!--const coords = this.getBoundingCoords(button);-->
        <!--const bodyWidth = container.offsetWidth;-->
        <!--const bodyHeight = container.offsetHeight;-->
        <!--let currentTop = coords.top;-->
        <!--let currentLeft = coords.left;-->

        <!--this.minWidth = button.offsetWidth;-->

        <!--this.positionTop =-->
          <!--// -&#45;&#45; if behind bottom-->
          <!--((currentTop + button.offsetHeight + bodyHeight) >= windowHeight) ?-->
            <!--(currentTop + pageYOffset - bodyHeight) :-->
            <!--(currentTop + pageYOffset + button.offsetHeight);-->
        <!--this.positionLeft =-->
          <!--// -&#45;&#45; if behind left-->
          <!--((currentLeft + bodyWidth) >= windowWidth) ?-->
            <!--(currentLeft + pageXOffset - bodyWidth + button.offsetWidth) :-->
            <!--(currentLeft + pageXOffset);-->
      <!--},-->

      <!--// -&#45;&#45; get element coordinates of Window-->
      <!--getBoundingCoords(element) {-->
        <!--element = element.getBoundingClientRect();-->
        <!--return {-->
          <!--top: element.top,-->
          <!--left: element.left-->
        <!--};-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->

<style>
  .bp-dropdown__btn {
    display: inline-flex;
    align-items: center;
    padding: 3px 5px;
    border: 1px solid #efefef;
    cursor: pointer;
    transition: background-color .1s ease;
  }
  .bp-dropdown__btn--active {
    background-color: #eee;
  }
  .bp-dropdown__icon {
    display: inline-block;
    width: 15px;
    height: 15px;
    overflow: visible;
    transition: transform .1s ease;
  }
  .bp-dropdown__body {
    position: absolute;
    top: 0;
    left: 0;
    padding: 6px 8px;
    background-color: #fff;
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, .5);
  }
  .bp-dropdown__btn--active .bp-dropdown__icon {
    transform: rotate(-180deg);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
