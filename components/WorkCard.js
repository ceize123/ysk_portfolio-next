function Card({ work }) {

	return (
		<div className="card hover:text-white p-8">
			<h3>{work.description}</h3>
		</div>
	);
}

export default Card;