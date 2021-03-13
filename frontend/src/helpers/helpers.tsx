function getDateISOStringOneYearFromToday(): string {
	const date = new Date();

	date.setFullYear(date.getFullYear() + 1);

	return extractDateISOString(date);
}

function extractDateISOString(date: Date): string {
	return date.toISOString().substr(0, 10);
}

export { getDateISOStringOneYearFromToday, extractDateISOString };
