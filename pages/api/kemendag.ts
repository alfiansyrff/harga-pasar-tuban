// export default async function handler({req, res}: ) {
//   if (req.method === 'POST') {
//     try {
      
//       const { start_date, end_date } = req.body;

//       console.log('Received start_date:', start_date);
//       console.log('Received end_date:', end_date);

//       const formData = new FormData();
//       formData.append('start_date', '2024-08-12'); 
//       formData.append('end_date', '2024-08-15'); 
//       formData.append('level', '3');
//       formData.append('variant_ids', '');
//       formData.append('kode_provinsi', '35');
//       formData.append('kode_kab_kota', '3523');
//       formData.append('pasar_id', '449');
//       formData.append('skip_sat_sun', 'true');
//       formData.append('tipe_komoditas', '1');

//       // Send POST request
//       const response = await fetch('https://api-sp2kp.kemendag.go.id/report/api/average-price/export-area-daily-json', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Accept': 'application/json',
//           'Host': 'api-sp2kp.kemendag.go.id',
//           'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
//           'Origin': 'https://sp2kp.kemendag.go.id'
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Error network');
//       }

//       const data = await response.json();

//       res.status(200).json(data);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { start_date, end_date, variant_id } = req.body;

      // console.log('Received start_date:', start_date);
      // console.log('Received end_date:', end_date);

      const formData = new FormData();
      formData.append('start_date', start_date); 
      formData.append('end_date', end_date); 
      formData.append('level', '3');
      formData.append('variant_ids', '');
      formData.append('kode_provinsi', '35');
      formData.append('kode_kab_kota', '3523');
      formData.append('pasar_id', '449');
      formData.append('skip_sat_sun', 'true');
      formData.append('tipe_komoditas', '1');

      const response = await fetch('https://api-sp2kp.kemendag.go.id/report/api/average-price/export-area-daily-json', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Host': 'api-sp2kp.kemendag.go.id',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
          'Origin': 'https://sp2kp.kemendag.go.id'
        },
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data = await response.json();
      res.status(200).json(data);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
