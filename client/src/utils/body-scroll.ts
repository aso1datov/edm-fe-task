export function lockBodyScroll() {
  const body = document.body;

  body.style.top = `${window.scrollY * -1}px`;
  body.style.position = "fixed";
  body.style.overflow = "hidden";
}

export function releaseBodyScroll() {
  const body = document.body;
  const scrollY = body.style.top;

  body.style.top = "";
  body.style.position = "";
  body.style.overflow = "";

  window.scrollTo(0, parseInt(scrollY || "0") * -1);
}
