import firstLetter from "./FirstLetter";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { GiCrossMark } from "react-icons/gi";

function Input({ prop, val = "", onChange }) {
	const key = prop;
	let type;
	if (prop === "imagesNeed") {
		type = "number";
	} else if (prop === "navColor" || prop === "navTextColor" || prop === "color") {
		type = "color";
	} else {
		type = "text";
	}
	return (
		<div>
			<div className={`mb-2 ${prop}`}>
				<label htmlFor={prop} className="flex items-center text-sm font-medium text-gray-700">
					{/* {prop.charAt(0).toUpperCase() + prop.slice(1)} */}
					{firstLetter("upper", prop)}
					<span className="pl-2">{val[key] ? <HiOutlineCheckCircle /> : <GiCrossMark />}</span>
				</label>
				<input
					// type={prop === "imagesNeed" ? "number" : "text"}
					type={type}
					min={prop === "imagesNeed" ? "1" : "false"}
					name={prop}
					id={prop}
					required
					value={val[key] !== undefined ? val[key]: ""}
					onChange={onChange}
					className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block ${type !== "color" && "w-full"} shadow-sm sm:text-sm border-gray-300 rounded-md`}
				/>
			</div>
		</div>
	);
}

export default Input;