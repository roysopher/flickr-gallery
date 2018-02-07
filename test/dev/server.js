import express from 'express';
import session from 'express-session';
import {renderVM} from './vm';

export function start(port = process.env.PORT || 3000) {
  const app = express();

  app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));


  // app.use(express.static(path.join(__dirname, 'public')));

  // app.get('/', (req, res) => {
  //   res.render('src/index.html');
  // });

  app.get('/', (req, res) => {
    res.send(renderVM('./src/index.vm'));
  });
  // app.use('/', (req, res) => {
  //   res.render('./src/index.html');
  // });

  return app.listen(port, () => {
    console.info(`Fake server is running on port ${port}`);
  });
}
