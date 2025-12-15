import prisma from './prisma.js';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
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
            const jobs = await prisma.job.findMany({
                orderBy: { postedDate: 'desc' },
            });
            return res.status(200).json(jobs);
        }

        if (req.method === 'POST') {
            const data = req.body;

            // Format data for Prisma
            const jobData = {
                title: data.title,
                company: data.company,
                location: data.location,
                type: data.type,
                level: data.level,
                salaryMin: parseInt(data.salaryMin),
                salaryMax: parseInt(data.salaryMax),
                description: data.description,
                skills: Array.isArray(data.skills) ? data.skills : (data.skills?.split(',').map(s => s.trim()) || []),
                benefits: Array.isArray(data.benefits) ? data.benefits : (data.benefits?.split(',').map(s => s.trim()) || []),
                isRemote: data.isRemote || false,
                isUrgent: data.isUrgent || false,
                postedDate: new Date(),
            };

            const job = await prisma.job.create({
                data: jobData,
            });
            return res.status(201).json(job);
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id) return res.status(400).json({ error: 'Job ID required' });

            await prisma.job.delete({
                where: { id: parseInt(id) }
            });
            return res.status(200).json({ message: 'Job deleted' });
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Request error', error);
        return res.status(500).json({ error: 'Error fetching jobs', message: error.message });
    }
}
