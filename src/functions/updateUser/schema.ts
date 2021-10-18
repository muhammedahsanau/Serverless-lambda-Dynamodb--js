export default {
	type: 'object',
	properties: {
		ID: { type: 'number' },
        email: { type: 'string' },
	},
	required: ['ID' ],
} as const;
