import styled, { createGlobalStyle } from 'styled-components'
import config from './Config'

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0px;
        margin: 0px;
        box-sizing: border-box;
        outline: none;
    }

    body {
        color: #333;
        font-family: 'Lato', 'Open Sans', sans-serif;
        font-size: 1.2em;
    }
`

export const Container = styled.div`
  width: ${config.containerWidth}px;
  height: ${config.containerHeight}px;
  margin: 0px auto;
`

export const Content = styled.div`
  padding: 10px;
`

export const CountdownContainer = styled.div`
    position: relative;
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;

    h1#countdown-number {
      position: absolute;
      color: ${config.pallete.primary};
      display: inline-block;
      line-height: 40px;
    }
`

export const CountdownSVG = styled.svg`
  position: relative;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  transform: rotateY(-180deg) rotateZ(-90deg);

  circle {
    stroke-dasharray: 565;
    stroke-linecap: round;
    fill: none;
    stroke: ${config.pallete.primary};
    transition: all 1s linear;
    &.circle-bg {
      stroke: ${config.pallete.primaryLight} !important;
    }
  }
`

export const CountdownChooseTime = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      padding: 0px;
      
      &.text {
        font-size: 24px;
        font-weight: bold;
        color: ${config.pallete.primary};
        padding: 0px 10px;
      }
    }
`

export const TabLimitContainer = styled.div`
  padding: 20px;
`
