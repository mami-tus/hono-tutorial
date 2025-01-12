import { OpenAPIHono } from '@hono/zod-openapi';
import { tasksApi } from './tasks';
import { swaggerUI } from '@hono/swagger-ui';
import { basicAuth } from 'hono/basic-auth';
import { bearerAuth } from 'hono/bearer-auth';

export const api = new OpenAPIHono();

// /api/doc以外はBearer認証をかける
api.use('/*', async (c, next) => {
  if (c.req.path === '/api/doc' || c.req.path === '/api/specification') {
    return next();
  }
  const auth = bearerAuth({
    token: 'token', // デモ用なので固定
  });
  return auth(c, next);
});

api
  .route('/tasks', tasksApi) // tasksApi を Nested route として追加
  // Swagger ドキュメント を生成する為の処理
  .doc('specification', {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
    },
  })
  .use('/doc/*', async (c, next) => {
    const auth = basicAuth({
      username: 'user', // 本来は環境変数等でちゃんと値を設定
      password: 'pass', // 今回は固定
    });
    await auth(c, next);
  })
  .get(
    '/doc',
    swaggerUI({
      url: '/api/specification',
    })
  );
