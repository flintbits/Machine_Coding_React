import React, { useEffect, useReducer } from 'react'
import type { CheckboxType, CheckboxAction } from './checkbox.types'
// import useFetch from '../../Hooks/useFetch';
import { fetchCheckboxes } from './checkbox.config';
import Checkbox from './Checkbox';
import { toggleCheckbox } from './checkbox.utils';

const checkboxReducer = (state: CheckboxType[], action: CheckboxAction) => {

    switch (action.type) {
        case "SET_CHECKBOXES":
            return action.payload

        case "TOGGLE_CHECK":
            return toggleCheckbox(state, action.payload)

        default:
            return state;
    }

}


export default function NestedCheckboxes() {
    const [checkboxState, dispatch] = useReducer(checkboxReducer as React.Reducer<CheckboxType[], CheckboxAction>, [])

    useEffect(() => {
        fetchCheckboxes().then(data => dispatch({ type: "SET_CHECKBOXES", payload: data })).catch(console.error)
    }, [])

    return (
        <div style={styles.container}>
            <h1>Checkbox Component</h1>
            <Checkbox checkboxes={checkboxState} dispatch={dispatch} />
        </div>
    )
}


const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    }
}
