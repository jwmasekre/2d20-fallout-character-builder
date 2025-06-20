# 2d20-fallout-character-builder

a webapp for building and maintaining characters for modiphius' 2d20 fallout ttrpg

## getting started

this project uses svelte/drizzle/postgres as the techstack. setting up for development requires setting up npm, loading data into the postgres db, and setting up drizzle to properly access the db

### npm setup

```sh
npx sv create 2d20-fallout-character-builder
```

```ascii
┌  Welcome to the Svelte CLI! (v0.8.1)
│
◇  Which template would you like?
│  Svelte library
│
◇  Add TYPE checking with TypeScript?
│  Yes, using TypeScript syntax
│
◆  Project created
│
◇  What would you like to add to your project? (use arrow keys / space bar)
│  prettier, eslint, tailwindcss, sveltekit-adapter, drizzle, mdsvex, storybook
│
◇  tailwindcss: Which plugins would you like to add?
│  typography, forms
│
◇  sveltekit-adapter: Which SvelteKit adapter would you like to use?
│  auto
│
◇  drizzle: Which database would you like to use?
│  PostgreSQL
│
◇  drizzle: Which PostgreSQL client would you like to use?
│  Postgres.JS
│
◇  drizzle: Do you want to run the database locally with docker-compose?
│  Yes
│
◇  storybook: Running external command (npx storybook@latest init --skip-install --no-dev)
╭───────────────────────────────────────────────────────╮
│                                                       │
│   Adding Storybook version 8.6.12 to your project..   │
│                                                       │
╰───────────────────────────────────────────────────────╯
✔ What do you want to use Storybook for? › Documentation: MDX, auto-generated component docs, Testing: Fast browser-based component tests, watch mode
```

...

```ascii
│                                                                              │
│   Storybook was successfully installed in your project! 🎉                   │
│   Additional features: Documentation, Testing                                │
│                                                                              │
│   To run Storybook manually, run npm run storybook. CTRL+C to stop.          │
│                                                                              │
│   Wanna know more about Storybook? Check out https://storybook.js.org/       │
│   Having trouble or want to chat? Join us at https://discord.gg/storybook/   │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯
│
◆  Successfully setup add-ons
│
◇  Which package manager do you want to install dependencies with?
│  npm
│
◆  Successfully installed dependencies
│
◇  Successfully formatted modified files
│
◇  Project next steps ─────────────────────────────────────────────────────╮
│                                                                          │
│  1: cd ../2d20-fallout-character-builder                                 │
│  2: git init && git add -A && git commit -m "Initial commit" (optional)  │
│  3: npm run dev -- --open                                                │
│                                                                          │
│  To close the dev server, hit Ctrl-C                                     │
│                                                                          │
│  Stuck? Visit us at https://svelte.dev/chat                              │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────╯
│
◇  Add-on next steps ──────────────────────────────────────────────────╮
│                                                                      │
│  drizzle:                                                            │
│  - You will need to set DATABASE_URL in your production environment  │
│  - Run npm run db:start to start the docker container                │
│  - Run npm run db:push to update your database schema                │
│                                                                      │
├──────────────────────────────────────────────────────────────────────╯
│
└  You're all set!
```

```sh
cd ../2d20-fallout-character-builder
npm run dev -- --open
```

### db setup

see [db_schema.sql](./db_schema.sql) for the updated schema (i used dbdiagram.io to actually plan it out properly)

```sh
sudo -u postgres -i
createdb 2d20fallout
psql 2d20fallout
```

```sql
CREATE ROLE svelte WITH LOGIN PASSWORD 'thisisonlyatest';
CREATE SCHEMA new_content;
SET search_path TO new_content;

```sql
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA new_content TO svelte;
```

```sh
npx drizzle-kit pull
```

```ascii
No config path provided, using default 'drizzle.config.ts'
Reading config file '/home/josh/2d20-fallout-character-builder/drizzle.config.ts'
Pulling from ['new_content'] list of schemas

Using 'postgres' driver for database querying
[✓] 132 tables fetched
[✓] 752 columns fetched
[✓] 0   enums fetched
[✓] 0   indexes fetched
[✓] 202 foreign keys fetched
[✓] 0   policies fetched
[✓] 0   check constraints fetched
[✓] 0   views fetched

[i] No SQL generated, you already have migrations in project
[✓] Your schema file is ready ➜ drizzle/schema.ts 🚀
[✓] Your relations file is ready ➜ drizzle/relations.ts 🚀
```

copy over drizzle/*.ts to lib/server/db

## todo

* builder fixes
    * review page with final calculations
    * ~~readme update~~
    * ~~limit special array options with trait limitations~~
    * ~~update stats logic to handle traits and perks~~
    * ~~clean up text for misc data~~
    * clearly comment code
    * ~~add ncr trooper's second weapon selection (missing from db)~~
    * ~~hide equipment headings if no equipment of that type~~
    * figure out why too many changes starts creating errors with pulling data (need to purge data?)
    * ~~fix the builder nav logic to show every page that's been visited and is also valid~~
    * ~~add rad points for children of atom~~
    * un-monolith builder page
        * break up pagination
        * consolidate types
    * cleanup unused stuff
* integrations
    * tailwind?
    * storybook?

## roadmap

* 1.0
    * fully implement character save/load
    * build character sheet
    * make character sheet interactive and savable
        * notes
        * injury tracking
        * disease tracking
        * fatigue management
        * caps and xp management
    * export/import character (json)
    * build level up flow
    * build basic inventory management
        * ammo tracking
        * add/remove items
    * ui overhaul
* 2.0
    * ux updates (as needed)
    * account creation
        * auth
        * profile managmement
        * delection
        * character management
    * gm managment tools
        * party/campaign creation and management
        * grant/remove xp/caps
        * view-only and full access to party characters
    * mod handling
        * weapon builder
        * apparel builder
    * legendary handling
    * consumable handling (use consumable and see temporary changes)
    * addiction handling (apply appropriate changes unless consumable is active)
* 3.0
    * add NPC data
    * gm console
        * track AP
        * create, load, save NPCs
        * encounter tracking (w/ initiative tracker)
        * extended test tracking
    * ally management - grant NPC access to specific characters
* 4.0
    * integrate cheatsheet/hints
    * integrate references
    * loot table roller
    * crafting guide
    * other call values (?)
    * storefront management (GM)
    * storefront view (characters)
* 5.0
    * scavenging locations
    * settlements
    * factions
    * encounter tables
* 6.0
    * vehicles
    * specific junk
