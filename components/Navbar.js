import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useShareLoading, useShareWidth } from "./ShareStates";
import { useBetween } from "use-between";
import { useSession } from "next-auth/react";
import Logo from "./Logo";

function Navbar() {

	const { data: session } = useSession();

	const {loaded} = useBetween(useShareLoading);

	const [showFixedNav, setShowFixedNav] = useState(true);
	const [toggle, setToggle] = useState(false);
	const [hideList, setHideList] = useState(true);
	const { windowWidth } = useBetween(useShareWidth);
	const router = useRouter();

	const handleClick = () => {
		setToggle(!toggle);
		setHideList(!hideList);
	};

	useEffect(() => {
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

		setToggle(false);
		setHideList(true);
	}, [router]);

	useEffect(() => {
		const ul = document.querySelector("nav ul");
		if (hideList && windowWidth < 768) {
			
			ul.classList.remove("mt-20");
			ul.classList.add("scale-0");
			ul.classList.add("translate-x-1/2");
			ul.classList.add("-mt-16");
		} else if (!hideList && windowWidth < 768) {
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

		};
	});


	return (
		<>
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
					</svg>
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
						<Link href="https://drive.google.com/file/d/126EtvxRQHBxIWrL6ZoivwnY3IL9DoJlz/view?usp=sharing" passHref>
							<a
								target="_blank"
								rel="noopener noreferrer"	
								className="hover:text-secondary cursor-pointer">Resume</a>
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
		</>
	);
}

export default Navbar;