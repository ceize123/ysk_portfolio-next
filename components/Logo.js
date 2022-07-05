import Image from "next/image";
import logoSm from "../public/image/home-page/logo-small.png";

function Logo({opacity}) {
	return (
		<div className={`absolute left-6 top-3.5 z-30 cursor-pointer logo opacity-${opacity}`}>
			<Image src={logoSm} alt="logo" />
		</div>
	);
}

export default Logo;