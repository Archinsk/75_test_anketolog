<template>
  <div class="container">
    <!--    <vb-collapse-button target-id="qwe">collapse</vb-collapse-button>-->
    <!--    <vb-collapse id="qwe">something</vb-collapse>-->
    <vb-modal header footer id="delete-confirm">
      <template slot="modal-header"> Подтверждение удаления </template>
      Вы действительно хотите удалить элемент файловой структуры?
      <template slot="modal-footer"
        ><button class="btn btn-danger">Подтвердить</button
        ><button class="btn btn-secondary">Отмена</button></template
      >
    </vb-modal>
    <vb-modal header footer id="edit-confirm">
      <template slot="modal-header"> Подтверждение удаления </template>
      Данное имя уже занято, хотите переименовать на name (2)
      <template slot="modal-footer"
        ><button class="btn btn-danger">Подтвердить</button
        ><button class="btn btn-secondary">Отмена</button></template
      >
    </vb-modal>
    <file-structure-item
      v-for="item of fileStructure"
      :key="item.id"
      :item-data="item"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import VbModal from "./components/BS46Modal";
import FileStructureItem from "./components/FileStructureItem";
export default {
  name: "App",
  components: {
    FileStructureItem,
    VbModal,
  },
  computed: {
    ...mapState(["fileStructure"]),
  },
};
</script>

<style lang="scss"></style>
