// helpers
const range = length => Array.from({ length }, (_, i) => i);

const strPad = (str, length) =>
  str
    .padEnd(
      Math.min(length, Math.ceil(length / 2) + Math.floor(str.length / 2)),
      " "
    )
    .padStart(length, " ");

const printExercise = (id, text) => {
  window.console.log(`%cZadanie ${id}.`, "color: #f00", `\n${text}`);
};

const getValue = inputName =>
  +(document.querySelector(`input[name=exerciseInput${inputName}]`).value || 0);

// 1. Napisz funkcję, sprawdzającą, czy dane trzy liczby tworzą „trójkę pitagorejską” (uwaga – liczby nie muszą być podane w kolejności rosnącej)

const square = value => Math.pow(value, 2);

const isPythagoreanTriple = (a, b, c) => {
  const args = [a, b, c].sort();
  return (
    args.find(value => value <= 0) === undefined &&
    square(args[0]) + square(args[1]) === square(args[2])
  );
};

const printExercise1 = () => {
  const [a, b, c] = [getValue("1A"), getValue("1B"), getValue("1C")];

  printExercise(
    1,
    `a = ${a}, b = ${b}, c = ${c} => ${isPythagoreanTriple(a, b, c)}`
  );
};

// 2. Napisz funkcję wypisującą wszystkie liczby z przedziału a-b, podzielne przez c

const rangeDivisibleBy = (a, b, c) =>
  Array.from(
    { length: Math.abs(b - a) + 1 },
    (_, i) => (a < b ? i : -i) + a
  ).filter(value => !(value % c));

const printExercise2 = () => {
  const [a, b, c] = [getValue("2A"), getValue("2B"), getValue("2C")];

  printExercise(
    2,
    `a = ${a}, b = ${b}, c = ${c} => ${rangeDivisibleBy(a, b, c)}`
  );
};

// 3. Napisz funkcję wypisującą w konsoli tabliczkę mnożenia o boku podanym jako parametr

const makeMultiplicationTable = length =>
  Array.from({ length }, (_, i1) =>
    Array.from({ length }, (_, i2) => (i1 + 1) * (i2 + 1))
  );

const makeMultiplicationTableStr = length => {
  const arr = makeMultiplicationTable(length);

  const lastRow = arr[arr.length - 1];
  const lastValue = lastRow[lastRow.length - 1];
  const maxValueStrLength = String(lastValue).length;

  const rowLength = arr[0].length;
  const cellLength = maxValueStrLength + 2;

  const separatorRow = Array(rowLength)
    .fill("-".repeat(cellLength))
    .join("|")
    .slice(1);

  return arr
    .map(row =>
      row
        .map(value => String(value).padStart(maxValueStrLength, " "))
        .join(" | ")
    )
    .join(`\n${separatorRow}\n`);
};

const printExercise3 = () => {
  const x = getValue("3");

  printExercise(3, `x = ${x} =>\n${makeMultiplicationTableStr(x)}`);
};

// 4. Napisz funkcję wypisującą w konsoli ciąg Fibonacciego o długości podanej jako parametr

const fibbCache = {};
const fibb = value => {
  if (fibbCache[value]) {
    return fibbCache[value];
  }

  const result = value <= 2 ? 1 : fibb(value - 1) + fibb(value - 2);

  fibbCache[value] = result;

  return result;
};

const makeFibbSequence = length =>
  Array.from({ length }, (_, i) => fibb(i + 1));

const printExercise4 = () => {
  const x = getValue("4");

  printExercise(4, `${x} => ${makeFibbSequence(x)}`);
};

// 5. Narysuj choinkę o podanej wysokości

const makeChristmasTree = length =>
  Array.from({ length }, (_, i) =>
    Array(i + 1)
      .fill("*")
      .join("")
  ).join("\n");

const printExercise5 = () => {
  const h = getValue("5");

  printExercise(5, `${h} =>\n${makeChristmasTree(h)}`);
};

// 6. Narysuj choinkę nocą o podanej wysokości (szerokość jest tu nieco większa niż wysokość)

const makeNightChristmasTree = length => {
  let width = Math.round((length - 2) * 2);

  if (!(width % 2)) {
    width += 1;
  }

  const halfWidth = Math.floor(width / 2);

  const isTreeArea = (i1, i2) => i2 > halfWidth - i1 && i2 < halfWidth + i1;

  return Array.from({ length }, (_, i1) =>
    (i1 === 0 || i1 === length - 1
      ? Array(width).fill("*")
      : Array.from({ length: width }, (_, i2) =>
          isTreeArea(i1, i2) ? " " : "*"
        )
    ).join("")
  ).join("\n");
};

const printExercise6 = () => {
  const h = getValue("6");

  printExercise(6, `${h} =>\n${makeNightChristmasTree(h)}`);
};

// 7. Napisz funkcję liczącą pole wybranej figury (prostokąt, trapez, równoległobok, trójkąt) z wykorzystaniem instrukcji switch
// Każda figura powinna mieć osobną funkcję do liczenia pola

const rectangleArea = (a, b) => a * b;

const parallelogramArea = (a, h) => a * h;

const trapeziumArea = (a, b, h) => ((a + b) * h) / 2;

const triangleArea = (a, h) => (a * h) / 2;

// 'switch' nie jest rekomendowaną techniką w JS/TS
// https://gist.github.com/jonkemp/2c6e1e0f530b2af034a50374532f406f
// https://hackernoon.com/rethinking-javascript-eliminate-the-switch-statement-for-better-code-5c81c044716d

// const calcArea = (figureName, ...args) => {
//   switch (figureName) {
//     case "rectangle":
//       return rectangleArea(...args);

//     case "parallelogram":
//       return parallelogramArea(...args);

//     case "trapezium":
//       return trapeziumArea(...args);

//     case "triangle":
//       return triangleArea(...args);

//     default:
//       throw new Error("Unknown figure name");
//   }
// };

const getAreaFn = figureName =>
  ({
    rectangle: rectangleArea,
    parallelogram: parallelogramArea,
    trapezium: trapeziumArea,
    triangle: triangleArea
  }[figureName]);

const calcArea = (figureName, ...args) => {
  const fn = getAreaFn(figureName);

  if (!fn) {
    throw new Error("Unknown figure name");
  }

  return fn(...args);
};

const figureArgsToString = (figureName, ...args) =>
  `${figureName}: ${
    {
      rectangle: `a = ${args[0]}, b = ${args[1]}`,
      parallelogram: `a = ${args[0]}, h = ${args[1]}`,
      trapezium: `a = ${args[0]}, b = ${args[1]}, h = ${args[2]}`,
      triangle: `a = ${args[0]}, h = ${args[1]}`
    }[figureName]
  }`;

const printExercise7 = () => {
  const figureName = document.querySelector(
    "input[name=figure1]:checked"
  ).value;
  const args = [getValue("7a"), getValue("7b"), getValue("7c")];

  printExercise(
    7,
    `${figureArgsToString(figureName, ...args)} => ${calcArea(
      figureName,
      ...args
    )}`
  );
};

// 8. Napisz funkcję liczącą pole wybranej figury (prostokąt, trapez, równoległobok, trójkąt) bez użycia instrukcji warunkowej (bez if, switch, pętli)
// Wykorzystaj funkcje anonimowe i callback.

const calcAreaFromCallback = (callback, ...args) => callback?.(...args);

const printExercise8 = () => {
  const figureName = document.querySelector(
    "input[name=figure2]:checked"
  ).value;
  const args = [getValue("8a"), getValue("8b"), getValue("8c")];

  const fn = getAreaFn(figureName);

  printExercise(
    8,
    `${figureArgsToString(figureName, ...args)} => ${calcAreaFromCallback(
      fn,
      ...args
    )}`
  );
};

// 9. Napisz funkcję wypisującą w konsoli trójkąt Pascala o wysokości podanej jako parametr

const makePascalTriangle = length => {
  const arr = [[1]];

  for (const i of range(length)) {
    const previousRow = arr[i];
    const nextRow = [1];

    for (const j of range(previousRow.length)) {
      nextRow.push(previousRow[j] + (previousRow[j + 1] ?? 0));
    }

    arr.push(nextRow);
  }

  return arr;
};

const makePascalTriangleStr = length => {
  const arr = makePascalTriangle(length);

  const lastRow = arr[arr.length - 1];

  const maxValueStrLength = String(
    lastRow[Math.ceil(lastRow.length / 2)]
  ).length;

  const strArr = arr.map(row =>
    row.map(value => strPad(String(value), maxValueStrLength)).join(" ")
  );

  const maxRowStrLength = strArr[strArr.length - 1].length;

  return strArr.map(row => strPad(row, maxRowStrLength)).join("\n");
};

const printExercise9 = () => {
  const h = getValue("9");

  printExercise(9, `${h} =>\n${makePascalTriangleStr(h)}`);
};
