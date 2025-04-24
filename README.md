## mlaku-mulu

## Installation

Install this project bun

```bash
  git clone https://github.com/IlhamSetiaji/mlaku-mulu.git
  cd mlaku-mulu
  cp .env.example .env
  bun install
```

To migrate the database schema

```bash
  bunx prisma db push
  bunx prisma generate
```

To seed the database

```bash
  npx prisma db seed
```

to run this project

```bash
  bun run dev
```

account from seeder (every account use "changeme" as password)

~ Admin ~
```bash
admin@test.test
```

~ Staff ~
```bash
staff@test.test
```

~ Tourist ~
```bash
tourist@test.test
```