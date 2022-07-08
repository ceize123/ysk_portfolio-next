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
			// res.status(200).json(work.sections);
			res.status(200).json(JSON.stringify(work.sections));
		} catch (err) {
			// res.status(500).json(err);
			res.status(500).json(JSON.stringify(err));
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
			// await Category.updateOne(
			// 	{ works: { $elemMatch: { _id: workId } } },
			// 	{ $addToSet: { "works.$.sections": newSection } },
			// );

			// const cate = await Category.findOneAndUpdate(
			// 	{ "category": category, "works_id": workId },
			// 	{$set: {works: work} },
			// );
			const cate = await Category.findOne(
				{ "category": category, "works_id": workId },
			);

			const foundWorkIndex = await cate.works.findIndex(item => item._id == workId);
			cate.works[foundWorkIndex] = work;
			cate.save();

			// const cate = await Category.findOneAndUpdate(
			// 	{ "category": category, "works_id": workId },
			// 	{ $addToSet: { "works_id.sections": newSection } },
			// 	{ new: true }
			// ).exec();
			
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


			// await Work.findOneAndUpdate(
			// 	{ "_id": workId, "sections_id": data._id },
			// 	{$set: {sections: data} },
			// 	{new: true},
			// );
			// await Category.findOneAndUpdate(
			// 	{ "category": category, "_id": workId, "sections_id": data._id },
			// 	{$set: {"works.sections": data} },
			// 	{new: true},
			// );
			
			// const newSection = await Section.create({ type: type, ...overall });
			// await Work.findByIdAndUpdate(
			// 	workId, { $addToSet: { sections: newSection } },
			// );
			// await Category.updateOne(
			// 	{ works: { $elemMatch: { _id: workId } } },
			// 	{ $addToSet: { "works.$.sections": newSection } },
			// );
			
			res.status(201).json({message: "Section modified!"});
		} catch (err) {
			res.status(500).json(err);
		}
	} 

	// if (req.method === "PUT") {
	// 	try {
	// 		const { number, data } = req.body;

	// 		await Work.findByIdAndUpdate(
	// 			data._id, data
	// 		);

	// 		// https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document
	// 		// https://stackoverflow.com/questions/56313376/how-to-return-only-the-updated-subdocument-inside-of-array-after-an-update
	// 		const cate = await Category.findOneAndUpdate(
	// 			{ "category": category, "works_id": data._id },
	// 			{$set: {works: data} },
	// 			{new: true}
	// 		);
	// 		console.log(cate);
			
	// 		res.status(201).json(cate);
	// 	} catch (err) {
	// 		res.status(500).json(err);
	// 	}
	// }
}