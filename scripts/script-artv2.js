const artV2TextP = document.querySelector(".feedback");
const getBookmark = () => document.querySelector('.bookmarked')
const focusedEl = () => document.querySelector(':focus')

console.log(focusedEl())


function announce(message) {
	artV2TextP.textContent = "";
	setTimeout(() => {
		artV2TextP.textContent = message;
    //     setTimeout(() => {artV2TextP.focus(), 10000})
    //     getBookmark().focus()
	 }, 100);
    setTimeout(() => {
		artV2TextP.textContent = "";
	}, 5000);
}

let lastFocusedEl = null;

//Voeg aan alle leesbare elementen een tabindex toe via JS

const main = document.querySelector('main')
main.querySelectorAll('p, h1, h2, h3').forEach(el => {
    el.setAttribute('tabindex', '0');
});


document.addEventListener("keydown", (e) => {
	console.log(e.key, e.metaKey, e.shiftKey);

	const isMac = e.metaKey && e.shiftKey && e.key.toLowerCase() === "y";
	const isWindows = e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "y";

	if (isMac) {
		console.log('MAC')
	}

	if (isWindows) {
		console.log('WINDOWS')
	}
    

	if (isMac || isWindows) {
		e.preventDefault();
        if(!getBookmark()) {
            announce("Bookmark opgeslagen!");
            focusedEl().classList.add('bookmarked');
            console.log("gelukt");
            localStorage.setItem("opgeslagen", getBookmark());

        }
        else if(getBookmark()) {
            getBookmark().classList.remove('bookmarked');
            announce("Nieuwe bookmark opgeslagen!");
            focusedEl().classList.add('bookmarked');
            console.log("gelukt");
            localStorage.setItem("opgeslagen", getBookmark());

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


