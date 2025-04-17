import React from 'react'
import classNames from 'classnames'

type Variant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant
}

const baseStyles =
    'inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

const variantStyles: Record<Variant, string> = {
    primary: 'bg-[#F2F2F2] over:bg-gray-200',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline:
        'border border-gray-300 text-gray-900 hover:bg-gray-100 ',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    ghost:
        'bg-transparent text-gray-700 hover:bg-gray-100  shadow-none',
}
    
const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    ...props
}) => {
    return (
        <button
            className={classNames(
                baseStyles,
                variantStyles[variant],
                'px-4 py-2 text-sm cursor-pointer',
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
