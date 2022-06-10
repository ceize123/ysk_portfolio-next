function Button({onClick, text, color}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`inline-flex justify-center py-2 px-4 border shadow-sm text-sm font-medium rounded-md border-${color}-600 hover:bg-${color}-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`}>
			<span>{text}</span>
		</button>
	);
}

export default Button;