export const reset = () => {
  const cards = document.querySelectorAll<HTMLElement>(".card");
  cards.forEach((child) => {
    child.className = "card";
    child.style.animation = "";
  });
};
