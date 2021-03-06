import Swal from "sweetalert2";

export const failAlert = (text) => {
	Swal.fire({
		icon: "error",
		title: "Oops...",
		text: text
	});
};

export const successAlert = (section, text, func_param) => {
	Swal.fire({
		icon: "success",
		title: text,
		showCancelButton: true,
		confirmButtonColor: "#4f46e5",
		cancelButtonColor: "#f43f5e",
		confirmButtonText: (section === "sections") ? "Refresh" : "Redirect",
		cancelButtonText:  (section === "sections") ? "Don't refresh" : "Don't redirect"
	}).then((result) => {
		if (result.isConfirmed) {
			func_param();
		}
	});
};