import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const { all } = req.query;

  const putS3 = req.url.startsWith('/api/content/') && req.method === 'PUT';
  const API_URL = putS3
    ? 'https://pop-production-data.s3.amazonaws.com'
    : 'https://poparazzi.com';

  try {
    if (putS3) {
      await fetch(`${API_URL}${req.url.replace('/api/', '/')}`, {
        method: req.method,
        body: req.body
      });

      return res.status(200).send('OK');
    } else {
      const response = await fetch(`${API_URL}${req.url}`, {
        method: req.method,
        headers: {
          Accept: 'application/vnd.api+json, application/json',
          'Content-Type': 'application/vnd.api+json',
          'User-Agent': 'Poparazzi/78 CFNetwork/1220.1 Darwin/20.3.0',
          Authorization: req.headers.authorization
            ? req.headers.authorization
            : null,
          Version: '1.9.14#78',
          'Accept-Language': 'en-us',
          'Accept-Encoding': 'gzip, deflate',
          Connection: 'close'
        },
        body: req.body ? req.body : null
      });

      return res.status(200).json(await response.json());
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json(error);
  }
};
