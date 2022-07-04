import ImageOnly from "./sections/ImageOnly";
import TextImage from "./sections/TextImage";                           
import MultiImages from "./sections/MultiImages";
import Carousel from "./sections/Carousel";
import TextOnly from "./sections/TextOnly";
import Horizon from "./sections/Horizon";
import List from "./sections/List";

// Dynamic Layout used in the function dynamicComponent
const LAYOUTS = {
	ImageOnly,
	TextImage,
	MultiImages,
	Carousel,
	TextOnly,
	Horizon,
	List
};

function TypeSection({prop}) {
	const section = prop;

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// https://stackoverflow.com/questions/66238016/reactjs-dynamic-component-name-with-closing-tag-and-children-elements
	function dynamicComponent(prop, type) {
		const Layout = LAYOUTS[type];
		return <Layout prop={prop}/>;
	}

	return (
		<div className="templates">
			{ dynamicComponent(section, capitalizeFirstLetter(section.type)) }
		</div>
	);
}

export default TypeSection;