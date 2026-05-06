import { useState, useEffect } from 'react'
import { getProducts } from '../shopify'
import { SearchBar } from './SearchBar'
import { ProductCard } from './ProductCard'
import { FilterBar } from './FilterBar'
import { SkeletonCard } from './SkeletonCard'
import Navbar from './NavBar'

export function StorePage() {
    const [productData, setProductData] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState([''])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sortPrice, setSortPrice] = useState('');
    const [error, setError] = useState(null)

    useEffect(() => {
        getProducts()
        .then(({products, categories}) => {
            setProductData(products)
            setCategory(categories)
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
            setError('Failed to load products. Please try again.')
        })
    }, [])

    const filteredProducts = productData
        .filter(product => 
            product.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter(product => 
            selectedCategory === "All" ? true : product.productType === selectedCategory
        )
        .sort((a, b) => {
            if (sortPrice === "asc") {
                return parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount)
            }
            if (sortPrice === "desc") {
                return parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount)
            }
            return 0
        })

    if (loading) return (
        <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
            <Navbar />
            <div className="px-6 md:px-16 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            </div>
        </div>
    )

    if (error) return (
        <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6">
                <div style={{ 
                    border: '1px solid var(--accent)',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text)'
                }} className="rounded-2xl p-10 text-center max-w-md w-full shadow-xl">
                    <p style={{ fontSize: '2.5rem' }} className="mb-4">⚠️</p>
                    <p style={{ color: 'var(--text)' }} className="text-lg font-semibold mb-2">Something went wrong</p>
                    <p style={{ color: 'var(--muted)' }} className="text-sm mb-6">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        style={{ 
                            backgroundColor: 'var(--accent)', 
                            color: 'var(--bg)',
                            fontFamily: 'inherit'
                        }}
                        className="px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-80"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    )

    return (
        <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
            <Navbar />

            {/* Hero Header */}
            <div style={{ borderBottom: '1px solid var(--accent)' }} className="px-6 md:px-16 py-16 text-center">
                <p style={{ color: 'var(--accent)', letterSpacing: '0.4em' }} className="text-xs uppercase mb-3 font-medium">
                    New Collection
                </p>
                <h1 style={{ color: 'var(--text)', fontFamily: 'Georgia, serif' }} 
                    className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                    Curated for You
                </h1>
                <p style={{ color: 'var(--muted)' }} className="text-sm tracking-wide max-w-md mx-auto">
                    Discover our latest collection of premium products, crafted for the discerning few.
                </p>
            </div>

            {/* Search + Filter Bar */}
            <div style={{ borderBottom: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)' }}
                className="px-6 md:px-16 py-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <SearchBar search={search} setSearch={setSearch} />
                <FilterBar 
                    category={category} 
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory}
                    setSortPrice={setSortPrice} 
                />
            </div>

            {/* Active Filter Badge */}
            {selectedCategory !== 'All' && (
                <div className="px-6 md:px-16 pt-6 flex items-center gap-2">
                    <span style={{ 
                        backgroundColor: 'var(--accent)', 
                        color: 'var(--bg)',
                    }} className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
                        {selectedCategory}
                    </span>
                    <button 
                        onClick={() => setSelectedCategory('All')}
                        style={{ color: 'var(--muted)' }}
                        className="text-xs hover:opacity-70 transition-opacity"
                    >
                        ✕ Clear
                    </button>
                </div>
            )}

            {/* Products Grid */}
            <div className="px-6 md:px-16 py-10">
                {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                        <p style={{ fontSize: '3rem' }}>🔍</p>
                        <p style={{ color: 'var(--text)' }} className="text-xl font-semibold">No products found</p>
                        <p style={{ color: 'var(--muted)' }} className="text-sm">Try a different search or category</p>
                        <button 
                            onClick={() => { setSearch(''); setSelectedCategory('All') }}
                            style={{ 
                                border: '1px solid var(--accent)', 
                                color: 'var(--accent)',
                                backgroundColor: 'transparent'
                            }}
                            className="mt-2 px-6 py-2 rounded-full text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <>
                        <p style={{ color: 'var(--muted)' }} className="text-xs uppercase tracking-widest mb-8">
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                        </p>
                        <ProductCard products={filteredProducts} />
                    </>
                )}
            </div>

            {/* Footer */}
            <footer style={{ borderTop: '1px solid var(--accent)', color: 'var(--muted)' }} 
                className="px-6 md:px-16 py-8 text-center text-xs tracking-widest uppercase">
                © 2026 Lynx Code Store · All Rights Reserved
            </footer>
        </div>
    )
}