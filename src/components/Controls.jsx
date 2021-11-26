import styled from "styled-components"
import PropTypes from "prop-types"
import {CONTROL_TYPES} from '../constants/control-types'

Controls.propTypes = {
  fields: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string,
      type: PropTypes.oneOf(Object.values(CONTROL_TYPES)),
      defaultValue: PropTypes.any,
      required: PropTypes.bool,
      options: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired
}

export function Controls ({fields, onChange}) {
  const onLocalChange = (event) => {
    const { name, value, checked } = event.target
    let processedValue = value;

    if (fields[name].type === CONTROL_TYPES.NUMBER) {
      const numeric = parseFloat(value)

      processedValue = isNaN(numeric) ? 0 : numeric;
    }

    if (fields[name].type === CONTROL_TYPES.CHECKBOX) {
      processedValue = checked;
    }

    onChange({[name]: processedValue})
  }

  return <StyledControlsBar>
    {Object.entries(fields).map(([key, {title, type, defaultValue, options, ...props}]) => (
      <StyledControlsBarItem key={key}>
        <StyledControlsBarItemTitle htmlFor={key}>{title}</StyledControlsBarItemTitle>
        {type === CONTROL_TYPES.SELECT ? (
          <select
            {...props}
            id={key}
            name={key}
            defaultValue={defaultValue}
            onChange={onLocalChange}
          >{
            Array.isArray(options)
              ? options.map((opt) => <option key={opt} value={opt}>{opt}</option>)
              : Object.entries(options).map(([value, text]) => <option key={value} value={value}>{text}</option>)
          }</select>
        ) : (
          <input
            {...props}
            id={key}
            name={key}
            type={type || CONTROL_TYPES.TEXT}
            defaultValue={defaultValue}
            defaultChecked={type === CONTROL_TYPES.CHECKBOX && defaultValue}
            onChange={onLocalChange}
          />
        )}
      </StyledControlsBarItem>
    ))}
  </StyledControlsBar>
}

const StyledControlsBar = styled.section`
  display: flex;
  flex-direction: row;
`

const StyledControlsBarItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`

const StyledControlsBarItemTitle = styled.label`
  font-size: 1rem;
  padding: 0.5em 0;
`