import TelegramBot from "node-telegram-bot-api";

const TOKEN = "8595292368:AAHyEs9NQxrSnMKiXbJyMUEdII98h51QgG0"

const bot = new TelegramBot(TOKEN, { polling:true });


// Simple in-memory store (production uchun db kerak)
const userData = {};

// Message handler
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const firstName = msg.chat.first_name;

  // Agar foydalanuvchi ro'yxatdan o'tish jarayonida bo'lsa, shu yerda qadamlarni boshqaramiz
  if (userData[chatId]?.step) {
    const step = userData[chatId].step;

    if (step === 'name') {
      // Ismni qabul qilish
      if (!text) {
        bot.sendMessage(chatId, "Iltimos, ism va familiyangizni matn sifatida yuboring.");
        return;
      }
      userData[chatId].name = text;
      userData[chatId].step = 'phone';

      bot.sendMessage(chatId, "Telefon raqamingizni yuboring (masalan: +998901234567):", {
        reply_markup: {
          keyboard: [[{ text: '📱 Raqamni yuborish', request_contact: true }]],
          resize_keyboard: true,
          one_time_keyboard: true
        }
      });
      return;
    }

    if (step === 'phone') {
      // Telefonni qabul qilish — contact yoki text
      if (msg.contact && msg.contact.phone_number) {
        userData[chatId].phone = msg.contact.phone_number;
      } else if (text) {
        userData[chatId].phone = text;
      } else {
        bot.sendMessage(chatId, "Iltimos telefon raqamingizni yuboring.");
        return;
      }

      userData[chatId].step = 'course_choice';

      bot.sendMessage(chatId, "Qaysi kursga yozilmoqchisiz?", {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🇬🇧 Ingliz tili', callback_data: 'course_english' }],
            [{ text: '🇷🇺 Rus tili', callback_data: 'course_russian' }],
            [{ text: '💻 Dasturlash', callback_data: 'course_programming' }],
            [{ text: '🎨 Dizayn', callback_data: 'course_design' }]
          ]
        }
      });
      return;
    }

    if (step === 'done') {
      bot.sendMessage(chatId, "Siz allaqachon ro'yxatdan o'tgansiz. Agar yangilamoqchi bo'lsangiz, admin bilan bog'laning.");
      return;
    }
  }

  // Oddiy buyruqlar / menyu
  if (text === "/start") {
    bot.sendMessage(chatId, `
👋 Assalomu alaykum, ${firstName}!

📚 100x Academy o‘quv markazining rasmiy botiga xush kelibsiz!

Quyidagi menyudan kerakli bo‘limni tanlang 👇
    `, {
      reply_markup: {
        keyboard: [
          [{ text: "📚 Kurslar" }, { text: "✍️ Ro‘yxatdan o‘tish" }],
          [{ text: "ℹ️ Markaz haqida" }, { text: "💬 Fikr bildirish" }],
          [{ text: "❓ Yordam" }],
        ],
        resize_keyboard: true,
      }
    });
    return;
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
    return;
  }

  if (text === "✍️ Ro‘yxatdan o‘tish") {
    // Ro'yxatdan o'tishni boshlash — name qadamiga o'tkazamiz
    userData[chatId] = { step: 'name' };
    bot.sendMessage(chatId, "Ism va familiyangizni kiriting:");
    return;
  }

  // Boshqa xabarlar uchun fallback
  bot.sendMessage(chatId, `⚠️ Kechirasiz, men sizning xabaringizni tushunmadim.\nIltimos, /start tugmasini bosing.`);
});

// Callback (inline button) handler
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  // Har doim callbackni javoblash — shunda Telegramda spinner ketadi
  bot.answerCallbackQuery(query.id).catch(console.error);

  if (data === 'english') {
    bot.sendMessage(chatId, `🇬🇧 Ingliz tili kursi (IELTS tayyorlov)\n📘 Maqsad: 5.5 dan 7.0 gacha\n💵 Narxi: 400 ming so‘m / oy`, {
      reply_markup: {
        inline_keyboard: [[{ text: "✍️ Kursga yozilish", callback_data: "yozilish" }]]
      }
    });
    return;
  }

  if (data === 'russian') {
    bot.sendMessage(chatId, `🇷🇺 Rus tili...\n`, {
      reply_markup: {
        inline_keyboard: [[{ text: "✍️ Kursga yozilish", callback_data: "yozilish" }]]
      }
    });
    return;
  }

  if (data === 'math' || data === 'it' || data === 'design') {
    // Muvofiq ma'lumotlarni yuboring
    const map = {
      math: '🧮 Matematika ...',
      it: '💻 Dasturlash ...',
      design: '🎨 Grafik dizayn ...'
    };
    bot.sendMessage(chatId, map[data], {
      reply_markup: {
        inline_keyboard: [[{ text: "✍️ Kursga yozilish", callback_data: "yozilish" }]]
      }
    });
    return;
  }

  if (data === 'yozilish') {
    // Inline tugma orqali yozilishni bosilganda — ro'yxatdan o'tishni boshlaymiz
    userData[chatId] = { step: 'name' };
    bot.sendMessage(chatId, "Ajoyib! Ro‘yxatdan o‘tish uchun avvalo ism va familiyangizni kiriting:");
    return;
  }

  // Kurs tanlashdan keyingi callback_data lar (masalan course_english)
  if (data.startsWith('course_')) {
    userData[chatId] = userData[chatId] || {};
    userData[chatId].course = data.replace('course_', '');
    userData[chatId].step = 'done';
    bot.sendMessage(chatId, `Siz ${userData[chatId].course} kursiga yozildingiz. Biz siz bilan tez orada bog'lanamiz.\n\nIsm: ${userData[chatId].name || '—'}\nTelefon: ${userData[chatId].phone || '—'}`);
    return;
  }
});

console.log("Bot ishga tushdi...");
