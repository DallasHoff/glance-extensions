export function getTaErrorMessage(intro: string, err: unknown): string | null {
	const responseMessage =
		typeof err === 'object' &&
		err !== null &&
		'detail' in err &&
		typeof err.detail === 'string'
			? err.detail
			: null;
	return `${intro}${responseMessage ? `: ${responseMessage}` : ''}`;
}
