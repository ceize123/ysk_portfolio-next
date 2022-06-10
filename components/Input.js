function Input({ prop, val = "", onChange }) {
	const key = prop;

	return (
		<div className={`mb-2 ${prop}`}>
			<label htmlFor={prop} className="block text-sm font-medium text-gray-700">
				{prop.charAt(0).toUpperCase() + prop.slice(1)}
			</label>
			<input
				type="text"
				name={prop}
				id={prop}
				required
				value={val[key] !== undefined ? val[key] : ""}
				onChange={onChange}
				className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
			/>
		</div>
	);
}

export default Input;