let h2s = document.querySelectorAll("h2");
for (let h2 of h2s) {
  h2.insertAdjacentHTML(
    "afterend",
    "<p>Cette interface a été embellie par Jixiang. L'EdT est mis à jour avec ADE à 0h58 le 1/10/2023.</p>"
  );
}

fetch("https://servif.insa-lyon.fr/EdT/3IF").then(response => {
  console.log('response咯');
  console.log(response);
  console.log('response辽');
});
