import Express from 'express';
import Routes from 'app/routes';
import BodyParser from 'body-parser';
import ErrorHandler from 'core/handler';

const app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
  extended: false,
}));
app.use('/', Routes);

app.use(ErrorHandler);

export default app;
