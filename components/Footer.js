import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

function Footer() {
	return (
		<footer className="text-center">
			<h1 className="text-primary">Let’s Chat!</h1>
			<div className="flex justify-center">
				<div>
					<div className="icon flex justify-center items-center">
						<HiOutlineMail />
					</div>
					<p>Mail</p>
				</div>
				<div>
					<div className="icon flex justify-center items-center">
						<FaLinkedinIn />
					</div>
					<p>LinkedIn</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;