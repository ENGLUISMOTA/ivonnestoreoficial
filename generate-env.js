/**
 * generate-env.js
 * Gera o env.js que injeta as variáveis de ambiente no browser.
 *
 * Funciona em dois modos:
 *   - Local: lê o arquivo .env
 *   - Vercel / CI: lê process.env (variáveis já injetadas pelo ambiente)
 *
 * Uso: node generate-env.js
 */

const fs = require('fs');
const path = require('path');

const EXPECTED_VARS = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'ADMIN_USER',
  'ADMIN_PASS',
  'COUPON_CODE',
  'COUPON_VALIDITY',
];

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  const vars = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (key) vars[key.trim()] = rest.join('=').trim();
  }
  return vars;
}

function collectVars() {
  const fromProcess = {};
  let hasProcessVars = false;

  for (const key of EXPECTED_VARS) {
    if (process.env[key]) {
      fromProcess[key] = process.env[key];
      hasProcessVars = true;
    }
  }

  if (hasProcessVars) {
    console.log('Usando variaveis do ambiente (Vercel/CI)');
    return fromProcess;
  }

  const envPath = path.join(__dirname, '.env');
  const fromFile = parseEnvFile(envPath);

  if (fromFile) {
    console.log('Usando variaveis do arquivo .env local');
    return fromFile;
  }

  console.error('Nenhuma variavel de ambiente encontrada.');
  process.exit(1);
}

const envVars = collectVars();

const missing = EXPECTED_VARS.filter(k => !envVars[k]);
if (missing.length > 0) {
  console.warn('Variaveis nao encontradas:', missing.join(', '));
}

const output = `/**
 * env.js — gerado automaticamente por generate-env.js
 * NAO edite manualmente. NAO faca commit deste arquivo.
 * Gerado em: ${new Date().toISOString()}
 */
window.ENV = ${JSON.stringify(envVars, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'env.js'), output);
console.log('env.js gerado com sucesso!');
console.log('Variaveis exportadas:', Object.keys(envVars).join(', '));