import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/utils/supabase/service';

/** GET /api/admin/links — all links (active + inactive), ordered by category → sort_order */
export async function GET() {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from('links')
    .select('*')
    .order('category')
    .order('sort_order');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

/** POST /api/admin/links — insert a new link; auto-increments sort_order within the category */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { category, label, url, icon } = body as {
    category?: string;
    label?: string;
    url?: string;
    icon?: string;
  };

  if (!category || !label || !url) {
    return NextResponse.json(
      { error: 'category, label, and url are required' },
      { status: 400 },
    );
  }

  if (!['social', 'product'].includes(category)) {
    return NextResponse.json(
      { error: 'category must be "social" or "product"' },
      { status: 400 },
    );
  }

  const supabase = createServiceClient();

  // Determine next sort_order for this category
  const { data: existing } = await supabase
    .from('links')
    .select('sort_order')
    .eq('category', category)
    .order('sort_order', { ascending: false })
    .limit(1);

  const nextOrder = existing && existing.length > 0 ? existing[0].sort_order + 1 : 1;

  const { data, error } = await supabase
    .from('links')
    .insert({ category, label, url, icon: icon ?? null, sort_order: nextOrder })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
