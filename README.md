# Adam

> ⚠️  This is **alpha** software and still lacks many features you may expect from a minimal text editor for software professionals.

Adam is a reimplementation of the [Atom][1] text editor. At its core, it aims to look and feel much like Atom.
It aims to be extensible, but with a very different philosophy to Atom. Whereas Atom is designed to be extensible
at runtime through a dynamic and proprietary plugin model, Adam aims to be extensible by its architecture and leveraging
existing tools (npm and native ES modules), which have matured significantly since Atom's inception.

[Demo][3]

## Why?

Atom has been officially abandoned and its codebase has been rotting for the past two years.
Rather than attempt to repair it, I intend to learn from it and reimplement Atom's elegant
design in such a way that what I have grown to love about it can still flourish and remain
accessible to developers for years to come.

## Prerequisites

 * [Node.js][2]

## Installing

 1. Clone this repo.
 2. Run `npm install` to install dependencies.
 3. Run `npm run start` to launch the editor.

## Advanced Installation

 1. Download the appropriate [Electron release package][4] for our system and extract it to **~/Adam** or the directory of your choice.
 2. Clone this repo into **~/Adam/resources/app**.
 3. Navigate to where you cloned this repo and run `npm install` to install dependencies.

Now you can run **~/Adam/electron** to launch the editor. For added convenience, you can create an `adam` symlink or alias:

    ln -s ~/Adam/electron ~/bin/adam

## Feature Roadmap

The following is a quick rundown of current known issues and work to be done:

 * [ ] Syntax highlighting system
 * [ ] When cursor is at beginning of line, press tab to indent / shift+tab to unindent
 * [ ] When a selection spans multiple lines, press tab to indent / shift+tab to unindent
 * [ ] When a selection includes at least one character, press `{`, `(`, `[`, `"`, `'`, or `\`` to surround the selection in the corresponding matched pair
 * [ ] Sync cursor position to status bar
 * [ ] Ctrl+/ to comment or uncomment selected lines
 * [ ] When cursor position is at a character with a matching pair according to the current grammar, highlight the matching character
 * [ ] Color-coded file tree entries based on git status (new, added, ignored)
 * [ ] Color-coded file tree entries based on `.` prefix (canonical "hidden" treatment)
 * [ ] Rearrange open tabs via drag-and-drop
 * [ ] Highlight current line
 * [ ] ...and more!

As this project matures beyond the initial prototype phase, so too will the project management and issue tracking.

[1]: https://atom.io/
[2]: https://nodejs.org/en/
[3]: https://adam.twun.io/
[4]: https://github.com/electron/electron/releases/tag/v19.0.8
