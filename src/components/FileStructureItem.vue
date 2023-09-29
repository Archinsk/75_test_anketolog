<template>
  <div>
    <div class="d-flex w-100 align-items-center mb-2">
      <span
        v-if="itemData.type === 'directory'"
        class="text-warning material-icons mr-2"
      >
        folder
      </span>
      <span
        v-if="itemData.type === 'file'"
        class="text-secondary material-icons mr-2"
      >
        description
      </span>
      <vb-input
        :value="itemData.name"
        :additional-classes="{
          group: 'flex-grow-1 mb-0 mr-2',
          field: itemData.editMode ? '' : 'form-control-plaintext',
        }"
        :readonly="!itemData.editMode"
        v-model="value"
        @confirm-file-structure-item-edition="
          $emit('confirm-file-structure-item-edition', value)
        "
      />
      <button
        v-if="!itemData.editMode"
        class="btn btn-secondary btn-icon-square"
        @click="$emit('toggle-file-structure-item-edit-mode', itemData.id)"
      >
        <span class="material-icons"> edit </span>
      </button>
      <button
        v-if="itemData.editMode"
        class="btn btn-primary btn-icon-square"
        @click="$emit('confirm-file-structure-item-edition', value)"
      >
        <span class="material-icons"> done </span>
      </button>
      <button
        class="btn btn-danger btn-icon-square ml-2"
        @click="$emit('delete-file-structure-item', itemData.id)"
      >
        <span class="material-icons"> delete </span>
      </button>
    </div>
    <template v-if="itemData.children">
      <div class="ml-4">
        <file-structure-item
          v-for="item of itemData.children"
          :key="item.id"
          :item-data="item"
          @toggle-file-structure-item-edit-mode="
            $emit('toggle-file-structure-item-edit-mode', $event)
          "
          @confirm-file-structure-item-edition="
            $emit('confirm-file-structure-item-edition', $event)
          "
          @delete-file-structure-item="
            $emit('delete-file-structure-item', $event)
          "
          >{{ item.name }}</file-structure-item
        >
      </div>
    </template>
  </div>
</template>

<script>
import VbInput from "./BS46Input";

export default {
  name: "FileStructureItem",
  components: { VbInput },
  props: {
    itemData: Object,
  },
  data() {
    return {
      value: this.itemData.name,
    };
  },
  watch: {
    "itemData.name": function () {
      this.value = this.itemData.name;
    },
    "itemData.editMode": function () {
      if (!this.itemData.editMode) {
        this.value = this.itemData.name;
      }
    },
  },
};
</script>
