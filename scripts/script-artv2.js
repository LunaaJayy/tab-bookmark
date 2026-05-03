const artV2TextP = document.querySelector(".feedback");
const getBookmark = () => document.querySelector(".bookmarked");
const focusedEl = () => document.querySelector(":focus");
const popover = document.getElementById("menu-bookmark");
const checkbox = document.getElementById("bookmark-toggle");

console.log(focusedEl());

checkbox.addEventListener("change", () => {
	localStorage.setItem("checkbox", checkbox.checked);
});

//ga naar bookmark
window.addEventListener("load", () => {
	const localSaved = localStorage.getItem("opgeslagen");
	const saved = document.querySelector(localSaved);
	saved.classList.add("bookmarked");

	const checkboxValue = localStorage.getItem("checkbox");
	if (checkboxValue !== null) {
		checkbox.checked = checkboxValue === "true";
	}

	if (checkbox.checked && getBookmark()) {
		getBookmark().focus();
		announce("Bookmark geladen, verder lezen vanaf hier");
	}
});

// bookmark menu gaat wek zodra de gebruiker er met zn focus vanaf is
popover.addEventListener("focusout", () => {
	popover.hidePopover();
});

// feedback bericht
function announce(message) {
	console.log("announce");
	artV2TextP.textContent = "";
	setTimeout(() => {
		artV2TextP.textContent = message;
		artV2TextP.focus();
		console.log("heenenweer");
		getBookmark().focus();
		console.log("message aangemaakt");
	}, 500);
	setTimeout(() => {
		artV2TextP.textContent = "";
	}, 7000);
}

//Voeg aan alle leesbare elementen een tabindex toe via JS
const main = document.querySelector("main");
const aside = document.querySelector("aside");
main.querySelectorAll("p, h1, h2, h3").forEach((el) => {
	el.setAttribute("tabindex", "0");
});

aside.querySelectorAll("p").forEach((el) => {
	el.setAttribute("tabindex", "0");
});

// bookmark opslaan
document.addEventListener("keydown", (e) => {
	console.log(e.key, e.metaKey, e.shiftKey);

	const isMac = e.metaKey && e.shiftKey && e.key.toLowerCase() === "y";
	const isWindows = e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "y";

	if (isMac) {
		console.log("MAC");
	}

	if (isWindows) {
		console.log("WINDOWS");
	}

	if (isMac || isWindows) {
		e.preventDefault();
		if (!getBookmark()) {
			announce("Bookmark opgeslagen!");
			focusedEl().classList.add("bookmarked");
			const bookmark = generateSelector(getBookmark());
			console.log("gelukt", bookmark);
			localStorage.setItem("opgeslagen", bookmark);
		} else if (getBookmark()) {
			getBookmark().classList.remove("bookmarked");
			announce("Nieuwe bookmark opgeslagen!");
			focusedEl().classList.add("bookmarked");
			const bookmark = generateSelector(getBookmark());
			console.log("gelukt", bookmark);
			localStorage.setItem("opgeslagen", bookmark);
		}
	}
});

// naar bookmark
document.addEventListener("keydown", (e) => {
	const isMac = e.metaKey && e.shiftKey && e.key.toLowerCase() === "s";
	const isWindows = e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s";

	if ((isMac || isWindows) && getBookmark()) {
		e.preventDefault();
		console.log("naar bookmark");
		announce("Ga nu naar bookmark!");
		getBookmark().focus();
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
