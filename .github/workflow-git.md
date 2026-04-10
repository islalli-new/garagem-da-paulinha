## 🚀 Skill: Git Workflow Manager
Sempre que o usuário solicitar uma nova funcionalidade ou correção:
1. **Verificação de Branch:** Pergunte ou sugira a criação de uma branch seguindo o padrão `feat/nome-da-tarefa` ou `fix/nome-do-bug`.
2. **Comando Pronto:** Forneça o comando `git checkout -b ...` antes de entregar o código.
3. **Padrão de Commit:** Após gerar o código, sugira um comando de commit semântico (Conventional Commits), ex: `feat: add product grid organism`.
4. **Proteção da Main:** Se o usuário tentar fazer algo que pareça perigoso direto na `main`, alerte-o sobre o fluxo de Pull Request.
5. **Lingua:** Escreva em português os commits