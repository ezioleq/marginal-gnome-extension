import GLib from "gi://GLib";
import Gio from "gi://Gio";
import Meta from "gi://Meta";
import Shell from "gi://Shell";
import * as Main from "resource:///org/gnome/shell/ui/main.js";
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import CommandSearchProvider from "./lib/searchProvider.js";

export default class ShellExtension extends Extension {
  private _provider?: any;

  enable() {
    this._provider = new CommandSearchProvider(this);
    Main.overview.searchController.addProvider(this._provider);
  }

  disable() {
    if (this._provider) {
      Main.overview.searchController.removeProvider(this._provider);
      this._provider = undefined;
    }
  }

  sayHello(): void {
    console.warn("### HELLO ###", "AAAAAA");
    const win = global.display.focus_window;

    if (!win) {
      console.warn("window is null or undefined");
      return;
    }

    win.move_resize_frame(true, 0, 0, 200, 200);
  }
}
