import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileStructure: {
      name: "Root",
      children: [
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
              children: [
                { id: 8, type: "file", name: "File 1-1-1", editMode: false },
              ],
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
    editableItem: null,
  },
  mutations: {
    toggleItemEditMode(state, itemData) {
      // Если редактировался другой пункт, то завершаем его редактирование
      if (state.editableItem?.editMode) {
        state.editableItem.editMode = !state.editableItem.editMode;
      }
      itemData.item.editMode = !itemData.item.editMode;
      state.editableItem = itemData.item;
    },
    confirmItemEdition(state, newName) {
      state.editableItem.name = newName;
      if (state.editableItem?.editMode) {
        state.editableItem.editMode = !state.editableItem.editMode;
      }
      state.editableItem = null;
    },
    deleteItem(state, itemData) {
      let index = itemData.parentDirectory.children.findIndex(
        (item) => item === itemData.item
      );
      itemData.parentDirectory.children.splice(index, 1);
    },
  },
});
