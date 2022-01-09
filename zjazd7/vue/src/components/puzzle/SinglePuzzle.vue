<template>
  <div
    class="single-puzzle"
    :class="[
      canMove && 'single-puzzle--moveable',
      isBlank && 'single-puzzle--blank',
    ]"
  >
    <div class="single-puzzle__cover" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  canMove?: boolean;
  isBlank?: boolean;
  bgPosition?: string;
}>();

const bgImg = `url(${
  new URL(`../../assets/${import.meta.env.VITE_IMG_NAME}`, import.meta.url).href
})`;
</script>

<style lang="scss" scoped>
.single-puzzle {
  border-radius: inherit;
  position: relative;

  .single-puzzle__cover {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    background: var(--gradient-bg);

    transition: opacity var(--transition-duration);
    opacity: 0;
  }

  &.single-puzzle--moveable {
    cursor: pointer;

    &:hover .single-puzzle__cover {
      opacity: 0.1;
    }
  }

  &.single-puzzle--blank {
    pointer-events: none;
    opacity: 0;
  }

  &:not(.single-puzzle--blank) {
    background-image: v-bind("bgImg");
    background-size: var(--img-bg-size);
    background-position: v-bind("props.bgPosition");
    box-shadow: 0 0 3px var(--color-shadow);
  }
}
</style>
