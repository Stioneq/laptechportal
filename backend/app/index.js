const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('morgan')('common');
const cors = require('cors');
const passport = require('passport');
const todoRouter = require('./todo').router;
const authRouter = require('./auth').router;
const userRouter = require('./user').router;
const tagRouter = require('./tags').router;
const questionRouter = require('./question').router;
const fileStorageRouter = require('./file-storage').router;
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(logger);
app.use(cors());
app.use('/todo', todoRouter);
app.use('/auth', authRouter);
app.use('/questions', questionRouter);
app.use('/tags', tagRouter);
app.use('/user', userRouter);
app.use('/files', fileStorageRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json(err);
});

module.exports = app;
