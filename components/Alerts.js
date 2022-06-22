import Swal from "sweetalert2";


export const failAlert = (text) => {
	Swal.fire({
		icon: "error",
		title: "Oops...",
		text: text
	});
};

export const successAlert = (section, func_param) => {
	Swal.fire({
		icon: "success",
		title: "Project is created!",
		showCancelButton: true,
		confirmButtonColor: "#5eead4",
		cancelButtonColor: "#f43f5e",
		confirmButtonText: (section === "sections") ? "Refresh" : "Redirect",
		cancelButtonText:  (section === "sections") ? "Don't refresh" : "Don't redirect"
	}).then((result) => {
		if (result.isConfirmed) {
			func_param();
		}
	});
};