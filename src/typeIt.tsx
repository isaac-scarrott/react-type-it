import React, { useState, useEffect } from "react";

import { useTypewriteLinesExtraction } from "./typeWriteExtraction";

import { TypeItInterface, TypeItInputInterface } from "./interfaces";

export function TypeIt(props: TypeItInterface) {
  const element = useTypewriteLinesExtraction(props);
  const [displayCursor, setDisplayCursor] = useState(false);

  useEffect(() => {
    const intervalToken = setInterval(() => {
      setDisplayCursor((oldDisplayCursor) => !oldDisplayCursor);
    }, 500);

    return () => clearInterval(intervalToken);
  }, []);

  return (
    <div style={{ display: "inline-flex" }} className={props?.className || ''}>
      {element && element}
      <div style={getCursorSyle(displayCursor, props?.style)}></div>
    </div>
  );
}

export function TypeItInput(props: TypeItInputInterface) {
  return <div style={{ ...props?.style }}>{props.children}</div>;
}

const getCursorSyle = (display = false, propsStyle: React.CSSProperties = {}) => {
  return {
    width: "3px",
    backgroundColor: propsStyle?.color || "black",
    MsTransition: "opacity 0.25s",
    WebkitTransition: "opacity 0.25s",
    MozTransition: "opacity 0.25s",
    transition: "opacity 0.25s",
    opacity: display ? 1 : 0,
    flex: 1,
    ...propsStyle
  };
};
