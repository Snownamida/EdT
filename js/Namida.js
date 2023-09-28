let h2s = document.querySelectorAll("h2");
console.log(h2s);
for (let h2 of h2s) {
  h2.insertAdjacentHTML(
    "afterend",
    "<p>Cette interface a été embellie par Jixiang. L'EdT est mis à jour avec ADE à 1h14 le 29/09/2023.</p>"
  );
}
