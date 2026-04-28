import { useState, useId, useRef, useEffect, InputHTMLAttributes } from "react";

/**
 * Type definition for a single checkbox item.
 * Supports nesting via the 'children' property.
 */
// type CheckboxItem = {
//   id: number;
//   name: string;
//   checked: boolean | "indeterminate";
//   children?: CheckboxItem[];
// };

/**
 * Represents the possible values for a checkbox's checked state.
 */
// type CheckboxValue = boolean | "indeterminate";

/**
 * Presentational component for a single checkbox input.
 * Handles the 'indeterminate' state manually since React doesn't support it via props.
 *
 * @param {Object} props - The component props.
 * @param {boolean|"indeterminate"} props.checked - The checked state.
 * @param {string} props.label - The text label.
 */
function CheckboxInput({ checked, label, ...props }) {
  const id = useId();
  const ref = (useRef < HTMLInputElement) | (null > null);

  // Synchronize the 'indeterminate' DOM property with the 'checked' prop.
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.indeterminate = checked === "indeterminate";
  }, [checked]);

  return (
    <div className="checkbox">
      <input
        id={id}
        ref={ref}
        type="checkbox"
        // Ensure the input's visual 'checked' state is correct.
        checked={checked === true || checked === false ? checked : false}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

/**
 * Recursive component that renders a list of checkboxes and their children.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.items - List of checkbox items.
 * @param {Function} props.onCheck - Callback for when a checkbox is toggled.
 */
function CheckboxList({ items, onCheck }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>
          <div>
            <CheckboxInput
              checked={item.checked}
              label={item.name}
              onChange={(event) => {
                // Pass the new state and the index of the clicked checkbox.
                onCheck(event.target.checked, [index]);
              }}
            />
          </div>
          {/* Recursively render children if they exist. */}
          {item.children && item.children.length > 0 && (
            <CheckboxList
              items={item.children}
              onCheck={(newValue, indices) => {
                // Accumulate indices to uniquely identify the nested checkbox.
                onCheck(newValue, [index, ...indices]);
              }}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * Recursively set descendants of the modified checkbox to the new value.
 * When a parent is checked/unchecked, all its children should follow.
 *
 * @param {Object} checkboxItem - The item to update.
 * @param {boolean} checked - The new checked state.
 */
function updateCheckboxAndDescendants(checkboxItem, checked) {
  checkboxItem.checked = checked;
  if (!checkboxItem.children) {
    return;
  }

  checkboxItem.children.forEach((childItem) =>
    updateCheckboxAndDescendants(childItem, checked),
  );
}

/**
 * Update checkbox states based on the modified checkbox's new state.
 * Only direct ancestors of the modified checkbox are affected.
 * It ensures parents show 'indeterminate' if children are mixed.
 *
 * @param {Object} checkboxItem - The parent item to evaluate.
 * @param {number[]} indices - Path of indices to the modified checkbox.
 */
function resolveCheckboxStates(checkboxItem, indices) {
  // Traverse down to the target node first (post-order traversal logic).
  if (indices.length > 0 && checkboxItem.children) {
    resolveCheckboxStates(checkboxItem.children[indices[0]], indices.slice(1));
  }

  // If no children, nothing to resolve for this specific item.
  if (!checkboxItem.children) {
    return;
  }

  // Determine new checkbox state based on children's current states.
  const checkedChildren = checkboxItem.children.reduce(
    (total, item) => total + Number(item.checked === true),
    0,
  );
  const uncheckedChildren = checkboxItem.children.reduce(
    (total, item) => total + Number(item.checked === false),
    0,
  );

  // If all children are checked, the parent is checked.
  if (checkedChildren === checkboxItem.children.length) {
    checkboxItem.checked = true;
  }
  // If all children are unchecked, the parent is unchecked.
  else if (uncheckedChildren === checkboxItem.children.length) {
    checkboxItem.checked = false;
  }
  // Otherwise, the parent is in an indeterminate state.
  else {
    checkboxItem.checked = "indeterminate";
  }
}

/**
 * The main container component for the nested checkbox feature.
 * Manages the top-level state and handles the complex update logic.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.defaultCheckboxData - Initial structure and state of checkboxes.
 */
export default function Checkboxes({ defaultCheckboxData }) {
  const [checkboxData, setCheckboxData] = useState(defaultCheckboxData);

  return (
    <CheckboxList
      items={checkboxData}
      onCheck={(checked, indices) => {
        // Create a deep clone to maintain immutability for the state update.
        const newCheckboxData = JSON.parse(JSON.stringify(checkboxData));

        // Find the specific checkbox item that was toggled using the indices path.
        const nonFirstLevelIndices = indices.slice(1);
        const modifiedCheckboxItem = nonFirstLevelIndices.reduce(
          (modifiedItem, index) => modifiedItem.children[index],
          newCheckboxData[indices[0]],
        );

        // 1. Update the clicked checkbox and all its children.
        updateCheckboxAndDescendants(modifiedCheckboxItem, checked);

        // 2. Resolve the states of all parents based on the new children states.
        resolveCheckboxStates(
          newCheckboxData[indices[0]],
          nonFirstLevelIndices,
        );

        // Update the React state to trigger a re-render.
        setCheckboxData(newCheckboxData);
      }}
    />
  );
}
