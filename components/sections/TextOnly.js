function TextOnly(prop) {
	const data = prop.prop;
	const words = data.title.split(", ");
	return (
		<section className="text-only">
			{words.map((word, idx) => (
				<h1 key={idx}>{word}{idx + 1 !== words.length ? "," : ""}</h1>
			))}
			<h2>{data.paragraph}</h2>
		</section>
	);
}

export default TextOnly;