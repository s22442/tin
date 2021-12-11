<template>
  <div class="base-color-input__wrapper">
    <input
      class="base-color-input"
      type="color"
      :value="modelValue"
      @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
    />

    <div class="base-color-input__cover">
      <div class="base-color-input__value">
        {{ modelValue }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits(["update:modelValue"]);
defineProps<{ modelValue: string }>();
</script>

<style lang="scss" scoped>
.base-color-input__wrapper {
  position: relative;
  width: fit-content;
  height: fit-content;
  border-radius: 9999px;

  .base-color-input {
    -webkit-appearance: none;
    box-sizing: border-box;
    border: none;
    width: 7rem;
    height: 7rem;
    border-radius: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    box-shadow: 0 0 8px 0 #0009;
    cursor: pointer;

    &::-webkit-color-swatch-wrapper {
      margin: 0;
      padding: 0;
    }

    &::-webkit-color-swatch {
      margin: 0;
      padding: 0;
      border: none;
    }
  }

  .base-color-input__cover {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    pointer-events: none;

    .base-color-input__value {
      width: 100%;
      text-align: center;
      font-weight: 700;
      color: #fff;
      text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    }
  }
}
</style>
