import { useState } from "react";
import styled from "styled-components";
import { Controls } from "./Controls";
import { Graph } from "./Graph";
import { DEFAULTS } from '../constants/defaults'
import { FUNCTIONS } from '../constants/functions'





export function Artboard () {
  const [params, setParams] = useState(DEFAULTS)

  const fields = {
    lineColor: {
      type: 'color',
      title: 'Line color',
      defaultValue: DEFAULTS.lineColor
    },
    rulersColor: {
      type: 'color',
      title: 'Rulers color',
      defaultValue: DEFAULTS.rulersColor
    },
    func: {
      type: 'select',
      title: 'Function',
      defaultValue: DEFAULTS.func,
      options: Object.values(FUNCTIONS)
    },
    interval: {
      type: 'number',
      title: 'Frequency (times)',
      defaultValue: DEFAULTS.interval
    },
    amplitude: {
      type: 'number',
      title: 'Amplitude (%)',
      defaultValue: DEFAULTS.amplitude,
      min: 1,
      max: 100
    },
    speed: {
      type: 'number',
      title: 'Speed (%)',
      defaultValue: DEFAULTS.speed,
      min: 1,
      max: 100
    },
    showRulers: {
      type: 'checkbox',
      title: 'Show rulers',
      defaultValue: DEFAULTS.showRulers
    },
    autoStop: {
      type: 'checkbox',
      title: 'Stop at the end',
      defaultValue: DEFAULTS.autoStop
    }
  }

  const handleChangeControls = (changes) => {
    setParams({
      ...params,
      ...changes
    })
  }

  return <StyledArtboard>
    <Controls fields={fields} onChange={handleChangeControls}/>
      <Graph {...params} />
  </StyledArtboard>
}

const StyledArtboard = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;

  & > * {
    margin-bottom: 1rem;
  }
`