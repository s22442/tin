<template>
  <div class="base-select-list">
    <div
      v-for="({ text, value }, i) in options"
      :key="i"
      class="base-select-list__item"
      :class="modelValue === value && 'base-select-list__item--active'"
      @click="$emit('update:modelValue', value)"
    >
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Option {
  text: string;
  value: null | string | number;
}

defineEmits(["update:modelValue"]);

defineProps<{
  modelValue: Option["value"];
  options: Option[];
}>();
</script>

<style lang="scss" scoped>
.base-select-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1px;
  border-radius: 5px;
  box-shadow: 0 0 8px 0 #0009;

  text-align: center;
  user-select: none;
  overflow: hidden;

  .base-select-list__item {
    padding: 2px 3px;
    cursor: pointer;

    transition: background 200ms, color 200ms;
    background: #fff;
    color: #000;

    &.base-select-list__item--active {
      background: #fff0;
      color: #fff;
    }

    &:hover:not(.base-select-list__item--active) {
      background: #fffb;
    }
  }
}
</style>
