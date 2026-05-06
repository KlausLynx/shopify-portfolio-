import { useNavigate } from "react-router-dom"

export const ProductCard = ({products}) => {
    const navigate = useNavigate()

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => {
                const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)
                const image = product.images.edges[0]?.node.url
                const alt = product.images.edges[0]?.node.altText || product.title

                return (
                    <div
                        key={product.id}
                        onClick={() => navigate(`/product/${encodeURIComponent(product.id)}`)}
                        style={{
                            backgroundColor: 'var(--surface)',
                            border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                        }}
                        className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    >
                        {/* Image */}
                        <div className="overflow-hidden relative">
                            <img
                                src={image}
                                alt={alt}
                                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Category Tag */}
                            <span
                                style={{
                                    backgroundColor: 'var(--accent)',
                                    color: 'var(--bg)',
                                }}
                                className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest"
                            >
                                {product.productType}
                            </span>
                        </div>

                        {/* Info */}
                        <div className="p-5 flex flex-col gap-2">
                            <h2
                                style={{ color: 'var(--text)' }}
                                className="font-semibold text-base tracking-tight leading-snug"
                            >
                                {product.title}
                            </h2>

                            <div className="flex items-center justify-between mt-1">
                                <p
                                    style={{ color: 'var(--accent)' }}
                                    className="text-base font-bold"
                                >
                                    ${price}
                                </p>

                                <span
                                    style={{
                                        color: 'var(--muted)',
                                        border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)'
                                    }}
                                    className="text-xs px-3 py-1 rounded-full tracking-widest uppercase"
                                >
                                    View →
                                </span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}