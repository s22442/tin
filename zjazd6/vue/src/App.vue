<template>
  <TheControlPanel />
  <ThePlayground />
</template>

<script lang="ts" setup>
import { TheControlPanel, ThePlayground } from "@/components/app";
</script>

<style lang="scss">
@import "./styles/index.scss";

#app {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 16rem 1fr;
  grid-template-rows: 1fr;

  > * {
    min-width: 0;
    min-height: 0;
  }
}
</style>
