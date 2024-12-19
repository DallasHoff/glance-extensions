import type { Task } from '@doist/todoist-api-typescript';

export function getTodoistErrorMessage(
	intro: string,
	err: unknown
): string | null {
	const responseMessage =
		typeof err === 'object' &&
		err !== null &&
		'responseData' in err &&
		typeof err.responseData === 'string'
			? err.responseData
			: null;
	return `${intro}${responseMessage ? `: ${responseMessage}` : ''}`;
}

export function sortTasksByDate(tasks: Task[]): Task[] {
	return tasks.sort((a, b) => {
		const date1 = a.due?.datetime ?? a.due?.date ?? '9999';
		const date2 = b.due?.datetime ?? b.due?.date ?? '9999';
		return date1.localeCompare(date2);
	});
}
