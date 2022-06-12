function PostSectionForm({type, method}) {
	return (
		<form action="#" method="POST">
			<div className="shadow overflow-hidden rounded-md">
				<div className="px-4 py-5 bg-gray-50 sm:p-6">
					<div className={`grid grid-cols-1 ${type.charAt(0).toLowerCase() + type.slice(1)}`}>

						<h3>Overall</h3>
						{overallCol.map((item, idx) => (
							<Input key={idx}
								prop={item}
								val={overall}
								type={type}
								onChange={e => {
									setOverall({ ...overall, [item]: e.target.value });
								}} />
						))}
						
						<h3 className="col-text mt-2">{type === "List" ? "Lists" : "Pages"}</h3>
						
						{/* handle array of object from fields */}
						{/* https://github.com/chaoocharles/add-remove-form-field/blob/main/src/App.js */}
						{(type === "List" || type === "Carousel") && array.map((singleList, index) => (
							<div key={index} className="flex mb-3">
								<div className="w-3/4 shrink-0 sub-section">
									{type === "List"
										? listCol.map((item, idx) => (
											<Input key={idx}
												prop={item}
												val={singleList}
												onChange={(e) => handleArrayChange(e, index)}
											/>
										))
										: pageCol.map((item, idx) => (
											<Input key={idx}
												prop={item}
												val={singleList}
												type={type}
												onChange={(e) => handleArrayChange(e, index)}
											/>))}
									{array.length - 1 === index && (
										<Button onClick={handleArrayAdd} text={`Add a ${type === "List" ? "List" : "Page"}`} color="indigo" />
									)}
								</div>

								<div className="ml-10 self-center">
									{array.length !== 1 && (
										<Button onClick={() => handleArrayRemove(index)} text="Remove" color="red" />
										// <button
										// 	type="button"
										// 	onClick={() => handleArrayRemove(index)}
										// 	className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md border-red-600 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
										// 	<span>Remove</span>
										// </button>
									)}
								</div>
							</div>
						))}
						<UploadImage type={type} />
					</div>
				</div>
				<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
					<button type="submit"
						onClick={(e) => { submitSection(e); }}
						className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						Save
					</button>
				</div>
			</div>
		</form>
	);
}

export default PostSectionForm;