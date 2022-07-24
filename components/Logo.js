import Image from "next/image";
import logoSm from "../public/image/home-page/logo-small.png";
import Link from "next/link";

function Logo({ opacity }) {

	return (
		<div className={`fixed md:left-6 left-3 md:top-3.5 top-2.5 z-30 cursor-pointer logo opacity-${opacity}`}>
			<Link href="/">
				<Image src={logoSm} alt="logo" />
			</Link>
		</div>
	);
}

export default Logo;