import findCat from "../../../../../components/FindCat";

export default function handler(req, res) {
	const { category } = req.query;
	if (req.method === "GET") {
		console.log(req.query);
		const works = findCat(category);
		res.status(200).json(works);
	} else if (req.method === "POST") {
		const { work } = req.body;
		const { category } = req.query;
		
		const cat = findCat(category);
		const newWork = {
			...work
		};

		cat.works.push(newWork);
		res.status(201).json(cat);
	}
}