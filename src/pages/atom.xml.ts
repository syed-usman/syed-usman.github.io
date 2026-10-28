import type { APIRoute } from 'astro';
import { SITE, getPosts, postUrl } from '../site';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Atom (not RSS) to keep the feed URL and format subscribers of the old Jekyll site already use.
export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const home = new URL('/', site).href;
  const updated = (posts[0]?.data.date ?? new Date()).toISOString();

  const entries = posts.map((post) => {
    const url = new URL(postUrl(post), site).href;
    return `  <entry>
    <title>${escape(post.data.title)}</title>
    <link href="${url}"/>
    <id>${url}</id>
    <published>${post.data.date.toISOString()}</published>
    <updated>${post.data.date.toISOString()}</updated>
    ${post.data.description ? `<summary>${escape(post.data.description)}</summary>` : ''}
    <content type="html">${escape(post.rendered?.html ?? '')}</content>
  </entry>`;
  });

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escape(SITE.title)}</title>
  <subtitle>${escape(SITE.description)}</subtitle>
  <link href="${new URL('/atom.xml', site).href}" rel="self"/>
  <link href="${home}"/>
  <id>${home}</id>
  <updated>${updated}</updated>
  <author><name>${escape(SITE.author)}</name></author>
${entries.join('\n')}
</feed>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } });
};
