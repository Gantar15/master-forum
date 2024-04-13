export const verifyEmailTemplate = (text) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          /* CSS стили */
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
          }

          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 5px;
            padding: 30px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }

          h1 {
            color: #333333;
            margin-top: 0;
          }

          p {
            color: #666666;
          }

          .button {
            display: inline-block;
            background-color: #4285f4;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 3px;
            margin-top: 20px;
          }

          .button:hover {
            background-color: #3367d6;
          }
        </style>
      </head>
        <body>
          <div class="container">
            <h1>Добро пожаловать на Master-Forum!</h1>
            <p>Пожалуйста, подтвердите свою электронную почту, чтобы начать использовать наш сайт.</p>
            <p>Нажмите на кнопку ниже, чтобы подтвердить вашу почту:</p>
            <a class="button" href="${text}">Подтвердить почту</a>
          </div>
        </body>
      </html>
    `;
};
