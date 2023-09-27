<template>
  <div
    class="collapse"
    :id="id"
    :data-parent="parentId ? '#' + parentId : null"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "VbCollapse",
  props: {
    id: String,
    parentId: String,
  },
};
</script>
