# Roleta do Chat

> Aplicação de roleta de decisão criada com intuito de aprendizado em React.

[Demonstração → roleta-do-chat.vercel.app](https://roleta-do-chat.vercel.app)

---

## Sobre

O **Roleta do Chat** é uma aplicação web que permite criar uma lista de opções e girar uma roleta para escolher aleatoriamente uma delas. O projeto foi desenvolvido como prática de aprendizado, explorando React, TypeScript, Tailwind CSS, além de bibliotecas úteis como `react-custom-roulette`.

---

## Tecnologias Utilizadas

* **React** com **TypeScript**
* **Vite** (build tool e dev server)
* **Tailwind CSS** (estilização responsiva)
* **react-custom-roulette** (componente da roleta)
* **Headless UI** (componentes acessíveis e estilizados)
* **Vercel** (para deploy)

---

## Funcionalidades

* Criação de uma lista personalizada de opções.
* Geração aleatória de um vencedor ao girar a roleta.
* Interface responsiva, com foco em simplicidade e praticidade.
* Fácil execução local e deploy simples via Vercel.

---

## Demo

Acesse a versão online hospedada no Vercel:
[https://roleta-do-chat.vercel.app](https://roleta-do-chat.vercel.app)

---

## Como Rodar Localmente

### Pré-requisitos

* Node.js **v16+** (recomendado v18)
* Gerenciador de pacotes **pnpm**, **npm** ou **yarn**

### Passos

```bash
# Clonar o repositório
git clone https://github.com/Vinuzius/Roleta-do-Chat.git
cd Roleta-do-Chat

# Instalar dependências (usando pnpm)
pnpm install
# ou com npm
#npm install

# Rodar em modo de desenvolvimento
pnpm dev
# ou
#npm run dev

# Gerar build de produção
pnpm build
# ou
npm run build
```

Durante o desenvolvimento, o Vite executa o comando **`vite --port $PORT`**, utilizado também pela Vercel para rodar a aplicação em ambiente de preview.
Ao rodar localmente com pnpm dev, a api não irá funcionar, se quiser testar local terá que usar ```vercel dev```

---

## Estrutura do Projeto

```
Roleta-do-Chat/
├─ api/             # funções / endpoints (quando necessário)
├─ public/          # arquivos públicos (favicon, etc)
├─ src/             # código-fonte principal (componentes, páginas, estilos)
│  ├─ components/   # componentes reutilizáveis
│  ├─ pages/        # páginas principais
│  ├─ App.tsx       # componente raiz
│  └─ main.tsx      # ponto de entrada
├─ index.html       # HTML base
├─ package.json     # dependências e scripts
├─ tailwind.config.js
└─ README.md
```

---

## Deploy na Vercel

O projeto já está configurado e implantado na **Vercel**. Para realizar o deploy:

1. Conecte o repositório ao painel da Vercel.
2. A Vercel identificará o projeto como Vite + React automaticamente.
3. Configure o comando de build para `pnpm build` (ou `npm run build`).
4. Configure o diretório de saída como `dist`.
5. A Vercel executará o servidor de desenvolvimento com `vercel dev` e fará o deploy contínuo a cada push.
6. Desse jeito poderá usar a rota api do projeto

---

## Contribuição

Contribuições são bem-vindas! Caso queira propor melhorias:

* Abra uma *issue* para discutir ideias maiores.
* Envie um *Pull Request* com correções ou novas funcionalidades.

---

## Licença

Este projeto não possui uma licença definida ainda. Recomenda-se adicionar uma licença (por exemplo, MIT) para permitir contribuições externas de forma clara.

---

## Autor

Repositório mantido por **Vinuzius** — [GitHub](https://github.com/Vinuzius)

---
