import { getCollection, type CollectionEntry } from 'astro:content';

export const SITE = {
  title: 'Syed Usman',
  tagline: 'Engineering leader and platform engineer in Berlin',
  headline: 'I’ve led engineering teams and built the platforms they run on. Now I run infrastructure with AI agents, and design the guardrails that keep them safe.',
  description:
    'Syed Usman is an engineering leader and platform engineer in Berlin: two years as tech lead of eight engineers, ten years across software, IoT and Kubernetes platforms, and now infrastructure run almost entirely with AI agents.',
  author: 'Syed Usman',
  alternateName: 'Syed Usman Kaleem',
  jobTitle: 'Senior DevOps & Platform Engineer',
  email: 'syedusmankaleem@live.com',
  locale: 'en',
  /** GoatCounter site code (https://<code>.goatcounter.com). Empty = no analytics script. */
  goatcounter: 'syedusman',
};

export const NAV = [
  { href: '/writing/', label: 'Writing' },
  { href: '/work/', label: 'Work' },
  { href: '/about/', label: 'About' },
];

export const SOCIAL = [
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
