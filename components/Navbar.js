import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useShareLoading, useShareWidth, useShareModal, useShareModalDis } from "./ShareStates";
import { useBetween } from "use-between";
import { useSession } from "next-auth/react";
import Logo from "./Logo";
import Modal from "./Modal";

function Navbar() {

	const { data: session } = useSession();

	const {loaded, setLoaded} = useBetween(useShareLoading);
	// const { open, setOpen } = useBetween(useShareModal);
	// const { modalDis, setModalDis } = useBetween(useShareModalDis);
	// const handleModalResume = () => {
	// 	if (windowWidth < 768) {
	// 		setToggle(!toggle);
	// 		setHideList(!hideList);
	// 	}
	// 	setOpen(true);
	// 	setModalDis("resume");
	// };

	// const [position, setPosition] = useState("fixed");
	const [showFixedNav, setShowFixedNav] = useState(true);
	// const [countNav, setCountNav] = useState(0);
	const [toggle, setToggle] = useState(false);
	const [hideList, setHideList] = useState(true);
	const [position, setPosition] = useState("");
	const { windowWidth } = useBetween(useShareWidth);
	// const { page, setPage } = useBetween(useSharePage);
	const router = useRouter();

	const handleClick = () => {
		setToggle(!toggle);
		setHideList(!hideList);
	};

	useEffect(() => {
		const body = document.querySelector("body");
		const ul = document.querySelector("nav ul");
		if ((router.pathname === "/"
			|| router.pathname === "/about"
			|| router.pathname === "/resume"
			|| router.pathname === "/fashion"
			|| router.pathname === "/photography"
		) && windowWidth >= 768) {
			ul.style.background = "#EDEDED";
			ul.style.color = "#2C2C2C";
		} 
		// else if (router.pathname === "/about") {
		// 	ul.style.backgroundColor = "#E0E0E0";
		// }
		// else {
		// 	body.style.overflowY = "visible";
		// }
		setToggle(false);
		setHideList(true);
	}, [router]);

	useEffect(() => {
		const body = document.querySelector("body");
		const ul = document.querySelector("nav ul");
		if (hideList && windowWidth < 768) {
			
			ul.classList.remove("mt-20");
			ul.classList.add("scale-0");
			ul.classList.add("translate-x-1/2");
			ul.classList.add("-mt-16");
			// setPosition("scale-0 translate-x-1/2 -mt-16");
			// body.style.overflowY = "visible";
		} else if (!hideList && windowWidth < 768) {
			// body.style.overflowY = "hidden";
			ul.classList.remove("scale-0");
			ul.classList.remove("translate-x-1/2");
			ul.classList.remove("-mt-16");
			ul.classList.add("mt-20");
		} else if (windowWidth >= 768) {
			ul.classList.remove("scale-0");
			ul.classList.remove("translate-x-1/2");
			ul.classList.remove("-mt-16");
		}
	}, [hideList, windowWidth]);

	// const handleNav = (no) => {
	// 	setTimeout(() => {
	// 		setPage(no);
	// 	}, 1000);
	// };

	useEffect(() => {
		let count = 1;
		let lastScroll = 0;
		window.onscroll = function () {
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			if (scrollTop === 0) {
				setShowFixedNav(true);
			} else if (scrollTop > lastScroll) {
				lastScroll = scrollTop;
				if (count > 0) {
					count--;
				} else {
					setShowFixedNav(false);
				}
			} else if (count > 20) {
				lastScroll = scrollTop;
				setShowFixedNav(true);
			} else {
				count++;
			}

			// console.log(countNav);
			
		};
	});


	return (
		<>
			{/* <nav className={`header ${position} right-0 left-0 mx-auto z-30`} > */}
			{/* <div className={`loading fixed top-0 h-screen w-screen ${loaded ? "opacity-0" : "z-50"}`}>
				<div className="loading-text">
					<span className="loading-text-words">L</span>
					<span className="loading-text-words">O</span>
					<span className="loading-text-words">A</span>
					<span className="loading-text-words">D</span>
					<span className="loading-text-words">I</span>
					<span className="loading-text-words">N</span>
					<span className="loading-text-words">G</span>
				</div>
			</div> */}
			<nav className={`header fixed top-0 right-0 left-0 mx-auto flex justify-end md:justify-center md:h-14 h-12 ${!loaded ? "opacity-0" : "opacity-100 z-30"} ${!showFixedNav && "-translate-y-14"}`}>
				<Logo />
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
				<ul className={"main-nav block md:flex justify-center text-primary md:mt-0 left-0 top-0 right-0 bottom-0 text-center absolute scale-0 translate-x-1/2 -mt-16"} >
					<li>
						<Link href="/">
							<a className="hover:text-secondary">Home</a>
						</Link>
					</li>
					<li>
						<Link href="/#works">
							<a className="hover:text-secondary">Works</a>
						</Link>
					</li>
					<li>
						<Link href="/about">
							<a className="hover:text-secondary">About me</a>
						</Link>
					</li>
					<li>
						<Link href="/#footer">
							<a className="hover:text-secondary">Contact</a>
						</Link>
					</li>
					<li>
						<Link href="/resume">
							<a className="hover:text-secondary cursor-pointer">Resume</a>
						</Link>
					</li>
					{session &&
						<li className="hidden md:block">
							<Link href="/dashboard">
								<a className="hover:text-secondary">Dashboard</a>
							</Link>
						</li>
					}
				</ul>
			</nav>
			{/* {open && <Modal prop={"resume_yung-shin_ko"} resume={true} />} */}
			{/* {open &&
				<Modal prop={modalDis} />
			} */}
		</>
	);
}

export default Navbar;