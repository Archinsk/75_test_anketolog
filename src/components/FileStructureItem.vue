<template>
  <div>
    <button class="btn btn-primary btn-icon-square">
      <span class="material-icons"> folder </span></button
    ><button class="btn btn-primary btn-icon-square">
      <span class="material-icons"> description </span>
    </button>
    <vb-input
      :value="itemData.name"
      :additional-classes="{ field: 'form-control-plaintext' }"
    />
    <vb-modal-button
      target-id="edit-confirm"
      class="btn-primary btn-icon-square"
      ><span class="material-icons"> edit </span></vb-modal-button
    >
    <vb-modal-button
      target-id="delete-confirm"
      class="btn-primary btn-icon-square"
      ><span class="material-icons"> delete </span></vb-modal-button
    >
    <template v-if="itemData.children">
      <file-structure-item
        v-for="item of itemData.children"
        :key="item.id"
        :item-data="item"
        >{{ item.name }}</file-structure-item
      >
    </template>
  </div>
</template>

<script>
import VbModalButton from "./BS46ModalButton";
import VbInput from "./BS46Input";
export default {
  name: "FileStructureItem",
  components: { VbInput, VbModalButton },
  props: {
    itemData: Object,
  },
};
</script>

<style scoped></style>
