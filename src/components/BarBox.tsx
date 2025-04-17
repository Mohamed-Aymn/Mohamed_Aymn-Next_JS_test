type BarBoxProps = {
    count: number
}

export function BarBox({ count }: BarBoxProps) {
    return (
        <div className="p-4 bg-gray-100 rounded-md flex items-center justify-center">
            <div className="flex gap-[4px]">
                {Array.from({ length: count }).map((_, i) => (
                    <span key={i} className="w-[3px] h-5 bg-black rounded-sm" />
                ))}
            </div>
        </div>
    )
}
