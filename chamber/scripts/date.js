const currentYear = new Date().getFullYear();

document.getElementById(
  "copyright"
).textContent = `© ${currentYear} -  Nambert Alejandro Silva Eleuterio - SP, Brazil`;

document.getElementById("lastModified").textContent = document.lastModified;
