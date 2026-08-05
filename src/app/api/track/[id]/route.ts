import { type NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/utils/supabase/service';

/**
 * POST /api/track/[id]
 * Public endpoint — atomically increments visit_count for a link.
 * Called fire-and-forget from the public /links page on every click.
 * Uses service role (bypasses RLS) since anonymous users can't write.
 */
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return new NextResponse(null, { status: 400 });
  }

  const supabase = createServiceClient();

  // Atomic increment via Postgres function (no read-write race condition)
  const { error } = await supabase.rpc('increment_link_visit', { link_id: id });

  if (error) {
    // Silently fail — never block the user's navigation for analytics
    console.error('[track] increment failed:', error.message);
  }

  return new NextResponse(null, { status: 204 });
}
