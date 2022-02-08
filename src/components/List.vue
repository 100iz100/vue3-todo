<template>
  <div class="list">
    <h2>This is itemList</h2>
    <button @click="openModalCreateHandler">create todo</button>
    <div class="list-items">
      <div v-if="todoList.length && !loading">
        <Item
          v-for="item in todoList"
          :key="item.id"
          :item="item"
          @completeHandler="completeHandler"
          @editTodo="editTodo"
          @removeTodo="removeTodoHandler"
        />
      </div>

      <div v-else-if="!todoList.length && !loading"><h2>NO CONTENT!</h2></div>
      <div v-else class="list-loader">
        <UIloader width="50px" height="50px" />
      </div>

      <UIModalVue ref="createTodo">
        <template #default>
          <input type="checkbox" v-model="todo.completed" />
          <input type="text" v-model="todo.title" />
          <input type="text" v-model="todo.description" />
        </template>
      </UIModalVue>
      <UIModalVue ref="removeTodo">
        <template #default>
          <h1>Are you sure you want to delete this todo {{ todo.title }}?</h1>
        </template>
      </UIModalVue>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Item from "./Item.vue";
import UIModalVue from "./ui/modal/UIModal.vue";

export default {
  name: "List",
  components: {
    Item,
    UIModalVue,
    UIloader: () => import("./ui/loader/UIloader.vue"),
  },
  data: () => ({
    loading: false,
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
      const { _id: id } = itemList;

      const res = await createTodo.open();
      if (res) {
        const payload = { ...this.todo };
        this.$store.dispatch("todo/PUT_TODO", { id, payload });
      }
      this.clearData();
    },
    async getData() {
      this.loading = true;
      const res = await this.$store.dispatch("todo/GET_TODO_LIST");
      console.log(res);
      this.loading = false;
    },
    async removeTodoHandler(todo) {
      const { _id: id } = todo;
      this.fillingData(todo);
      const { removeTodo } = this.$refs;
      const res = await removeTodo.open();
      if (res) {
        console.log(id);
        // this.$store.dispatch("todo/DELETE_TODO", this.todo);
      }
      this.clearData();
      console.log(res);
    },
    fillingData(todo) {
      Object.keys(this.todo).forEach((key) => (this.todo[key] = todo[key]));
    },
    clearData() {
      Object.keys(this.todo).forEach(
        (key) => (this.todo[key] = this.defaultTodo[key])
      );
    },
  },
  beforeMount() {
    // this.$store.dispatch("todo/GET_TODO_LIST");
    this.getData();
  },

  computed: {
    ...mapState("todo", ["todoList"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list {
  &-items {
    height: 400px;
    overflow: scroll;
    border: 1px solid blue;
    border-radius: 10px;
    position: relative;
  }

}
.image-active {
  // background: ;
  position: absolute;
  top: 40%;
  left: 43%;
}
</style>
