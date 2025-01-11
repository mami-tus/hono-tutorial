import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { api } from './api';

const app = new Hono();
// JSON レスポンスを見やすくする prettyJSON
app.use(prettyJSON());
// 404の設定
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));

app.route('/api', api);

export default app;
