function Button({onClick, text, color}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`inline-flex justify-center w-24 mx-1 py-2 px-4 border shadow-sm text-sm font-medium rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${color}`}>
			<span>{text}</span>
		</button>
	);
}

export default Button;