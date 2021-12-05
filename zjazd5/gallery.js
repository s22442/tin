const forceNextTick = () => {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
};

const capitalize = str => str[0].toUpperCase() + str.slice(1);

const pushModalElement = (parent, elementName) => {
  const el = document.createElement("div");
  el.classList.add(`lightbox-gallery__modal__${elementName}`);
  parent.appendChild(el);
  return el;
};

const getLatestElement = selectors => {
  const elements = document.querySelectorAll(selectors);
  return elements[elements.length - 1];
};

const getLatestImgWrappers = () =>
  getLatestElement(".lightbox-gallery__modal__container")?.children;

const getActiveImgIndexOfImgWrappers = elements =>
  [...elements].findIndex(item =>
    item.firstChild.classList.contains(
      "lightbox-gallery__modal__container__img--active"
    )
  );

const setGalleryModalUpperBarText = () => {
  const wrappers = getLatestImgWrappers();

  if (!wrappers?.length) {
    return;
  }

  getLatestElement(".lightbox-gallery__modal__upper-bar").innerHTML =
    capitalize(
      wrappers[getActiveImgIndexOfImgWrappers(wrappers)]?.firstChild?.title ||
        "image"
    );
};

const setGalleryModalNavigationBtnStatus = () => {
  const wrappers = getLatestImgWrappers();

  if (!wrappers?.length) {
    return;
  }

  const activeIndex = getActiveImgIndexOfImgWrappers(wrappers);

  const previousBtn = getLatestElement(
    ".lightbox-gallery__modal__lower-bar__previous-btn"
  );
  const nextBtn = getLatestElement(
    ".lightbox-gallery__modal__lower-bar__next-btn"
  );

  previousBtn.classList[activeIndex ? "remove" : "add"](
    "lightbox-gallery__modal__lower-bar__btn--disabled"
  );
  nextBtn.classList[activeIndex < wrappers.length - 1 ? "remove" : "add"](
    "lightbox-gallery__modal__lower-bar__btn--disabled"
  );
};

const changeActiveGalleryModalImg = async move => {
  const wrappers = getLatestImgWrappers();

  if (!wrappers?.length) {
    return;
  }

  const activeIndex = getActiveImgIndexOfImgWrappers(wrappers);
  const targetIndex = activeIndex + move;

  if (!wrappers[targetIndex]?.firstChild) {
    return;
  }

  wrappers[activeIndex].firstChild.classList.remove(
    "lightbox-gallery__modal__container__img--active"
  );
  wrappers[targetIndex].firstChild.classList.add(
    "lightbox-gallery__modal__container__img--active"
  );

  await forceNextTick();
  setGalleryModalUpperBarText();
  setGalleryModalNavigationBtnStatus();
};

const nextGalleryModalImg = () => {
  changeActiveGalleryModalImg(1);
};

const previousGalleryModalImg = async () => {
  changeActiveGalleryModalImg(-1);
};

const showGalleryModal = async (children, index) => {
  const modal = document.createElement("div");
  modal.classList.add("lightbox-gallery__modal");

  const container = pushModalElement(modal, "container");
  container.replaceChildren(
    ...[...children].map((el, i) => {
      const newEl = el.cloneNode(true);
      newEl.classList.add("lightbox-gallery__modal__container__img");

      if (i === index) {
        newEl.classList.add("lightbox-gallery__modal__container__img--active");
      }

      const wrapper = document.createElement("div");
      wrapper.classList.add("lightbox-gallery__modal__container__img__wrapper");
      wrapper.appendChild(newEl);

      return wrapper;
    })
  );

  pushModalElement(modal, "upper-bar");

  const lowerBar = pushModalElement(modal, "lower-bar");

  const previousBtn = document.createElement("div");
  previousBtn.classList.add("lightbox-gallery__modal__lower-bar__previous-btn");
  previousBtn.innerHTML = "navigate_before";
  previousBtn.onclick = previousGalleryModalImg;

  const nextBtn = document.createElement("div");
  nextBtn.classList.add("lightbox-gallery__modal__lower-bar__next-btn");
  nextBtn.innerHTML = "navigate_next";
  nextBtn.onclick = nextGalleryModalImg;

  lowerBar.appendChild(previousBtn);
  lowerBar.appendChild(nextBtn);

  const closeBtn = pushModalElement(modal, "close-btn");
  closeBtn.innerHTML = "close";
  closeBtn.onclick = hideGalleryModal;

  modal.style.opacity = 0;
  document.querySelector("body").appendChild(modal);

  await forceNextTick();
  modal.style.opacity = 1;

  setGalleryModalUpperBarText();
  setGalleryModalNavigationBtnStatus();
};

const hideGalleryModal = () => {
  const modal = getLatestElement(".lightbox-gallery__modal");

  if (modal) {
    modal.style.opacity = 0;
    modal.style.pointerEvents = "none";

    setTimeout(() => {
      modal.remove();
    }, 1000);
  }
};

window.addEventListener("load", () => {
  const gallery = document.querySelector(".lightbox-gallery");
  for (const i of range(gallery.children.length)) {
    gallery.children[i].onclick = () => {
      showGalleryModal(gallery.children, i);
    };
  }
});
