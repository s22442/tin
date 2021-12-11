<template>
  <div class="base-button">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-button {
  width: fit-content;
  height: fit-content;
  max-width: 100%;
  max-height: 100%;
  padding: 0.5rem 1rem;
  margin: 0;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 0 8px 0 #0009;
  border-radius: 5px;
  text-align: center;
  line-height: 1;

  background: #fff;
  transition: background 200ms;

  &:hover {
    background: #fffb;
  }
}
</style>
