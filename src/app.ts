import * as helmet from 'helmet';
import * as express from 'express';

export const app = express();

app.use(helmet());
