import TelegramBot from "node-telegram-bot-api";

const TOKEN = "8595292368:AAHyEs9NQxrSnMKiXbJyMUEdII98h51QgG0"

const bot = new TelegramBot(TOKEN, { polling:true });

bot.on("message", (msg) => {
  console.log(msg);
  const chatId = msg.chat.id;
  const text = msg.text;
  const firstName = msg.chat.first_name;

  //   bot.sendMessage(chatId, text);
  // start uchun handler
  if (text == "/start") {
    bot.sendMessage(
      chatId,
      `
        👋 Assalomu alaykum, ${firstName}!

📚 100x Academy o‘quv markazining rasmiy botiga xush kelibsiz!

Bu bot orqali siz:
• Kurslarimiz haqida batafsil ma’lumot olasiz  
• Kurslarga onlayn ro‘yxatdan o‘tishingiz mumkin  
• Jadval va to‘lovlar haqida ma’lumot olasiz  

Quyidagi menyudan kerakli bo‘limni tanlang 👇

        `,
      {
        reply_markup: {
          keyboard: [
            [{ text: "📚 Kurslar" }, { text: "✍️ Ro‘yxatdan o‘tish" }],
            [{ text: "ℹ️ Markaz haqida" }, { text: "💬 Fikr bildirish" }],
            [{ text: "❓ Yordam" }],
          ],
          resize_keyboard: true,
        },
      }
    );
  } else if (text == "📚 Kurslar") {
    bot.sendMessage(
      chatId,
      `🎓 Bizning o‘quv markazimizda quyidagi kurslar mavjud:

    1️⃣ Ingliz tili  
    2️⃣ Rus tili  
    3️⃣ Matematika  
    4️⃣ Dasturlash (Python, Web)  
    5️⃣ Grafik dizayn  
    
    👇 Quyidagi kurslardan birini tanlang va batafsil ma’lumot oling:
    `,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "🇬🇧 Ingliz tili", callback_data: "english" }],
            [{ text: "🇷🇺 Rus tili", callback_data: "russian" }],
            [{ text: "🧮 Matematika", callback_data: "math" }],
            [{ text: "💻 Dasturlash", callback_data: "it" }],
            [{ text: "🎨 Grafik dizayn", callback_data: "design" }],
          ],
        },
      }
    );
  } else {
    bot.sendMessage(
      chatId,
      `
    ⚠️ Kechirasiz, men sizning xabaringizni tushunmadim.

Iltimos, quyidagi tugmani bosing 👇
/start

    `
    );
  }
});
bot.on

console.log("Bot ishga tushdi...");