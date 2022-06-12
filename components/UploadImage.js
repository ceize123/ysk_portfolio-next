import React, {useEffect, useState} from "react";
import { useBetween } from "use-between";
import { useShareableState } from "../components/ShareFile";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

// https://react-dropzone.js.org/
function UploadImage({ type }) {
	// const [files, setFiles] = useState([]);
	const { files, setFiles} = useBetween(useShareableState);

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			"image/*": []
		},
		onDrop: acceptedFiles => {
			setFiles(acceptedFiles.map(file => Object.assign(file, {
				preview: URL.createObjectURL(file)
			})));
		},
		multiple: type === "MultiImages" || type === "Carousel" ? true : false
	});
  
	const thumbs = files.map(file => (
		<div key={file.name}>
			<div className="mr-2">
				<Image
					src={file.preview}
					// Revoke data uri after image is loaded
					onLoad={() => { URL.revokeObjectURL(file.preview); }}
					width={100}
					height={100}
					alt={file.name}
				/>
			</div>
		</div>
	));

	useEffect(() => {
		setFiles([]);
	}, [type]);

	useEffect(() => {
		// Make sure to revoke the data uris to avoid memory leaks, will run on unmount
		return () => files.forEach(file => URL.revokeObjectURL(file.preview));
	}, [files]);

	return (
		<section className="my-2 upload-section">
			<div {...getRootProps({ className: "dropzone" })}>
				<input {...getInputProps()} />
				<p className="p-3 text-center bg-indigo-500 hover:bg-indigo-300 rounded text-white">
					Image{(type === "MultiImages" || type === "Carousel") && <span className="text-red-700 hover:text-red-500">[s]</span>} Upload
				</p>
			</div>
			<aside className="mt-2">
				{thumbs}
			</aside>
		</section>
	);
}

export default UploadImage;