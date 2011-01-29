Vim Keybindings for Safari
--------------------------

Currently supported keys:

* gg, G
* h, j, k, l
* ^D, ^U, ^F, ^B
* esc, i, dd
* gt, gT

Currently supported commands:

* :q, :tabnew
* :tabn, :tabp, :tabfir, :tabfirst, :tablast
* :e @url, :edit @url, :tabe @url, :tabedit @url 
* :%s/@search/@replace

@url should be a valid url. http:// will be added if it is not provided.
@search and @replace needs to be regular expression. Remember though that this is javascript NOT the vim engine.

Contributors
============

Mutwin Kraus
Jason Green
Jannik Nielsen
