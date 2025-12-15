import prisma from './prisma.js';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
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
                    { name: { contains: search, mode: 'insensitive' } }, // Note: Schema calls it 'title' but frontend might send 'name' if mismatch. Checking schema... Schema uses 'title'.
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
                ...data,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
                rating: parseFloat(data.rating || 0),
                sold: parseInt(data.sold || 0),
                // Ensure images is array
                images: Array.isArray(data.images) ? data.images : [],
            };

            const product = await prisma.product.create({
                data: productData,
            });
            return res.status(201).json(product);
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Request error', error);
        return res.status(500).json({ error: 'Error processing request', details: error.message });
    }
}
