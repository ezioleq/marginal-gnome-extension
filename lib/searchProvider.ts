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
  createIcon: any;
}

// declare interface SearchProvider {
//   appInfo: any;

//   getInitialResultSet(terms: string[]): any;

//   getSubsearchResultSet(previous_results: string[], terms: string[]): any;

//   getResultMetas(
//     resultIds: string[],
//     cancellable: Gio.Cancellable,
//   ): Promise<SearchResultMeta[]>;

//   activateResult(identifier: string, terms: string[]): void;
//   launchSearch(terms: string[], timestamp: number): void;
// }

export default class CommandSearchProvider {
  extension: ShellExtension;
  appInfo: any;

  public constructor(extension: ShellExtension) {
    this.extension = extension;
    this.appInfo = this.extension.getApp().appInfo;
  }

  async getInitialResultSet(terms: string[]) {
    let results: string[] = [];

    if ("almost".includes(terms.join("").toLowerCase())) results.push("almost");

    console.info("getInitialResultSet results", results);
    return results;
  }

  async getSubsearchResultSet(previous_results: string[], terms: string[]) {
    return this.getInitialResultSet(terms);
  }

  async getResultMetas(results: string[]) {
    let app = this.extension.getApp();
    return results.map((result) => ({
      id: result,
      name: result,
      createIcon: (size: any) => app && app.create_icon_texture(size),
    }));
  }

  activateResult(identifier: string): void {
    console.warn("activateResult", identifier);
    this.extension.sayHello();
  }

  filterResults(results: any, maxResults: any) {
    return results.slice(0, maxResults);
  }
}
