export default function handler(req, res) {
    // Check the request method
    if (req.method === 'GET') {
        // Handle GET request
        res.status(200).json({ message: 'Hello, world!' });
    } else if (req.method === 'POST') {
        // Handle POST request
        const data = req.body;
        res.status(200).json({ message: 'Data received', data: data });
    } else {
        // Handle other HTTP methods
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}