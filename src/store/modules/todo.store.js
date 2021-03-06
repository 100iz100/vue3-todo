import { api } from "../../helpers/api";

const state = {
  todoList: [],
};
const mutations = {
  SET_TODO_LIST: (state, payload) => {
    state.todoList = payload;
  },
};

const actions = {
  // GET_TODO_LIST({ commit }) {
  //   api
  //     .get("todos")
  //     .then((res) => {
  //       console.log(res);
  //       commit("SET_TODO_LIST", res.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // },

  GET_TODO_LIST({ commit }) {
    let response;
    return new Promise((res) => {
      response = res;
      api
        .get("todos")
        .then((res) => {
          console.log(res);
          commit("SET_TODO_LIST", res.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          response(true);
        });
    });
  },

  POST_TODO({ dispatch }, payload) {
    api
      .post("todos", payload)
      .then(() => {
        dispatch("GET_TODO_LIST");
      })
      .catch((error) => {
        console.error(error);
      });
  },

  PATCH_TODO({ dispatch }, { id, payload }) {
    api
      .patch(`todos/${id}`, payload)
      .then(() => {
        dispatch("GET_TODO_LIST");
      })
      .catch((error) => {
        console.error(error);
      });
  },
  PUT_TODO({ dispatch }, { id, payload }) {
    api
      .put(`todos/${id}`, payload)
      .then(() => {
        dispatch("GET_TODO_LIST");
      })
      .catch((error) => {
        console.error(error);
      });
  },
  DELETE_TODO({ dispatch }, id) {
    api
      .delete(`todos/${id}`)
      .then(() => {
        dispatch("GET_TODO_LIST");
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
