const express = require('express');
const os = require('os');

const router = express.Router();

router.use((req, res, next) => {
  const start = process.hrtime();
  const event = new Date();

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const time = diff[0] * 1e3 + diff[1] * 1e-6; // Temps en millisecondes

    const arr = {
      "Timestamp": event.toString(),
      "Request path": req.path,
      'Request Type': req.method,
      "Request origin": req.ip,
      "Response status": res.statusCode,
      "Response time": `${time.toFixed(3)} ms`,
      "Server CPU usage": os.cpus()[0].model,
      ...req.params,
      ...req.headers,
      ...res.getHeaders(),
      ...process.memoryUsage()
    }
    
    console.table(arr);
  });

  next();
});

module.exports = router;