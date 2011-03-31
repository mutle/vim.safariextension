Vim Keybindings for Safari
--------------------------

Currently supported keys:

* gg, G
* h, j, k, l
* ^D, ^U, ^F, ^B
* esc, i, dd
* gt, gT, <number>gt

Currently supported commands:

* :q, :q!, :tabnew
* :tabn, :tabp, :tabfir, :tabfirst, :tablast
* :e @url, :edit @url, :tabe @url, :tabedit @url 
* :%s/@search/@replace

@url should be a valid url. http:// will be added if it is not provided.
@search and @replace needs to be regular expression. Modifiers are supported. Remember though that this is the javascript engine NOT the vim engine.

In the preferences for the extension, it is possible to give a list of sites, where the extension should not be loaded. Separate sites by , (comma). Spaces are allowed.

Known issues
------------
* Some pages takes over the keyboard just as this extension does. That means that on some pages the overlay wont show up and wont recieve key strokes.
* Some pages makes the gt and gT combos jump past it. 

Contributors
============

Mutwin Kraus
Jason Green
Jannik Nielsen
