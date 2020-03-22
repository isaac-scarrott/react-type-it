import { TypeItInterface, TypeItInputInterface } from "./interfaces";
import React, { useEffect, useState, cloneElement, useRef } from "react";
import { TypeItInput } from "./typeIt";

const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

function getTimePerCharacter(
  props: TypeItInputInterface,
  lengthOfCharactersCurrentlyRendered: number
) {
  const duration = props?.duration || 2000;

  return (
    duration /((props.children?.length || 0) +(props?.backspace || lengthOfCharactersCurrentlyRendered || 0))
  );
}

export function useTypewriteLinesExtraction(
  props: TypeItInterface
): React.ReactElement {
  const [elementRendered, setElementRendered] = useState<React.ReactElement>(
    React.createElement(TypeItInput)
  );

  const componentMounted = useRef(false);

  async function executeBackspacesAndReturnCharsCurrentlyRendered(
    charactersCurrentlyRendered: string,
    timePerText: number
  ): Promise<string> {
    const charactersToBeRendered = charactersCurrentlyRendered.slice(0, -1);

    setElementRendered(
      cloneElement(
        elementRendered,
        { style: { ...props?.style } },
        charactersToBeRendered
      )
    );

    await delay(timePerText);

    return charactersToBeRendered;
  }

  async function typeIt() {
    const children = Array.isArray(props.children)
      ? props.children
      : [props.children];

    let charactersCurrentlyRendered = "";

    // Loop through each of the elements inside <TypeIt> component
    for (const element of children) {
      if (
        element.props?.children &&
        typeof element.props?.children !== "string"
      ) {
        throw new Error(
          "Can only have strings as children inside <TypeItInput>"
        );
      }

      await delay(element.props.delay || 0);

      const timePerText = getTimePerCharacter(
        element.props,
        charactersCurrentlyRendered?.length || 0
      );

      for (const _ of Array.from(Array(element.props?.backspace || charactersCurrentlyRendered?.length || 0))) {
        if (!componentMounted.current) {
          return;
        }

        charactersCurrentlyRendered = await executeBackspacesAndReturnCharsCurrentlyRendered(
          charactersCurrentlyRendered,
          timePerText
        );
      }

      // Execute typing of characters
      for (const character of element.props?.children || []) {
        charactersCurrentlyRendered += character;

        if (!componentMounted.current) {
          return;
        }

        setElementRendered(
          cloneElement(
            elementRendered,
            { style: { ...props?.style } },
            charactersCurrentlyRendered
          )
        );

        await delay(timePerText);
      }
    }
  }

  async function typewriterMediator() {
    try {
      do {
        await typeIt();
      } while (props?.loop && componentMounted.current);
    } catch (e) {
      console.log(`Error in React-Type-It: ${e}`);
      setElementRendered(React.createElement(React.Fragment));
    }
  }

  useEffect(() => {
    componentMounted.current = true;
    typewriterMediator();

    return function() {
      componentMounted.current = false;
    };
  }, []);

  return elementRendered;
}
