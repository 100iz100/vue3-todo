<template>
  <div class="hello">
    <List />
    <!-- <todoList /> -->
  </div>
</template>

<script>
// import todoList from "@/components/todoList.vue";
import List from "./List.vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    List,
    // () => import("./List.vue"),
    // todoList,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
