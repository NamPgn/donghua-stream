'use client'
import { createContext, useContext, ReactNode } from 'react';
import { useSeries } from '@/hooks/useSeries';

interface SeriesContextType {
    data: any;
    isLoading: boolean;
    error: any;
}

const SeriesContext = createContext<SeriesContextType | undefined>(undefined);

export function SeriesProvider({ children }: { children: ReactNode }) {
    const { data, isLoading, error } = useSeries();

    return (
        <SeriesContext.Provider value={{ data, isLoading, error }}>
            {children}
        </SeriesContext.Provider>
    );
}

export function useSeriesContext() {
    const context = useContext(SeriesContext);
    if (context === undefined) {
        throw new Error('useSeriesContext must be used within a SeriesProvider');
    }
    return context;
} 