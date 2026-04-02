// bron: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands

chrome.commands.onCommand.addListener((command) => {
	if (command === "add-bookmark") {
		console.log("Geklikt bookmark!");

		let el = document.createElement("p");
		let id = "added";
		el.setAttribute("id", id);
		el.setAttribute("aria-live", "assertive");
		document.body.appendChild(el);

		window.setTimeout(function () {
			document.getElementById(id).innerHTML = "test";
		}, 100);

		window.setTimeout(function () {
			document.body.removeChild(document.getElementById(id));
		}, 1000);
	}
});


//bron: https://www.geeksforgeeks.org/css/how-to-create-a-function-generateselector-to-generate-css-selector-path-of-a-dom-element/

const generateSelector = (target) => {
	const selectorPath = [];
	while (target.tagName) {
		let i = 0;
		if (target.parentNode) {
			const children = target.parentNode.children;
			while (i < children.length && children[i] !== target) {
				i++;
			}
		}

		selectorPath.unshift(
			target.nodeName + (i > 0 ? `:nth-child(${i + 1})` : ""),
		);
		target = target.parentNode;
	}
	return selectorPath.join(" > ");
};

// let target = document.querySelector('HET ELEMENT')
