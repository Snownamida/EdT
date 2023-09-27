let n = document.createElement("p");
n.innerText = "Jixiang";
let edts = document.querySelectorAll("table.edt");
let body = document.querySelector("body");
console.log(edts);
for (let edt of edts) {
  body.insertBefore(n, edt);
}
