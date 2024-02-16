const db = require("./db");

const usersTableStatement = `CREATE TABLE IF NOT EXISTS "users" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "email" varchar UNIQUE NOT NULL,
  "username" varchar NOT NULL,
  "password" varchar NOT NULL
);`;

const oauthCredentialsTableStatement = `CREATE TABLE IF NOT EXISTS "oauth_credentials" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "provider" VARCHAR NOT NULL,
  "provider_user_id" VARCHAR UNIQUE NOT NULL,
	FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
);`;

const productsTableStatement = `CREATE TABLE IF NOT EXISTS "products" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "price" decimal NOT NULL,
  "description" VARCHAR(255),
  "image" VARCHAR(255)
);`;

const ordersTableStatement = `CREATE TABLE IF NOT EXISTS "orders" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "status" VARCHAR NOT NULL,
  "user_id" integer NOT NULL,
  "total" decimal NOT NULL,
  "created" timestamp NOT NULL,
  "modified" timestamp,
  FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
);`;

const cartsTableStatement = `CREATE TABLE IF NOT EXISTS "carts" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer NOT NULL,
  "created" timestamp,
  FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
);`;

const cartsProductsTableStatement = `CREATE TABLE IF NOT EXISTS "carts_products" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "cart_id" integer NOT NULL,
  "product_id" integer NOT NULL,
  "qty" integer NOT NULL,
  FOREIGN KEY ("cart_id") REFERENCES "carts" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("product_id") REFERENCES "products" ("id")
);`;

const ordersProductsTableStatement = `CREATE TABLE IF NOT EXISTS "orders_products" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "product_id" integer NOT NULL,
  "order_id" integer NOT NULL,
  "qty" integer NOT NULL,
  FOREIGN KEY ("product_id") REFERENCES "products" ("id"),
  FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE CASCADE
);`;

const createDB = async () => {
  await db.query(usersTableStatement);
  await db.query(oauthCredentialsTableStatement);
  await db.query(productsTableStatement);
  await db.query(ordersTableStatement);
  await db.query(cartsTableStatement);
  await db.query(cartsProductsTableStatement);
  await db.query(ordersProductsTableStatement);
};

createDB();

// `ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;`

// `ALTER TABLE "carts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;`

// `ALTER TABLE "carts_products" ADD FOREIGN KEY ("cart_id") REFERENCES "carts" ("id") ON DELETE CASCADE;`

// `ALTER TABLE "carts_products" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");`

// `ALTER TABLE "orders_products" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");`

// `ALTER TABLE "orders_products" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE CASCADE;`
