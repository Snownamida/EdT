let h2s = document.querySelectorAll("h2");
console.log(h2s);
for (let h2 of h2s) {
  h2.insertAdjacentHTML(
    "afterend",
    "<p>Cette interface a été embellie par Jixiang.</p>"
  );
}
