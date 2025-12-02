import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "SUPERSEGREDO-MUDA-ISSO";
app.get("/me", auth, (req, res) => {
    db.get(
        "SELECT id, name, username, role, expires_at FROM users WHERE id = ?",
        [req.user.id],
        (err, user) => {
            if (err) return res.status(500).json({ error: "Erro interno" });
            if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
            res.json(user);
        }
    );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) return res.status(500).json({ error: "Erro no servidor" });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Senha incorreta" });

    // Verificar expiração
    if (user.expires_at && new Date(user.expires_at) < new Date()) {
      return res.status(403).json({ error: "Acesso expirado" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({ token });
  });
});
import { auth, isAdmin } from "./middleware.js";
app.post("/users", auth, isAdmin, async (req, res) => {
  const { username, name, password, expires_at, role } = req.body;

if (!password || password.length < 6) {
  return res.status(400).json({ error: "A senha deve ter no mínimo 6 caracteres" });
}

  const hash = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (username, name, password, role, created_at, expires_at) VALUES (?, ?, ?, datetime('now'), ?)",
    [username, name, hash, role, expires_at],
    function (err) {
      if (err) return res.status(400).json({ error: "Usuário já existe" });

      res.json({ id: this.lastID, username, role });
    }
  );
});
app.get("/users", auth, isAdmin, (req, res) => {
  db.all("SELECT id, name, username, role, created_at, expires_at FROM users", (err, rows) => {
    res.json(rows);
  });
});
app.put("/users/:id", auth, isAdmin, async (req, res) => {
  const { username, password, role, expires_at } = req.body;

  const hash = password ? await bcrypt.hash(password, 10) : null;

  db.run(
    `UPDATE users SET
      name = COALESCE(?, name),
      username = COALESCE(?, username),
      password = COALESCE(?, password),
      role = COALESCE(?, role),
      expires_at = COALESCE(?, expires_at)
    WHERE id = ?`,
    [username, hash, role, expires_at, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: "Erro ao atualizar" });
      res.json({ status: "ok" });
    }
  );
});
app.listen(5000, () => console.log("API rodando na porta 5000"));
