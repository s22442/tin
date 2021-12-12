<template>
  <div id="controlPanel">
    <div class="label">Wybierz kolor:</div>
    <b-color-input
      :model-value="state.activeColor"
      @update:model-value="(v: string) => dispatch('updateActiveColor', v)"
    />

    <div class="label">Wybierz akcję:</div>
    <b-select-list
      :model-value="state.activeAction"
      :options="state.colorItemOptions"
      @update:model-value="(v: null | string) => dispatch('updateActiveAction', v)"
    />

    <div class="label">Maks. liczba divów w&nbsp;divie:</div>
    <b-number-input v-model="maxChildrenCountBuffer" />
    <b-btn @click="updateMaxChildrenCount">Zapisz</b-btn>

    <div class="label">Maks. głębokość:</div>
    <b-number-input v-model="maxDepthBuffer" />
    <b-btn @click="updateMaxDepth">Zapisz</b-btn>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "vuex";

const { state, dispatch } = useStore();

const maxChildrenCountBuffer = ref(state.maxChildrenCount);
const maxDepthBuffer = ref(state.maxDepth);

const updateMaxChildrenCount = () => {
  dispatch("updateMaxChildrenCount", maxChildrenCountBuffer.value || 0);
};

const updateMaxDepth = () => {
  dispatch("updateMaxDepth", maxDepthBuffer.value || 0);
};
</script>

<style lang="scss" scoped>
#controlPanel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1% 1rem 0 1rem;
  background-color: #0beef9;
  background-image: linear-gradient(315deg, #0beef9 0%, #48a9fe 74%);
  box-shadow: 0 0 5px 0 #0006;
  position: relative;

  @media (min-width: 1500px) {
    padding: 5% 1rem 0 1rem;
  }

  @media (min-width: 1600px) {
    gap: 0.5rem;
    padding: 15% 1rem 0 1rem;
  }

  @media (min-width: 1800px) {
    padding: 25% 1rem 0 1rem;
  }

  .label {
    padding: 0.5rem 0 0 0;
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    text-align: center;

    @media (min-width: 1600px) {
      padding: 1rem 0 0 0;
    }
  }
}
</style>
