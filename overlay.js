if (window.top === window) {
	var overlay = document.createElement("div");
	overlay.textContent = ":";
	overlay.style.color = "black";
	overlay.style.backgroundColor = "#CADDF2";
	overlay.style.position = "fixed";
	overlay.style.width = "400px";
	overlay.style.bottom = "0";
	overlay.style.padding = "1px 0";
	overlay.style.border = "1px solid #97BAEB";
	overlay.style.display = "none";
	overlay.setAttribute('id', 'vimOverlay');
	overlay.style.opacity = ".9";

	var overlayTextinput = document.createElement("input");
	overlayTextinput.style.border = "0";
	overlayTextinput.style.backgroundColor = "transparent";
	overlayTextinput.style.width = "380px";
	overlayTextinput.style.outline = "none";
	overlayTextinput.style.color = "black";
	overlayTextinput.style.opacity = ".9";
	overlayTextinput.setAttribute('id', 'vimOverlayTextinput');
	//overlayTextinput.setAttribute('onkeypress', '');

	document.body.insertBefore(overlay, document.body.firstChild);
	overlay.appendChild(overlayTextinput);

	
}
