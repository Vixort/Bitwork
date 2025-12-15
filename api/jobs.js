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
            // Ensure specific fields are handled correctly if needed
            if (data.salaryMin) data.salaryMin = parseInt(data.salaryMin);
            if (data.salaryMax) data.salaryMax = parseInt(data.salaryMax);
            if (data.applicants) data.applicants = parseInt(data.applicants);

            const job = await prisma.job.create({
                data: data,
            });
            return res.status(201).json(job);
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Request error', error);
        return res.status(500).json({ error: 'Error fetching jobs', message: error.message });
    }
}
