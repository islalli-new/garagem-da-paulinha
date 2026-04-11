# POC CRM para vendedores de carro

## Direcao do produto

- O app nasce como um assistente para vendedores de carro, com ambicao de escalar depois da POC.
- A navegacao principal deve usar app shell com sidebar.
- As tres areas centrais sao Portifolio, Negociacoes e Contatos.
- A entrada inicial do produto deve ser Portifolio.

## Escopo inicial por area

### Portifolio

- Reune os veiculos disponiveis.
- A POC deve prever listagem e cadastro/edicao basica de veiculos.
- Essa e a primeira entrega funcional recomendada.

### Contatos

- Comeca focado apenas em compradores.
- Deve concentrar cadastro, consulta e informacoes comerciais basicas.
- Serve de base para alimentar Negociacoes.

### Negociacoes

- Deve ser tratada como o nucleo do produto, com mentalidade de CRM.
- Precisa permitir identificar oportunidades com rapidez.
- Deve conectar contato(s) e veiculo(s).
- Precisa sustentar proposta, condicoes de pagamento e proximos passos.
- Ja deve nascer preparada para evolucoes futuras, como compartilhamento de PDF.
- O pipeline de vendas ainda nao foi fechado e deve ser definido depois sem exigir refatoracao estrutural.

## Estrategia de implementacao

- A primeira fase deve seguir o fluxo UI-first do projeto.
- A implementacao inicial deve usar mocks estaticos antes da integracao com Firebase.
- A troca de mocks por dados reais deve acontecer depois, na camada de pages e hooks, sem acoplar os componentes visuais a fonte de dados.

## Componentes shadcn necessarios antes de implementar a UI

Os seguintes componentes oficiais sao necessarios para executar a POC sem improvisacao visual:

- `sidebar`
- `input`
- `label`
- `form`
- `table`
- `dialog`
- `select`
- `textarea`
- `dropdown-menu`
- `separator`

## Impacto na base atual

- O layout global atual deve virar o app shell principal.
- A home tecnica atual nao deve continuar como entrada principal do produto.
- Ela pode ser movida para uma tela secundaria de diagnostico, se ainda for util.

## Arquivos principais para a proxima etapa

- `app/layout.tsx`
- `app/page.tsx`
- `components/shared/organisms/firestore-status-card.tsx`
- `hooks/use-public-firestore-status.ts`
- `lib/firebase/client.ts`

## Observacao sobre persistencia

- Este arquivo existe para garantir um checkpoint versionado no proprio repositorio.
- As memorias de sessao e de repositorio do agente ajudam durante o trabalho, mas o registro confiavel de longo prazo deve ficar em arquivos do projeto e em commits Git.