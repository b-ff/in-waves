import { useCallback, useEffect, useRef } from "react"
import styled from "styled-components"
import { FUNCTIONS } from '../constants/functions'

const adjustCanvasSize = (canvas) => {
  canvas.width = canvas.parentNode.clientWidth;
  canvas.height = canvas.parentNode.clientHeight;
}

const drawXAxis = (canvas, y, color) => {
  const context = canvas.getContext("2d")
  context.strokeStyle = color

  context.moveTo(0, y); // Where to start drawing
  context.lineTo(canvas.width, y); // Where to draw to
  context.stroke(); // Draw
}

const drawYAxis = (canvas, x, color) => {
  const context = canvas.getContext("2d")
  context.strokeStyle = color

  context.moveTo(x, 0); // Where to start drawing
  context.lineTo(x, canvas.height); // Where to draw to
  context.stroke(); // Draw
}

export function Graph({lineColor, rulersColor, func, interval, amplitude, speed, showRulers, autoStop}) {
  const rulersCanvasRef = useRef()
  const mainCanvasRef = useRef()

  const drawRulers = useCallback(() => {
    const {current: canvas} = rulersCanvasRef
    adjustCanvasSize(canvas)

    const {width, height} = canvas

    if (showRulers) {
      const color = rulersColor

      drawXAxis(canvas, height / 2, color)
      drawYAxis(canvas, width / 2, color)
    }
  }, [showRulers, rulersColor])

  const saveAsPng = () => {
    const {current: canvas} = mainCanvasRef
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const date = new Date()
    const dateTimeString = `${date.toLocaleTimeString()}--${date.toLocaleDateString()}`.replaceAll(/[.:]/g, '-')
    const paramsString = `${func}-f${interval}-a${amplitude}`.replaceAll(/[()]/g, '')

    const link = document.createElement('a');
    link.setAttribute('download', `Graph ${paramsString} ${dateTimeString}.png`);
    link.setAttribute('href', image);
    link.click();
  }

  const stop = () => clearInterval(window.intervalID)

  const play = useCallback(() => {
    const {current: canvas} = mainCanvasRef
    adjustCanvasSize(canvas)

    const {width, height} = canvas
    const context = canvas.getContext("2d")
    const Ybasis = Math.ceil(height / 2)

    const getYFromX = (x) => {
      const relativeAmp = Math.round(Ybasis * amplitude / 100)

      switch (func) {
        default:
        case FUNCTIONS.SIN:
          return Ybasis - relativeAmp * Math.sin(x * 2 * Math.PI * (interval/width))
        case FUNCTIONS.COS:
          return Ybasis - relativeAmp * Math.cos(x * 2 * Math.PI * (interval/width))
        case FUNCTIONS.TAN:
          return Ybasis - relativeAmp * Math.tan(x * 2 * Math.PI * (interval/width))
        case FUNCTIONS.CTG:
          return Ybasis - relativeAmp * 1 / Math.tan(x * 2 * Math.PI * (interval/width))
        case FUNCTIONS.ATAN:
          return Ybasis - relativeAmp * Math.atan(x * 2 * Math.PI * (interval/width))
        case FUNCTIONS.ACTG:
          return Ybasis - relativeAmp * 1 / Math.atan(x * 2 * Math.PI * (interval/width))
        case FUNCTIONS.SEC:
          return Ybasis - relativeAmp * 1 / Math.cos(x * 2 * Math.PI * (interval/width))
        case FUNCTIONS.COSEC:
          return Ybasis - relativeAmp * 1 / Math.sin(x * 2 * Math.PI * (interval/width))
      }
    }

    const drawGraph = (x) => {
      context.clearRect(0, 0, width, height)

      // draw sin curve point to point until x
      context.beginPath(); // Draw a new path
      context.strokeStyle = lineColor; // Pick a color
      for(let i=0; i < x; i++) { // Loop from left side to current x
        var y = getYFromX(i); // Calculate y value from x
        context.lineTo(i,y); // Where to draw to
      }
      context.stroke(); // Draw
    }

    let x = 0;
    // Start time interval
    window.intervalID = setInterval(function(){
      drawGraph(x); // Call draww function every cycle
      x++; // Increment x by 1
      if (x > width) {
        if (autoStop) {
          stop()
        } else {
          x = 0; // x cannot be more than canvas width, so back to 0
        }
      }
    }, Math.round(500 / speed)); // Loop every 10 milliseconds
  }, [lineColor, func, interval, amplitude, speed, autoStop])

  useEffect(() => {
    play()
    return stop
  }, [play, lineColor, func, interval, amplitude, speed, autoStop])

  useEffect(() => {
    showRulers && drawRulers()
  }, [drawRulers, showRulers, rulersColor])

  return <StyledGraphWrapper>
    {!!showRulers && <StyledCanvas ref={rulersCanvasRef}/>}
    <StyledCanvas ref={mainCanvasRef}/>
    <StyledCanvasControls>
      <StyledButton bgColor="LightSeaGreen" onClick={saveAsPng}>SAVE AS PNG</StyledButton>
      <StyledButton bgColor="red" onClick={stop}>STOP!</StyledButton>
    </StyledCanvasControls>
  </StyledGraphWrapper>
}

const StyledGraphWrapper = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  font-size: 0;
  border: 1px solid #444;
  box-sizing: border-box;
  background-color: #000;
`

const StyledCanvasControls = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.5rem 0;

  button {
    margin-right: 0.5rem;
  }
`

const StyledButton = styled.button`
  padding: 0.5rem;
  background-color: ${({bgColor}) => bgColor};
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 4px;
`

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`