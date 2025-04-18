import { Check } from "lucide-react";
import { ChangeEvent, ReactNode } from "react";

interface CheckboxProps {
    id: string;
    children?: ReactNode;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export default function Checkbox({
    id,
    children,
    checked,
    onChange,
    className = "",
}: CheckboxProps) {
    return (
        <label
            htmlFor={id}
            className={`flex items-center space-x-2 cursor-pointer ${className}`}
        >
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="peer hidden"
            />
            <div className="w-5 h-5 border-4 border-gray-900 flex items-center justify-center transition">
                {checked && <Check />}
                <svg
                    className="w-3 h-3 text-white hidden peer-checked:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <span className="text-sm text-[#8A8A8A]">{children}</span>
        </label>
    );
}
