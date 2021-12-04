let accordion = null;

const toggleAccordionItem = index => {
  for (const i of range(accordion.children.length)) {
    accordion.children[i].classList[i === index ? "add" : "remove"](
      "accordion__item--active"
    );
  }
};

window.addEventListener("load", () => {
  accordion = document.querySelector(".accordion");
  for (const i of range(accordion.children.length)) {
    accordion.children[i].onclick = () => {
      toggleAccordionItem(i);
    };
  }
  toggleAccordionItem(0);
});
