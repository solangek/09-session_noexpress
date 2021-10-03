

var Sequelize = require('sequelize')
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var sequelize = new Sequelize({
      "dialect": "sqlite",
      "storage": "./session.sqlite"
  });


  var myStore = new SequelizeStore({
    db: sequelize
})

let app = require('express')();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    store:myStore,
    saveUninitialized: true,
    cookie: { maxAge: 100000}
}));

myStore.sync();

app.all('*', function(req, res) {
    res.status(200);
    res.setHeader('Content-Type', 'text/html');

    if (!req.session.views) {
        req.session.views = 0;
    }

    req.session.views++;
    res.write('<p>views: ' + req.session.views + '</p>');
    res.end();
});

app.listen(4000)