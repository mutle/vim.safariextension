var keycombo = '';
var oldkey = '';
var t = {};

window.document.addEventListener("keydown", function(e) {
  var c = String.fromCharCode(e.keyCode).toLowerCase(), SCROLL_STEP = 35;

  if(window.document.activeElement !== window.document.body) {
    if (e.keyCode == 27) {
	  t.lastActiveElement = window.document.activeElement;
      window.document.activeElement.blur();
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

  t.doubleTap = function(key) {
	if (oldkey == '') {
	  oldkey = key;
	  window.setTimeout(function() { oldkey = ''; }, 500);
	  return false;
	}
	else {
	  if (oldkey == key) {
		oldkey = '';
		return true;
	  }
	}
  }

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

  if(e.shiftKey) c = c.toUpperCase();

  switch(c) {
  case 'g':
    if(t.doubleTap('g'))
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
    } else if (t.doubleTap('d')) {
		if (t.lastActiveElement != undefined) {
			t.lastActiveElement.value = '';
		}
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
}
});

