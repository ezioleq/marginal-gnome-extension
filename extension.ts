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
    this._provider = new CommandSearchProvider();
    Main.overview.searchController.addProvider(this._provider);
  }

  disable() {
    if (this._provider) {
      Main.overview.searchController.removeProvider(this._provider);
      this._provider = undefined;
    }
  }
}
