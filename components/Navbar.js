import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSharePage } from "./ShareStates";
import { useBetween } from "use-between";

function Navbar() {
	const router = useRouter();
	const [position, setPosition] = useState("absolute");
	const { setPage } = useBetween(useSharePage);

	useEffect(() => {
		if (router.pathname === "/") {
			setPosition("fixed");
		} else {
			setPosition("static");
		}
	}, [router]);

	return (
		<nav className={`header ${position} right-0 left-0 mx-auto z-30`} >
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