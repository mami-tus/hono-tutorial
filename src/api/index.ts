import { OpenAPIHono } from '@hono/zod-openapi';
import { tasksApi } from './tasks';
import { swaggerUI } from '@hono/swagger-ui';

export const api = new OpenAPIHono();

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
