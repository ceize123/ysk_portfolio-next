import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon, XIcon } from "@heroicons/react/outline";
import { useShareModal } from "../components/ShareStates";
import { useBetween } from "use-between";
import photography from "../public/image/about/photography.png";
import fashionDesign from "../public/image/about/fashionDesign.png";
import resumeImg from "../public/image/about/resume-mobile.png";
import Image from "next/image";

export default function Modal({prop}) {
	const { open, setOpen } = useBetween(useShareModal);
	
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
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

				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0 sm:mt-12 mt-8">
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
								<div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
									<button
										type="button"
										className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										onClick={() => setOpen(false)}
									>
										<span className="sr-only">Close</span>
										<XIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>
								<div >
									{prop === "resume"
										? <>
											<div className="hidden md:block">
												<iframe src="./image/about/resume_yung-shin_ko.pdf" width="100%" height="auto" scrolling="no"> </iframe>
											</div>
											<div className="md:hidden w-full">
												<Image src={resumeImg} alt="resume" />
											</div>
										</>
										: <>
											<div className="w-full mt-8">
												<Image src={prop === "fashion" ? fashionDesign : photography} alt={prop} />
											</div>
										</>
									}
								</div>
								<div className="mt-5 flex flex-row-reverse">
									<button
										type="button"
										className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
										onClick={() => setOpen(false)}
									>
										Cancel
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
		// <Transition.Root show={!resume ? open : openR} as={Fragment}>
		// 	<Dialog as="div" className="relative z-10" onClose={!resume ? setOpen : setOpenR}>
		// 		<Transition.Child
		// 			as={Fragment}
		// 			enter="ease-out duration-300"
		// 			enterFrom="opacity-0"
		// 			enterTo="opacity-100"
		// 			leave="ease-in duration-200"
		// 			leaveFrom="opacity-100"
		// 			leaveTo="opacity-0"
		// 		>
		// 			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
		// 		</Transition.Child>

		// 		<div className="fixed inset-0 overflow-y-auto">
		// 			<div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
		// 				<Transition.Child
		// 					as={Fragment}
		// 					enter="ease-out duration-300"
		// 					enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
		// 					enterTo="opacity-100 translate-y-0 sm:scale-100"
		// 					leave="ease-in duration-200"
		// 					leaveFrom="opacity-100 translate-y-0 sm:scale-100"
		// 					leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
		// 				>
		// 					<Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-5/6 sm:p-6">
		// 						{resume
		// 							? <>
		// 								<div className="hidden md:block">
		// 									<iframe src={`./image/about/${prop}.pdf`} width="100%" height="auto" scrolling="no"> </iframe>
		// 								</div>
		// 								<div className="md:hidden w-full">
		// 									<Image src={resumeImg} alt="resume" />
		// 								</div>
		// 							</>
		// 							: <>
		// 								<div className="w-full">
		// 									<Image src={prop === "fashion" ? fashionDesign : photography} alt={prop} />
		// 								</div>
		// 							</>
		// 						}
		// 						<div className="mt-5 sm:mt-6 text-center">
		// 							<button className="py-4 px-5" onClick={() => !resume ? setOpen(false) : setOpenR(false)}><h4 className="hover:text-secondary">Go Back</h4></button>
		// 							{/* <Button onClick={() => !resume ? setOpen(false) : setOpenR(false)} text="Go Back" color="border-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500" /> */}
		// 						</div>
		// 					</Dialog.Panel>
		// 				</Transition.Child>
		// 			</div>
		// 		</div>
		// 	</Dialog>
		// </Transition.Root>
	);
}