import { createRoute, RouteHandler, z } from '@hono/zod-openapi';
import { ErrorResponse } from '../../models/error';
import { TaskListSchema, TaskSchema } from '../../models/task';

export const getTasksRoute = createRoute({
  path: '/',
  method: 'get',
  description: '登録されているすべてのタスクのリストを取得します',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: TaskListSchema,
        },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: ErrorResponse,
        },
      },
    },
  },
});

type TaskSchema = z.infer<typeof TaskSchema>;

export const getTasksHandler: RouteHandler<typeof getTasksRoute, {}> = async (
  c
) => {
  try {
    const tasks: TaskSchema[] = [
      {
        uuid: '12345678-e29b-41d4-a716-123456789000',
        title: 'Buy Groceries',
        description: 'Purchase milk, eggs, and bread from the store',
        completed: false,
        priority: 2,
      },
      {
        uuid: '12345678-e29b-41d4-a716-123456789001',
        title: 'Morning Run',
        description: 'Run 5 kilometers in the park',
        completed: false,
        priority: 5,
      },
    ];

    return c.json(tasks, 200);
  } catch (e) {
    console.error(e);
    return c.json({ message: 'Internal Server Error', stackTrace: e }, 500);
  }
};
