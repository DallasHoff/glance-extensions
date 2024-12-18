import { TodoistApi } from '@doist/todoist-api-typescript';

const token = process.env.TODOIST_TOKEN;

if (!token) {
	throw new Error(
		'Your Todoist token must be passed as an environment variable named TODOIST_TOKEN.'
	);
}

export const todoist = new TodoistApi(token);

export function getTodoistErrorMessage(err: unknown) {
	return typeof err === 'object' &&
		err !== null &&
		'responseData' in err &&
		typeof err.responseData === 'string'
		? err.responseData
		: null;
}
