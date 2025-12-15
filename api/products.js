import prisma from './prisma.js';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        if (req.method === 'GET') {
            const { category, status, search } = req.query;

            const where = {};
            if (category && category !== 'all') where.category = category;
            if (status && status !== 'all') where.status = status;
            if (search) {
                where.OR = [
                    { title: { contains: search, mode: 'insensitive' } },
                    { sku: { contains: search, mode: 'insensitive' } },
                ];
            }

            const products = await prisma.product.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                include: { reviews: true },
            });
            return res.status(200).json(products);
        }

        if (req.method === 'POST') {
            const data = req.body;
            // Data cleaning/validation
            const productData = {
                title: data.name, // Map frontend 'name' to schema 'title'
                description: data.description,
                fullDescription: data.fullDescription,
                category: data.category,
                brand: data.brand,
                sku: data.sku,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
                rating: parseFloat(data.rating || 0),
                sold: parseInt(data.sold || 0),
                images: Array.isArray(data.images) ? data.images : [],
                status: data.status,
                weight: data.weight,
                warranty: data.warranty
            };

            const product = await prisma.product.create({
                data: productData,
            });
            return res.status(201).json(product);
        }

        if (req.method === 'PUT') {
            const { id } = req.query;
            const data = req.body;
            if (!id) return res.status(400).json({ error: 'Product ID required' });

            const productData = { ...data };
            // Ensure numeric fields
            if (productData.price) productData.price = parseFloat(productData.price);
            if (productData.stock) productData.stock = parseInt(productData.stock);

            // Remove ID from data if present to avoid prisma error
            delete productData.id;

            const product = await prisma.product.update({
                where: { id: parseInt(id) },
                data: productData,
            });
            return res.status(200).json(product);
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id) return res.status(400).json({ error: 'Product ID required' });

            await prisma.product.delete({
                where: { id: parseInt(id) }
            });
            return res.status(200).json({ message: 'Product deleted' });
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Request error', error);
        return res.status(500).json({ error: 'Error processing request', details: error.message });
    }
}
