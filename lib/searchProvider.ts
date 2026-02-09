import St from "gi://St";
import GObject from "gi://GObject";
import Shell from "gi://Shell";
import Gio from "gi://Gio";
import * as Main from "resource:///org/gnome/shell/ui/main.js";
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import ShellExtension from "../extension.js";

declare interface SearchResultMeta {
  id: string;
  name: string;
  description?: string;
  clipboardText?: string;
  createIcon: any;
}

declare interface SearchProvider {
  appInfo?: {
    get_name(): string;
    get_icon(): any;
    get_id(): string;
    should_show(): boolean;
  } | null;

  getInitialResultSet(
    terms: string[],
    cancellable: Gio.Cancellable,
  ): Promise<string[]>;

  getSubsearchResultSet(
    previous_results: string[],
    terms: string[],
    cancellable: Gio.Cancellable,
  ): Promise<string[]>;

  getResultMetas(
    resultIds: string[],
    cancellable: Gio.Cancellable,
  ): Promise<SearchResultMeta[]>;

  activateResult(identifier: string, terms: string[]): void;
  launchSearch(terms: string[], timestamp: number): void;
}

export default class CommandSearchProvider implements SearchProvider {
  extension: ShellExtension;

  public constructor(extension: ShellExtension) {
    this.extension = extension;
  }

  appInfo?: null;

  getInitialResultSet(
    terms: string[],
    cancellable: Gio.Cancellable,
  ): Promise<string[]> {
    console.warn("getInitialResultSet input", terms);
    var results: string[] = [];

    return new Promise((resolve, reject) => {
      const cancelledId = cancellable.connect(() =>
        reject(Error("Search cancelled")),
      );

      if ("almost".includes(terms.join("").toLowerCase()))
        results.push("almost");

      cancellable.disconnect(cancelledId);
      if (!cancellable.is_cancelled()) {
        console.warn("getInitialResultSet results", results);
        resolve(results);
      }
    });
  }

  getSubsearchResultSet(
    previous_results: string[],
    terms: string[],
    cancellable: Gio.Cancellable,
  ): Promise<string[]> {
    if (cancellable.is_cancelled()) throw Error("Search cancelled");

    return this.getInitialResultSet(terms, cancellable);
  }

  getResultMetas(
    resultIds: string[],
    cancellable: Gio.Cancellable,
  ): Promise<SearchResultMeta[]> {
    console.warn("getResultMetas input", resultIds);

    return new Promise((resolve, reject) => {
      const cancelledId = cancellable.connect(() =>
        reject(Error("Operation cancelled")),
      );

      const { scaleFactor } = St.ThemeContext.get_for_stage(global.stage);

      const metas = resultIds.map(
        (id: string): SearchResultMeta => ({
          id,
          name: "Almost maximize",
          description: "Resize",
          createIcon: (size: any) => {
            return new St.Icon({
              icon_name: "dialog-information",
              width: size * scaleFactor,
              height: size * scaleFactor,
            });
          },
          clipboardText: undefined,
        }),
      );
      console.warn("getResultMetas created metas", metas);

      cancellable.disconnect(cancelledId);
      if (!cancellable.is_cancelled()) resolve(metas);
    });
  }

  activateResult(identifier: string, terms: string[]): void {
    console.warn("activateResult", identifier, terms);
    this.extension.sayHello();
  }

  launchSearch(terms: string[], timestamp: number): void {
    // throw new Error("Method not implemented.");
  }

  get canLaunchSearch() {
    return false;
  }

  get id() {
    return this.extension.uuid;
  }
}
