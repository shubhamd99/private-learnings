import { useState } from 'react';

/**
 * Stepped Progress Bar
 * Logic:
 * - steps.map iterates to create each "node" (circle + connector).
 * - "current" index determines which steps and connectors are highlighted.
 * - Connector is only rendered for (n-1) steps.
 * - Circle and line colors are conditional: (i <= current) for circles, (i < current) for lines.
 * 
 * Accessibility (A11y):
 * - role="group": Semantic grouping of related steps.
 * - aria-label: Provides context that this is a stepper.
 * - aria-current="step": Precisely identifies the current active step to AT.
 * - aria-hidden="true": Applied to decorative elements (numbers/lines) to keep AT focused on the semantic state.
 */
const Stepper = ({ steps, current }) => {
  return (
    <div 
      role="group" 
      aria-label="Progress Stepper"
      style={{ display: 'flex', alignItems: 'center', width: '100%' }}
    >
      {steps.map((_, i) => (
        <div 
          key={i} 
          // aria-current tells assistive tech which step we are currently on
          aria-current={i === current ? 'step' : undefined}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            // The last item shouldn't grow because it has no connector
            flex: i === steps.length - 1 ? 0 : 1 
          }}
        >
          {/* Step Circle */}
          <div 
            aria-hidden="true" // Decorative number
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              backgroundColor: i <= current ? '#007bff' : '#ccc',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              zIndex: 1
            }}
          >
            {i + 1}
          </div>

          {/* Connector Line - Rendered for all except the last step */}
          {i < steps.length - 1 && (
            <div 
              aria-hidden="true" // Decorative line
              style={{
                flex: 1,
                height: 4,
                backgroundColor: i < current ? '#007bff' : '#ccc',
                margin: '0 -1px' // Slight overlap prevents sub-pixel gaps
              }} 
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [curr, setCurr] = useState(0);
  const steps = [1, 2, 3, 4]; // Can be objects with labels { label: 'Step 1' }

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h3>Stepped Progress Bar</h3>
      <Stepper steps={steps} current={curr} />
      
      <div style={{ marginTop: 30 }}>
        {/* State controls: update index based on user action */}
        <button 
          disabled={curr === 0} 
          onClick={() => setCurr(c => c - 1)}
        >
          Prev
        </button>
        <button 
          disabled={curr === steps.length - 1} 
          onClick={() => setCurr(c => c + 1)}
          style={{ marginLeft: 10 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
