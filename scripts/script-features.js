const featTextP = document.querySelector('.feedback-feat')

function testAnnounceEen(message) {
	featTextP.textContent = "";
	setTimeout(() => {
		featTextP.textContent = message;
	}, 100);
}

document.addEventListener("keydown", (e) => {
	console.log(e.key, e.metaKey, e.shiftKey);

	const isMac = e.metaKey && e.shiftKey && e.key === "y";
	const isWindows = e.ctrlKey && e.shiftKey && e.key === "y";

	if (isMac || isWindows) {
		e.preventDefault();
		console.log("gelukt");
		testAnnounceEen("Bookmark opgeslagen!");
    }
});




// naar bookmark
const bookmarkP = document.querySelector('.naar-bookmark article p:nth-of-type(2)')
const feedBookP = document.querySelector('.feedback-bookm')

function testAnnounceTwee(message) {
	feedBookP.textContent = "";
	setTimeout(() => {
		feedBookP.textContent = message;
	}, 100);
}

document.addEventListener("keydown", (e) => {

	const isMac = e.metaKey && e.shiftKey && e.key === "o";
	const isWindows = e.ctrlKey && e.shiftKey && e.key === "o";

	if (isMac || isWindows) {
		e.preventDefault();
		console.log("naar bookmark");
		testAnnounceTwee("Ga nu naar bookmark!");
        bookmarkP.focus()
    }
});