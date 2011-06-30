WebOS.sugar for Espresso
========================

The WebOS.sugar allows you to develop your WebOS apps
in the [Espresso][espresso] text editor for Mac.

I developed WebOS.sugar so that I could create [TapNote][tapnote]
in Espresso, and I'm sharing it under an MIT license
so other people can benefit and contribute to it, as well.

   [espresso]: http://macrabbit.com/espresso/
   [tapnote]: http://onecrayon.com/tapnote/


### Installation

**Important: WebOS.sugar requires [Espresso 2.0][e2]
or greater!**

Once Espresso 2.0 is installed, [download WebOS.sugar][dl], unzip it, and
double click to install.

If you have git installed, instead run this command and relaunch
Espresso:

    cd ~/Library/Application\ Support/Espresso/Sugars
    git clone git://github.com/onecrayon/WebOS.sugar.git

   [e2]: http://macrabbit.com/espresso/2/
   [dl]: http://github.com/downloads/onecrayon/WebOS.sugar/WebOS.sugar.zip

### Documentation

Most of the actions you'll want to use are located in
File&rarr;Actions&rarr;WebOS. They are also accessible by
right clicking a folder or file in your project
or using the gear menu next to FILES.

**Launch Emulator** will do what it says
on the tin (assuming you've installed the SDK), or will
quit and then relaunch the program (if it's already running).

**Launch Resource Manager** will run palm-worm for your app.
It will not relaunch it, so you'll have to close it down yourself.

**View Log In Terminal** will open up a new Terminal window
and follow your app's debugging log.

**SSH Into Emulator** will open up an SSH session to the emulator
in Terminal.

**Novaterm Into Device** will launch Novaterm in Terminal.

**Install and Run App** will package, install, and launch your
app in the first device it finds. This is probably the action
you will use the most, because it gives you very quick access
to your most recent changes. Note that you _do not_ need to
manually quit the app before running this action; both Emulator and
device are smart enough to quit the app before installing and
relaunching it.

**Run App** simply runs the app. You probably won't need
this much, since usually you'll have made changes you want to see.

**Close App** and **Delete App** do what they claim they will.
Deleting the app will remove any app-specific data, so if you need
to start from scratch as a first-run, use Delete and then Install
And Run.

### Stuff I want to add

I'd like a better selection of snippets, and adding CodeSense for
Enyo objects would be awesome.

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