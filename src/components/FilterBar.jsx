import { useState } from 'react'

export const FilterBar = ({category, selectedCategory, setSelectedCategory, setSortPrice}) => {
    const [activeSort, setActiveSort] = useState('')

    const handleSort = (value) => {
        setActiveSort(value)
        setSortPrice(value)
    }

    const sortOptions = [
        { value: 'asc', label: 'Price ↑' },
        { value: 'desc', label: 'Price ↓' }
    ]

    return (
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2">
                {['All', ...category].map((btn, index) => {
                    const isSelected = selectedCategory === btn
                    return (
                        <button
                            key={index}
                            onClick={() => setSelectedCategory(btn)}
                            style={{
                                backgroundColor: isSelected ? 'var(--accent)' : 'transparent',
                                color: isSelected ? 'var(--bg)' : 'var(--muted)',
                                border: '1px solid color-mix(in srgb, var(--accent) 40%, transparent)',
                                fontFamily: 'inherit'
                            }}
                            className="px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase transition-all duration-200 hover:opacity-80 cursor-pointer"
                        >
                            {btn}
                        </button>
                    )
                })}
            </div>

            {/* Divider */}
            <div style={{ 
                width: '1px', 
                height: '24px', 
                backgroundColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' 
            }} className="hidden md:block" />

            {/* Sort Buttons */}
            <div className="flex gap-2">
                {sortOptions.map(({ value, label }) => {
                    const isActive = activeSort === value
                    return (
                        <button
                            key={value}
                            onClick={() => handleSort(value)}
                            style={{
                                backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                                color: isActive ? 'var(--bg)' : 'var(--muted)',
                                border: '1px solid color-mix(in srgb, var(--primary) 40%, transparent)',
                                fontFamily: 'inherit'
                            }}
                            className="px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase transition-all duration-200 hover:opacity-80 cursor-pointer"
                        >
                            {label}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}