import { getCollection, type CollectionEntry } from 'astro:content';

export const SITE = {
  title: 'Syed Usman',
  tagline: 'A decade of hardware, cloud and Kubernetes. Now infrastructure built with AI, for the AI age.',
  description:
    'Syed Usman is an engineer in Berlin who does almost all of his DevOps and infrastructure work with AI. Ten years across software, IoT, solutions architecture and Kubernetes platforms.',
  author: 'Syed Usman',
  alternateName: 'Syed Usman Kaleem',
  jobTitle: 'Infrastructure & DevOps Engineer',
  email: 'syedusmankaleem@live.com',
  locale: 'en',
};

export const NAV = [
  { href: '/writing/', label: 'Writing' },
  { href: '/work/', label: 'Work' },
  { href: '/about/', label: 'About' },
];

export const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/syed-usman' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/syedusmankaleem/' },
  { label: 'Atom feed', href: '/atom.xml' },
];

export type Post = CollectionEntry<'posts'>;

/** Published posts, newest first. Drafts are only shown by `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Keeps the old Jekyll permalinks: "2017-02-17-migrating-db" -> "/2017-02-17/migrating-db/". */
export function postSlug(post: Post): string {
  return post.id.replace(/^(\d{4}-\d{2}-\d{2})-/, '$1/');
}

export function postUrl(post: Post): string {
  return `/${postSlug(post)}/`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function shortDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export function readingTime(post: Post): string {
  const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 230))} min read`;
}
