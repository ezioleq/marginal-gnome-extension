import Gio from "gi://Gio";
import Adw from "gi://Adw";
import Gtk from "gi://Gtk";

import { ExtensionPreferences } from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js";

export default class Preferences extends ExtensionPreferences {
  async fillPreferencesWindow(window: Adw.PreferencesWindow): Promise<void> {
    const settings = this.getSettings();

    const page = new Adw.PreferencesPage({
      title: "General",
      icon_name: "dialog-information-symbolic",
    });
    window.add(page);

    const group = new Adw.PreferencesGroup({
      title: "Behavior",
      description: "Configure behavior of the extension",
    });
    page.add(group);

    const row = new Adw.SpinRow({
      title: "Margin size",
      subtitle: "The margin size all around the window when almost maximizing",
      adjustment: new Gtk.Adjustment({
        lower: 0,
        upper: 512,
        step_increment: 1,
        page_increment: 10,
      }),
    });
    group.add(row);

    settings.bind("margin-size", row, "value", Gio.SettingsBindFlags.DEFAULT);
  }
}
