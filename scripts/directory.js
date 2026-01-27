console.log("✅ directory.js loaded");

/* ================= GRID / LIST VIEW ================= */

const gridButton = document.querySelector("#gridBtn");
const listButton = document.querySelector("#listBtn");
const display = document.querySelector("#members");

// Only attach listeners if elements exist (prevents errors on other pages)
if (gridButton && listButton && display) {
  gridButton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
  });

  listButton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
  });
}

