import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/utils/supabase/service';

/**
 * PATCH /api/admin/links/reorder
 * Body: { category: string; orderedIds: string[] }
 * Updates sort_order for every id to match its array index (1-based).
 */
export async function PATCH(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { category, orderedIds } = body as {
    category?: string;
    orderedIds?: string[];
  };

  if (!category || !Array.isArray(orderedIds) || orderedIds.length === 0) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Parallel updates — each id gets its new 1-based sort_order
  const results = await Promise.all(
    orderedIds.map((id, index) =>
      supabase
        .from('links')
        .update({
          sort_order: index + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('category', category),
    ),
  );

  const failed = results.find((r) => r.error);
  if (failed?.error) {
    return NextResponse.json({ error: failed.error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
