import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getProduct, addToCart } from "../shopify"
import { SkeletonCard } from "./SkeletonCard"
import Navbar from "./NavBar"

export const ProductDetail = () => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedVariant, setSelectedVariant] = useState({})
    const [addingToCart, setAddingToCart] = useState(false)
    const [activeImage, setActiveImage] = useState(0)
    const { id } = useParams()
    const navigate = useNavigate()
    const decodedId = decodeURIComponent(id)

    useEffect(() => {
        getProduct(decodedId)
            .then(data => setProduct(data))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [decodedId])

    const handleAddToCart = () => {
        if (Object.keys(selectedVariant).length === 0) {
            alert('Please select a variant first')
            return
        }
        setAddingToCart(true)
        addToCart(selectedVariant.id)
            .then(checkoutUrl => window.location.href = checkoutUrl)
            .catch((err) => {
                console.log(err)
                alert("Failed to add to cart")
            })
            .finally(() => setAddingToCart(false))
    }

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
                }} className="rounded-2xl p-10 text-center max-w-md w-full">
                    <p style={{ fontSize: '2.5rem' }} className="mb-4">⚠️</p>
                    <p style={{ color: 'var(--text)' }} className="text-lg font-semibold mb-2">Product not found</p>
                    <button 
                        onClick={() => navigate('/')}
                        style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
                        className="mt-4 px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase"
                    >
                        Back to Store
                    </button>
                </div>
            </div>
        </div>
    )

    const images = product.images.edges
    const imageUrl = images[activeImage]?.node.url || images[0]?.node.url
    const imageAlt = images[activeImage]?.node.altText || product.title
    const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)

    return (
        <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
            <Navbar />

            {/* Back Button */}
            <div className="px-6 md:px-16 pt-8">
                <button
                    onClick={() => navigate('/')}
                    style={{ color: 'var(--muted)', border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)' }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm tracking-widest uppercase hover:opacity-70 transition-opacity"
                >
                    ← Back
                </button>
            </div>

            {/* Product Layout */}
            <div className="px-6 md:px-16 py-10 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">

                {/* Left — Images */}
                <div className="flex flex-col gap-4">
                    {/* Main Image */}
                    <figure style={{ 
                        border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
                        backgroundColor: 'var(--surface)'
                    }} className="rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="w-full h-96 md:h-[480px] object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </figure>

                    {/* Thumbnail Strip */}
                    {images.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-1">
                            {images.map(({ node }, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    style={{
                                        border: activeImage === index 
                                            ? '2px solid var(--accent)' 
                                            : '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                                        backgroundColor: 'var(--surface)'
                                    }}
                                    className="rounded-lg overflow-hidden flex-shrink-0 w-16 h-16 transition-all duration-200"
                                >
                                    <img src={node.url} alt={node.altText} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right — Details */}
                <div className="flex flex-col gap-8 justify-center">

                    {/* Category Tag */}
                    <span style={{ color: 'var(--accent)', letterSpacing: '0.3em' }} 
                        className="text-xs uppercase font-medium">
                        {product.productType}
                    </span>

                    {/* Title + Price */}
                    <div>
                        <h2 style={{ color: 'red', fontFamily: 'Georgia, serif' }} 
                            className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-3">
                            {product.title}
                        </h2>
                        <p style={{ color: 'var(--accent)' }} className="text-2xl font-semibold">
                            ${price}
                        </p>
                    </div>

                    {/* Divider */}
                    <div style={{ height: '1px', backgroundColor: 'color-mix(in srgb, var(--accent) 20%, transparent)' }} />

                    {/* Variants */}
                    <div>
                        <p style={{ color: 'var(--muted)', letterSpacing: '0.3em' }} 
                            className="text-xs uppercase mb-3 font-medium">
                            Select Option
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {product.variants.edges.map(({ node }, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedVariant(node)}
                                    style={{
                                        backgroundColor: selectedVariant.title === node.title 
                                            ? 'var(--accent)' 
                                            : 'transparent',
                                        color: selectedVariant.title === node.title 
                                            ? 'var(--bg)' 
                                            : 'var(--text)',
                                        border: '1px solid color-mix(in srgb, var(--accent) 50%, transparent)',
                                        opacity: node.availableForSale ? 1 : 0.4
                                    }}
                                    disabled={!node.availableForSale}
                                    className="px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-200 hover:opacity-80"
                                >
                                    {node.title}
                                    {!node.availableForSale && ' · Out of Stock'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <p style={{ color: 'var(--muted)' }} className="text-sm leading-relaxed">
                        {product.description}
                    </p>

                    {/* Add to Cart */}
                    <button 
                        onClick={handleAddToCart}
                        disabled={addingToCart}
                        style={{ 
                            backgroundColor: addingToCart ? 'var(--muted)' : 'var(--accent)',
                            color: 'var(--bg)',
                            fontFamily: 'inherit'
                        }}
                        className="w-full py-4 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-80 disabled:cursor-not-allowed"
                    >
                        {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                    </button>

                    {/* Trust Badge */}
                    <div className="flex items-center justify-center gap-6">
                        {['Free Shipping', 'Secure Checkout', 'Easy Returns'].map((badge) => (
                            <span key={badge} style={{ color: 'var(--muted)' }} className="text-xs tracking-wide">
                                ✓ {badge}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer style={{ borderTop: '1px solid var(--accent)', color: 'var(--muted)' }} 
                className="px-6 md:px-16 py-8 text-center text-xs tracking-widest uppercase mt-10">
                © 2026 Lynx Code Store · All Rights Reserved
            </footer>
        </div>
    )
}