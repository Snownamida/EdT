const { log } = require("console");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

let { username: username, password: password } = JSON.parse(
  fs.readFileSync("login.json", "utf8")
);

visit_login_web()
  .then(reponse => {
    return reponse.text();
  })
  .then(html => {
    // console.log(html)
    let login_web_document = new JSDOM(html).window.document;
    let lt = login_web_document.querySelector("input[name=lt]").value;
    let execution = login_web_document.querySelector(
      "input[name=execution]"
    ).value;
    // console.log(lt);
    return login(lt, execution);
  })
  .then(reponse => {
    // console.log(reponse.headers.get("location"));
    return visit_edt_with_ticket(reponse.headers.get("location"));
  })
  .then(reponse => {
    PHPSESSID = reponse.headers.getSetCookie()[1].split(" ")[0];
    console.log(PHPSESSID);
    return visit_edt(PHPSESSID);
  })
  .then(reponse => {
    // console.log(reponse);
    return reponse.text();
  })
  .then(html => {
    fs.writeFileSync("EdT/3IF.html", html);
  });

function visit_edt(PHPSESSID) {
  return fetch("https://servif.insa-lyon.fr/EdT/3IF", {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language":
        "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,fr;q=0.5",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-ch-ua":
        '"Microsoft Edge";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-site",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie: PHPSESSID,
    },
    referrer: "https://login.insa-lyon.fr/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
    redirect: "manual",
  });
}

function visit_edt_with_ticket(lien_avec_ticket) {
  return fetch(lien_avec_ticket, {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language":
        "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,fr;q=0.5",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-ch-ua":
        '"Microsoft Edge";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-site",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
    referrer: "https://login.insa-lyon.fr/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
    redirect: "manual",
  });
}

function login(lt, execution) {
  return fetch(
    "https://login.insa-lyon.fr/cas/login?service=https%3A%2F%2Fservif.insa-lyon.fr%2FEdT%2F3IF",
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language":
          "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,fr;q=0.5",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Microsoft Edge";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
      referrer:
        "https://login.insa-lyon.fr/cas/login?service=https%3A%2F%2Fservif.insa-lyon.fr%2FEdT%2F3IF",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `username=${username}&password=${password}&lt=${lt}&execution=${execution}&_eventId=submit&submit=SE+CONNECTER`,
      method: "POST",
      redirect: "manual",
      mode: "cors",
      credentials: "include",
    }
  );
}

function visit_login_web() {
  return fetch(
    "https://login.insa-lyon.fr/cas/login?service=https%3A%2F%2Fservif.insa-lyon.fr%2FEdT%2F3IF",
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language":
          "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,fr;q=0.5",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Microsoft Edge";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "omit",
    }
  );
}
