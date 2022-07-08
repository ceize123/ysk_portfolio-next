export default function find(data, cate) {
	return data.find(work => work.category.toLowerCase() === cate.toLowerCase());
}