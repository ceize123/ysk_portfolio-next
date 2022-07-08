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
			// res.status(200).json(work);
			res.status(200).json(JSON.stringify(work));
		} catch (err) {
			// res.status(500).json(err);
			res.status(500).json(JSON.stringify(err));
		}
		
		// try {
		// 	const works = await Work.find();
		// 	res.status(200).json(works);
		// } catch (err) {
		// 	res.status(500).json(err);
		// }

		// const works = findCat(category);
		// const work = findId(works, workId);
		// res.status(200).json(work);
	}

	if (req.method === "POST") {

		try {
			const { id, type, overall } = req.body;
			console.log(id);
			const newSection = await Section.create({ type: type, overall });
			// await Work.findByIdAndUpdate(
			// 	id, { $addToSet: { sections: newSection } },
			// );
			// const cate = await Category.findOneAndUpdate(
			// 	{ "category": category, "works_id": id },
			// 	{ $addToSet: { sections: newSection } },
			// 	{ new: true }
			// ).exec();
			
			// res.status(201).json(cate);
		} catch (err) {
			res.status(500).json(err);
		}

		// const {id, type, overall} = req.body;
		// const { category } = req.query;

		// const cat = findCat(category);
		// const work = findId(cat, id);
		// const newSection = {
		// 	type: firstLetter("lower", type),
		// 	...overall
		// };

		// work.sections.push(newSection);
		// res.status(201).json(work);

	} 

	if (req.method === "PUT") {
		try {
			const { number, data } = req.body;

			const work = await Work.findByIdAndUpdate(
				data._id, data
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
			cate.works[foundWorkIndex] = work;
			cate.save();
			console.log(cate);
			
			res.status(201).json(cate);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	if (req.method === "DELETE") {
		try {
			const { number, data } = req.body;
			console.log(data);
			// await Section.deleteOne(
			// 	{ "_id": data._id }
			// );
			
			// await Work.updateOne(
			// 	{ _id: workId },
			// 	{ $pull: { "sections": { _id: data._id } }}
			// );
			
			const work = await Work.findOne(
				{ "_id": workId, "sections_id": data._id },
			);
			const cate = await Category.findOne(
				{ "category": category, "works_id": workId },
			);
			
			// const foundIndex = await work.sections.findIndex(item => item._id == data._id);
			const foundWorkIndex = await cate.works.findIndex(item => item._id == workId);
			
			// work.sections[foundIndex] = data;
			work.sections.splice(number, 1);
			work.save();
			cate.works[foundWorkIndex] = work;
			cate.save();

			// const work = Work.findById(workId);
			// console.log(work);
			// const cate = await Category.findOne(
			// 	{ "category": category, "works_id": workId },
			// );
			// const foundWorkIndex = await cate.works.findIndex(item => item._id == workId);
			// cate.works[foundWorkIndex] = work;
			// cate.save();

			// await Category.updateOne(
			// 	{_id: data._id},
			// );

			res.status(201).json({message: "Section deleted."});
		} catch (err) {
			res.status(500).json(err);
		}
	}

	// else if (req.method === "PUT") {

	// 	const { number, data } = req.body;
	// 	const cat = findCat(category);
	// 	const work = findId(cat, workId);
	// 	work.sections[number] = data;
	// 	res.status(201).json(work.sections[number]);
	// } else if (req.method === "DELETE") {
	// 	const { number } = req.body;
	// 	const cat = findCat(category);
	// 	const work = findId(cat, workId);
	// 	console.log(number);
	// 	console.log(work.sections[number]);
	// 	work.sections.splice(number, 1);
	// 	res.status(201).json(work.sections);
	// }
}