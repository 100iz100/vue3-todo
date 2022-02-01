<template>
  <div class="item">
    <button @click="$emit('editTodo', item)">Edit</button>
    <h3>{{ item.title }}</h3>
    <!-- <span>{{ item.price }}</span> -->
    <input
      type="checkbox"
      :checked="item.completed"
      @input="
        $emit('completeHandler', {
          id: item._id,
          payload: { completed: !item.completed },
        })
      "
    />
    <p>{{ item.description }}</p>

  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    item: Object,
    default: () => ({}),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.item {
  margin: 40px 0 0;
  // display:
  position: relative;
  span {
    position: absolute;
    top: 0;
    right: 0;
  }
  h3 {
    color: green;
  }
}
</style>
