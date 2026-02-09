import St from "gi://St";
import Gio from "gi://Gio";
import * as Main from "resource:///org/gnome/shell/ui/main.js";
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import ShellExtension from "../extension.js";

/**
 * A light-weight metadata object, used to represent a search result in
 * the search view.
 */
declare interface ResultMeta {
  /**
   * Unique identifier of the result.
   */
  id: string;

  /**
   * Name of the result.
   */
  name: string;

  /**
   * Optional description of the result.
   */
  description?: string;

  /**
   * Creates an icon for the result.
   * @param size The requested size of the icon.
   * @returns A `Clutter.Actor` to represent search result.
   */
  createIcon(size: number): St.Icon;
}

/**
 * A search provider is a mechanism by which an application can expose its
 * search capabilities to GNOME Shell.
 */
declare interface SearchProvider {
  /**
   * The application of the provider.
   */
  appInfo: Gio.DesktopAppInfo;

  /**
   * Initiate a new search.
   *
   * This method is called to start a new search and should return a list of
   * unique identifiers for the results.
   *
   * @param terms The search terms.
   * @returns A list of unique identifiers.
   */
  getInitialResultSet(terms: string[]): Promise<string[]>;

  /**
   * Refine the current search.
   *
   * This method is called to refine the current search results with expanded
   * terms and should return a subset of the original result set.
   *
   * @param previous_results The original result set.
   * @param terms The search terms.
   * @returns A subset of the original result set.
   */
  getSubsearchResultSet(
    previous_results: string[],
    terms: string[],
  ): Promise<string[]>;

  /**
   * Get result metadata.
   *
   * This method is called to get a `ResultMeta` for each identifier.
   *
   * @param results The result identifiers.
   * @returns A list of result metadata objects.
   */
  getResultMetas(results: string[]): Promise<ResultMeta[]>;

  /**
   * Launch the search result.
   * @param identifier The result identifier.
   */
  activateResult(identifier: string): void;

  /**
   * Filter the current search.
   *
   * This method is called to truncate the number of search results.
   *
   * @param results The original result.
   * @param maxResults The maximum amount of results.
   * @returns The filtered results.
   */
  filterResults(results: string[], maxResults: number): string[];
}

/**
 * An implementation of extension's search provider. Handles the search and
 * execution of the user actions.
 */
export default class ActionSearchProvider implements SearchProvider {
  /** @inheritdoc */
  appInfo: Gio.DesktopAppInfo;

  /**
   * Host extension instance.
   */
  extension: ShellExtension;

  /**
   * Creates a new search provider.
   * @param extension Instance of the current extension.
   */
  public constructor(extension: ShellExtension) {
    this.extension = extension;
    this.appInfo = this.extension.getApp().appInfo;
  }

  /** @inheritdoc */
  async getInitialResultSet(terms: string[]): Promise<string[]> {
    let results: string[] = [];

    if ("almost".includes(terms.join("").toLowerCase())) results.push("almost");

    return results;
  }

  /** @inheritdoc */
  async getSubsearchResultSet(
    previous_results: string[],
    terms: string[],
  ): Promise<string[]> {
    return this.getInitialResultSet(terms);
  }

  /** @inheritdoc */
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

  /** @inheritdoc */
  activateResult(identifier: string): void {
    this.extension.sayHello();
  }

  /** @inheritdoc */
  filterResults(results: string[], maxResults: number): string[] {
    return results.slice(0, maxResults);
  }
}
