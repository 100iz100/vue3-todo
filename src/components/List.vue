<template>
  <div class="list">
    <h2>This is itemList</h2>
    <button @click="openModalCreateHandler">create todo</button>
    <div class="items">
      <Item
        v-for="item in todoList"
        :key="item.id"
        :item="item"
        @completeHandler="completeHandler"
        @editTodo="editTodo"
      />
      <UIModalVue ref="createTodo">
        <template #default>
          <input type="checkbox" v-model="todo.completed" />
          <input type="text" v-model="todo.title" />
          <input type="text" v-model="todo.description" />
        </template>
      </UIModalVue>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UIModalVue from "./ui/UIModal.vue";

export default {
  name: "List",
  components: {
    Item: () => import("./Item.vue"),
    UIModalVue,
  },
  data: () => ({
    todo: {
      title: "",
      description: "",
      completed: false,
    },
    defaultTodo: {
      title: "",
      description: "",
      completed: false,
    },
  }),
  methods: {
    async openModalCreateHandler() {
      const { createTodo } = this.$refs;      
      const res = await createTodo.open();
      if (res) {
        this.$store.dispatch("todo/POST_TODO", this.todo);
      }
      console.log(res);
    },

    completeHandler({ id, payload }) {
      this.$store.dispatch("todo/PATCH_TODO", { id, payload });
    },
    async editTodo(itemList) {
      Object.keys(this.todo).forEach((key) => (this.todo[key] = itemList[key]));
      const { createTodo } = this.$refs;
      const { _id: id, title, description, completed } = itemList;
      const payload = { title, description, completed };
      const res = await createTodo.open();
      if (res) {
        this.$store.dispatch("todo/PUT_TODO", { id, payload });
      }
      Object.keys(this.todo).forEach(
        (key) => (this.todo[key] = this.defaultTodo[key])
      );
    },
  },
  computed: {
    ...mapState("todo", ["todoList"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list {
  .items {
    height: 400px;
    overflow: scroll;
    border: 1px solid blue;
  }
}
</style>
