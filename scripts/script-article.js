let bookmark = null;

const feedbackText = document.querySelector(".feedback");

function announce(message) {
	feedbackText.textContent = "";
	setTimeout(() => {
		feedbackText.textContent = message;
	}, 100);
}

// bron:
// https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

document.addEventListener("keydown", (e) => {
	console.log(e.key, e.metaKey, e.shiftKey);

	const isMac = e.metaKey && e.shiftKey && e.key === "y";
	const isWindows = e.ctrlKey && e.shiftKey && e.key === "y";

	if (isMac || isWindows) {
		e.preventDefault();
		bookmark = document.activeElement;
		console.log("gelukt");
		announce("Bookmark opgeslagen!");
		const selector = generateSelector(bookmark);
		localStorage.setItem("bookmark", selector);
	}
});

const jumpToggle = document.getElementById("bookmark-toggle");

// bron: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
window.addEventListener("load", () => {
	const saved = localStorage.getItem("bookmark");

	if (jumpToggle.checked && saved) {
		const el = document.querySelector(saved);
		if (el) {
			el.focus();
			announce("Bookmark geladen, verder lezen vanaf hier");
		}
	}
});

//bron: https://www.geeksforgeeks.org/css/how-to-create-a-function-generateselector-to-generate-css-selector-path-of-a-dom-element/
const generateSelector = (el) => {
	const selectorPath = [];
	while (el.tagName) {
		let i = 0;
		if (el.parentNode) {
			const children = el.parentNode.children;
			while (i < children.length && children[i] !== el) {
				i++;
			}
		}

		selectorPath.unshift(el.nodeName + (i > 0 ? `:nth-child(${i + 1})` : ""));
		el = el.parentNode;
	}
	return selectorPath.join(" > ");
};
