import { useNavigate, useSearchParams } from "react-router-dom";
import jacobAnime from "../images/jacob_anime.png"; // Importando a imagem

function ItemPage() {
  //isso aqui é um componente React, chamei de Pagina para ficar melhor de entender
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title") || "Default Title";

  return (
    <div className=" h-screen w-screen bg-slate-600">
      <div className="space-y-3">
        <div className="flex justify-center relative">
          <button
            onClick={() => navigate(-1)} //volta para a página anterior
            className="absolute left-0 top-0 bottom-0 mb-6 text-slate-100"
          >
            Voltar
          </button>
          <h1 className="text-3xl text-slate-100 font-bold text-center p-6">
            Detalhe do Item
          </h1>
        </div>

        <div className="bg-slate-300 p-4 rounded-md shadow">
          <h2 className="text-xl font-semibold text-center">{title}</h2>
        </div>

        <div className="flex justify-center ">
          <img
            className="flex justify-center w-[550px] "
            src={jacobAnime}
            alt="Jacob Anime"
          />
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
