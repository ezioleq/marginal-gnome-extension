import Gio from "gi://Gio";
import Adw from "gi://Adw";
import Gtk from "gi://Gtk";

import { ExtensionPreferences } from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js";

export default class Preferences extends ExtensionPreferences {
  async fillPreferencesWindow(window: Adw.PreferencesWindow): Promise<void> {
    const settings = this.getSettings();

    const MIN_MARGIN = 0;
    const MAX_MARGIN = 512;

    const MIN_OFFSET = -512;
    const MAX_OFFSET = 512;

    const page = new Adw.PreferencesPage({
      title: "Almost Maximize",
      icon_name: "preferences-system-windows-symbolic",
    });
    window.add(page);

    // Margins subgroup
    const marginsGroup = new Adw.PreferencesGroup({
      title: "Margins",
      description: "Distance from the screen edges (in pixels)",
    });
    page.add(marginsGroup);

    marginsGroup.add(
      this._createSliderRow(
        "Horizontal",
        settings,
        "margin-horizontal",
        MIN_MARGIN,
        MAX_MARGIN,
      ),
    );
    marginsGroup.add(
      this._createSliderRow(
        "Vertical",
        settings,
        "margin-vertical",
        MIN_MARGIN,
        MAX_MARGIN,
      ),
    );

    // Offsets subgroup
    const offsetsGroup = new Adw.PreferencesGroup({
      title: "Offsets",
      description: "Adjust the center position of the window (in pixels)",
    });
    page.add(offsetsGroup);

    offsetsGroup.add(
      this._createSliderRow(
        "Horizontal",
        settings,
        "offset-horizontal",
        MIN_OFFSET,
        MAX_OFFSET,
      ),
    );
    offsetsGroup.add(
      this._createSliderRow(
        "Vertical",
        settings,
        "offset-vertical",
        MIN_OFFSET,
        MAX_OFFSET,
      ),
    );

    // Behavior subgroup
    const behaviorGroup = new Adw.PreferencesGroup({
      title: "Behavior",
    });
    page.add(behaviorGroup);

    const unmaximizeRow = new Adw.SwitchRow({
      title: "Unmaximize maximized windows",
      subtitle: "Automatically unmaximize windows to allow resizing",
    });

    settings.bind(
      "unmaximize-maximized",
      unmaximizeRow,
      "active",
      Gio.SettingsBindFlags.DEFAULT,
    );
    behaviorGroup.add(unmaximizeRow);
  }

  /**
   * Creates an Adw.ActionRow containing a Gtk.Scale (slider).
   *
   * @param title The slider title.
   * @param settings The settings instance.
   * @param key The preference key defined in settings schema.
   * @param min Minimal value.
   * @param max Maximal value.
   *
   * @returns The configured slider control.
   */
  private _createSliderRow(
    title: string,
    settings: Gio.Settings,
    key: string,
    min: number,
    max: number,
  ): Adw.ActionRow {
    const row = new Adw.ActionRow({ title: title });

    const adjustment = new Gtk.Adjustment({
      lower: min,
      upper: max,
      step_increment: 1,
      page_increment: 16,
    });

    const scale = new Gtk.Scale({
      orientation: Gtk.Orientation.HORIZONTAL,
      adjustment: adjustment,
      draw_value: true,
      value_pos: Gtk.PositionType.RIGHT,
      hexpand: true,
      valign: Gtk.Align.CENTER,
      digits: 0,
    });

    const HORIZONTAL_SPACE_REQUEST = 200;
    scale.set_size_request(HORIZONTAL_SPACE_REQUEST, -1);

    row.add_suffix(scale);

    settings.bind(key, adjustment, "value", Gio.SettingsBindFlags.DEFAULT);

    return row;
  }
}
