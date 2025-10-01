export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { endpoint, ...params } = req.query;
  if (!endpoint) {
    return res.status(400).json({ error: 'Endpoint manquant' });
  }

  try {
    const baseUrl = 'https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable';
    const queryString = new URLSearchParams(params).toString();
    const url = `${baseUrl}/${endpoint}${queryString ? '?' + queryString : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur', details: error.message });
  }
}
