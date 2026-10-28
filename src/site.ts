import { getCollection, type CollectionEntry } from 'astro:content';

export const SITE = {
  title: 'Syed Usman',
  tagline: 'DevOps & Infrastructure Engineer',
  description: 'Senior DevOps/Infrastructure Engineer in Berlin, DE',
  author: 'Syed Usman',
  locale: 'en',
};

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/work/', label: 'My Work' },
];

export const SOCIAL = [
  { label: 'Email', href: 'mailto:syedusmankaleem@live.com' },
  { label: 'GitHub', href: 'https://github.com/syed-usman' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/syed-usman-kaleem/' },
  { label: 'Facebook', href: 'https://www.facebook.com/usmanshah01' },
  { label: 'Instagram', href: 'https://www.instagram.com/syedusmankaleem/' },
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
