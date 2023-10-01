let h2s = document.querySelectorAll("h2");

fetch("../json/fetchtime.json")
  .then(reponse => reponse.json())
  .then(fetchtimejson => JSON.parse(fetchtimejson))
  .then(fetchtime => {
    for (let h2 of h2s) {
      h2.insertAdjacentHTML(
        "afterend",
        `<p>Cette interface a été embellie par Jixiang. L'EdT est mis à jour avec ADE à ${timestamp_to_date(
          fetchtime
        )}.</p>`
      );
    }
  });

function timestamp_to_date(timestamp) {
  const date = new Date(timestamp); // 参数需要毫秒数，所以这里将秒数乘于 1000
  Y = date.getFullYear() + "-";
  M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  D = date.getDate() + " ";
  h = date.getHours() + ":";
  m = date.getMinutes() + ":";
  s = date.getSeconds();
  return Y + M + D + h + m + s;
}
