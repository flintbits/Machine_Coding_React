import type { CheckboxType } from "./checkbox.types";

export function toggleCheckbox(state: CheckboxType[], id: number): CheckboxType[] {

    const findAndToggleNode = (nodes: CheckboxType[]): CheckboxType[] => {
        return nodes.map((node: CheckboxType) => {

            if (node.id === id) {
                const newChecked = !node.checked
                return { ...node, checked: newChecked, children: node.children ? toggleAllChildren(node.children, newChecked) : undefined }
            }

            if (node.children) {
                return { ...node, children: findAndToggleNode(node.children) }
            }

            return node
        })
    }

    return findAndToggleNode(state)
}


const toggleAllChildren = (childNodes: CheckboxType[], checked: boolean): CheckboxType[] => {
    return childNodes.map((node) => ({
        ...node,
        checked: checked,
        children: node.children ? toggleAllChildren(node.children, checked) : undefined
    }))
}


//we could optimize by only cloning the modified path for better React performance.

/*
export function toggleCheckbox(state: CheckboxType[], id: number): CheckboxType[] {
  const toggleAll = (nodes: CheckboxType[], checked: boolean): CheckboxType[] =>
    nodes.map((n) => ({
      ...n,
      checked,
      children: n.children ? toggleAll(n.children, checked) : undefined,
    }))

  const visit = (nodes: CheckboxType[]): [CheckboxType[], boolean] => {
    let changed = false

    const next = nodes.map((node) => {
      if (node.id === id) {
        changed = true
        const newChecked = !node.checked

        return {
          ...node,
          checked: newChecked,
          children: node.children ? toggleAll(node.children, newChecked) : undefined,
        }
      }

      if (node.children) {
        const [newChildren, childChanged] = visit(node.children)
        if (childChanged) {
          changed = true
          return { ...node, children: newChildren }
        }
      }

      return node
    })

    return [changed ? next : nodes, changed]
  }

  return visit(state)[0]
}
*/