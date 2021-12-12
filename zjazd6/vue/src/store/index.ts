import { createStore } from "vuex";

import type { StoreState, ColorItemOption } from "@/types";

const COLOR_ITEM_OPTIONS: ColorItemOption[] = [
  { text: "Brak akcji", value: null },
  { text: "Kolorowanie pola diva", value: "colorizeBg" },
  { text: "Kolorowanie ramki diva", value: "colorizeBorder" },
  { text: "Dodawanie diva", value: "add" },
  { text: "Przenoszenie diva", value: "swap" },
  { text: "Usuwanie diva", value: "remove" },
  { text: "Przełączanie zaokrąglenia", value: "round" }
];

const INCREMENT_LAST_COLOR_ITEM_ID = "INCREMENT_LAST_COLOR_ITEM_ID",
  SET_COLOR_ITEM_OPTIONS = "SET_COLOR_ITEM_OPTIONS",
  SET_ACTIVE_ACTION = "SET_ACTIVE_ACTION",
  SET_ACTIVE_COLOR = "SET_ACTIVE_COLOR",
  SET_MAX_DEPTH = "SET_MAX_DEPTH",
  SET_MAX_CHILDREN_COUNT = "SET_MAX_CHILDREN_COUNT";

export default createStore<StoreState>({
  state: {
    lastColorItemId: -1,
    colorItemOptions: COLOR_ITEM_OPTIONS,
    activeAction: null,
    activeColor: "#ffffff",
    maxDepth: 3,
    maxChildrenCount: 9
  },
  getters: {
    getColorItemId: (state) => () => {
      return state.lastColorItemId++;
    }
  },
  mutations: {
    [INCREMENT_LAST_COLOR_ITEM_ID](state) {
      state.lastColorItemId++;
    },

    [SET_COLOR_ITEM_OPTIONS](state, payload) {
      state.colorItemOptions = payload;
    },

    [SET_ACTIVE_ACTION](state, value) {
      state.activeAction = value;
    },

    [SET_ACTIVE_COLOR](state, value) {
      state.activeColor = value;
    },

    [SET_MAX_DEPTH](state, value) {
      state.maxDepth = value;
    },

    [SET_MAX_CHILDREN_COUNT](state, value) {
      state.maxChildrenCount = value;
    }
  },
  actions: {
    updateActiveAction({ commit }, value) {
      commit(SET_ACTIVE_ACTION, value);
    },

    updateActiveColor({ commit }, value) {
      commit(SET_ACTIVE_COLOR, value);
    },

    updateMaxDepth({ commit }, value) {
      commit(SET_MAX_DEPTH, value);
    },

    updateMaxChildrenCount({ commit }, value) {
      commit(SET_MAX_CHILDREN_COUNT, value);
    }
  }
});
