// podobnie jak w przypadku zjazdu 4 chcemy, aby aktualizacje DOM w zadaniu 1 i 2 były automatyczne
// poprawia to czytelność kodu i jego odporność na błędy
// https://v3.vuejs.org/api/basic-reactivity.html#reactive
// reactive() zwraca reaktywną kopię obiektu podanego jako parametr
// watch() umożliwia reagowanie na zmiany wprowadzane w reaktywnych obiektach
const { reactive, watch } = Vue;

const range = length => Array.from({ length }, (_, i) => i);
