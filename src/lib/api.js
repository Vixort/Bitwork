/**
 * API Utility for fetching data from Vercel Serverless Functions
 */

const API_BASE = '/api';

export const fetchJobs = async () => {
    try {
        const response = await fetch(`${API_BASE}/jobs`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        return await response.json();
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
};

export const createJob = async (jobData) => {
    try {
        const response = await fetch(`${API_BASE}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jobData),
        });
        if (!response.ok) throw new Error('Failed to create job');
        return await response.json();
    } catch (error) {
        console.error('Error creating job:', error);
        throw error;
    }
};

export const fetchProducts = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (filters.category && filters.category !== 'all') params.append('category', filters.category);
        if (filters.status && filters.status !== 'all') params.append('status', filters.status);
        if (filters.search) params.append('search', filters.search);

        const response = await fetch(`${API_BASE}/products?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });
        if (!response.ok) throw new Error('Failed to create product');
        return await response.json();
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await fetch(`${API_BASE}/product?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });
        if (!response.ok) throw new Error('Failed to update product');
        return await response.json();
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/product?id=${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete product');
        return await response.json();
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};
