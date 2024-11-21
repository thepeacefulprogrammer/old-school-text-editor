// script.js
const editor = document.getElementById("editor");

// Load saved text from local storage
editor.value = localStorage.getItem("text") || "";

// Save text to local storage on input
editor.addEventListener("input", () => {
	localStorage.setItem("text", editor.value);
});

// Handle full screen toggle with F11
document.addEventListener("keydown", (e) => {
	if (e.key === "F11") {
		e.preventDefault();
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	}
});

// Enable scrolling with arrow keys and page up/down
editor.addEventListener("keydown", (e) => {
	if (e.key === "PageUp" || e.key === "PageDown") {
		e.preventDefault();
		const lineHeight = parseInt(window.getComputedStyle(editor).lineHeight);
		if (e.key === "PageUp") {
			editor.scrollTop -= editor.clientHeight;
		} else if (e.key === "PageDown") {
			editor.scrollTop += editor.clientHeight;
		}
	}
});

// Add tab support for indentation with spaces
editor.addEventListener("keydown", (e) => {
	if (e.key === "Tab") {
		e.preventDefault();
		const start = editor.selectionStart;
		const end = editor.selectionEnd;
		const spaces = "  "; // Two spaces for indentation

		// Set textarea value to: text before caret + spaces + text after caret
		editor.value = editor.value.substring(0, start) + spaces + editor.value.substring(end);

		// Move caret
		editor.selectionStart = editor.selectionEnd = start + spaces.length;
	}
});

// Backup to file with F2
document.addEventListener("keydown", (e) => {
	if (e.key === "F2") {
		e.preventDefault();
		const text = editor.value;
		const blob = new Blob([text], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "backup.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}
});
