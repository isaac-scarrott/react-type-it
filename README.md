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
<TypeIt
  loop
  className='typeItDemo'
  style={{ color: "SteelBlue", fontSize: "40px" }}
>
  <TypeItInput>
    Hi, this is a react type it demo
  </TypeItInput>
  <TypeItInput backspace={28} delay={2000}>
    I hope you like this packgae
  </TypeItInput>
  <TypeItInput backspace={3} delay={300} duration={300}>
    age
  </TypeItInput>
  <TypeItInput backspace={28} delay={2000}>
    this is also my first NPM package
  </TypeItInput>
  <TypeItInput delay={2000}></TypeItInput>
</TypeIt>
```

![alt text](https://media.giphy.com/media/ZZZfbXohNrUxAxZp8g/giphy.gif "Logo Title Text 1")

#### Props

| Component   | Name     | Type    | Default | Description                                                        |
| ----------- |:--------:| -------:| -------:|-------------------------------------------------------------------:|
| TypeIt      | loop     | boolean | false   |Describes if the type animation loops                               |
| TypeIt      | style    | object  | {}      |Styles to be put on the text                                        |
| TypeItInput | duration | number  | 2000    |Length of the animation (without delay) in ms                       |
| TypeItInput | delay    | number  | 0       |Delay that the animation after which the animation will start       |
| TypeItInput | backspace| number  | 0       |Number of characters that the component will backspace before typing|
