<template>
  <a
    v-if="tag === 'a'"
    href="#"
    role="button"
    class="btn btn-modal"
    data-toggle="modal"
    :data-target="'#' + targetId"
    @click="$emit('click')"
  >
    <slot></slot>
  </a>
  <button
    v-else
    class="btn btn-modal"
    type="button"
    data-toggle="modal"
    :data-target="'#' + targetId"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "VbModalButton",
  props: {
    targetId: String,
    tag: String,
  },
};
</script>
