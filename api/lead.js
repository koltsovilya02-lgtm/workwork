export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }

  const { name, phone, niche, task, budget } = req.body;

  if (!phone) {
    return res.status(400).json({ ok: false });
  }

  const text = `
Новая заявка:

Имя: ${name || "-"}
Телефон: ${phone}
Ниша: ${niche || "-"}
Бюджет: ${budget || "-"}
Задача: ${task || "-"}
`;

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
    }),
  });

  res.status(200).json({ ok: true });
}
