const { fetch, ProxyAgent } = require("undici");

const agent = new ProxyAgent("http://127.0.0.1:12334");

fetch("https://api.telegram.org", {
  dispatcher: agent,
})
  .then(async (res) => {
    console.log("Status:", res.status);
    console.log(await res.text());
  })
  .catch(console.error);