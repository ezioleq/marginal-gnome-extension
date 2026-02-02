import St from "gi://St";
import GObject from "gi://GObject";
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
  };

  getInitialResultSet(
    terms: string[],
    callback: (results: string[]) => void,
  ): void;

  getSubsearchResultSet(
    previous_results: string[],
    terms: string[],
    callback: (results: string[]) => void,
  ): void;

  getResultMetas(
    resultIds: string[],
    callback: (results: SearchResultMeta[]) => void,
  ): void;

  activateResult(identifier: string, terms: string[], timestamp: number): void;
  launchSearch(terms: string[], timestamp: number): void;
}

export default class CommandSearchProvider implements SearchProvider {
  appInfo?:
    | {
        get_name: () => "CommandSearchProvider";
        get_icon: () => null;
        get_id: () => "command-search-provider";
        should_show: () => true;
      }
    | undefined;

  getInitialResultSet(
    terms: string[],
    callback: (results: string[]) => void,
  ): void {
    throw new Error("Method not implemented.");
  }

  getSubsearchResultSet(
    previous_results: string[],
    terms: string[],
    callback: (results: string[]) => void,
  ): void {
    throw new Error("Method not implemented.");
  }

  getResultMetas(
    resultIds: string[],
    callback: (results: SearchResultMeta[]) => void,
  ): void {
    throw new Error("Method not implemented.");
  }

  activateResult(identifier: string, terms: string[], timestamp: number): void {
    throw new Error("Method not implemented.");
  }

  launchSearch(terms: string[], timestamp: number): void {
    throw new Error("Method not implemented.");
  }
}
