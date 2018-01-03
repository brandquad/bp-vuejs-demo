<template>
  <div class="bp-dropdown" :class="className">
    <span :class="{ [`bp-dropdown__${(role) ? 'sub' : 'btn'}`]: true, [`bp-dropdown__${(role) ? 'sub' : 'btn'}--active`]: !isHidden, [`${className}-bp__btn`]: className }"
          @click="_onToggle"
          @mouseenter="_onBtnEnter"
          @mouseleave="_onBtnLeave">
      <slot name="btn"></slot>
      <slot v-if="isArrow" name="icon">
        <svg class="bp-dropdown__icon"
             viewBox="0 0 256 512">
            <path fill="currentColor" d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z"></path>
        </svg>
      </slot>
    </span>
    <transition name="fade">
      <div class="bp-dropdown__body"
           v-if="!isHidden"
           :id="id"
           :style="{ minWidth: `${width}px`, top: `${top}px`, left: `${left}px` }"
           :class="{ [`${className}-bp__body`]: className }"
           @click="_onBodyClick"
           @mouseenter="_onBodyEnter"
           @mouseleave="_onBodyLeave">
        <slot name="body"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'bp-vuejs-dropdown',

    props: {
      role: {
        type: String,
        required: false,
        default: ''
      },

      isHideBodyOverflow: {
        type: Boolean,
        required: false,
        default: false
      },

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

        id: null,
        timeout: null,

        top: undefined,
        right: undefined,
        bottom: undefined,
        left: undefined,
        width: undefined
      }
    },

    watch: {
      isHidden(isHidden) {
        if (this.isHideBodyOverflow) {
          document.body.style.overflow = (!isHidden) ? 'hidden' : '';
        }
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
            $root.$emit('bq-dropdown:hide');
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

      _onToggle(e) {
        if (this.trigger !== 'click') {
          return;
        }

        this.checkCustomCallback(e);
      },

      _onBtnEnter(e) {
        if (this.trigger !== 'hover' || !this.isHidden) {
          return;
        }

        this.checkCustomCallback(e);
      },

      _onBtnLeave(e) {
        if (this.trigger !== 'hover') {
          return;
        }

        if (this.role) {
          this.timeout = setTimeout(() => this.isHidden = true, 100);
        }

        const to = e.toElement;
        if (!to) {
          return;
        }

        const isDropdown = to.closest('.bp-dropdown__btn') || to.closest('.bp-dropdown__body');
        if (isDropdown) {
          return;
        }

        this.prepare();
      },

      _onBodyClick() {
        if (this.closeOnClick) {
          this.isHidden = true;
        }
      },

      _onBodyEnter() {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
      },

      _onBodyLeave(e) {
        if (this.trigger !== 'hover') {
          return;
        }

        const to = e.toElement;
        if (to.closest('.bp-dropdown__btn') || to.closest('.bp-dropdown__sub')) {
          return;
        }

        this.prepare();
      },

      checkCustomCallback(e) {
        if (!this.isHidden) {
          this.prepare();
          return;
        }

        // --- custom callback before open
        const promise = new Promise(resolve => {
          this.beforeOpen.call(this, resolve);
        });

        promise.then(() => {
          if (!e.target.closest('.bp-dropdown__body')) {
            // --- hide dropdown if other dropdowns show
            this.$root.$emit('bq-dropdown:open');
          }

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
          top: el.top - pageYOffset,
          left: el.left - pageXOffset
        };
      }
    }
  }
</script>

<style>
  .bp-dropdown__btn {
    display: inline-flex;
    align-items: center;
    padding: 3px 5px;
    border: 1px solid #efefef;
    cursor: pointer;
    transition: background-color .1s ease;
  }

  .bp-dropdown__sub {
    display: inline-flex;
    align-items: center;
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
    position: fixed;
    top: 0;
    left: 0;
    padding: 6px 8px;
    background-color: #fff;
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, .5);
    z-index: 9999;
  }

  .bp-dropdown__btn--active .bp-dropdown__icon {
    transform: rotate(-180deg);
  }

  .bp-dropdown__sub--active .bp-dropdown__icon {
    transform: rotate(-180deg);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
