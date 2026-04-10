# Garagem da Paulinha

Base em Next.js 16 com shadcn/ui, Firebase Web SDK, Firestore e setup inicial de PWA.

## Firebase local

1. As credenciais web ja estao em `.env.local`.
2. Rode `npm run dev` para validar a tela de diagnostico local.
3. O Analytics e inicializado apenas no client.

## Firestore

- As regras estao em `firestore.rules`.
- Os indices estao em `firestore.indexes.json`.
- A leitura de teste usa o documento `app_public/status`.
- Para publicar regras: `npm run firebase:rules`.
- Para publicar indices: `npm run firebase:indexes`.
- Para rodar o emulador local: `npm run firebase:emulators`.

## Firebase Hosting

- Este projeto esta configurado para export estatico com `output: "export"`.
- O deploy vai para o Firebase Hosting tradicional usando a pasta `out`.
- Para publicar so o site: `npm run firebase:hosting`.
- Para publicar site + regras + indices: `npm run firebase:deploy`.
- Esse caminho evita App Hosting e GitHub integration.

## PWA

- O manifesto esta em `app/manifest.ts`.
- O service worker e gerado via `@ducanh2912/next-pwa`.
- Em desenvolvimento o service worker fica desabilitado para evitar cache persistente.
- Para validar instalacao real, rode `npm run build && npm run start`.

## Passo a passo de teste

1. No Firebase Console, crie o Cloud Firestore em modo Production.
2. Crie o documento `app_public/status` com um campo `message`.
3. Faça login na CLI com `npm run firebase:login`.
4. Selecione o projeto com `npm run firebase:use`.
5. Publique as regras com `npm run firebase:rules`.
6. Publique o site com `npm run firebase:hosting`.
7. Abra a home online e confirme a leitura real do Firestore.

## Docker

- Project name: `garagem-da-paulinha`
- Service name: `app`
- Container name: `garagem-da-paulinha-app`
- App URL: `http://localhost:3000`

Para subir com Docker:

```bash
docker compose up --build
```
