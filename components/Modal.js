import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { CheckIcon } from "@heroicons/react/outline";
import { useShareModal } from "../components/ShareStates";
import { useBetween } from "use-between";
import Button from "../components/Button";
import resumeImg from "../public/image/about/resume-mobile.png";
import Image from "next/image";

export default function Modal({prop, resume = ""}) {
	const { open, setOpen, openR, setOpenR  } = useBetween(useShareModal);

	return (
		<Transition.Root show={!resume ? open : openR} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={!resume ? setOpen : setOpenR}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-5/6 sm:p-6">
								<div className="hidden md:block">
									<iframe src={`./image/about/${prop}.pdf`} width="100%" height="auto" scrolling="no"> </iframe>
								</div>
								<div className="md:hidden w-full">
									<Image src={resumeImg} alt="resume" />
								</div>
								<div className="mt-5 sm:mt-6 text-center">
									<button className="py-4 px-5" onClick={() => !resume ? setOpen(false) : setOpenR(false)}><h4 className="hover:text-secondary">Go Back</h4></button>
									{/* <Button onClick={() => !resume ? setOpen(false) : setOpenR(false)} text="Go Back" color="border-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500" /> */}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}