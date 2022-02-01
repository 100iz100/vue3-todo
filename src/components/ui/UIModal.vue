<template>
  <div v-if="isOpen" class="ui-modal ui-modal__backdrop" @click="close">
    <div class="ui-modal__dialog" @click.stop>
      <h2>Attention!</h2>
      <hr />
      <slot></slot>
      <hr />
      <div class="ui-modal__actions">
        <slot name="actions" :close="close" :confirm="confirm">
          <button @click="close">Cancel</button>
          <button @click="confirm(true)">Ok</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UIModal",
  components: {},
  modalResolver: null,
  expose: ["open"],
  data() {
    return { isOpen: false };
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
    this.close();
  },
  methods: {
    handleKeydown(e) {
      if (this.isOpen && e.key === "Escape") {
        this.close();
      }
    },
    open() {
      let resolve;
      const promise = new Promise((res) => (resolve = res));
      this.$options.modalResolver = { resolve };
      this.isOpen = true;
      return promise;
    },
    confirm(...params) {
      this.$options.modalResolver.resolve(...params);
      this.isOpen = false;
    },
    close() {
      this.confirm(null);
    },
  },
};
</script>

<style scoped lang="scss">
.ui-modal {
  &__backdrop {
    background-color: rgba(0, 0, 0, 0.8);
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100;
  }
  &__dialog {
    background-color: white;
    border-radius: 10px;
    left: 50%;
    left: 50%;
    padding: 20px;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
  }
  h1 {
    margin: 0;
    text-align: center;
  }
  &__actions {
    display: flex;
    gap: 1em;
    justify-content: end;
    text-align: right;
  }
}
</style>
