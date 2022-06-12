import { workData } from "../data/works";

export default function find(cate) {
	return workData.find(work => work.category === cate.toLowerCase());
}