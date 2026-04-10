# Garagem da Paulinha

Base inicial do projeto Garagem da Paulinha com Next.js e shadcn/ui.
https://ui.shadcn.com/create?item=preview&preset=b6lcVNtyAC

## Docker

The project includes a development setup for Docker Compose.

- Project name: `garagem-da-paulinha`
- Service name: `app`
- Container name: `garagem-da-paulinha-app`
- App URL: `http://localhost:3000`
- VS Code Dev Container uses the same `app` service

To start with Docker:

```bash
docker compose up --build
```

In Docker Desktop, start the `app` service from the `garagem-da-paulinha` project. The published port `3000` will expose a clickable link to `http://localhost:3000`.

To reopen the project inside the same container in VS Code, use `Dev Containers: Reopen in Container`. The workspace will attach to the `app` service from `compose.yaml` instead of creating a random standalone container.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```
