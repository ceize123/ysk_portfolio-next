import findCat from "../../../../../components/FindCat";
import findId from "../../../../../components/FindId";
import firstLetter from "../../../../../components/FirstLetter";

import dbConnect from "../../../../../util/connection";
import Category from "../../../../../models/Category";
import Work from "../../../../../models/Work";

export default async function handler(req, res) {
	const { category, workId } = req.query;
	dbConnect();
	
	if (req.method === "GET") {

		try {
			const work = await Work.findOne({ "_id": workId });
			res.status(200).json(work);
		} catch (err) {
			res.status(500).json(err);
		}
		
		// try {
		// 	const works = await Work.find();
		// 	res.status(200).json(works);
		// } catch (err) {
		// 	res.status(500).json(err);
		// }

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
	} else if (req.method === "DELETE") {
		const { number } = req.body;
		const cat = findCat(category);
		const work = findId(cat, workId);
		console.log(number);
		console.log(work.sections[number]);
		work.sections.splice(number, 1);
		res.status(201).json(work.sections);
	}
}