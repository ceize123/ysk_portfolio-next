import findCat from "../../../../../../components/FindCat";
import findId from "../../../../../../components/FindId";
import firstLetter from "../../../../../../components/FirstLetter";

import dbConnect from "../../../../../../util/connection";
import Category from "../../../../../../models/Category";
import Work from "../../../../../../models/Work";
import Section from "../../../../../../models/Section";

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

	}

	if (req.method === "POST") {

		try {
			const { id, type, overall } = req.body;
			console.log(id);
			const newSection = await Section.create({ type: type, overall });

		} catch (err) {
			res.status(500).json(err);
		}

	} 

	if (req.method === "PUT") {
		try {
			const { number, data } = req.body;

			await Work.findByIdAndUpdate(
				data._id, data
			);
			
			const work = await Work.findOne(
				{ "_id": workId, "sections_id": data._id },
			);

			// https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document
			// https://stackoverflow.com/questions/56313376/how-to-return-only-the-updated-subdocument-inside-of-array-after-an-update
			// const cate = await Category.findOneAndUpdate(
			// 	{ "category": category, "works_id": data._id },
			// 	{$set: {works: data} },
			// 	{new: true}
			// );

			const cate = await Category.findOne(
				{ "category": category, "works_id": workId },
			);
			const foundWorkIndex = await cate.works.findIndex(item => item._id == workId);
			console.log(work);
			cate.works[foundWorkIndex] = work;
			cate.save();
			
			res.status(201).json(cate);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	if (req.method === "DELETE") {
		try {
			const { number, data } = req.body;
			
			const work = await Work.findOne(
				{ "_id": workId, "sections_id": data._id },
			);
			const cate = await Category.findOne(
				{ "category": category, "works_id": workId },
			);
			
			const foundWorkIndex = await cate.works.findIndex(item => item._id == workId);
			
			work.sections.splice(number, 1);
			work.save();
			cate.works[foundWorkIndex] = work;
			cate.save();


			res.status(201).json({message: "Section deleted."});
		} catch (err) {
			res.status(500).json(err);
		}
	}

}