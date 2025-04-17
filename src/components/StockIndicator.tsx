import React from 'react';

// Define the props interface for type safety
interface LowStockIndicatorProps {
    currentStock: number;
    maxStock: number; // Used to calculate the progress bar width
}

const StockIndicator: React.FC<LowStockIndicatorProps> = ({
    currentStock,
    maxStock,
}) => {
    // Basic validation and percentage calculation
    const validMaxStock = Math.max(1, maxStock); // Avoid division by zero
    const validCurrentStock = Math.max(0, currentStock); // Ensure stock isn't negative
    const percentage = Math.min(100, (validCurrentStock / validMaxStock) * 100); // Cap at 100%

    if (validCurrentStock <= 0) {
        // Optionally return a different message or null if out of stock
        return <p style={{ color: 'red', fontWeight: 'bold', fontSize: '0.9em' }}>Out of Stock!</p>;
    }


    return (
        <div style={{ width: '100%' }}>
            <p style={{
                color: '#555555',
                fontSize: '0.9em', // Use em for font size (relative)
                marginBottom: '0.4em', // Margin relative to font-size (approx 4px if 1em=~10px for 0.9em)
                lineHeight: '1.2' // Added for better spacing control
            }}>
                Only <strong style={{ color: '#333333' }}>{validCurrentStock}</strong> item(s) left in stock!
            </p>

            {/* Progress Bar Container (Grey background) */}
            <div style={{
                // Use 'em' for height and radius, relative to the component's font size
                // This makes the bar scale proportionally if the font size changes.
                height: '0.6em',          // Bar height relative to font size
                width: '100%',            // Full width of its container
                backgroundColor: '#e0e0e0',
                borderRadius: '0.3em',    // Rounded corners relative to font size
                overflow: 'hidden',
            }}>
                {/* Progress Bar Fill (Red part) */}
                <div style={{
                    height: '100%',           // Fill height of its container
                    width: `${percentage}%`,  // Dynamic width based on stock percentage
                    backgroundColor: '#ff4d4f',
                    borderRadius: '0.3em',    // Match container radius, relative to font size
                    transition: 'width 0.3s ease-in-out',
                }}></div>
            </div>
        </div>
    );
};

export default StockIndicator;