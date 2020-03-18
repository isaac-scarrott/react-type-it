import { TypeItInterface, TypeItInputInterface } from './interfaces';
import React, { useEffect, useState, cloneElement } from 'react';

const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

function getTimePerCharacter(props: TypeItInputInterface, lengthOfCharactersCurrentlyRendered: number) {
  const duration = (props?.duration || 2000);

  return duration / ((props.children?.length || 0) + (props?.backspace || lengthOfCharactersCurrentlyRendered || 0));
}

export function useTypewriteLinesExtraction(props: TypeItInterface): React.ReactElement | null {
  const [elementToRender, setElementToRender] = React.useState<React.ReactElement | null>(null);

  async function typeIt() {
    const children = Array.isArray(props.children) ? props.children : [props.children];

    let charactersCurrentlyRendered = '';

    // Loop through each of the elements inside <TypeIt> component
    for (const element of children) {
      await delay(element.props.delay || 0);

      const timePerText = getTimePerCharacter(element.props, charactersCurrentlyRendered.length);

      // Execute backspaces
      for (const _ of Array.from(Array(element.props?.backspace || charactersCurrentlyRendered.length))) {
        charactersCurrentlyRendered = charactersCurrentlyRendered.slice(0, -1);

        setElementToRender(
          cloneElement(element, {style: {...props?.style}}, charactersCurrentlyRendered)
        );

        await delay(timePerText);
      }

      // Execute typing of characters
      for (const character of element.props.children) {
        charactersCurrentlyRendered += character;

        setElementToRender(
          cloneElement(element, {style: {...props?.style}}, charactersCurrentlyRendered)
        );

        await delay(timePerText);
      }
    }
  }

  async function typewriterMediator() {
    try {
      do {
        await typeIt();
      } while (props?.loop);
    } catch (e) {
      console.log(`Error in React-Type-It: ${e}`);
      setElementToRender(null);
    }
  }

  useEffect(() => {
    typewriterMediator();
  }, []);

  return elementToRender;
}
