const getRandomColorSource = () => Math.floor(Math.random() * 255);
const getRandomCssRgb = () =>
  `rgb(${getRandomColorSource()}, ${getRandomColorSource()}, ${getRandomColorSource()})`;

let divPlayground = null;
const divs = reactive([]);

const updateDivPlayground = () => {
  divPlayground.replaceChildren(...divs);
};

watch(divs, updateDivPlayground);

const addDiv = () => {
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `div ${divs.length + 1}`;
  newDiv.style.background = getRandomCssRgb();
  divs.push(newDiv);
};

const shiftDiv = () => {
  divs.shift();
};

const setDivsDefaultContent = () => {
  divs.forEach((item, i) => {
    item.innerHTML = `div ${i + 1}`;
  });
};

const colorizeThirdDiv = () => {
  if (!divs[2]) {
    return;
  }

  divs[2].style.background = getRandomCssRgb();
};

const setDivsContent = content => {
  divs.forEach(item => {
    item.innerHTML = content;
  });
};

window.addEventListener("load", () => {
  divPlayground = document.querySelector(".div-playground");
  addDiv();
  addDiv();
  addDiv();
  addDiv();
});
