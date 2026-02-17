# Marginal

⛶ Simple action-based window management for Gnome Shell

## About

Use actions from the overview search menu to resize and move windows.

> [!WARNING]
> The project is under heavy development and expect things to break.

### Features

Some of the example actions you can perform via the overview search:

- [x] Almost maximize window
- [ ] Maximize window
- [ ] Move window to left
- [ ] Move window to right

## Installation

To be announced 😳

## Development

### Building

```sh
make pack
```

This will create a `marginal.zip` extension package in the project's root.
The archive can be directly installed via `gnome-extensions install` command.

### Notes

- Nested session can be run with `SHELL_DEBUG=all dbus-run-session gnome-shell --devkit --wayland`
- For now, icons to use can be found in `/usr/share/icons/Adwaita/symbolic`
- App infos can be looked up from `/usr/share/applications/`
