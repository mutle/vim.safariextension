var combokey = '';
var multiplier = 0;
var t = {};
var timer;

window.document.addEventListener("keydown", function(e) {
  var c = String.fromCharCode(e.keyCode).toLowerCase();
  if(e.shiftKey) c = c.toUpperCase();
  if (e.keyCode > 32) {
    if (parseInt(c, 10) == c) {
      multiplier = (multiplier * 10) + c;
    } else {
      combokey += c;
    }
    clearTimeout(timer);
    timer = window.setTimeout(function() { combokey = ''; multiplier = 0; }, 500);
  }

  if(window.document.activeElement !== window.document.body) {
    switch (e.keyCode) {
		case 27:
		  if (document.getElementById('vimOverlay').style.display == "block") {
			  document.getElementById('vimOverlay').style.display = 'none';
			  document.getElementById('vimOverlayTextinput').value = '';
		  } else {
			  t.lastActiveElement = window.document.activeElement;
        combokey = '';
        multiplier = 0;
		  }
		  window.document.activeElement.blur();
		  break;
		case 8:
			if (window.document.activeElement.id == "vimOverlayTextinput" && window.document.activeElement.value == '') {
				window.document.activeElement.blur();
				document.getElementById('vimOverlay').style.display = "none";
				e.preventDefault();
			}
			break;
		case 13:
			if (window.document.activeElement.id == "vimOverlayTextinput") {
				t.inputCommand(window.document.activeElement.value);
				window.document.activeElement.value = '';
				window.document.activeElement.blur();
				document.getElementById('vimOverlay').style.display = "none";
			}
			break;
	}
    return;
  }

  t.scroll = function(x, y) {
    window.scrollBy(x, y);
  };
  t.scrollTo = function(x, y) {
    window.scrollTo(x, y);
  };

  t.halfWindowHeight = function() {
    return window.innerHeight / 2;
  };
  
  t.fullWindowHeight = function() {
    return window.innerHeight;
  };
  
  t.screenHeight = function() {
    return document.body.offsetHeight;
  };

  t.functionkeys = function(keys) {
	  if ((keys.alt != '1' && e.altKey) || (keys.alt == '1' && !e.altKey)) {
		  return false;
	  }
	  if ((keys.meta != '1' && e.metaKey) || (keys.meta == '1' && !e.metaKey)) {
		  return false;
	  }
	  if ((keys.ctrl != '1' && e.ctrlKey) || (keys.ctrl == '1' && !e.ctrlKey)) {
		  return false;
	  }
	  if ((keys.altgr != '1' && e.altGraphKey) || (keys.altgr == '1' && !e.altGraphKey)) {
		  return false;
	  }
	  if ((keys.shift != '1' && e.shiftKey) || (keys.shift == '1' && !e.shiftKey)) {
		  return false;
	  }
	  return true;
  }

  t.resetCombo = function() {
    combokey = '';
    multiplier = 0;
  }

  switch (e.keyIdentifier) {
	  case "U+003A":
		  document.getElementById('vimOverlay').style.display = "block";
		  document.getElementById('vimOverlayTextinput').focus();
		  e.preventDefault();
		  break;
	  case "U+0008":
		  if (document.getElementById('vimOverlay').style.display == "block" && document.getElementById('vimOverlayTextinput').value == '') {
			  document.getElementById('vimOverlayTextinput').blur();
			  document.getElementById('vimOverlay').style.display = "none";
		  }
		  break;
  }

  t.keyCommand(combokey, e);
});

t.keyCommand = function(c, e) {
  
  
  var reset_combo = true;
  var SCROLL_STEP = 35;

  switch(c) {
    case 'gg':
      t.scrollTo(0, 0);
    break;
    case 'h':
      t.scroll(-SCROLL_STEP, 0);
    break;
    case 'j':
      t.scroll(0, SCROLL_STEP);
    break;
    case 'k':
      t.scroll(0, -SCROLL_STEP);
    break;
    case 'l':
      t.scroll(SCROLL_STEP, 0);
    break;
    case 'd':
      if (t.functionkeys({'ctrl': '1'})) {
        t.scroll(0, t.halfWindowHeight());
      } else { 
        reset_combo = false;
      }
    break;
    case 'dd':
      if (t.lastActiveElement != undefined) {
        t.lastActiveElement.value = '';
      }
    break;
    case 'f':
      if(t.functionkeys({'ctrl': '1'})) { 
        t.scroll(0, t.fullWindowHeight());
      }
    break;
    
    case 'u':
      if(t.functionkeys({'ctrl': '1'})) {
        t.scroll(0, -t.halfWindowHeight());
      }
    break;
    case 'b':
    if(t.functionkeys({'ctrl': '1'})) {
        t.scroll(0, -t.fullWindowHeight());
      }
    break;
    case 'G':
      t.scrollTo(0, t.screenHeight());
    break;
    case 'i':
      if (t.lastActiveElement != undefined) {
        t.lastActiveElement.focus();
        e.preventDefault();
      }
      break;
    case 'gT':
      safari.self.tab.dispatchMessage("prevTab","");
      break;
    case 'gt':
      safari.self.tab.dispatchMessage("nextTab",multiplier);
      break;

    default:
      reset_combo = false;
    break;
  }

  if (reset_combo) {
    t.resetCombo();
  }

}  

t.inputCommand = function(command) {
	if (command == '') return;

  if (command.charAt(0) == "%") {
    t.percentCommand(command);
    return;
  }

	param = command.split(" ");

	switch (param[0]) {
		case 'tabe':
		case 'tabedit':
		case 'e':
    case 'edit':
			if (param[1] == "" || param[1] == undefined) {
				if (param[0] == 'e' || param[0] == 'edit') {
					alert('Usage: command "edit" or "e" for short, opens the url specified as first parameter in the current tab');
				} else {
					alert('Usage: command "tabedit" or "tabe" for short, opens a url specified as first parameter in a new tab');
				}

			} else {
				var url = param[1]
				if (url.substr(0,5) != "http:" && url.substr(0,6) != "https:") {
					url = "http://" + url;
				}
				if (param[0] == 'tabe' || param[0] == 'tabedit') {
					safari.self.tab.dispatchMessage("openTab",url);
				} else {
					location.href = url;
				}
			}
		break;
		
    case 'q':
			safari.self.tab.dispatchMessage("closeWindow");
			break;
    
    case 'tabn':
      safari.self.tab.dispatchMessage("nextTab",0);
      break;

    case 'tabp':
      safari.self.tab.dispatchMessage("prevTab","");
      break;

    case 'tabfirst':
    case 'tabfir':
      safari.self.tab.dispatchMessage("nextTab",1);
      break;

    case 'tablast':
      safari.self.tab.dispatchMessage("nextTab","last");
      break;
      
	}
}

t.percentCommand = function(command) {
	param = command.split("/");
  
  switch (param[0]) {
    case "%s":
      if (t.lastActiveElement == undefined) break;
      if (param.length == 3 || param.length == 4) {
        var mod = "";
        if (param.length == 4) mod = param[3];
        var regex = new RegExp(param[1], mod);
        t.lastActiveElement.value = t.lastActiveElement.value.replace(regex, param[2]);
      }
      break;
  }
}

function getAnswer(theMessageEvent) {
	switch (theMessageEvent.name) {
	}
}
safari.self.addEventListener("message", getAnswer, false);


