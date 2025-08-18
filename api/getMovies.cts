// api/getMovies.ts

import axios from "axios";
import * as cheerio from "cheerio";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { listUrl } = req.query;

  // --- Validação ---
  // verifica se a query existe e é uma string
  if (!listUrl || typeof listUrl !== "string") {
    return res
      .status(400)
      .json({ error: 'A "listUrl" query parameter is required.' });
  }
  // Verifica se a URL é valida
  if (!listUrl.startsWith("https://letterboxd.com/")) {
    return res.status(400).json({ error: "Tem que ser um link do letterboxd" });
  }
  try {
    const { data } = await axios.get(listUrl, {
      headers: {
        // imita o header como um navegador padrão
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);
    const movieTitles: string[] = [];

    /* Dentro do html do letterboxd, os títulos estão localizados no atributo alt das imagens dos filmes que
    estão dentro de uma classe poster-list. 
    Portanto uso o cheerio para selecionar apenas a parte que interessa e extrair os títulos dos filmes.
    */
    $("ul.poster-list li .poster img").each(function (_idx: number) {
      const altText = $(this).attr("alt");
      if (altText) {
        const title = altText.split(",")[0].trim();
        movieTitles.push(title);
      }
    });

    // caso dê certo, retorna um json com a lista de títulos, caso contrário retorna erro
    res.status(200).json({
      titles: movieTitles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch or process data from the provided URL.",
    });
  }
}
