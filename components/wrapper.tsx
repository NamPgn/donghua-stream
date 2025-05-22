'use client'

import { ReactNode } from "react"



export function Wrapper({ children }: { children: ReactNode }) {
    return (
        <main className="container py-6 px-2 md:px-0 mx-auto">
            {children}
        </main>
    )
}
