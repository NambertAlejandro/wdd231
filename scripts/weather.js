const API_KEY = "e6782f806715896684723af3828d5eae";
const LAT = -23.5505;
const LON = -46.6333;
const UNITS = "metric";
const LANG = "pt_br";

const tempEl = document.querySelector("#temp");
const descEl = document.querySelector("#desc");
const todayEl = document.querySelector("#today");
const day1NameEl = document.querySelector("#day1-name");
const day2NameEl = document.querySelector("#day2-name");
const day1El = document.querySelector("#day1");
const day2El = document.querySelector("#day2");

if (!tempEl || !descEl || !todayEl || !day1NameEl || !day2NameEl || !day1El || !day2El) {
  console.log("[weather] elementos não encontrados");
} else {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=${UNITS}&lang=${LANG}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=${UNITS}&lang=${LANG}`;

  const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

  function weekday(dateStr) {
    return cap(new Date(dateStr + "T00:00:00").toLocaleDateString("pt-BR", { weekday: "long" }));
  }

  function pick3days(list) {
    const byDate = {};
    for (const item of list) {
      const date = item.dt_txt.split(" ")[0];
      (byDate[date] ??= []).push(item);
    }
    const dates = Object.keys(byDate).sort().slice(0, 3);
    const chosen = dates.map((d) => byDate[d].find(x => x.dt_txt.endsWith("12:00:00")) || byDate[d][0]);
    return { dates, chosen };
  }

  async function run() {
    descEl.textContent = "Carregando...";

    // current
    const cRes = await fetch(currentUrl);
    const cText = await cRes.text();
    if (!cRes.ok) {
      console.error("CURRENT ERROR:", cRes.status, cText);
      throw new Error(`Current ${cRes.status}`);
    }
    const cData = JSON.parse(cText);

    tempEl.textContent = `${Math.round(cData.main.temp)}°C`;
    descEl.textContent = cap(cData.weather?.[0]?.description ?? "");

    // forecast
    const fRes = await fetch(forecastUrl);
    const fText = await fRes.text();
    if (!fRes.ok) {
      console.error("FORECAST ERROR:", fRes.status, fText);
      throw new Error(`Forecast ${fRes.status}`);
    }
    const fData = JSON.parse(fText);

    const { dates, chosen } = pick3days(fData.list);

    todayEl.textContent = `${Math.round(chosen[0].main.temp)}°C`;
    day1NameEl.textContent = weekday(dates[1]);
    day2NameEl.textContent = weekday(dates[2]);
    day1El.textContent = `${Math.round(chosen[1].main.temp)}°C`;
    day2El.textContent = `${Math.round(chosen[2].main.temp)}°C`;
  }

  run().catch(() => {
    descEl.textContent = "Weather unavailable";
  });
}
