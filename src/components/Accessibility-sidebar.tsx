import React, { FC, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useStoreState, useStoreActions } from "../store";
import { Action, action, thunk, Thunk } from "easy-peasy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold } from "@fortawesome/free-solid-svg-icons";

// type AccessSidebarLinkProps = {
//   item: AccessbilitySidebarItem;
// };

// export interface AccessbilitySidebarItem {
//   title: string;
//   path: string;
//   subnav?: AccessbilitySidebarItem[];
// }

export const AccessibilitySidebar: FC = () => {
  const isVisible = useStoreState(
    (state) => state.ideLayout.accessibilitySidebar.isVisible
  );
  const fontSize = useStoreState(
    (state) => state.ideLayout.accessibilitySidebar.fontSize
  );

  const editorThemeKind = useStoreState(
    (state) => state.ideLayout.accessibilitySidebar.editorThemeKind
  );
  const visibilityClass = isVisible ? "shown" : "hidden";
  const setIsVisible = useStoreActions(
    (actions) => actions.ideLayout.accessibilitySidebar.setIsVisible
  );

  const fontSizeClass = fontSize ? "small" : "medium";
  // let setFontsize = 16;
  // if (fontSize == "small") {
  //   setFontSize = 16;
  // }
  // else if(fontSize == "small"){

  // }
  const setFontSize = useStoreActions(
    (actions) => actions.ideLayout.accessibilitySidebar.setFontSize
  );

  const setEditorThemeKind = useStoreActions(
    (actions) => actions.ideLayout.accessibilitySidebar.setEditorThemeKind
  );
  return (
    <div className={`accessibilitySidebar ${visibilityClass} ${fontSizeClass}`}>
      <Button
        variant="outline-secondary"
        onClick={() => setIsVisible(false)}
        style={{
          backgroundColor: "#32E8C7",
          border: "none",
          borderRadius: 90,
        }}
      >
        <p>
          <FontAwesomeIcon className="fa-lg" icon={["far", "times-circle"]} />
        </p>
      </Button>
      <p style={{ marginTop: "1rem", fontSize: 36 }}>Accessibility Sidebar</p>
      <p style={{ fontSize: 16, fontStyle: "italic" }}>
        Choose your need before you work
      </p>
      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
      <p style={{ fontSize: 20 }}>Font Size choices:</p>
      <p>
        <Button
          style={{
            backgroundColor: "white",
            fontSize: 16,
            borderColor: "grey",
            borderRadius: 80,
          }}
          variant="contained-secondary"
          onClick={() => setFontSize("small")}
        >
          Small
        </Button>
      </p>
      <p>
        <Button
          style={{
            backgroundColor: "white",
            fontSize: 20,
            borderColor: "grey",
            borderRadius: 20,
          }}
          variant="contained-secondary"
          onClick={() => setFontSize("medium")}
        >
          Medium
        </Button>
      </p>
      <p>
        <Button
          style={{
            backgroundColor: "white",
            fontSize: 24,
            borderColor: "grey",
            borderRadius: 20,
          }}
          variant="contained-secondary"
          onClick={() => setFontSize("large")}
        >
          Large
        </Button>
      </p>
      &nbsp;&nbsp;&nbsp;
      <p style={{ fontSize: 20 }}>Editor theme:</p>
      <p>
        <Button
          style={{
            backgroundColor: "#DDDDFC",
            fontSize: 20,
            borderColor: "black",
            borderRadius: 20,
          }}
          variant="contained-secondary"
          onClick={() => setEditorThemeKind("light")}
        >
          Light
        </Button>
      </p>
      <Button
        style={{
          backgroundColor: "yellow",
          fontSize: 20,
          borderColor: "black",
          borderRadius: 20,
        }}
        variant="contained-secondary"
        onClick={() => setEditorThemeKind("dark")}
      >
        Dark
      </Button>
    </div>
  );

  // return (
  //   <div className={`accessibilitySidebar ${visibilityClass},${fontSizeClass}`}>
  //     <Button variant="outline-secondary" onClick={() => setIsVisible(false)}>
  //       close
  //     </Button>

  //     <Button variant="outline-secondary" onClick={() => setFontSize("large")}>
  //       font size large
  //     </Button>
  //

  //     <Button variant="outline-secondary" onClick={() => setFontSize("small")}>
  //       font size small
  //     </Button>
  //   </div>
  // );
};

export default AccessibilitySidebar;

export const AccessibilitySidebarOpenControl = () => {
  const isVisible = useStoreState(
    (state) => state.ideLayout.helpSidebar.isVisible
  );
  const { toggleVisibility } = useStoreActions(
    (actions) => actions.ideLayout.helpSidebar
  );

  return isVisible ? null : (
    <div className="control" onClick={() => toggleVisibility()}>
      <p>{<FontAwesomeIcon icon="question-circle" />}</p>
    </div>
  );
};
