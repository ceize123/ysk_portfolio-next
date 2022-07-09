import ImageOnly from "./sections/ImageOnly";
import TextImage from "./sections/TextImage";                           
import MultiImages from "./sections/MultiImages";
import Carousel from "./sections/Carousel";
import TextOnly from "./sections/TextOnly";
import TitleImage from "./sections/TitleImage";
import Horizon from "./sections/Horizon";
import List from "./sections/List";
import { useShareWidth } from "./ShareStates";
import { useBetween } from "use-between";

// Dynamic Layout used in the function dynamicComponent
const LAYOUTS = {
	ImageOnly,
	TextImage,
	TitleImage,
	MultiImages,
	Carousel,
	TextOnly,
	Horizon,
	List
};

function TypeSection({prop}) {
	const section = prop;
	const { windowWidth } = useBetween(useShareWidth);

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// https://stackoverflow.com/questions/66238016/reactjs-dynamic-component-name-with-closing-tag-and-children-elements
	function dynamicComponent(prop, type) {
		const Layout = LAYOUTS[type];
		return (
			windowWidth >= 576
				? <Layout prop={prop} images={prop.images} />
				: <Layout prop={prop} images={prop.imagesMobile} />
		);
	}

	return (
		<div className="templates">
			{ dynamicComponent(section, capitalizeFirstLetter(section.type)) }
		</div>
	);
}

export default TypeSection;