document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navigation = document.getElementById("navigation");

  if (!menuBtn || !navigation) return;

  menuBtn.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", !expanded);
  });
});
