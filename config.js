/**
 * IVONNE STORE — Configuração central
 *
 * Em produção/servidor: lê as variáveis do .env via window.ENV
 * Em desenvolvimento local: usa os valores do .env injetados pelo servidor
 *
 * Como usar localmente:
 *   1. Copie .env.example para .env e preencha os valores
 *   2. Sirva os arquivos com um servidor que injeta o .env
 *      (ex: Live Server + plugin dotenv, ou use o env.js gerado abaixo)
 *
 * Para hospedagem estática (Netlify, Vercel, GitHub Pages):
 *   Configure as variáveis de ambiente no painel da plataforma.
 *   O arquivo env.js será gerado automaticamente no build.
 */

const ENV = window.ENV || {};

const CONFIG = {
  supabase: {
    url:    ENV.SUPABASE_URL    || '',
    anonKey: ENV.SUPABASE_ANON_KEY || '',
  },
  admin: {
    user: ENV.ADMIN_USER || 'admin',
    pass: ENV.ADMIN_PASS || '',
  },
  coupon: {
    code:     ENV.COUPON_CODE     || '',
    validity: ENV.COUPON_VALIDITY || '',
  },
};

// Aviso no console se rodar sem configuração
if (!CONFIG.supabase.url || !CONFIG.supabase.anonKey) {
  console.warn(
    '[Ivonne Store] ⚠️ Variáveis do Supabase não configuradas.\n' +
    'Copie .env.example para .env e preencha os valores.'
  );
}
