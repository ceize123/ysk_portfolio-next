import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSharePage } from "./ShareStates";
import { useBetween } from "use-between";

function Navbar() {
	const router = useRouter();
	// const [position, setPosition] = useState("absolute");
	const { setPage } = useBetween(useSharePage);

	useEffect(() => {
		const body = document.querySelector("body");
		if (router.pathname === "/") {
			body.style.background = "linear-gradient(80.33deg, rgba(229, 229, 229, 0.7) 13.28%, rgba(245, 245, 245, 0.7) 46.01%, rgba(230, 230, 230, 0.7) 65.96%, rgba(255, 255, 255, 0.175) 95.62%), linear-gradient(252.44deg, #D2D2D2 5.8%, rgba(255, 255, 255, 0.45) 100%)";
			body.style.overflowY = "hidden";
			// setPosition("fixed");
		} else {
			body.style.background = "#FFF";
			body.style.overflowY = "visible";
			// setPosition("static");
		}
	}, [router]);

	return (
		// <nav className={`header ${position} right-0 left-0 mx-auto z-30`} >
		<nav className="header absolute top-0 right-0 left-0 mx-auto z-30">
			<ul className="main-nav flex justify-center text-primary" >
				<li>
					<Link href="/">
						<a className="hover:text-secondary" onClick={() => setPage(0)}>Home</a>
					</Link>
				</li>
				<li>
					<Link href="/">
						<a className="hover:text-secondary" onClick={() => setPage(1)}>Works</a>
					</Link>
				</li>
				<li>
					<Link href="/">
						<a className="hover:text-secondary" onClick={() => setPage(2)}>About me</a>
					</Link>
				</li>
				<li>
					<Link href="/">
						<a className="hover:text-secondary" onClick={() => setPage(3)}>Contact</a>
					</Link>
				</li>
				<li>
					<Link href="/">
						<a className="hover:text-secondary">Resume</a>
					</Link>
				</li>
				<li>
					<Link href="/dashboard">
						<a className="hover:text-secondary">Dashboard</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;