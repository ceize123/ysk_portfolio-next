import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
	category: { type: String, required: true, index: { unique: true, dropDups: true } },	
	works: [Object],
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);

