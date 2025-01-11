import { OpenAPIHono } from '@hono/zod-openapi';
import { createTaskHandler, createTaskRoute } from './createTask';
import { getTasksHandler, getTasksRoute } from './getTasks';

export const tasksApi = new OpenAPIHono();
// エンドポイントをtasksApiというRouteに設定
tasksApi
  .openapi(getTasksRoute, getTasksHandler)
  .openapi(createTaskRoute, createTaskHandler);
