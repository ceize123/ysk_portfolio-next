import findCat from "../../../../../components/FindCat";
import dbConnect from "../../../../../util/connection";
import Category from "../../../../../models/Category";
import Work from "../../../../../models/Work";

export default async function handler(req, res) {
	const { category } = req.query;
	dbConnect();
	if (req.method === "GET") {

		try {
			const cate = await Category.find({ "category": category });
			res.status(200).json(cate);
		} catch (err) {
			res.status(500).json(err);
		}

		// console.log(req.query);
		// const works = findCat(category);
		// res.status(200).json(works);
	}

	if (req.method === "POST") {
		try {
			const newWork = await Work.create(req.body.work);
			const cate = await Category.findOneAndUpdate({ category: category },
				{ $addToSet: { works: newWork } }
			);
			
			res.status(201).json(cate);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	// else if (req.method === "POST") {
	// 	const { work } = req.body;
	// 	const { category } = req.query;
		
	// 	const cat = findCat(category);
	// 	const newWork = {
	// 		...work
	// 	};

	// 	cat.works.push(newWork);
	// 	res.status(201).json(cat);
	// }
}