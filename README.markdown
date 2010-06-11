WebOS.sugar for Espresso
========================

The WebOS.sugar allows you to develop your WebOS apps
in the [Espresso][espresso] text editor for Mac.

I developed WebOS.sugar so that I could create [TouchNote][touchnote]
in Espresso, and I'm sharing it under an MIT license
so other people can benefit and contribute to it, as well.

   [espresso]: http://macrabbit.com/espresso/
   [touchnote]: http://onecrayon.com/touchnote/


### Installation

**Important: WebOS.sugar requires [Spice.sugar][spice] 1.0b7
or greater!** Make sure you install Spice prior to using the
WebOS.sugar or nothing but the snippets will work.

   [spice]: http://onecrayon.com/spice/

If you are downloading WebOS.sugar's source from GitHub, make
sure to rename it to `WebOS.sugar` prior to installing it (by
default GitHub will append a bunch of junk to the extension).

Otherwise, just double click to install (you'll need to relaunch
Espresso before the actions are available).

### Known problems

I've been using WebOS.sugar pretty heavily the past couple months,
and don't know of any unfixed bugs. However, you should know:

* Some actions in File&rarr;Actions&rarr;WebOS run a little slow.
  There is no progress indicator at the moment, but you may notice
  Espresso becoming less responsive while the action is completing.
  This is a normal side effect of needing to run shell commands rather
  than tying into an API.
* If the Inspector is running, Launch Inspector doesn't always succeed
  in relaunching it. I haven't found a workaround yet, so just be aware.

Enjoy!

### Documentation

Most of the actions you'll want to use are located in
File&rarr;Actions&rarr;WebOS. They are also accessible by
right clicking a folder or file in your project
or using the gear menu next to FILES.

**Launch Emulator** and **Launch Inspector** will do what they say
on the tin (assuming you've installed the SDK), or will
quit and then relaunch the program (if it's already running).
This is probably useless for the emulator, but very handy
for the Inspector.

**Launch Resource Manager** will run palm-worm for your app.
It will not relaunch it, so you'll have to close it down yourself.

**View Log In Terminal** will open up a new Terminal window
and subscribe you to your app's debugging log.

**SSH Into Emulator** will open up an SSH session to the emulator
in Terminal.

**Novaterm Into Device** will launch Novaterm in Terminal.

**Install and Run App** will package, install, and launch your
app in the first device it finds. This is probably the action
you will use the most, because it gives you very quick access
to your most recent changes. Note that you _do not_ need to
manually quit the app before running this action; the Emulator is
smart enough to quit the app before installing and relaunching it.

**Run App** simply runs the app, but does it with the -i argument
so that you can use the Inspector. You probably won't need
this much, since usually you'll have made changes you want to see.

**Close App** and **Delete App** do what they claim they will.
Deleting the app will remove any app-specific data, so if you need
to start from scratch as a first-run, use Delete and then Install
And Run.

**New WebOS App**.  This is a cool one. _Make sure the root folder
you want to use is selected, or have no files or folders selected._
This will create the basic file hierarchy for a new WebOS app in
the selected folder (or the root folder of the project, if nothing
is selected). You can set default company and reverse domain info
by opening up the Preferences and adding the following keys to your
custom shell variables list in the Advanced&rarr;TEA preferences:

* COMPANY: My Company
* REVERSE\_DOMAIN: com.mydomain

There's also some snippets in the Actions&rarr;WebOS menu; I
leave it to you to investigate those.

### Stuff I want to add

I'm thinking about the best way to add "new scene" functionality.
The tricky thing is I need to query the user for the name of the
scene (I don't like how the WebOS Textmate bundle just uses the
selected text, because it requires you to think ahead too much).

I want to add a simple preferences area rather than rely on TEA's
custom shell variables for generating new apps.

I'd like a better selection of snippets, and adding CodeSense for
Mojo objects would be awesome (but maybe not practical given time
restraints).

I'm also open to ideas; I think I've hit the major points of the
command-line tools, but there's probably stuff I'm overlooking.
[Drop me a line](http://onecrayon.com/about/contact/)
if you have some feedback.

### Released under an MIT license

Copyright (c) 2010 Ian Beck

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.