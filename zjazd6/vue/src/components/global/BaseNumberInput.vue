<template>
  <input
    class="base-number-input"
    type="number"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
const emit = defineEmits(["update:modelValue"]);
defineProps<{ modelValue: null | number }>();

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit("update:modelValue", value === "" ? null : +value);
};
</script>

<style lang="scss" scoped>
.base-number-input {
  box-sizing: border-box;
  width: 9rem;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  padding: 0.1rem 0;
  margin: 0;

  outline: none;
  box-shadow: 0 0 8px 0 #0009;
  border-radius: 5px;
  border: none;
  line-height: 1.4;
  text-align: center;
  background: #fff;

  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
}
</style>
