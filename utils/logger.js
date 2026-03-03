const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    // Hiển thị log ra màn hình console
    new transports.Console(),
    // Lưu log vào file trong thư mục logs/
    new transports.File({ 
      filename: path.join(__dirname, '../test-results/logs/execution.log'),
      level: 'info' 
    })
  ]
});

module.exports = logger;