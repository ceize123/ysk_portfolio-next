import dbConnect from "../../../util/connection";
import Category from "../../../models/Category";

export default async function handle(req, res) {
	await dbConnect();
	if (req.method === "GET") {
		try {
			const categories = await Category.find();
			res.status(200).json(categories);
		} catch (err) {
			res.status(500).json(err);
		}

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

			// too dangerous
			await Category.remove({});
			await Category.insertMany(projects);
			
			res.status(201).json({message: "Order is updated!"});
		} catch (err) {
			res.status(500).json(err);
		}
	}
}