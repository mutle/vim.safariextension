var keycombo = '';

window.document.addEventListener("keydown", function(e) {
  var t = {}, c = String.fromCharCode(e.keyCode).toLowerCase(), SCROLL_STEP = 35;

  if(window.document.activeElement !== window.document.body) {
    if (e.keyCode == 27) {
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

  if(e.shiftKey) c = c.toUpperCase();

  switch(c) {
  case 'g':
    if(keycombo == 'g')
      t.scrollTo(0, 0);
    else {
      keycombo = c;
      window.setTimeout(function() { keycombo = ''; }, 500);
    }
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
    if(e.ctrlKey) {
      t.scroll(0, t.halfWindowHeight());
    }
  break;
  case 'f':
    if(e.ctrlKey) {
      t.scroll(0, t.fullWindowHeight());
    }
  break;
  case 'u':
    if(e.ctrlKey) {
      t.scroll(0, -t.halfWindowHeight());
    }
  break;
  case 'b':
    if(e.ctrlKey) {
      t.scroll(0, -t.fullWindowHeight());
    }
  break;
  case 'G':
    t.scrollTo(0, t.screenHeight());
  break;
  }
});
