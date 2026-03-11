# This is e-commerce shop with auth

https://abelohost-9h53kvhmh-george-loginovs-projects.vercel.app/

## Used stack:

- TypeScript
- NextJS (App Router)
- Zustand
- Axios
- SCSS-модули
- Prettier
- ESLint
- Stylelint

### 1. First, copy .env.sample -> .env

#### If you want to show the use of a production build, see /docker-compose.yml:

    7  target: prod
    8  # change target for development -> dev

#### If you want to show the use of a development build:

    7  target: dev
    8  # change target for development -> dev

##### The application is available at http://localhost

#### 1.1. If you will be using traefik, add in .env:

    COMPOSE_FILE=docker-compose.traefik.yml

##### The application is available at https://abelohost.docker

### 2. Second, copy /src/.env.sample -> /src/.env

### 3. Third, run `docker-compose build`

### 4. Fourthly, run `docker-compose up -d`

### 5. For 'down' server, run `docker-compose down --remove-orphans`