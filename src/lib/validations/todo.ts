import { z } from 'zod';

export const TodoStatusSchema = z.enum(['NOT_STARTED', 'IN_PROGRESS', 'DONE', 'CARRY_FORWARD']);

export const CreateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  description: z.string().max(1000, 'Description is too long').optional().nullable(),
  status: TodoStatusSchema.optional(),
  dueDate: z.string().datetime().optional().nullable().or(z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/).optional().nullable()), // Handle ISO strings
  ownerId: z.string().min(1, 'Owner ID is required'),
  meetingId: z.string().min(1, 'Meeting ID is required'),
});

export const UpdateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long').optional(),
  description: z.string().max(1000, 'Description is too long').optional().nullable(),
  status: TodoStatusSchema.optional(),
  dueDate: z.string().datetime().optional().nullable().or(z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/).optional().nullable()), // Handle ISO strings
  ownerId: z.string().min(1, 'Owner ID is required').optional(),
});

export type CreateTodoInput = z.infer<typeof CreateTodoSchema>;
export type UpdateTodoInput = z.infer<typeof UpdateTodoSchema>;
