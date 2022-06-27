import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function Navbar() {
	const router = useRouter();
	const [position, setPosition] = useState("absolute");

	useEffect(() => {
		if (router.pathname === "/") {
			setPosition("absolute");
		} else {
			setPosition("static");
		}
	}, [router]);

	return (
		<nav className="header relative z-20">
			<ul className={`main-nav flex justify-center text-primary ${position} right-0 left-0 mx-auto`} >
				<li className="hover:text-secondary">
					<Link href="/">
						<a>Home</a>
					</Link>
				</li>
				<li className="hover:text-secondary">
					<Link href="/works">
						<a>Works</a>
					</Link>
				</li>
				<li className="hover:text-secondary">
					<Link href="/about">
						<a>About me</a>
					</Link>
				</li>
				<li className="hover:text-secondary">
					<Link href="#">
						<a>Resume</a>
					</Link>
				</li>
				<li className="hover:text-secondary">
					<Link href="#">
						<a>Contact</a>
					</Link>
				</li>
				<li className="hover:text-secondary">
					<Link href="/dashboard">
						<a>Dashboard</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;