tem uma pasta @docs que contem documentos importantes para a definição e orientação do design, é só uma referencia para execução da versão 1 do portifólio

## Regras de execução

- Os documentos acima são a fonte de verdade.
- Não altere textos aprovados sem autorização.
- Não invente métricas, clientes ou depoimentos.
- Não destaque IA no conteúdo público.
- Implemente acessibilidade, responsividade, SEO técnico e bom desempenho.
- Respeite `prefers-reduced-motion`.
- Não adicione painel administrativo ao MVP.
- Antes de executar mudanças amplas, apresente um plano e espere aprovação.

## Commits e Git

- Trabalhe direto na branch `main`. Não crie outras branches.
- Siga o [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/): `tipo(escopo): descrição`, em português, no imperativo e sem ponto final (ex.: `feat(hero): adiciona órbita animada`).
- Tipos usados: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `chore`. Escopos comuns: `hero`, `sobre`, `servicos`, `experiencia`, `trabalhos`, `contato`, `layout`, `motion`, `seo`, `content`, `assets`.
- Faça commits em blocos coerentes, um assunto por commit, em vez de um commit gigante. Use o corpo da mensagem para explicar o porquê quando não for óbvio.
- Não use `git add -A`: adicione os arquivos de cada bloco explicitamente e confira com `git status` antes de commitar. Nunca commite segredos (`.env*.local`).
- **Não faça `git push`.** O envio ao GitHub é feito manualmente pelo Matheus.
