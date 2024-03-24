const prettierDate = (date: string) => {
	return (new Date(date)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default prettierDate;