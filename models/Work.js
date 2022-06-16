import mongoose from "mongoose";

const WorkSchema = new mongoose.Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	navColor: {type: String, required: true},
	heroImage: {type: String, required: true},
});

export default mongoose.model("Work") || mongoose.model("Work", WorkSchema);