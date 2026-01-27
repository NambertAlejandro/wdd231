const spotlightsContainer = document.querySelector("#spotlights");

async function getMembersData() {
  try {
    const response = await fetch("members.json"); // ajuste se necessário
    if (!response.ok) throw new Error("Erro ao carregar members.json");
    const members = await response.json();
    return members;
  } catch (err) {
    console.error(err);
    spotlightsContainer.innerHTML = "<p>Não foi possível carregar os destaques.</p>";
    return [];
  }
}

function levelLabel(level) {
  if (level === 3) return "Gold";
  if (level === 2) return "Silver";
  return "Member";
}

function shuffle(array) {
  // Fisher–Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderSpotlights(selected) {
  spotlightsContainer.innerHTML = "";

  selected.forEach((m) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    // Ajuste o caminho conforme seu projeto
    const imgPath = `/images/${m.businessIMG}`;

    card.innerHTML = `
      <img src="${imgPath}" alt="${m.businessName} logo" loading="lazy">
      <h3>${m.businessName}</h3>
      <p>${m.businessAddress}</p>
      <p>${m.businessPhone}</p>
      <p><strong>${levelLabel(m.businessLevel)}</strong></p>
      <p><a href="${m.businessURL}" target="_blank" rel="noopener">Visit Website</a></p>
    `;

    spotlightsContainer.appendChild(card);
  });
}

async function loadSpotlights() {
  const members = await getMembersData();

  // 1) filtra apenas Gold (3) e Silver (2)
  const eligible = members.filter((m) => m.businessLevel === 3 || m.businessLevel === 2);

  if (eligible.length === 0) {
    spotlightsContainer.innerHTML = "<p>Sem membros Gold/Silver para destacar.</p>";
    return;
  }

  // 2) escolhe 2 ou 3 aleatoriamente
  const count = Math.random() < 0.5 ? 2 : 3;

  // 3) embaralha e pega os primeiros (sem repetição)
  const selected = shuffle([...eligible]).slice(0, Math.min(count, eligible.length));

  renderSpotlights(selected);
}

loadSpotlights();
