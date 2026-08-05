import { createClient } from '@/utils/supabase/server';
import LinksDisplay from './LinksDisplay';

/**
 * Server component — fetches active links from Supabase (anon client, RLS-filtered)
 * and passes them to the LinksDisplay client component for rendering.
 * Only the data source has changed; all visual markup is identical to before.
 */
export default async function LinksPage() {
  const supabase = await createClient();

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('is_active', true)
    .order('category')
    .order('sort_order');

  const allLinks = links ?? [];
  const social = allLinks.filter((l) => l.category === 'social');
  const products = allLinks.filter((l) => l.category === 'product');

  return <LinksDisplay social={social} products={products} />;
}
