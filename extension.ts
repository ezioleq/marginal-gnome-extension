import Shell from "gi://Shell";
import * as Main from "resource:///org/gnome/shell/ui/main.js";
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import ActionSearchProvider from "./lib/searchProvider.js";

export default class ShellExtension extends Extension {
  private _provider?: ActionSearchProvider;
  private _settings?: any;

  enable() {
    this._settings = this.getSettings();

    this._provider = new ActionSearchProvider(this);
    Main.overview.searchController.addProvider(this._provider);
  }

  disable() {
    if (this._settings) {
      this._settings = null;
    }

    if (this._provider) {
      Main.overview.searchController.removeProvider(this._provider);
      this._provider = undefined;
    }
  }

  almostMaximize(): void {
    const win = global.display.focus_window;

    if (!win) return;

    const margin = this._settings.get_int("margin-size");
    const workArea = win.get_work_area_for_monitor(win.get_monitor());

    win.move_resize_frame(
      true,
      workArea.x + margin,
      workArea.y + margin,
      workArea.width - margin * 2,
      workArea.height - margin * 2,
    );
  }

  getApp() {
    let settingsApp = Shell.AppSystem.get_default().lookup_app(
      "org.gnome.Settings.desktop",
    );

    return settingsApp;
  }
}
