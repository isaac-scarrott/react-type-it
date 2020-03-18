# React-Type-It

> Simulate typing in a react component. Supports delay backspace and timing. Minimal dependency

## Install

```bash
npm i @isaac.scarrott/react-type-it
```

## Usage

```
import TypeIt, {TypeItInput} from '@isaac.scarrott/react-type-it';
```
```
<TypeIt loop>
  <TypeItInput>Hi, this is a react type it demo</TypeItInput>
  <TypeItInput backspace={28} delay={2000}>I hope you like this packgae</TypeItInput>
  <TypeItInput backspace={3}>age</TypeItInput>
  <TypeItInput backspace={23} delay={28}>this is also my first NPM package</TypeItInput>
</TypeIt>
```

![alt text](https://media.giphy.com/media/ZFv8Jc8cBsOpAZWGVj/giphy.gif "Logo Title Text 1")

#### Props

| Component   | Name     | Type    | Default | Description                                                        |
| ----------- |:--------:| -------:| -------:|-------------------------------------------------------------------:|
| TypeIt      | loop     | boolean | false   |Describes if the type animation loops                               |
| TypeIt      | style    | object  | {}      |Styles to be put on the text                                        |
| TypeItInput | duration | number  | 2000    |Length of the animation (without delay) in ms                       |
| TypeItInput | delay    | number  | 0       |Delay that the animation after which the animation will start       |
| TypeItInput | backspace| number  | 0       |Number of characters that the component will backspace before typing|
