import findCat from "../../../../../components/FindCat";
import findId from "../../../../../components/FindId";
import firstLetter from "../../../../../components/FirstLetter";

export default function handler(req, res) {
	const { category, workId } = req.query;
	if (req.method === "GET") {
		console.log(req.query);
		const works = findCat(category);
		const work = findId(works, workId);
		res.status(200).json(work);
	} else if (req.method === "POST") {
		const {id, type, overall} = req.body;
		const { category } = req.query;

		const cat = findCat(category);
		const work = findId(cat, id);
		const newSection = {
			type: firstLetter("lower", type),
			...overall
		};

		work.sections.push(newSection);
		res.status(201).json(work);
	} else if (req.method === "PUT") {
		const { number, data } = req.body;
		const cat = findCat(category);
		const work = findId(cat, workId);
		work.sections[number] = data;
		res.status(201).json(work.sections[number]);
	}
}