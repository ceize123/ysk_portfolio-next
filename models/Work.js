import mongoose from "mongoose";

const OverviewSchema = new mongoose.Schema({
	subtitle: {type: String, required: true},
	paragraph: {type: String, required: true},
	timeline: {type: String, required: true},
	role: {type: String, required: true},
	team: {type: String, required: true},
}, { _id : false });

const WorkSchema = new mongoose.Schema({
	title: {type: String, required: true, index: { unique: true, dropDups: true }},
	description: {type: String, required: true},
	navColor: {type: String, required: true},
	navTextColor: {type: String, required: true},
	heroImage: [Object],
	heroImageMobile: [Object],
	overview: OverviewSchema,
	sections: [Object]
}, { _id: { type: mongoose.Schema.ObjectId, auto: true }});

export default mongoose.models.Work || mongoose.model('Work', WorkSchema);