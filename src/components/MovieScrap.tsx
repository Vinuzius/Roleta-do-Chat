import { useState } from "react";
import Button from "./utils/Button";
import ItemModel from "../models/ItemModel";
import useItems from "./Itens/useItems";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MovieScrap() {
  const [listUrl, setListUrl] = useState(
    "https://letterboxd.com/patrickoliben/list/filmes-de-qualidade-duvidavel-ou-so-ruins/"
  );
  const [titleCount, setTitleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { handleLetterboxdItems } = useItems();

  const handleTitleCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const count = parseInt(event.target.value, 10);
    // Only update the state if the result is a valid number
    if (!isNaN(count)) {
      setTitleCount(count);
    }
  };

  const handleScrape = async () => {
    setIsLoading(true);
    setError("");

    try {
      // encode a URL passada, chama a api e espera a resposta, depois transforma em json
      const encodedUrl = encodeURIComponent(listUrl);
      const response = await fetch(`/api/getMovies?listUrl=${encodedUrl}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      const movieItems: ItemModel[] = data.titles.map((title: string) => ({
        id: crypto.randomUUID(),
        title: title,
      }));
      const shuffledItems = shuffleArray(movieItems);
      const limitedItems = shuffledItems.slice(0, titleCount);
      handleLetterboxdItems(limitedItems);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 rounded-xl bg-slate-700 p-4">
      <div>
        <label htmlFor="scraper-input" className="font-semibold text-white">
          Carregar de uma lista do Letterboxd
        </label>
        <div className="flex gap-x-2 mt-1">
          <input
            id="scraper-input"
            type="text"
            value={listUrl}
            onChange={(e) => setListUrl(e.target.value)}
            placeholder="Cole o URL da lista Letterboxd aqui"
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          />
          <Button
            onClick={handleScrape}
            disabled={isLoading}
            className="bg-indigo-600 flex-shrink-0"
          >
            {isLoading ? ".........." : "Carregar"}
          </Button>
        </div>
      </div>

      <div>
        <label
          htmlFor="title-count-input"
          className="text-sm font-medium text-gray-300"
        >
          Número de Itens
        </label>
        <input
          id="title-count-input"
          type="number"
          value={titleCount}
          onChange={handleTitleCountChange}
          className="mt-1 block w-24 rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
