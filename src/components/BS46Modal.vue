<template>
  <div
    class="modal fade"
    :id="id"
    tabindex="-1"
    :aria-labelledby="id + 'Label'"
    aria-hidden="true"
    :data-backdrop="staticBackdrop ? 'static' : ''"
    :data-keyboard="staticBackdrop ? false : true"
  >
    <div :class="modalDialogClass">
      <div class="modal-content">
        <div v-if="header" class="modal-header">
          <slot v-if="noTitle" name="modal-header"></slot>
          <h5 v-else class="modal-title" :id="id + 'Label'">
            <slot name="modal-header"></slot>
          </h5>
          <button
            v-if="!noCloseButton"
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div v-if="footer" class="modal-footer">
          <slot name="modal-footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "VbModal",
  props: {
    id: String,
    header: Boolean,
    noBody: Boolean,
    footer: Boolean,
    size: String,
    verticalCenter: Boolean,
    scrollable: Boolean,
    noTitle: Boolean,
    noCloseButton: Boolean,
    noBackdrop: Boolean,
    noKeyboard: Boolean,
    staticBackdrop: Boolean,
  },
  computed: {
    modalDialogClass: function () {
      let modalDialogClass = "modal-dialog";
      if (this.scrollable) {
        modalDialogClass += " modal-dialog-scrollable";
      }
      if (this.verticalCenter) {
        modalDialogClass += " modal-dialog-centered";
      }
      if (this.size && ["sm", "lg", "xl"].includes(this.size)) {
        modalDialogClass += " modal-" + this.size;
      }
      return modalDialogClass;
    },
  },
  mounted() {
    $("#" + this.id)
      .modal({
        show: false,
        backdrop:
          !this.noBackdrop && this.staticBackdrop ? "static" : !this.noBackdrop,
        keyboard: !this.staticBackdrop && !this.noKeyboard,
      })
      .on("show.bs.modal", () => {
        this.$emit("show-modal");
      })
      .on("shown.bs.modal", () => {
        this.$emit("shown-modal");
      })
      .on("hide.bs.modal", () => {
        this.$emit("hide-modal");
      })
      .on("hidden.bs.modal", () => {
        this.$emit("hidden-modal");
      });
  },
};
</script>
