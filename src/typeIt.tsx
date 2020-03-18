import React, {useState, useEffect} from 'react';

import {useTypewriteLinesExtraction} from './typeWriteExtraction';

import {TypeItInterface, TypeItInputInterface} from './interfaces'

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
    <>{ element && element} <span style={ getCursorSyle(displayCursor) }>｜</span></ >
  );
}

export function TypeItInput(props: TypeItInputInterface) {
  return <div style={{display: 'inline-block'}}>{props.children}</div>;
}

const getCursorSyle = (display = false) => {
  return {
    MsTransition: 'opacity 0.25s',
    WebkitTransition: 'opacity 0.25s',
    MozTransition: 'opacity 0.25s',
    transition: 'opacity 0.25s',
    opacity: display ? 1 : 0,
  };
};
