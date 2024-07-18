import axios from 'axios';
import jsdom from 'jsdom';
import { NextApiRequest } from 'next';
import { Item } from '../../app/types';
const { JSDOM } = jsdom;

interface ScrapeRequest extends NextApiRequest {
  body: {
    tanggal: string;
    kabkota: string;
    pasar: string;
  }
}

// interface Item {
//   name: string;
//   currentPrice: string;
//   yesterdayPrice: string;
//   satuan: string;
//   perubahanRp: string;
//   persentasePerubahan: string;
// }

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { tanggal, kabkota, pasar } = req.body;

    try {
      const url = 'https://siskaperbapo.jatimprov.go.id/harga/tabel';
      const response = await axios.get(url);
      const dom = new JSDOM(response.data);
      const document = dom.window.document;

      const formData = new URLSearchParams();
      formData.append('tanggal', tanggal);
      formData.append('kabkota', kabkota);
      formData.append('pasar', pasar);

      const dataUrl = 'https://siskaperbapo.jatimprov.go.id/harga/tabel.nodesign/';
      const dataResponse = await axios.post(dataUrl, formData);
      const dataDom = new JSDOM(dataResponse.data);
      const dataDocument = dataDom.window.document;

      const table = dataDocument.querySelector('table.table-bordered');

      if (table) {
        const rows = table.querySelectorAll('tr');
        const items: Item[] = [];

        rows.forEach((row) => {
          const cols = row.querySelectorAll('td');
          if (cols.length > 0) {
            const item: Item = {
              name: cols[1].textContent.trim(),
              currentPrice: cols[4].textContent.trim(),
              yesterdayPrice: cols[3].textContent.trim(),
              satuan: cols[2].textContent.trim(),
              perubahanRp: cols[5].textContent.trim(),
              persentasePerubahan: cols[6].textContent.trim(),
            };
            items.push(item);
          }
        });

        res.status(200).json({ items });
      } else {
        res.status(404).json({ message: 'Table not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
