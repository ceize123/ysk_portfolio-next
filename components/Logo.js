import Image from "next/image";
import logoSm from "../public/image/home-page/logo-small.png";

function Logo() {
	return (
		<div className="absolute left-6 top-3.5 z-20 cursor-pointer">
			<Image src={logoSm} alt="logo" />
		</div>
	);
}

export default Logo;