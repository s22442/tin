<template>
  <div
    class="color-div"
    :style="{
      background: item.bgColor,
      border: `1px solid ${item.borderColor}`,
      borderRadius: item.isCircular ? '9999px' : '0',
      gridTemplateColumns: gridLineProperty,
      gridTemplateRows: gridLineProperty
    }"
    @mousedown.self="handleMousedown"
    @mouseup.self="handleMouseup"
  >
    <ColorDiv v-for="child in item.children" :key="child.id" :item="child" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ColorItem } from "@/types";

export default defineComponent({
  name: "ColorDiv",

  props: {
    item: {
      type: Object as PropType<ColorItem>,
      required: true
    }
  },

  emits: ["remove:child"],

  computed: {
    lineCount() {
      return Math.ceil(Math.sqrt(this.item.children.length));
    },

    gridLineProperty() {
      return `repeat(${this.lineCount}, 1fr)`;
    }
  },

  methods: {
    getActiveAction() {
      return this.$store.state.activeAction;
    },

    getActiveColor() {
      return this.$store.state.activeColor;
    },

    colorizeBg() {
      this.item.updateBgColor(this.getActiveColor());
    },

    colorizeBorder() {
      this.item.updateBorderColor(this.getActiveColor());
    },

    addChild() {
      this.item.addChild();
    },

    suggestSwap() {
      this.item.suggestSwap();
    },

    removeSelf() {
      this.item.removeSelf();
    },

    roundRadius() {
      this.item.roundRadius();
    },

    handleMousedown() {
      const action = this.getActiveAction();

      if (!action) {
        return;
      }

      ({
        colorizeBg: this.colorizeBg,
        colorizeBorder: this.colorizeBorder,
        add: this.addChild,
        swap: this.suggestSwap,
        remove: this.removeSelf,
        round: this.roundRadius
      }[action]());
    },

    handleMouseup() {
      if (this.getActiveAction() === "swap") {
        this.item.acceptSwap();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.color-div {
  min-width: 0;
  min-height: 0;
  max-width: 100%;
  max-height: 100%;
  display: grid;
  padding: min(10%, 10px);
  gap: 10px;
  box-shadow: 0 0 3px 0 #0006;

  transition: all 200ms;
}
</style>
