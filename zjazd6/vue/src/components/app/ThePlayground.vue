<template>
  <div id="playground">
    <ColorDiv
      class="main-color-div"
      :class="isSomeActionActive && 'main-color-div--active'"
      :item="mainColorItem"
    />
  </div>
</template>

<script lang="ts" setup>
import { ColorDiv } from "./playground";

import { reactive, computed, watch } from "vue";
import { useStore } from "vuex";
import type { ColorItem } from "@/types";

const { state, getters } = useStore();

const isSomeActionActive = computed(() => !!state.activeAction);

const DEFAULT_BG_COLOR = "#fff";
const DEFAULT_BORDER_COLOR = "#000";

const SHARED_COLOR_ITEM_PART: Partial<ColorItem> = {
  bgColor: DEFAULT_BG_COLOR,
  borderColor: DEFAULT_BORDER_COLOR,
  isCircular: false,
  updateBgColor(color) {
    this.bgColor = color;
  },
  updateBorderColor(color) {
    this.borderColor = color;
  },
  roundRadius() {
    this.isCircular = !this.isCircular;
  },
  addChild() {
    if (
      !Array.isArray(this.children) ||
      this.children.length >= state.maxChildrenCount ||
      this.depth === undefined ||
      this.depth >= state.maxDepth
    ) {
      return;
    }

    this.children.push(
      (() => {
        const id = getters.getColorItemId();
        const child = {
          ...SHARED_COLOR_ITEM_PART,
          id,
          depth: this.depth + 1,
          children: reactive([])
        };
        child.removeSelf = () => {
          (this as ColorItem).removeChild(id);
        };
        return child as ColorItem;
      })()
    );
  },
  removeChild(id) {
    const targetIndex = this.children?.findIndex((item) => item.id === id);

    if (targetIndex === undefined || targetIndex === -1) {
      return;
    }

    (this as ColorItem).children.splice(targetIndex, 1);
  }
};

const mainColorItem = reactive({
  ...SHARED_COLOR_ITEM_PART,
  id: getters.getColorItemId(),
  depth: 0,
  children: reactive([]),
  removeSelf() {
    // do nothing
  }
} as ColorItem);

const removeChildrenCountExcess = (parent: ColorItem) => {
  if (!parent.children?.length) {
    return;
  }

  if (parent.children.length > state.maxChildrenCount) {
    parent.children.splice(
      0,
      parent.children.length,
      ...parent.children.slice(0, state.maxChildrenCount)
    );
  }

  parent.children.forEach(removeChildrenCountExcess);
};

const removeDepthExcess = (parent: ColorItem) => {
  if (!parent.children?.length) {
    return;
  }

  if (parent.depth >= state.maxDepth) {
    parent.children.splice(0, parent.children.length);
  } else {
    parent.children.forEach(removeDepthExcess);
  }
};

watch(
  () => state.maxChildrenCount,
  () => {
    removeChildrenCountExcess(mainColorItem);
  }
);

watch(
  () => state.maxDepth,
  () => {
    removeDepthExcess(mainColorItem);
  }
);

const setInitialChildren = () => {
  const addChildren = (parent: ColorItem, count: number) => {
    for (let i = 0; i < count; i++) {
      parent.addChild();
    }
  };

  addChildren(mainColorItem, 9);
  addChildren(mainColorItem.children[4], 9);
  addChildren(mainColorItem.children[4].children[4], 9);
};
setInitialChildren();
</script>

<style lang="scss" scoped>
#playground {
  max-height: 100%;
  padding: 50px;
  background-color: #b8c6db;
  background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);

  .main-color-div {
    width: 100%;
    height: 100%;

    &.main-color-div--active {
      cursor: crosshair;
    }
  }
}
</style>
