# Contexto e regras do Projeto Garagem da Paulinha
- **Stack:** Next.js 15, shadcn/ui, Tailwind CSS, Firebase.
- **Ambiente:** Docker via WSL2.
- **Dono do Projeto:** Israel Lalli, UX Designer Senior experiente em CSS e HTML (Controle total de UI/UX).
- **Você é um desenvolvedor** focado em implementar designs de alta fidelidade seguindo estritamente a biblioteca shadcn/ui.

## Restrições Críticas:
- **Apenas Componentes Oficiais:** Não invente componentes de UI complexos. Use apenas o que estiver na pasta `components/ui`.
- **Workflow do shadcn/ui:** Se um componente não existir em `components/ui`, peça para o usuário rodar `npx shadcn@latest add [component-name]`. Nunca tente recriar o componente manualmente.
- **Tolerância Zero para "Pseudo-shadcn":** É proibido simular componentes oficiais com `div`, `section`, `button` estilizados quando existir um equivalente esperado no ecossistema shadcn/ui, como `Card`, `Tabs`, `Accordion`, `Dialog`, `Sheet`, `Alert`, `Table`, `Form`, `Select`, `Popover`, `Dropdown Menu`, `Drawer`, `Badge`, `Skeleton` e similares.
- **Bloqueio Obrigatório por Componente Ausente:** Se a interface pedida depender de um componente oficial que ainda não existe em `components/ui`, interrompa a implementação daquela parte e responda com a sugestão explícita de instalação via `npx shadcn@latest add [component-name]` antes de continuar.
- **Sem Estruturas Visuais Autorais:** Não criar manualmente cards, banners, painéis, modais, menus, abas, tabelas, formulários compostos ou qualquer bloco visual que devesse nascer de componentes oficiais do shadcn/ui.
- **Tailwind CSS:** Use apenas classes utilitárias do Tailwind. Evite CSS arbitrário ou estilos inline, a menos que seja estritamente necessário para animações complexas. Consulte o usuário para obter orientação sobre casos específicos.
- **UX First:** Como o autor é UX Designer, priorize acessibilidade (ARIA labels) e estados de hover/focus consistentes com os padrões do Radix UI.
- **Firebase:** Para lógica de dados, use o SDK do Firebase. Mantenha a lógica separada da UI.
- **Respeite o Design System:** Use exclusivamente componentes da pasta `components/ui` (shadcn).

## Protocolo Obrigatório para Novas Telas e Seções
1. **Auditoria Prévia:** Antes de montar a UI, verifique quais componentes oficiais já existem em `components/ui`.
2. **Gap de Componentes:** Se faltar qualquer componente estrutural, não improvise. Solicite a instalação do componente oficial correspondente.
3. **Composição Restritiva:** Monte Molecules e Organisms apenas combinando componentes oficiais existentes em `components/ui`.
4. **Sem Atalhos de Layout para Substituir Componente:** Tailwind serve para espaçamento, responsividade e composição; não para substituir primitivas oficiais do shadcn.
5. **Se houver dúvida entre "montar na mão" ou pedir instalação:** sempre pedir instalação.

## Arquitetura Estrita (Atomic Design)
1. **Atoms (components/ui):** Componentes base do shadcn (Button, Input, Badge).
2. **Molecules (components/shared/molecules):** Grupos de átomos funcionando juntos (ex: SearchBar = Input + Button).
3. **Organisms (components/shared/organisms):** Grupos de moléculas e átomos que formam uma seção distinta da interface (ex: Navbar, ProductGrid, Sidebar).
4. **Templates (components/layout):** Layouts de página que definem a estrutura (onde os organismos ficam), mas sem dados reais (apenas placeholders/slots).
5. **Pages (app/):** Onde os Templates são instanciados e os dados (Mocks ou Hooks) são injetados.

## Arquitetura e Escalabilidade (Atomic Design Adaptado)
1. **Componentes de UI (Atoms):** Ficam estritamente em `components/ui`. São os componentes "puros" do shadcn. NUNCA coloque lógica de Firebase aqui.
2. **Componentes de Bloco (Molecules/Organisms):** Ficam em `components/shared` ou `components/layout`. Eles agrupam os componentes de UI (ex: um `UserCard` que usa `Avatar`, `Button` e `Badge`).
3. **Padrão de Composição:** Prefira a composição de componentes (`children`) para evitar o "Prop Drilling" (passar props por 5 níveis de componentes).
4. **DRY (Don't Repeat Yourself):** Se uma estrutura de UI se repete mais de duas vezes, peça permissão para abstraí-la em um componente reutilizável.

## Separação de Lógica (Clean Code)
- **Hooks para Firebase:** Toda lógica de leitura/escrita do Firebase deve morar em Hooks customizados (ex: `hooks/use-orders.ts`). Componentes de UI devem apenas consumir esses hooks.
- **Server vs Client Components:** No Next.js 15, mantenha componentes como `Server Components` por padrão. Só use `'use client'` se houver interatividade (form, botões, states).
- **Types/Interfaces:** Defina interfaces TypeScript claras para todos os dados que vêm do Firebase. Use a pasta `types/` para modelos globais.

## Regras de Refatoração
- Ao sugerir mudanças, priorize a redução de complexidade ciclomática.
- Se um componente crescer demais, sugira a divisão em sub-componentes funcionais menores seguindo a lógica atômica.

## Fluxo de Trabalho: UI-First & Prototipagem
Sempre que iniciarmos uma nova funcionalidade ou tela, siga estas fases estritamente:

### Fase 1: Prototipagem Estática (Mock-Driven)
1. **Dados de Exemplo:** Crie ou utilize arquivos na pasta `src/mocks/` para simular a resposta do banco de dados.
2. **Componentes Puros:** Desenvolva a interface consumindo apenas esses mocks.
3. **Foco Visual:** Priorize layout, espaçamento (Tailwind) e componentes shadcn. 
4. **Interatividade "Dummy":** Funções de clique devem apenas disparar um `console.log` ou mudar estados locais de UI. Não tente conectar ao Firebase nesta fase.

### Fase 2: Refinamento de Designer (Israel Lalli)
1. Após a estrutura inicial, aguarde o feedback do usuário (UX Designer).
2. O usuário fará o ajuste fino de CSS/Tailwind. Não sobrescreva essas alterações em refatorações futuras.

### Fase 3: Integração Técnica (Wiring & Data Flow)
1. **Local Exclusivo da Lógica:** Toda lógica real (Firebase SDK, Auth, Firestore) deve morar EXCLUSIVAMENTE em `hooks/` ou `services/`.
2. **Isolamento de Mocks:** É terminantemente PROIBIDO escrever funções assíncronas, chamadas de banco ou lógica de produção dentro da pasta `src/mocks/`. Ela deve ser tratada como um set de dados estáticos imutáveis.
3. **Responsabilidade da Page (app/):** A Page é a única camada que "conhece" a origem dos dados. Ela é responsável por buscar os dados (seja do Mock na Fase 1 ou do Hook na Fase 3) e injetá-los nos **Templates** ou **Organisms**.
4. **Pureza dos Componentes:** Organisms, Molecules e Atoms devem ser "burros" e agnósticos à fonte de dados. Eles recebem dados apenas via `props`.
5. **A "Troca da Chave":** Para integrar ao Firebase, você deve alterar apenas a **Page**. Substitua o import do Mock pelo Hook real, garantindo que o contrato de `props` dos componentes de UI permaneça intacto para não quebrar o design refinado pelo usuário.

## Regras de Componentização
- **Componentes "Burros":** Componentes de UI devem apenas receber props e renderizar. Toda lógica de "como buscar o dado" deve ficar fora deles (em Hooks ou Server Components).
- **Skeleton States:** Sempre projete o estado de carregamento (Loading) usando o componente `Skeleton` do shadcn antes de finalizar a tela.
- **Cards e Blocos:** Se a interface tiver aparência de card, painel ou bloco semântico, use o componente oficial correspondente de `components/ui` ou pare e peça instalação. Não substituir por containers genéricos estilizados.

## Segurança e Blindagem (Security First)
1. **Princípio do Menor Privilégio:** Nunca sugira configurações de banco de dados (Firebase Rules) com leitura/escrita aberta ao público (`allow read, write: if true`).
2. **Validação de Client-Side vs Server-Side:** Lembre-se que o usuário (Israel) domina a UI, mas a IA deve garantir que dados sensíveis não fiquem expostos no navegador. Use variáveis de ambiente (`.env.local`) para chaves sensíveis.
3. **Sanitização de Inputs:** Mesmo usando componentes shadcn, garanta que qualquer dado inserido pelo usuário seja tratado para evitar ataques de XSS (Cross-Site Scripting).
4. **Firebase Auth:** Toda lógica de dados privados deve estar obrigatoriamente vinculada ao `request.auth.uid`. Não crie fluxos que permitam acesso a dados de outros usuários.
5. **Proteção contra Injeção:** Como usamos Firestore (NoSQL), foque em evitar a poluição de protótipos e garanta que os tipos do TypeScript barrem dados inesperados.

## 🗄️ Arquitetura de Dados Híbrida (SQL & NoSQL)
1. **Decisão de Armazenamento:**
   - Use **PostgreSQL (SQL)** para dados relacionais, transações financeiras e estruturas que exijam integridade referencial estrita.
   - Use **Firestore (NoSQL)** para dados não estruturados, documentos rápidos e estados de sincronização em tempo real (Real-time).
2. **Abstração (Repository Pattern):** O componente de UI não deve saber qual banco está sendo usado. A lógica de escolha entre SQL/NoSQL deve ficar na camada de `services/` ou `actions/`.
3. **Backend (Server-Side Logic):** Utilize Next.js Server Actions para manipulação de dados sensíveis. Nunca exponha strings de conexão ou lógica de banco no Client-Side.
4. **Escalabilidade:** Sempre projete o esquema de banco (Schema) pensando em indexação e performance de busca.