import Button from "./Button";

function UpdateBtn({ number, index, handleUpdate, handleCancel }) {
	return (
		<>
			{number !== index
				? <Button onClick={() => handleUpdate(index)} text="Update" color="border-lime-600 hover:bg-lime-500 focus:ring-lime-500" />
				: <div>
					<Button onClick={handleCancel} text="Cancel" color="border-gray-600 hover:bg-gray-500 focus:ring-gray-500" />
					<Button onClick={() => handleUpdate(index)} text="Save" color="border-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500" />
				</div>
			}
		</>
	);
}

export default UpdateBtn;