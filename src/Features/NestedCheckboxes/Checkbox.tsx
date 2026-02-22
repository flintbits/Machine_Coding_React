import type { CheckboxAction, CheckboxType } from "./checkbox.types"

type CheckboxProps = {
    checkboxes: CheckboxType[]
    dispatch: React.Dispatch<CheckboxAction>
}

export default function Checkbox({ checkboxes, dispatch }: CheckboxProps) {

    const handleToggleClick = (id: number): void => {
        dispatch({ type: "TOGGLE_CHECK", payload: id })
    }

    return (
        <div style={{ paddingLeft: 10 }}>
            {checkboxes.map((checkbox) => {
                const checked = checkbox.checked
                return <div key={checkbox.id} style={{ margin: 6 }}>
                    <input type="checkbox" checked={checked} onChange={() => handleToggleClick(checkbox.id)} /> <span>{checkbox.title}</span>
                    {checkbox.children && <Checkbox checkboxes={checkbox.children} dispatch={dispatch} />}
                </div>
            })}
        </div >
    )
}
