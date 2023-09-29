<template>
  <div class="container mt-3">
    <vb-modal header footer id="edit-confirm">
      <template slot="modal-header"> Переименование пункта </template>
      Данное имя уже занято, хотите переименовать на <b>{{ newName }} (2)</b>?
      <template slot="modal-footer"
        ><button
          class="btn btn-primary"
          @click="confirmFileStructureItemEdition(newName + ' (2)')"
        >
          Подтвердить</button
        ><button class="btn btn-secondary" data-dismiss="modal">
          Отмена
        </button></template
      >
    </vb-modal>
    <vb-modal header footer id="delete-confirm">
      <template slot="modal-header"> Подтверждение удаления </template>
      Вы действительно хотите удалить элемент файловой структуры с именем
      <b>{{ selectedItemData?.item?.name }}</b
      >?
      <template slot="modal-footer"
        ><button
          class="btn btn-danger"
          @click="deleteFileStructureItem(selectedItemData, true)"
        >
          Подтвердить</button
        ><button class="btn btn-secondary" data-dismiss="modal">
          Отмена
        </button></template
      >
    </vb-modal>
    <file-structure-item
      v-for="item of fileStructure.children"
      :key="item.id"
      :item-data="item"
      @toggle-file-structure-item-edit-mode="
        toggleFileStructureItemEditMode($event)
      "
      @confirm-file-structure-item-edition="
        confirmFileStructureItemEdition($event)
      "
      @delete-file-structure-item="deleteFileStructureItem($event)"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import VbModal from "./components/BS46Modal";
import FileStructureItem from "./components/FileStructureItem";
import $ from "jquery";
export default {
  name: "App",
  components: {
    FileStructureItem,
    VbModal,
  },
  data() {
    return {
      selectedItemData: null,
      newName: null,
    };
  },
  computed: {
    ...mapState(["fileStructure", "editableItem"]),
  },
  methods: {
    ...mapMutations(["toggleItemEditMode", "deleteItem"]),
    toggleFileStructureItemEditMode(itemId) {
      this.selectedItemData = this.findFileStructureItemById(itemId);
      this.$store.commit("toggleItemEditMode", this.selectedItemData);
    },
    confirmFileStructureItemEdition(newName) {
      if (newName.trim()) {
        this.hideModal("edit-confirm");
        this.newName = newName;
        if (this.checkDuplicates(this.selectedItemData, newName)) {
          this.$store.commit("confirmItemEdition", newName);
        } else {
          this.showModal("edit-confirm");
        }
      } else {
        alert("Имя не должно быть пустым или состоять из пробелов");
      }
    },
    deleteFileStructureItem(itemId, confirm) {
      if (confirm) {
        this.hideModal("delete-confirm");
        this.$store.commit("deleteItem", this.selectedItemData);
      } else {
        // Если пункт в процессе редактирования, то завершить редактирование со сбросом значения
        if (this.editableItem) {
          this.$store.commit("confirmItemEdition", this.editableItem.name);
        }
        this.selectedItemData = this.findFileStructureItemById(itemId);
        this.showModal("delete-confirm");
      }
    },
    // Рекурсивный поиск пункта и родительской дирректории
    findFileStructureItemById(itemId, directory = this.fileStructure) {
      if (directory.children.find((item) => item.id === itemId)) {
        let fileStructureItem = directory.children.find(
          (item) => item.id === itemId
        );
        return { item: fileStructureItem, parentDirectory: directory };
      } else {
        for (let i = 0; i < directory.children.length; i++) {
          if (
            directory.children[i].type === "directory" &&
            directory.children[i].children
          ) {
            if (this.findFileStructureItemById(itemId, directory.children[i])) {
              return this.findFileStructureItemById(
                itemId,
                directory.children[i]
              );
            }
          }
        }
      }
    },
    checkDuplicates(itemData, newName) {
      if (
        itemData.parentDirectory.children.findIndex(
          (item) => item.name === newName && item.id !== itemData.item.id
        ) < 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    showModal(modalId) {
      $("#" + modalId).modal("show");
    },
    hideModal(modalId) {
      $("#" + modalId).modal("hide");
    },
  },
};
</script>
