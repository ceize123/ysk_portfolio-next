function Button({onClick, text, color, type = "button"}) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`inline-flex justify-center w-32 mx-2 p-3 border shadow-sm text-sm font-medium rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${color}`}>
			<span>{text}</span>
		</button>
	);
}

export default Button;