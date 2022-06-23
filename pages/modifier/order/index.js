function Order({ works }) {
	return (
		<div className="flex justify-center">
			<table className="text-center mt-12 border-dashed border-2 border-indigo-600 rounded">
				<thead className="bg-indigo-500">
					<tr>
						<th className="text-3xl px-8 py-3 border">No.</th>
						<th className="text-3xl px-8 py-3 border">Category</th>
					</tr>
				</thead>
				<tbody>
					{works.map((item, idx) => (
						<tr key={idx}>
							<td className="text-2xl py-3 border">{idx+1}</td>
							<td className="text-2xl py-3 border">{item.category}</td>
						</tr>
					))}
				</tbody>
			</table>

		</div>
	);
}

export default Order;

export async function getStaticProps() {
	const response = await fetch("http://localhost:3000/api/works");
	const data = await response.json();
	const works = data;

	return {
		props: {
			works,
		},
	};
}