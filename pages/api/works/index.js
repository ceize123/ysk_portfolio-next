import dbConnect from "../../../util/connection";
import Category from "../../../models/Category";

export default async function handle(req, res) {
	dbConnect();
	if (req.method === "GET") {
		try {
			const categories = await Category.find();
			res.status(200).json(categories);
		} catch (err) {
			res.status(500).json(err);
		}

		// const { category } = req.query;
		// if (category !== undefined) {
		// 	const cat = findCat(category);
		// 	res.status(200).json(cat.works);
		// }
		// res.status(200).json(workData);
	}

	if (req.method === "POST") {
		try {
			const category = await Category.create(req.body);
			res.status(201).json(category);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}