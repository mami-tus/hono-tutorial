import { OpenAPIHono } from '@hono/zod-openapi';
import { tasksApi } from './tasks';
import { swaggerUI } from '@hono/swagger-ui';
import { basicAuth } from 'hono/basic-auth';
import { bearerAuth } from 'hono/bearer-auth';

export const api = new OpenAPIHono();

// basic認証の設定
// useメソッドの返り値はHonoOpenAPIではなくHonoになっている為、メソッドチェーンを活用する場合は、
// Middlewareの登録とRouteは分けて記述する必要がある
api
  .use('./specification', bearerAuth({ token: 'bearer-token' }))
  .use('./doc', basicAuth({ username: 'user', password: 'password' }));

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
  .get(
    '/doc',
    swaggerUI({
      url: '/api/specification',
    })
  );
