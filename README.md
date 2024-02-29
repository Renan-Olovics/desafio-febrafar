
<p align="center">
	<img alt="Logo Febrafar" src="https://raw.githubusercontent.com/FebrafarDev/desafio/main/static/logo-febrafar.png?raw=true" width="360">
</p>


# Desafio Frontend Inovação Febrafar 

Ficamos felizes em ter você por aqui e queremos te desejar boa sorte!

Siga as instruções com calma e não deixe de evidenciar o seu progresso, mesmo que não consiga concluir totalmente algum item.


## Pré Requisitos 🛠️

* Ter uma Conta no Github;
* Ter uma versão do Node.js instalada, nos itens do desafio utilizamos a versão 20.9.0 (LTS).


## Regras 📜

* Faça um clone deste repositório;
* Crie um repositório privado na sua conta do Github;
* Ao final do desafio, compartilhe acessos ao repositório com [@giordanna](https://github.com/giordanna) e [@leonavas](https://github.com/leonavas).


## Desafio 🚀

O objetivo do desafio é transformar a lista em formato JSON deste projeto em uma página construída em [Sveltekit](https://kit.svelte.dev/), utilizando [TailwindCSS](https://tailwindcss.com/docs/installation) para estilização.

Para iniciar o projeto, execute o comando:

```bash
npm install

npm run dev
```

Acesse [http://localhost:5173/](http://localhost:5173/) para visualizar a página.

### Item 1

Ajuste tudo que achar necessário dentro de app.html para garantir que a página possua um bom funcionamento em qualquer dispositivo, assumindo que será acessada sempre do Brasil.


### Item 2

construa uma página que possua a listagem no formato de tabela com as seguintes colunas:

Nome (com email abaixo) | Telefone | Cargo | Departamento | Último acesso

A listagem deve parecer com a imagem abaixo:

![Lista](https://raw.githubusercontent.com/FebrafarDev/desafio/main/media/01-lista.png)

Utilize os dados do arquivo `people.js` para popular a listagem.


### Item 3

Adicione outros elementos na página, como Título, campo de busca, paginação e rótulo de itens sendo exibidos, conforme imagem abaixo:

![Pagina Completa](https://raw.githubusercontent.com/FebrafarDev/desafio/main/media/02-pagina.png)



### Item 4

Agora vamos adicionar funcionalidades na página.

Implemente uma funcionalidade de paginação que permita navegar entre as páginas de registros, conforme os vídeos abaixo:

[![Paginação](https://raw.githubusercontent.com/FebrafarDev/desafio/main/media/03-paginacao.gif)](https://raw.githubusercontent.com/FebrafarDev/desafio/main/media/03-paginacao.mov)


### Item 5

Implemente uma funcionalidade de busca que encontre os registros por email, nome ou telefone.
O Video abaixo ilustra o comportamento esperado:

[![Busca](https://raw.githubusercontent.com/FebrafarDev/desafio/main/media/04-busca.gif)](https://raw.githubusercontent.com/FebrafarDev/desafio/main/media/04-busca.mov)

Busca retornando 0 resultados:

[![Busca Vazia](https://raw.githubusercontent.com/FebrafarDev/desafio/main/media/05-busca-vazia.gif)](https://raw.githubusercontent.com/FebrafarDev/desafio/main/media/05-busca-vazia.mov)


### Item 6 (Extra)

Permita que o botão "Exportar" gere um arquivo em formato Excel com os dados da tabela.


## Entrega

Ao finalizar o desafio, compartilhe o link do repositório com os usuários do github mencionados nas regras acima e envie o link do repositório para o e-mail inovacao@febrafar.com.br.
