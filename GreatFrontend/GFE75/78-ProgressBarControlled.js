import { useState } from 'react';

/**
 * Controlled Animated Progress Bar with Accessibility
 * Logic:
 * - Uses a parent container as the "track" and a child div as the "fill".
 * - "width" of the fill is driven by the "value" prop.
 * - CSS "transition" property enables smooth animation when "value" changes.
 * 
 * Accessibility (A11y):
 * - role="progressbar": Identifies the element as a progress bar to screen readers.
 * - aria-valuemin/max: Defines the range of the progress bar.
 * - aria-valuenow: Communicates the current progress value to assistive technologies.
 */
const ProgressBar = ({ value }) => {
  // Clamp value between 0 and 100 to prevent layout breakage
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedValue}
      style={{
        height: 20,
        width: '100%',
        backgroundColor: '#eee',
        borderRadius: 10,
        overflow: 'hidden', // Ensures the fill doesn't bleed out of rounded corners
      }}
    >
      <div
        style={{
          width: `${clampedValue}%`,
          height: '100%',
          backgroundColor: '#007bff',
          // transition: animates width changes over 0.3s with ease-in-out timing
          transition: 'width 0.3s ease-in-out',
        }}
      />
    </div>
  );
};

export default function App() {
  const [val, setVal] = useState(10);

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h3>Controlled Progress Bar</h3>
      <ProgressBar value={val} />
      
      {/* Manual Controls */}
      <div style={{ marginTop: 10 }}>
        <button onClick={() => setVal(v => Math.max(0, v - 10))}>-10</button>
        <span style={{ margin: '0 10px' }}>{val}%</span>
        <button onClick={() => setVal(v => Math.min(100, v + 10))}>+10</button>
      </div>

      {/* Slider Control for continuous testing */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={val} 
        onChange={(e) => setVal(Number(e.target.value))} 
        style={{ width: '100%', marginTop: 10 }}
      />
    </div>
  );
}
