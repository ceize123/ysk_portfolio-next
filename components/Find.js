import { works } from "../data/works";

export default function find(id) {
	return works.find(work => work.id === parseInt(id));
}