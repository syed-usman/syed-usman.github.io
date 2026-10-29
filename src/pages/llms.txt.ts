import type { APIRoute } from 'astro';
import { llmsTxt } from '../llms';

export const GET: APIRoute = async ({ site }) =>
  new Response(await llmsTxt(site!, false), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
