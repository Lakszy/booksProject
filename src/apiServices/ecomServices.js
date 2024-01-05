import commerce from "../lib/commerce";


export const fetchProducts = async (category) => {
    const response = await commerce.products.list(!!category &&{
        category_slug: [category],
    });

    return response?.data;
}