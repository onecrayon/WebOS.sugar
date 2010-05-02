WebOS.sugar for Espresso
========================

**EARLY DEVELOPMENT VERSION**  
I'm still actively developing this sugar to solve common
issues as I work with WebOS. It's pretty basic at the
moment, but if you'd like to download and try it out feel
free.  **You will need to download and compile the
bleeding edge version of [Spice](http://github.com/onecrayon/Spice-sugar/)
in order for the sugar to work.**

### Basic Documentation

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

**Follow Log In Terminal** will open up a new Terminal window
and subscribe you to your app's debugging log.

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
custom shell variables.

I'd like a better selection of snippets, and adding CodeSense for
Mojo objects would be awesome (but maybe not practical given time
restraints).

I'm also open to ideas; I think I've hit the major points of the
command-line tools, but there's probably stuff I'm overlooking.
[Drop me a line](http://onecrayon.com/about/contact/)
if you have some feedback.
