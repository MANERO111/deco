import { useState, useEffect } from 'react';
import axios from '@/lib/axios';

export interface Product {
    id: number;
    name: string;
    brand?: string;
    description: string;
    original_price: number;
    discounted_price?: number | null;
    image_url: string;
    category_id: number;
    subcategory_id?: number | null;
    sub_subcategory_id?: number | null;
    price: number;
    slug: string;
    stock_quantity: number;
    active: boolean;
    created_at: string;
    updated_at: string;
}

export interface SubSubcategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
    subcategory_id: number;
}

export interface Subcategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
    category_id: number;
    sub_subcategories?: SubSubcategory[];
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    subcategories?: Subcategory[];
}

interface UseProductsReturn {
    products: Product[];
    categories: Category[];
    loading: boolean;
    error: string | null;
}

export const useProducts = (): UseProductsReturn => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [productsResponse, categoriesResponse] = await Promise.all([
                    axios.get('/api/products').catch(err => ({ data: [] })),
                    axios.get('/api/categories').catch(err => ({ data: [] }))
                ]);

                const productsData = productsResponse?.data?.data || productsResponse?.data || [];
                const categoriesData = categoriesResponse?.data?.data || categoriesResponse?.data || [];

                setProducts(Array.isArray(productsData) ? productsData : []);
                setCategories(Array.isArray(categoriesData) ? categoriesData : []);
                setError(null);
            } catch (err: unknown) {
                console.error('Error fetching database products:', err);
                setProducts([]);
                setCategories([]);
                setError(err instanceof Error ? err.message : 'Error fetching catalog');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { products, categories, loading, error };
};
