const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function check() {
  const key = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
  if (!key) {
      console.log("ОШИБКА: Ключ не найден в .env.local"); 
      return;
  }
  
  const genAI = new GoogleGenerativeAI(key);
  // Используем хак с прямой проверкой через модель, так как метода listModels в SDK нет
  // Но лучше сделать прямой запрос через fetch, чтобы увидеть всё без SDK
  
  console.log(`Проверяем ключ: ${key.substring(0, 10)}...`);

  try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
      const data = await response.json();
      
      if (data.error) {
          console.error("Ошибка API:", data.error.message);
      } else {
          console.log("\n✅ ДОСТУПНЫЕ МОДЕЛИ (Скопируйте имя из списка):");
          data.models.forEach(m => {
              // Показываем только модели для генерации (gemini)
              if (m.name.includes('gemini')) {
                  console.log(`- "${m.name.replace('models/', '')}"`);
              }
          });
      }
  } catch (e) {
      console.error("Ошибка сети:", e);
  }
}

check();