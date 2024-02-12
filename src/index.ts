import 'dotenv/config';

import Application from './framework/application';
import userRouter from './routes/user-router';
import { jsonParser } from './utils/parse-json.util';
import { customParseUrl } from './utils/parse-url.util';

process.setUncaughtExceptionCaptureCallback(console.error)

const PORT = process.env.PORT || 5000;

const app = new Application();

app.use(jsonParser);
app.use(customParseUrl(`http://localhost:${PORT}`));

app.addRouter(userRouter);

app.listen(PORT, () => console.warn(`Server started on port ${PORT}`));
