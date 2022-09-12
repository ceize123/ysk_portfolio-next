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
	}

	if (req.method === "POST") {
		try {
			const newWork = await Work.create(req.body.work);
			const cate = await Category.findOneAndUpdate({ category: category },
				{ $addToSet: { works: newWork } },
				{ new: true }
			).exec();
			
			res.status(201).json(cate);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	if (req.method === "PUT") {
		try {
			const { workSub } = req.body;

			const cate = await Category.findOne(
				{ "category": category },
			);
			cate.works = workSub;
			cate.save();
			
			res.status(201).json(workSub);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}