import TelegramBot from "node-telegram-bot-api";

const TOKEN = "8595292368:AAHyEs9NQxrSnMKiXbJyMUEdII98h51QgG0"

const bot = new TelegramBot(TOKEN, { polling:true });


bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const firstName = msg.chat.first_name;

  if (text === "/start") {
    bot.sendMessage(chatId, `
👋 Assalomu alaykum, ${firstName}!

📚 100x Academy o‘quv markazining rasmiy botiga xush kelibsiz!

Quyidagi menyudan kerakli bo‘limni tanlang 👇
    `, {
      reply_markup: {
        keyboard: [
          [{ text: "📚 Kurslar" }, { text: "✍️ Kursga yozilish" }],
          [{ text: "ℹ️ Markaz haqida" }, { text: "💬 Fikr bildirish" }],
          [{ text: "❓ Yordam" }],
        ],
        resize_keyboard: true,
      }
    });
  }

  if (text === "📚 Kurslar") {
    bot.sendMessage(chatId, `🎓 Bizning o‘quv markazimizda quyidagi kurslar mavjud:`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🇬🇧 Ingliz tili", callback_data: "english" }],
          [{ text: "🇷🇺 Rus tili", callback_data: "russian" }],
          [{ text: "🧮 Matematika", callback_data: "math" }],
          [{ text: "💻 Dasturlash", callback_data: "it" }],
          [{ text: "🎨 Grafik dizayn", callback_data: "design" }],
        ]
      }
    });
  } else if (text == "✍️ Kursga yozilish" ) {
             bot.sendMessage(chatId, "Ajoyib! Qursga yozilish  uchun avvalo ism va familiyangizni kiriting:"); 

  } else if (text == "ℹ️ Markaz haqida") {
    bot.sendMessage(chatId,`
      ℹ️ MARKAZ HAQIDA

🎓 100x o‘quv markazi
📍 Manzil: Xiva IT PARK ichida
⏰ Ish vaqti: Dush–Yak, 9:00–19:00
📞 +998 90 123 45 67
      `)
  }

   else {
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

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;


  if (data ==='english') {
    bot.sendMessage(chatId, `
      🇬🇧 Ingliz tili kursi (IELTS tayyorlov)
📘 Maqsad: 5.5 dan 7.0 gacha olib chiqish
⏳ Davomiyligi: IELTS olguncha
💵 Narxi: 500 ming so‘m / oyiga
👨‍🏫 Ustoz: ....
      `, {
      reply_markup: {
        inline_keyboard: [[{ text: "✍️ Kursga yozilish", callback_data: "yozilish" }]]
      }
    });
  } else if (data === 'russian') {
    bot.sendMessage(chatId, `
      🇷🇺 Rus tili (Suhbat darajasi)
      📘 Maqsad: Ish / o‘qish uchun so‘zlashuv darajasi
⏳ 2 oy, haftasiga 3 marta
💵 400 ming so‘m / oy
👨‍🏫 Ustoz: .....
      `, {
      reply_markup: {
        inline_keyboard: [[{ text: "✍️ Kursga yozilish", callback_data: "yozilish" }]]
      }
    });
  } else if (data == "math") {
    bot.sendMessage(chatId, `
      🧮 Matematika (maktab va abituriyentlar uchun)
🎯 Maqsad: Formulalarni to‘liq tushunish va test yechish
⏳ 4 oy
💵 450 ming so‘m / oy
👨‍🏫 Ustoz: .....
      `, {
      reply_markup: {
        inline_keyboard: [[{ text: "✍️ Kursga yozilish", callback_data: "yozilish" }]]
      }
    });
  } else if(data == "it"){
        bot.sendMessage(chatId, `
          💻 Dasturlash (Frontend va Backend)
🎯 Maqsad: 0 dan Junior darajaga
⏳ 6 oy
💵 600 ming so‘m / oy
👨‍🏫 Mentor: ....
      `, {
      reply_markup: {
        inline_keyboard: [[{ text: "✍️ Kursga yozilish", callback_data: "yozilish" }]]
      }
    });
  } else if (data == "design") {
         bot.sendMessage(chatId, `
          🎨 Grafika dizayn (Adobe, Canva)
🎯 Maqsad: Logo, banner, post tayyorlashni o‘rganish
⏳ 3 oy
💵 500 ming so‘m / oy
👨‍🏫 Ustoz: ....
      `, {
      reply_markup: {
        inline_keyboard: [[{ text: "✍️ Kursga yozilish", callback_data: "yozilish" }]]
      }
    }); 
  } else if (data =='yozilish' ) {
    bot.sendMessage(chatId, "Ajoyib! Qursga yozilish  uchun avvalo ism va familiyangizni kiriting:");
  } else if (text == "✍️ Kursga yozilish" ) {
       bot.sendMessage(chatId,"Ajoyib! Qursga yozilish  uchun avvalo ism va familiyangizni kiriting:",); 

  } 
});

console.log("Bot ishga tushdi...");
