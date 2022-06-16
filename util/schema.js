import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OverviewSchema = new Schema({
	subtitle: {type: String, required: true},
	paragraph: {type: String, required: true},
	timeline: {type: String, required: true},
	role: {type: String, required: true},
	team: {type: String, required: true},
});

const WorkSchema = new Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	navColor: {type: String, required: true},
	heroImage: {type: String, required: true},
	overview: OverviewSchema,
	sections: [{type: Object }]
});

const CategorySchema = new Schema({
	category: {type: String, required: true},
	works: [WorkSchema]
});

// If this mongoose.model return error, use mongoose.model.kitten
const Category = mongoose.model("Category") || mongoose.model("Category", CategorySchema);

export default Category;