import prisma from './prisma.js';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PUT,DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    const productId = parseInt(id);

    try {
        if (req.method === 'GET') {
            const product = await prisma.product.findUnique({
                where: { id: productId },
                include: { reviews: true },
            });
            if (!product) return res.status(404).json({ error: 'Product not found' });
            return res.status(200).json(product);
        }

        if (req.method === 'PUT') {
            const data = req.body;
            // Data cleaning/validation
            const productData = {
                ...data,
                price: data.price ? parseFloat(data.price) : undefined,
                stock: data.stock ? parseInt(data.stock) : undefined,
                rating: data.rating ? parseFloat(data.rating) : undefined,
                sold: data.sold ? parseInt(data.sold) : undefined,
            };

            // Remove ID from update data if present to avoid error
            delete productData.id;

            const product = await prisma.product.update({
                where: { id: productId },
                data: productData,
            });
            return res.status(200).json(product);
        }

        if (req.method === 'DELETE') {
            await prisma.product.delete({
                where: { id: productId },
            });
            return res.status(200).json({ message: 'Product deleted successfully' });
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Request error', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(500).json({ error: 'Error processing request', details: error.message });
    }
}
