import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/utils/supabase/service';

/** PUT /api/admin/links/[id] — partial update: label, url, icon, is_active */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  // Build partial update — only include defined keys
  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };
  if (body.label !== undefined) patch.label = body.label;
  if (body.url !== undefined) patch.url = body.url;
  if (body.icon !== undefined) patch.icon = body.icon;
  if (body.is_active !== undefined) patch.is_active = body.is_active;

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('links')
    .update(patch)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

/** DELETE /api/admin/links/[id] — permanently removes the link row */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const supabase = createServiceClient();
  const { error } = await supabase.from('links').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
