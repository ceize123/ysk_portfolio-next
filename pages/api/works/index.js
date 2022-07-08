import dbConnect from "../../../util/connection";
import Category from "../../../models/Category";

export default async function handle(req, res) {
	await dbConnect();
	if (req.method === "GET") {
		try {
			const categories = await Category.find();
			// res.status(200).json(categories);
			res.status(200).json(JSON.stringify(categories));

		} catch (err) {
			// res.status(500).json(err);
			res.status(500).json(JSON.stringify(err));
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

	if (req.method === "PUT") {
		try {
			const { projects } = req.body;

			await Category.remove({});
			await Category.insertMany(projects);
			// categories.forEach((item, idx) => {
			// 	item = projects[idx];
			// 	console.log(projects[idx]);
			// 	console.log("item", item);

			// 	categories.replaceOne({ "category": item.category }, projects[idx]);
			// });

			// categories.save();

			
			res.status(201).json({message: "Order is updated!"});
		} catch (err) {
			res.status(500).json(err);
		}
	}
}