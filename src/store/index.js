import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileStructure: [
      {
        id: 1,
        type: "directory",
        name: "Dir 1",
        editMode: false,
        children: [
          {
            id: 4,
            type: "directory",
            name: "Dir 1-1",
            editMode: false,
            children: [{ id: 3, type: "file", name: "File 1-1-1" }],
          },
          { id: 5, type: "file", name: "File 1-2", editMode: false },
        ],
      },
      {
        id: 2,
        type: "directory",
        name: "Dir 2",
        editMode: false,
        children: [
          { id: 6, type: "directory", name: "Dir 2-1", editMode: false },
          { id: 7, type: "directory", name: "Dir 2-2", editMode: false },
        ],
      },
      { id: 3, type: "file", name: "File 2", editMode: false },
    ],
  },
  getters: {},
  mutations: {
    findFileStuctureById(state, value) {
      console.log(state);
      console.log(value);
    },
    enableItemEditMode(state, value) {
      console.log(state);
      console.log(value);
    },
    editItem(state, value) {
      console.log(state);
      console.log(value);
    },
    deleteItem(state, value) {
      console.log(state);
      console.log(value);
    },
  },
  actions: {},
  modules: {},
});
