const teachersRoutesInit = require('./teachers.routes');

const routeInit = (app, express) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-type, Accept',
    );

    next();
  });

  teachersRoutesInit(app);
};

module.exports = {
  routeInit,
};
