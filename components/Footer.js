import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Swal from "sweetalert2";

function Footer() {
	const copyText = () => {

		/* Copy the text inside the text field */
		navigator.clipboard.writeText("yungshin85530@gmail.com");
        
		/* Alert the copied text */
		Swal.fire(
			"You've copied my email!",
			"yungshin85530@gmail.com",
			"success"
		);
	};
	return (
		<footer className="text-center">
			<h1>Let’s Chat!</h1>
			<div className="flex justify-center">
				<div className="icon-section">
					<div className="icon flex justify-center items-center cursor-pointer" onClick={() => copyText()}>
						<HiOutlineMail />
					</div>
					<p>Mail</p>
				</div>
				<div className="icon-section flex flex-col items-center">
					<a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/yung-shin-ko-48861215b/">
						<div className="icon flex justify-center items-center">
							<FaLinkedinIn />
						</div>
					</a>
					<p>LinkedIn</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;