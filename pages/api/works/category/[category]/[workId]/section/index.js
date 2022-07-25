import dbConnect from "../../../../../../../util/connection";
import Category from "../../../../../../../models/Category";
import Work from "../../../../../../../models/Work";
import Section from "../../../../../../../models/Section";

export default async function handler(req, res) {
	const { category, workId } = req.query;
	dbConnect();
	
	if (req.method === "GET") {

		try {
			const work = await Work.findOne({ "_id": workId });
			res.status(200).json(work.sections);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	if (req.method === "POST") {

		try {
			const { type, overall } = req.body;
			const newSection = await Section.create({ type: type, ...overall });
			await Work.findByIdAndUpdate(
				workId, { $addToSet: { sections: newSection } },
			).exec();
			const work = await Work.findById(workId);

			const cate = await Category.findOne(
				{ "category": category, "works_id": workId },
			);

			const foundWorkIndex = await cate.works.findIndex(item => item._id == workId);
			cate.works[foundWorkIndex] = work;
			cate.save();

			
			res.status(201).json({message: "Section created!"});
		} catch (err) {
			res.status(500).json(err);
		}
	} 

	if (req.method === "PUT") {

		try {
			const { data } = req.body;
			await Section.findByIdAndUpdate(
				data._id, data,
			);

			const work = await Work.findOne(
				{ "_id": workId, "sections_id": data._id },
			);
			const cate = await Category.findOne(
				{ "category": category, "works_id": workId },
			);
			
			const foundIndex = await work.sections.findIndex(item => item._id == data._id);
			const foundWorkIndex = await cate.works.findIndex(item => item._id == workId);
			
			work.sections[foundIndex] = data;
			work.save();
			cate.works[foundWorkIndex] = work;
			cate.save();
			
			res.status(201).json({message: "Section modified!"});
		} catch (err) {
			res.status(500).json(err);
		}
	} 
}