const SHOPIFY_STORE_URL = "lynx-code-store.myshopify.com";
const SHOPIFY_TOKEN = "778fc227a74fc6308f7cb60b8167598d";

export async function getProducts() {
    const response = await fetch(`https://${SHOPIFY_STORE_URL}/api/2024-01/graphql.json`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
        },
        body: JSON.stringify({
            query: `{
                products(first: 20) {
                    edges {
                        node {
                            id
                            title
                            description
                            productType
                            tags
                            priceRange {
                                minVariantPrice {
                                    amount
                                }
                            }
                            images(first: 1) {
                                edges {
                                    node {
                                        url
                                        altText
                                    }
                                }
                            }
                            variants(first: 10) {
                                edges {
                                    node {
                                        id
                                        title
                                        availableForSale
                                    }
                                }    
                            }
                        }   
                    }
                }
            }`
        })
    });
    const data = await response.json();
    console.log(data);

    if (data.errors) throw new Error('Unauthorized')

    // Get productType 
    const productData = data.data.products.edges.map(({ node }) => node)

    const categories = productData.map(({productType}) => {
        return productType
    })

    const uniqueCategories = [...new Set(categories)]

    console.log(uniqueCategories)
    return {
        products: productData,
        categories: uniqueCategories
    }

}

export async function getProduct(id) {
    const response = await fetch(`https://${SHOPIFY_STORE_URL}/api/2024-01/graphql.json`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
        },
        body: JSON.stringify({
            query: `{
                product(id: "${id}") {
                    id
                    title
                    description
                    productType
                    tags
                    priceRange {
                        minVariantPrice {
                            amount
                        }
                    }
                    images(first: 5) {
                        edges {
                            node {
                                url
                                altText
                            }
                        }
                    }
                    variants(first: 10) {
                        edges {
                            node {
                                id
                                title
                                availableForSale
                            }
                        }    
                    }
                }
            }`
        })
    });

    const data = await response.json();

    if (data.errors) throw new Error('Unauthorized')

    return data.data.product
}

export async function addToCart(variantId) {
    const response = await fetch(`https://${SHOPIFY_STORE_URL}/api/2024-01/graphql.json`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
        },
        body: JSON.stringify({
        query: `
            mutation {
                cartCreate(input: {
                    lines: [{ quantity: 1, merchandiseId: "${variantId}" }]
                }) {
                    cart {
                    checkoutUrl
                    }
                }
            }
        `
        })
    })

    const data = await response.json()

    if (data.errors) throw new Error('Unauthorized')

    return data.data.cartCreate.cart.checkoutUrl
}