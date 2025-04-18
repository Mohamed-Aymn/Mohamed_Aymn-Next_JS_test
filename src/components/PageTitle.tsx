import { ChevronRight } from 'lucide-react'
import React from 'react'

function PageTitle({title, description}: {title: string; description: string}) {
    return (
        <div className="mx-auto w-fit flex flex-col justify-center items-center mb-6">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-3">{title}</h1>
            <div className="flex gap-2 items-center">
                <span>Home</span> <ChevronRight /> <span>{description}</span>
            </div>
        </div>
    )
}

export default PageTitle