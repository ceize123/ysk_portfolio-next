import PostFormSection from "../../../components/PostFormSection";

function AddNew() {

	return (
		<div className="back-end">
			<h1 className="text-3xl text-center font-bold underline my-6">Create New Project</h1>
			<PostFormSection filter="create" />
		</div>
	);
}

export default AddNew;