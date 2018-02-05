import express from 'express';
import session from 'express-session';
import path from 'path';

export function start(port = process.env.PORT || 3000) {
  const app = express();

  app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

  app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'src', 'index.html'));
  });

  return app.listen(port, () => {
    console.info(`Fake server is running on port ${port}`);
  });
}
