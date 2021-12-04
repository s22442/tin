// ### KOD Z ZADANIA 10. ZE ZJAZDU 4 (zmodyfikowany adekwatnie do nowej treści zadania) ###
// Stwórz tablicę obiektów typu auto{rok, przebieg, cena_wyjsciowa, cena_koncowa}.
// Przy pomocy JS zbuduj element DOM – tabelkę zawierającą dane z tych obiektów.
// Umieść tabelkę na stronie przy pomocy JS

const getCarInput = inputName =>
  document.querySelector(`input[name=car__${inputName}]`);

// 10. Dany jest Obiekt: auto{ rok, przebieg, cena_wyjsciowa, cena_koncowa }

const DEFAULT_CAR = {
  year: 2_010,
  mileage: 300_000,
  startingPrice: 100_000,
  finalPrice: 100_000
};

let yearInput = null;
let mileageInput = null;
let startingPriceInput = null;
let finalPriceInput = null;

let carArrayTableBody = null;

const car = reactive(DEFAULT_CAR);

const positiveOnly = value => Math.max(0, value || 0);

const updateCar = () => {
  car.year = positiveOnly(yearInput.value);
  car.mileage = positiveOnly(mileageInput.value);
  car.startingPrice = positiveOnly(startingPriceInput.value);
  car.finalPrice = positiveOnly(finalPriceInput.value);
};

const updateCarInputs = () => {
  const { year, mileage, startingPrice, finalPrice } = car;

  yearInput.value = year;
  mileageInput.value = mileage;
  startingPriceInput.value = startingPrice;
  finalPriceInput.value = finalPrice;
};

watch(car, updateCarInputs);

window.addEventListener("load", () => {
  yearInput = getCarInput("year");
  mileageInput = getCarInput("mileage");
  startingPriceInput = getCarInput("startingPrice");
  finalPriceInput = getCarInput("finalPrice");

  yearInput.oninput = updateCar;
  mileageInput.oninput = updateCar;
  startingPriceInput.oninput = updateCar;
  finalPriceInput.oninput = updateCar;

  updateCarInputs();

  carArrayTableBody = document.querySelector(".car-array-table__body");
});

// a) Funkcja, która powiększa cenę wyjściową o 1000

const raiseCarStartingPrice = () => {
  car.startingPrice += 1_000;
};

// b) Funkcja, która obniża cenę końcową o 1000 za każdy rok wieku auta (względem ceny wyjściowej)

const getCurrentYear = () => new Date().getFullYear();

const getAgeLoss = () => 1_000 * (getCurrentYear() - car.year);

const calcCarFinalPriceByYear = () => {
  car.finalPrice = Math.max(0, car.startingPrice - getAgeLoss());
};

// c) Funkcja, która obniża cenę końcową o 10000 za każde 100000km przebiegu auta

const getMileageLoss = () => 10_000 * Math.floor(car.mileage / 100_000);

const calcCarFinalPriceByMileage = () => {
  car.finalPrice = Math.max(0, car.startingPrice - getMileageLoss());
};

// d) Funkcja, która dopisuje do auta podany przebieg i rok (automatycznie przeliczając cenę wg powyższych funkcji)

const calcCarFinalPrice = () => {
  car.finalPrice = Math.max(
    0,
    car.startingPrice - (getAgeLoss() + getMileageLoss())
  );
};

// e) Funkcja, która dopisze auto do tablicy samochodow, jesli jego cena jest wieksza niz 10000

const cars = reactive([]);

const updateCarArrayTableBody = () => {
  carArrayTableBody.innerHTML = cars
    .map(item =>
      Object.values(item)
        .map(value => `<div>${value}</div>`)
        .join("")
    )
    .join("");
};

watch(cars, updateCarArrayTableBody);

const pushCarIfExpensiveEnough = () => {
  if (car.finalPrice > 10_000) {
    cars.push({ ...car });
  }
};

// f) Funkcja, ktora operuje na tablicy obiektow typu auto. Dla wszystkich aut z tablicy zwieksza rok o 1

const rejuvenateCars = () => {
  cars.splice(
    0,
    cars.length,
    ...cars.map(item => ({ ...item, year: item.year + 1 }))
  );
};

const clearCars = () => {
  cars.splice(0, cars.length);
};
