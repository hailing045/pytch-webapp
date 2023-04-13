import { Action, action, thunk, Thunk } from "easy-peasy";
type EditorThemeKind = "light" | "dark";
export type IAccessibilitySidebar = {
  isVisible: boolean;
  setIsVisible: Action<IAccessibilitySidebar, boolean>;

  fontSize: string;
  setFontSize: Action<IAccessibilitySidebar, string>;

  editorThemeKind: EditorThemeKind;
  setEditorThemeKind: Action<IAccessibilitySidebar, EditorThemeKind>;
};

export const accessibilitySidebar: IAccessibilitySidebar = {
  isVisible: true,
  fontSize: "small",
  editorThemeKind: "light",
  setIsVisible: action((state, isVisible) => {
    state.isVisible = isVisible;
  }),
  setFontSize: action((state, fontSize) => {
    state.fontSize = fontSize;
  }),
  setEditorThemeKind: action((state, editorThemeKind) => {
    state.editorThemeKind = editorThemeKind;
  }),
};
