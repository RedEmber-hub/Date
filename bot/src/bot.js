require("dotenv").config();

const { Bot } = require("grammy");
const { HttpsProxyAgent } = require("https-proxy-agent");

const agent = new HttpsProxyAgent("http://127.0.0.1:12334");

const bot = new Bot(process.env.BOT_TOKEN, {
  client: {
    baseFetchConfig: {
      agent,
      compress: true,
    },
  },
});

bot.command("start", async (ctx) => {
  await ctx.reply("Привет! это дина ура ура у меня есть бот 👋");
});

bot.catch((err) => {
  console.error(err);
});

(async () => {
  try {
    const me = await bot.api.getMe();
    console.log("Connected as:", me.username);

    await bot.start();
    console.log("Bot is running");
  } catch (e) {
    console.dir(e, { depth: null });
  }
})();