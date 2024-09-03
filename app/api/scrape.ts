import axios from "axios";
import { JSDOM } from "jsdom";

const BASE_URL = `https://siskaperbapo.jatimprov.go.id/harga/tabel`;

const getData = async () => {
  const { data } = await axios.get(BASE_URL, {
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      Host: 'siskaperbapo.jatimprov.go.id',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
  });

  const dom = new JSDOM(data);
  const raceCards = dom.window.document.querySelectorAll(".jumbotron");

  // console.log(raceCards);
  
  
  // Process raceCards as needed
  // raceCards.forEach(card => {
  //   console.log(card.textContent);
  // });
};

getData();
