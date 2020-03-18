import { TypeItInterface, TypeItInputInterface } from './typeIt';
import React, { useEffect, useState, cloneElement } from 'react';

const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

function getTimePerCharacter(props: TypeItInputInterface, lengthOfCharactersCurrentlyRendered: number) {
  const duration = (props?.duration || 2000);

  return duration / ((props.children?.length || 0) + (props?.backspace || lengthOfCharactersCurrentlyRendered || 0));
}

export function useTypewriteLinesExtraction(props: TypeItInterface): React.ReactElement | null {
const [elementToRender, setElementToRender] = React.useState<React.ReactElement | null>(null);

  async function typeIt() {
    const children = Array.isArray(props.children) ? props.children : [props.children];

    let charactersCurrentlyRendered = '';

    for (const element of children) {
      await delay(element.props.delay || 0);

      const timePerText = getTimePerCharacter(element.props, charactersCurrentlyRendered.length);

      for (const _ of Array.from(Array(element.props?.backspace || charactersCurrentlyRendered.length))) {
        charactersCurrentlyRendered = charactersCurrentlyRendered.slice(0, -1);

        setElementToRender(
          cloneElement(element, {}, charactersCurrentlyRendered)
        );

        await delay(timePerText);
      }


      for (const character of element.props.children) {
        charactersCurrentlyRendered += character;

        setElementToRender(
          cloneElement(element, element.props, charactersCurrentlyRendered)
        );

        await delay(timePerText);
      }
    }
  }

  async function typewriterMediator() {
    do {
      await typeIt();
    } while (props?.loop);
  }

  useEffect(() => {
    typewriterMediator();
  }, []);

  return elementToRender;
}
