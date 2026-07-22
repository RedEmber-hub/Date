require("dotenv").config();

const { Bot, session, Keyboard, InlineKeyboard } = require("grammy");
const { HttpsProxyAgent } = require("https-proxy-agent");

const menu = new Keyboard()
    .text("❤️ Пригласить на свидание")
    .row()
    .text("📨 Мои приглашения")
    .resized();

const agent = new HttpsProxyAgent("http://127.0.0.1:12334");

const bot = new Bot(process.env.BOT_TOKEN, {
    client: {
        baseFetchConfig: {
            agent,
            compress: true,
        },
    },
});

bot.use(
    session({
        initial: () => ({
            state: null,
        }),
    })
);

bot.command("start", async (ctx) => {
    const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            telegram_id: ctx.from.id,
            username: ctx.from.username,
            first_name: ctx.from.first_name,
            last_name: ctx.from.last_name,
        }),
    });

    const user = await response.json();

    ctx.session.userId = user.id;
    ctx.session.state = null;

    const waitingResponse = await fetch(
    `http://localhost:3000/invitations/waiting/${ctx.from.username}`
);

const waitingInvitations = await waitingResponse.json();

if (waitingInvitations.length > 0) {
    await fetch(
        `http://localhost:3000/invitations/waiting/${ctx.from.username}`,
        {
            method: "PUT",
        }
    );

    for (const invitation of waitingInvitations) {
        const senderResponse = await fetch(
            `http://localhost:3000/users/${invitation.user_id}`
        );

        const sender = await senderResponse.json();

        const keyboard = new InlineKeyboard().url(
            "💌 Открыть приглашение",
            `https://cdn.idaprikol.ru/images/4ce75bc9bbf620253489493050d746e7e66abfce2c3a495d35dbb399f58c9e12_1.jpg`
        );

        await bot.api.sendMessage(
            ctx.from.id,
            `💌 Новое приглашение на свидание!

Отправитель: ${sender.first_name}

Нажмите кнопку ниже, чтобы посмотреть приглашение.`,
            {
                reply_markup: keyboard,
            }
        );
    }
}

    await ctx.reply(
        `👋 Привет!

Добро пожаловать в DateInvite.

Выберите действие:`,
        {
            reply_markup: menu,
        }
    );
});

bot.hears("❤️ Пригласить на свидание", async (ctx) => {
    ctx.session.state = "waiting_username";

    await ctx.reply(
        "Введите username девушки.\nНапример: @anna"
    );
});

bot.hears("📨 Мои приглашения", async (ctx) => {
    await ctx.reply("Пока эта функция находится в разработке.");
});

bot.on("message:text", async (ctx) => {
    if (ctx.message.text.startsWith("/")) {
        return;
    }

    if (ctx.session.state !== "waiting_username") {
        return;
    }

    ctx.session.state = null;

    const username = ctx.message.text.trim().replace("@", "");

    try {
        const response = await fetch(
            `http://localhost:3000/users/username/${username}`
        );

        let girl = null;
        let status;

        if (response.status === 404) {
            status = "waiting_user";
        } else if (response.ok) {
            girl = await response.json();
            status = "pending";
        } else {
            throw new Error("Ошибка проверки пользователя");
        }

        const invitationResponse = await fetch(
            "http://localhost:3000/invitations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: ctx.session.userId,
                    girl_username: username,
                    status,
                }),
            }
        );

        if (!invitationResponse.ok) {
            throw new Error("Не удалось создать приглашение");
        }

        const invitation = await invitationResponse.json();

        const senderResponse = await fetch(
            `http://localhost:3000/users/username/${ctx.from.username}`
        );

        const sender = await senderResponse.json();

        if (status === "waiting_user") {
            await ctx.reply(
                "Этот пользователь ещё не запускал бота. Попросите его открыть DateInvite и нажать /start. После этого приглашение будет отправлено автоматически."
            );
        } else {
            const keyboard = new InlineKeyboard().url(
                "💌 Открыть приглашение",
                `https://cdn.idaprikol.ru/images/4ce75bc9bbf620253489493050d746e7e66abfce2c3a495d35dbb399f58c9e12_1.jpg`
            );

            await bot.api.sendMessage(
                girl.telegram_id,
                `💌 Новое приглашение на свидание!

Отправитель: ${sender.first_name}

Нажмите кнопку ниже, чтобы посмотреть приглашение.`,
                {
                    reply_markup: keyboard,
                }
            );

            await ctx.reply("✅ Приглашение отправлено.");
        }
    } catch (err) {
        console.error(err);
        await ctx.reply("Произошла ошибка.");
    }
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