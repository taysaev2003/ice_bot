import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (text === '/start') {
    const welcomeMessage = `
    Добро пожаловать! 🍽️\n\nЯ бот, который поможет заказть еду с ресторана SushiBar. Вы можете выбрать блюда из нашего меню и сделать заказ. 😊\n\nДля просмотра меню и совершения заказа, воспользуйтесь кнопкой ниже:
    `;

    await bot.sendMessage(chatId, welcomeMessage, {
      reply_markup: {
        keyboard: [
          [
            {
              text: 'Меню 🍔',
              web_app: {
                url: 'https://www.google.ru/?hl=ru/',
              },
            },
          ],
        ],
        resize_keyboard: true,
      },
    });
  }
  if (msg?.web_app_data?.data) {
    const data = JSON.parse(msg?.web_app_data?.data);
    console.log(data);
  }
});
