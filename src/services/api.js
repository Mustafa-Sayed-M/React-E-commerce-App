export const api = {
    base_url: 'https://fakestoreapi.com',
    endpoints: {
        get_products: '/products',
        get_single_product: '/products/', // require product id__!
        get_categories: '/products/categories',
        get_products_by_category: '/products/category/', // require category__!
    }
}