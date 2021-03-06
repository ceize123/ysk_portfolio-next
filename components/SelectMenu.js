import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

function SelectMenu({ prop, option, name, onChange }) {

	return (
		<div className="mt-5">
			<Listbox value={option} onChange={onChange}>
				{({ open }) => (
					<>
						<Listbox.Label className="block text-sm font-medium text-gray-700">Select {name}</Listbox.Label>
						<div className="mt-1 relative">
							<Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
								<span className="flex items-center">
									<span className="ml-3 block truncate">{typeof prop[0] === "object" ? `${option.title}`: `${option}`}</span>
								</span>
								<span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
									<SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
								</span>
							</Listbox.Button>

							<Transition
								show={open}
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
									{prop.map((item, idx) => (
										<Listbox.Option
											key={idx}
											className={({ active }) =>
												classNames(
													active ? "text-white bg-indigo-600" : "text-gray-900",
													"cursor-default select-none relative py-2 pl-3 pr-9"
												)
											}
											value={item}
										>
											{({ option, active }) => (
												<>
													<div className="flex items-center">
														<span
															className={classNames(option ? "font-semibold" : "font-normal", "ml-3 block truncate")}
														>
															{typeof prop[0] === "object" ? `${item.title}`: `${item}`}
														</span>
													</div>

													{option ? (
														<span
															className={classNames(
																active ? "text-white" : "text-indigo-600",
																"absolute inset-y-0 right-0 flex items-center pr-4"
															)}
														>
															<CheckIcon className="h-5 w-5" aria-hidden="true" />
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>
		</div>
	);
}

export default SelectMenu;