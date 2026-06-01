# Ivonne Store 🛍️

Site oficial da **Ivonne Store** — Loja de roupas masculinas e femininas em Santa Izabel do Pará, PA.

---

## 🗂️ Estrutura do projeto

```
ivonne_store/
├── index.html          # Site principal
├── admin.html          # Painel administrativo
├── config.js           # Carrega variáveis de ambiente no browser
├── env.js              # ⚠️ Gerado localmente — NÃO commitado
├── generate-env.js     # Script Node para gerar env.js a partir do .env
├── .env                # ⚠️ Credenciais reais — NÃO commitado
├── .env.example        # Modelo público de variáveis (sem valores reais)
├── .gitignore
└── README.md
```

---

## 🚀 Como rodar localmente

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/ivonne-store.git
cd ivonne-store
```

### 2. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Edite o .env com suas credenciais reais
```

### 3. Gere o env.js
```bash
node generate-env.js
```

### 4. Abra no navegador
Sirva os arquivos com qualquer servidor estático, por exemplo:
```bash
npx serve .
# ou
python3 -m http.server 8000
```

> ⚠️ Abrir o `index.html` diretamente no navegador (protocolo `file://`) também funciona, desde que o `env.js` esteja gerado.

---

## ☁️ Deploy (Netlify / Vercel)

1. Configure as variáveis de ambiente no painel da plataforma:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `ADMIN_USER`
   - `ADMIN_PASS`
   - `COUPON_CODE`
   - `COUPON_VALIDITY`

2. Configure o comando de build para gerar o `env.js`:
```bash
node generate-env.js
```

---

## 🗄️ Banco de dados (Supabase)

Tabela `coupon_registrations`:

```sql
CREATE TABLE coupon_registrations (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name              text NOT NULL,
  whatsapp          text NOT NULL,
  instagram         text NOT NULL,
  coupon_code       text NOT NULL,
  marketing_consent boolean NOT NULL DEFAULT false,
  created_at        timestamptz NOT NULL DEFAULT now()
);
```

---

## 🔐 Segurança

| Arquivo  | Commitado? | Contém credenciais? |
|----------|-----------|---------------------|
| `.env`   | ❌ Não    | ✅ Sim (valores reais) |
| `env.js` | ❌ Não    | ✅ Sim (gerado localmente) |
| `.env.example` | ✅ Sim | ❌ Não (apenas modelo) |
| `config.js` | ✅ Sim | ❌ Não (apenas lógica) |

---

## 📱 Acesso

- **Site:** `index.html`
- **Painel admin:** `admin.html`
- **Login padrão:** configurado via `.env`

---

*© 2026 Ivonne Store — Santa Izabel do Pará, PA*
