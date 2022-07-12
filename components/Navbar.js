import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSharePage, useShareWidth } from "./ShareStates";
import { useBetween } from "use-between";

function Navbar() {
	// const [position, setPosition] = useState("fixed");
	const [toggle, setToggle] = useState(false);
	const [hideList, setHideList] = useState(true);
	const [position, setPosition] = useState("");
	const { windowWidth } = useBetween(useShareWidth);
	const { page, setPage } = useBetween(useSharePage);
	const router = useRouter();

	const handleClick = () => {
		setToggle(!toggle);
		setHideList(!hideList);
	};

	useEffect(() => {
		const body = document.querySelector("body");
		const ul = document.querySelector("nav ul");
		if (router.pathname === "/") {
			ul.style.backgroundColor = "inherit";
			ul.style.color = "inherit";
			if (windowWidth > 1024) {
				body.style.overflowY = "hidden";
				// setPage(0);
			}
			// setToggle(false);
			// setHideList(false);
			// setPosition("fixed");
		} else {
			body.style.overflowY = "visible";
			// setPosition("static");
		}
		setToggle(false);
		setHideList(true);
	}, [router]);

	useEffect(() => {
		const body = document.querySelector("body");
		if (hideList && windowWidth < 768) {
			setPosition("scale-0 translate-x-1/2 -mt-16");
			body.style.overflowY = "visible";
		} else if (windowWidth < 768) {
			body.style.overflowY = "hidden";
			setPosition("");
		} else if (windowWidth > 768) {
			setPosition("");
		}
	}, [hideList, windowWidth]);

	const handleNav = (no) => {
		if (windowWidth > 1024) {
			setPage(no);
		}
	};


	return (
		// <nav className={`header ${position} right-0 left-0 mx-auto z-30`} >
		<nav className="header fixed top-0 right-0 left-0 mx-auto z-30 flex justify-end md:justify-center md:h-14 h-12">
			<div className={`menu-icon mr-3.5 block md:hidden ${toggle && "active"}`}>
				<svg className={`ham hamRotate ${toggle && "active"}`} viewBox="0 0 100 100" width="50" onClick={handleClick}>
					<path
						className="line top"
						d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
					<path
						className="line bottom"
						d="m 30,50 h 60" />
					{/* <path
						className="line bottom"
						d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" /> */}
				</svg>
				{/* <input className="menu-icon__cheeckbox" type="checkbox" />
				<div>
					<span className="span-a"></span>
					<span></span>
				</div> */}
			</div>
			<ul className={`main-nav block md:flex justify-center text-primary mt-20 md:mt-0 left-0 top-0 right-0 bottom-0 text-center absolute ${position}`} >
				<li>
					<Link href="/">
						<a className="hover:text-secondary" onClick={() => handleNav(0)}>Home</a>
					</Link>
				</li>
				<li>
					<Link href={windowWidth > 1024 ? "/" : "/#works"}>
						<a className="hover:text-secondary" onClick={() => handleNav(1)}>Works</a>
					</Link>
				</li>
				<li>
					<Link href={windowWidth > 1024 ? "/" : "/#about"}>
						<a className="hover:text-secondary" onClick={() => handleNav(2)}>About me</a>
					</Link>
				</li>
				<li>
					<Link href={windowWidth > 1024 ? "/" : "/#footer"}>
						<a className="hover:text-secondary" onClick={() => handleNav(3)}>Contact</a>
					</Link>
				</li>
				<li>
					<Link href="/">
						<a className="hover:text-secondary">Resume</a>
					</Link>
				</li>
				<li className="hidden md:block">
					<Link href="/dashboard">
						<a className="hover:text-secondary">Dashboard</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;