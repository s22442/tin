<template>
  <transition enter-active-class="fade-in" appear>
    <div v-show="isImgLoaded" id="puzzle">
      <img class="puzzle__img" :src="img" />

      <div class="puzzle__container">
        <transition-group name="puzzle__container__transition">
          <SinglePuzzle
            v-for="(item, index) in userPuzzleItems"
            :key="item.id"
            v-bind="item"
            @click="handlePuzzleClick(index)"
          />
        </transition-group>
      </div>

      <transition enter-active-class="fade-in" leave-active-class="fade-out">
        <div v-show="arePuzzleOrderedCorrectly" class="puzzle__cover">
          <img class="puzzle__cover__img" :src="img" />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { SinglePuzzle } from "./puzzle";

import { computed, ref, nextTick } from "vue";

const props = defineProps<{
  hSize: number;
  vSize: number;
  arePuzzleOrderedCorrectly: boolean;
  basePuzzle: number[];
  userPuzzle: number[];
}>();

const img = new URL(
  `../assets/${import.meta.env.VITE_IMG_NAME}`,
  import.meta.url
).href;

const isImgLoaded = ref(false);
(() => {
  const imgLoader = new Image();
  imgLoader.src = img;
  imgLoader.onload = async () => {
    await nextTick();
    isImgLoaded.value = true;
  };
})();

const emit = defineEmits<{
  (e: "swapUserPuzzle", payload: { indexA: number; indexB: number }): void;
}>();

const getPuzzleCol = (index: number) => index % props.hSize;

const getPuzzleRow = (index: number) => Math.floor(index / props.hSize);

const blankPuzzleIndex = computed(() =>
  props.userPuzzle.indexOf(props.hSize * props.vSize - 1)
);

const blankPuzzleCol = computed(() => getPuzzleCol(blankPuzzleIndex.value));

const blankPuzzleRow = computed(() => getPuzzleRow(blankPuzzleIndex.value));

const checkIfPuzzleIsBlank = (index: number) =>
  index === blankPuzzleIndex.value;

const getPuzzleBgPosition = (id: number) => {
  const index = props.basePuzzle.indexOf(id);

  const col = getPuzzleCol(index);
  const row = getPuzzleRow(index);

  const hPosition = col / (props.hSize - 1);
  const vPosition = row / (props.vSize - 1);

  return `${hPosition * 100}% ${vPosition * 100}%`;
};

const checkIfPuzzleCanMove = (index: number) => {
  const col = getPuzzleCol(index);
  const row = getPuzzleRow(index);

  return (
    (col === blankPuzzleCol.value &&
      Math.abs(row - blankPuzzleRow.value) === 1) ||
    (row === blankPuzzleRow.value && Math.abs(col - blankPuzzleCol.value) === 1)
  );
};

const userPuzzleItems = computed(() =>
  props.userPuzzle.map((id, index) =>
    checkIfPuzzleIsBlank(index)
      ? { id, isBlank: true }
      : {
          id,
          bgPosition: getPuzzleBgPosition(id),
          canMove: checkIfPuzzleCanMove(index),
        }
  )
);

const handlePuzzleClick = (index: number) => {
  if (!checkIfPuzzleCanMove(index)) {
    return;
  }

  emit("swapUserPuzzle", { indexA: index, indexB: blankPuzzleIndex.value });
};
</script>

<style lang="scss" scoped>
@mixin img {
  display: block;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  max-width: 100%;
  max-height: 100%;
  border-radius: inherit;
}

#puzzle {
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  background: var(--gradient-bg);

  $puzzle-padding: 1px;

  .puzzle__img {
    @include img;
    width: var(--img-width);
    height: auto;
    opacity: 0.3;
  }

  .puzzle__container {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    display: grid;
    grid-template-columns: repeat(v-bind("props.hSize"), 1fr);
    grid-template-rows: repeat(v-bind("props.vSize"), 1fr);
    gap: 3px;
    padding: $puzzle-padding;

    .puzzle__container__transition {
      &-move {
        transition: transform var(--transition-duration);
      }

      &-enter-from,
      &-leave-to {
        transition: opacity var(--transition-duration);
        opacity: 0;
      }

      &-leave-active {
        position: absolute;
      }
    }
  }

  .puzzle__cover {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    user-select: none;
    padding: $puzzle-padding;
    background: var(--gradient-bg);

    .puzzle__cover__img {
      @include img;
      pointer-events: none;
    }
  }
}
</style>

<style lang="scss" scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

$animation-duration: 300ms;

.fade-in {
  animation-name: fadeIn;
  animation-duration: $animation-duration;
}

.fade-out {
  animation-name: fadeOut;
  animation-duration: $animation-duration;
}
</style>
