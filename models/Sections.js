import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
	listTitle: {type: String, required: true},
	listParagraph: {type: String, required: true},
}, { _id : false });

const PageSchema = new mongoose.Schema({
	issue: {type: String, required: true},
	description: {type: String, required: true},
	solution: {type: String, required: true},
	images: [Object],
}, { _id : false });

const SectionSchema = new mongoose.Schema({
	type: { type: String, required: true },
	title: {type: String},
	paragraph: {type: String},
	images: [Object],
	color: {type: String},
	pages: [PageSchema],
	lists: [ListSchema]
}, { _id: { type: mongoose.Schema.ObjectId, auto: true }});

export default mongoose.models.Section || mongoose.model('Section', SectionSchema);