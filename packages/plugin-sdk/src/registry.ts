import React from "react";
import { create } from "zustand";

export interface PluginDefinition {
  id: string;
  name: string;
  version: string;
  routes?: PluginRoute[];
  menus?: PluginMenu[];
  widgets?: PluginWidget[];
  initialize?: () => Promise<void> | void;
}

export interface PluginRoute {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}

export interface PluginMenu {
  id: string;
  label: string;
  path: string;
  icon?: string;
  order?: number;
}

export interface PluginWidget {
  id: string;
  name: string;
  component: React.ComponentType<any>;
}

interface PluginStore {
  plugins: Map<string, PluginDefinition>;
  registerPlugin: (plugin: PluginDefinition) => void;
  getPlugins: () => PluginDefinition[];
}

export const usePluginStore = create<PluginStore>((set, get) => ({
  plugins: new Map(),
  registerPlugin: (plugin) => {
    set((state) => {
      const newPlugins = new Map(state.plugins);
      newPlugins.set(plugin.id, plugin);
      return { plugins: newPlugins };
    });
    // Fire initialize asynchronously
    if (plugin.initialize) {
      Promise.resolve(plugin.initialize()).catch((err) => {
        console.error(`Failed to initialize plugin ${plugin.id}:`, err);
      });
    }
  },
  getPlugins: () => Array.from(get().plugins.values()),
}));

export const PluginRegistry = {
  register: (plugin: PluginDefinition) => {
    usePluginStore.getState().registerPlugin(plugin);
  },
  getPlugins: () => usePluginStore.getState().getPlugins(),
};
