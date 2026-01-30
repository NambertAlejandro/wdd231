const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

async function getMembers() {
  try {
    // ajuste o caminho conforme sua estrutura:
    // se members.json estiver em /chamber/data/, use "/chamber/data/members.json"
    const response = await fetch("members.json");
    if (!response.ok) throw new Error("Erro ao carregar members.json");

    const members = await response.json();
    renderMembers(members);
  } catch (err) {
    console.error(err);
    membersContainer.innerHTML = "<p>Não foi possível carregar os membros.</p>";
  }
}

function levelLabel(level) {
  if (level === 3) return "Gold";
  if (level === 2) return "Silver";
  return "Member";
}

function renderMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((m) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    // ajuste o caminho da imagem conforme onde você salvou
    const imgPath = `images/${m.businessIMG}`;

    card.innerHTML = `
      <img src="${imgPath}" alt="${m.businessName} logo" loading="lazy">
      <h2>${m.businessName}</h2>
      <p>${m.businessAddress}</p>
      <p>${m.businessPhone}</p>
      <p><strong>${levelLabel(m.businessLevel)}</strong></p>
      <p><a href="${m.businessURL}" target="_blank" rel="noopener">Visit Website</a></p>
      <p>${m.otherInfo ?? ""}</p>
    `;

    membersContainer.appendChild(card);
  });
}

gridBtn.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
});

getMembers();
