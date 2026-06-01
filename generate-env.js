/**
 * generate-env.js
 * Lê o arquivo .env e gera o env.js que injeta as variáveis no browser.
 *
 * Uso: node generate-env.js
 *
 * Instale a dependência: npm install dotenv
 */

const fs   = require('fs');
const path = require('path');

// Lê o .env manualmente (sem depender do pacote dotenv)
function parseEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('❌ Arquivo .env não encontrado. Copie .env.example para .env');
    process.exit(1);
  }
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

const envVars = parseEnv(path.join(__dirname, '.env'));

const output = `/**
 * env.js — gerado automaticamente por generate-env.js
 * NÃO edite manualmente. NÃO faça commit deste arquivo.
 * Gerado em: ${new Date().toISOString()}
 */
window.ENV = ${JSON.stringify(envVars, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'env.js'), output);
console.log('✅ env.js gerado com sucesso!');
console.log('   Variáveis exportadas:', Object.keys(envVars).join(', '));
