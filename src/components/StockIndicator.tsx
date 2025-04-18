import React from 'react';

interface LowStockIndicatorProps {
    currentStock: number;
    maxStock: number;
}

const StockIndicator: React.FC<LowStockIndicatorProps> = ({
    currentStock,
    maxStock,
}) => {
    const validMaxStock = Math.max(1, maxStock);
    const validCurrentStock = Math.max(0, currentStock);
    const percentage = Math.min(100, (validCurrentStock / validMaxStock) * 100);

    if (validCurrentStock <= 0) {
        return <p style={{ color: 'red', fontWeight: 'bold', fontSize: '0.9em' }}>Out of Stock!</p>;
    }


    return (
        <div style={{ width: '100%' }}>
            <p style={{
                color: '#555555',
                fontSize: '0.9em', 
                marginBottom: '0.4em',
                lineHeight: '1.2' 
            }}>
                Only <strong style={{ color: '#333333' }}>{validCurrentStock}</strong> item(s) left in stock!
            </p>

            <div style={{
                height: '0.6em',          
                width: '100%',            
                backgroundColor: '#e0e0e0',
                borderRadius: '0.3em', 
                overflow: 'hidden',
            }}>
                <div style={{
                    height: '100%', 
                    width: `${percentage}%`,
                    backgroundColor: '#ff4d4f',
                    borderRadius: '0.3em',  
                    transition: 'width 0.3s ease-in-out',
                }}></div>
            </div>
        </div>
    );
};

export default StockIndicator;