import St from "gi://St";
import Gio from "gi://Gio";
import * as Main from "resource:///org/gnome/shell/ui/main.js";
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import ShellExtension from "../extension.js";

declare interface ResultMeta {
  id: string;
  name: string;
  description?: string;
  createIcon(size: number): St.Icon;
}

declare interface SearchProvider {
  appInfo: Gio.DesktopAppInfo;

  getInitialResultSet(terms: string[]): Promise<string[]>;

  getSubsearchResultSet(
    previous_results: string[],
    terms: string[],
  ): Promise<string[]>;

  getResultMetas(results: string[]): Promise<ResultMeta[]>;

  activateResult(identifier: string): void;

  filterResults(results: string[], maxResults: number): string[];
}

export default class ActionSearchProvider implements SearchProvider {
  extension: ShellExtension;
  appInfo: Gio.DesktopAppInfo;

  public constructor(extension: ShellExtension) {
    this.extension = extension;
    this.appInfo = this.extension.getApp().appInfo;
  }

  async getInitialResultSet(terms: string[]): Promise<string[]> {
    let results: string[] = [];

    if ("almost".includes(terms.join("").toLowerCase())) results.push("almost");

    return results;
  }

  async getSubsearchResultSet(
    previous_results: string[],
    terms: string[],
  ): Promise<string[]> {
    return this.getInitialResultSet(terms);
  }

  async getResultMetas(results: string[]): Promise<ResultMeta[]> {
    return results.map(
      (result: string): ResultMeta => ({
        id: result,
        name: "Almost maximize",
        description: "Almost maximizes the focused window",
        createIcon: (size: any) =>
          new St.Icon({ icon_name: "view-restore-symbolic", icon_size: size }),
      }),
    );
  }

  activateResult(identifier: string): void {
    console.warn("activateResult", identifier);
    this.extension.sayHello();
  }

  filterResults(results: string[], maxResults: number): string[] {
    return results.slice(0, maxResults);
  }
}
