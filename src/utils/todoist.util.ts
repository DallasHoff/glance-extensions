import type { Task } from '@doist/todoist-api-typescript';

export function getTodoistErrorMessage(err: unknown): string | null {
	return typeof err === 'object' &&
		err !== null &&
		'responseData' in err &&
		typeof err.responseData === 'string'
		? err.responseData
		: null;
}

export function sortTasksByDate(tasks: Task[]): Task[] {
	return tasks.sort((a, b) => {
		const date1 = a.due?.datetime ?? a.due?.date ?? '9999';
		const date2 = b.due?.datetime ?? b.due?.date ?? '9999';
		return date1.localeCompare(date2);
	});
}
