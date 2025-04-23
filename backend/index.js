import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());

const dbPromise = open({
  filename: "./db.sqlite",
  driver: sqlite3.Database,
});

const SECRET = "segredo"; // segredo para JWT

// Middleware para verificar o token
const verifyToken = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Token ausente" });

  const [, token] = auth.split(" ");

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

const checkAdmin = async (req, res, next) => {
  const db = await dbPromise;
  const user = await db.get("SELECT * FROM users WHERE id = ?", [req.userId]);

  if (user?.role !== "admin") {
    return res.status(403).json({ error: "Acesso negado. Apenas administradores." });
  }

  next();
};


// Criar tabela inicial
const init = async () => {
  const db = await dbPromise;

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      fullName TEXT,
      role TEXT
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT,
      price REAL,
      quantity INTEGER
    )
  `);
};

// ROTAS

// Cadastro
app.post("/register", async (req, res) => {
  const { email, password, fullName } = req.body;
  const role = "vendedor"; // todo mundo começa como vendedor

  const db = await dbPromise;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    await db.run(
      "INSERT INTO users (email, password, fullName, role) VALUES (?, ?, ?, ?)",
      [email, hashedPassword, fullName, role]
    );

    res.status(201).send();
  } catch (err) {
    res.status(500).json({ error: "Erro ao cadastrar" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const db = await dbPromise;

  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });

  const { password: _, ...userWithoutPassword } = user;

  res.json({ token, user: userWithoutPassword });
});

// ==========================
// ROTAS PROTEGIDAS DE PRODUTO
// ==========================

app.get("/products", verifyToken, async (req, res) => {
  const db = await dbPromise;
  const products = await db.all("SELECT * FROM products");
  res.json(products);
});

app.post("/products", verifyToken, async (req, res) => {
  const { id, name, price, quantity } = req.body;
  const db = await dbPromise;

  try {
    await db.run(
      "INSERT INTO products (id, name, price, quantity) VALUES (?, ?, ?, ?)",
      [id, name, price, quantity]
    );
    res.status(201).send();
  } catch (err) {
    res.status(500).json({ error: "Erro ao adicionar produto" });
  }
});

app.put("/products/:id", verifyToken, async (req, res) => {
  const { name, price, quantity } = req.body;
  const db = await dbPromise;

  try {
    await db.run(
      "UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?",
      [name, price, quantity, req.params.id]
    );
    res.send();
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
});

app.delete("/products/:id", verifyToken, async (req, res) => {
  const db = await dbPromise;

  try {
    await db.run("DELETE FROM products WHERE id = ?", [req.params.id]);
    res.send();
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir produto" });
  }
});

app.get("/users", verifyToken, checkAdmin, async (req, res) => {
  const db = await dbPromise;
  const users = await db.all("SELECT id, email, fullName, role FROM users");
  res.json(users);
});

app.put("/users/:id/role", verifyToken, checkAdmin, async (req, res) => {
  const { role } = req.body;
  const db = await dbPromise;

  if (!["admin", "vendedor"].includes(role)) {
    return res.status(400).json({ error: "Role inválido" });
  }

  await db.run("UPDATE users SET role = ? WHERE id = ?", [role, req.params.id]);
  res.send();
});


// Inicialização do servidor
const PORT = 3001;
app.listen(PORT, async () => {
  await init();
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
