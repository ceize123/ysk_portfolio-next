export default function firstLetter(method, string) {
	
	return method.toLowerCase() === "upper"
		? string.charAt(0).toUpperCase() + string.slice(1)
		: string.charAt(0).toLowerCase() + string.slice(1);
}