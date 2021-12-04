let nav = null;

window.onload = () => {
  nav = document.querySelector(".nav-container");
  nav.classList.add("nav-container--collapsed");
};

const toggleNavCollapse = () => {
  nav.classList.toggle("nav-container--collapsed");
};

window.onresize = () => {
  if (
    window.innerWidth > 1000 &&
    !nav.classList.contains("nav-container--collapsed")
  ) {
    toggleNavCollapse();
  }
};
