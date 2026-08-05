'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdDragIndicator } from 'react-icons/md';
import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Link {
  id: string;
  category: 'social' | 'product';
  label: string;
  url: string;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function GripIcon() {
  return <MdDragIndicator size={18} aria-hidden="true" />;
}

function EditIcon() {
  return <RiEdit2Line size={18} aria-hidden="true" />;
}

function TrashIcon() {
  return <RiDeleteBinLine size={18} aria-hidden="true" />;
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      disabled={disabled}
      className={`relative shrink-0 w-9 h-5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flax-smoke-400 disabled:opacity-40 ${
        checked ? 'bg-emerald-500' : 'bg-flax-smoke-700'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

// ─── Shared input style ───────────────────────────────────────────────────────

const inputCls =
  'w-full bg-flax-smoke-900 text-flax-smoke-100 placeholder-flax-smoke-600 text-sm font-fancy rounded-lg px-3 py-3 outline-none border border-flax-smoke-800 focus:border-flax-smoke-500 transition-colors';

// ─── Sortable Row ─────────────────────────────────────────────────────────────

interface SortableRowProps {
  link: Link;
  onToggle: (link: Link) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (link: Link) => Promise<void>;
}

function SortableRow({ link, onToggle, onDelete, onUpdate }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(link.label);
  const [editUrl, setEditUrl] = useState(link.url);
  const [editIcon, setEditIcon] = useState(link.icon ?? '');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState(false);

  // Keep local state in sync if parent updates the link
  useEffect(() => {
    setEditLabel(link.label);
    setEditUrl(link.url);
    setEditIcon(link.icon ?? '');
  }, [link]);

  const handleSave = async () => {
    setSaving(true);
    await onUpdate({ ...link, label: editLabel, url: editUrl, icon: editIcon || null });
    setSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditLabel(link.label);
    setEditUrl(link.url);
    setEditIcon(link.icon ?? '');
    setIsEditing(false);
  };

  const handleToggle = async () => {
    setToggling(true);
    await onToggle(link);
    setToggling(false);
  };

  const handleDelete = async () => {
    await onDelete(link.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-xl border transition-opacity ${
        isDragging
          ? 'opacity-40 border-flax-smoke-600 bg-flax-smoke-900'
          : 'opacity-100 border-flax-smoke-800 bg-[#161614]'
      }`}
    >
      {/* Main row */}
      <div className="flex items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3">
        {/* Drag handle — larger touch target on mobile */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-flax-smoke-700 hover:text-flax-smoke-400 p-2 touch-none transition-colors shrink-0"
          aria-label="Drag to reorder"
        >
          <GripIcon />
        </button>

        {/* Label + URL */}
        <div className="flex-1 min-w-0 mr-1">
          <p className="font-fancy font-semibold text-flax-smoke-100 text-sm leading-tight truncate">
            {link.label}
          </p>
          <p className="font-fancy text-flax-smoke-600 text-xs truncate mt-0.5">
            {link.url}
          </p>
        </div>

        {/* Active toggle */}
        <Toggle checked={link.is_active} onChange={handleToggle} disabled={toggling} />

        {/* Edit button */}
        <button
          onClick={() => { setIsEditing(!isEditing); setConfirmDelete(false); }}
          className={`p-2.5 rounded-lg transition-colors ${
            isEditing
              ? 'text-flax-smoke-100 bg-flax-smoke-800'
              : 'text-flax-smoke-500 hover:text-flax-smoke-100 hover:bg-flax-smoke-900'
          }`}
          aria-label={isEditing ? 'Close editor' : 'Edit link'}
        >
          <EditIcon />
        </button>

        {/* Delete / Confirm */}
        {confirmDelete ? (
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleDelete}
              className="font-fancy text-red-400 hover:text-red-300 text-xs px-2.5 py-1.5 border border-red-500/30 rounded-full transition-colors"
            >
              {/* Shorter label on xs saves space */}
              <span className="sm:hidden">Yes</span>
              <span className="hidden sm:inline">Delete</span>
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="font-fancy text-flax-smoke-500 hover:text-flax-smoke-300 text-xs px-2.5 py-1.5 border border-flax-smoke-700 rounded-full transition-colors"
            >
              <span className="sm:hidden">No</span>
              <span className="hidden sm:inline">Cancel</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => { setConfirmDelete(true); setIsEditing(false); }}
            className="p-2.5 rounded-lg text-flax-smoke-700 hover:text-red-400 hover:bg-red-400/10 transition-colors"
            aria-label="Delete link"
          >
            <TrashIcon />
          </button>
        )}
      </div>

      {/* Inline edit form */}
      {isEditing && (
        <div className="border-t border-flax-smoke-800 p-3 flex flex-col gap-2">
          <input
            value={editLabel}
            onChange={(e) => setEditLabel(e.target.value)}
            placeholder="Label"
            className={inputCls}
          />
          <input
            value={editUrl}
            onChange={(e) => setEditUrl(e.target.value)}
            placeholder="URL"
            className={inputCls}
          />
          <input
            value={editIcon}
            onChange={(e) => setEditIcon(e.target.value)}
            placeholder="Icon name (optional, e.g. instagram)"
            className={inputCls}
          />
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              disabled={saving || !editLabel || !editUrl}
              className="flex-1 bg-flax-smoke-500 hover:bg-flax-smoke-400 disabled:opacity-40 text-flax-smoke-50 rounded-full py-3 text-xs font-semibold uppercase font-fancy transition-colors"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 border border-flax-smoke-700 text-flax-smoke-400 hover:text-flax-smoke-200 rounded-full py-3 text-xs font-semibold uppercase font-fancy transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Add Link Form ────────────────────────────────────────────────────────────

function AddLinkForm({
  category,
  onAdd,
}: {
  category: 'social' | 'product';
  onAdd: (link: Link) => void;
}) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim() || !url.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, label: label.trim(), url: url.trim(), icon: icon.trim() || undefined }),
      });
      if (res.ok) {
        const newLink = await res.json();
        onAdd(newLink);
        setLabel('');
        setUrl('');
        setIcon('');
        setOpen(false);
      } else {
        const data = await res.json();
        setError(data.error ?? 'Failed to add link.');
      }
    } catch {
      setError('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full mt-3 border border-dashed border-flax-smoke-800 hover:border-flax-smoke-500 text-flax-smoke-600 hover:text-flax-smoke-300 rounded-xl py-4 text-sm font-fancy font-semibold uppercase tracking-wide transition-colors"
      >
        + Add link
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 rounded-xl border border-flax-smoke-700 bg-[#161614] p-3 flex flex-col gap-2"
    >
      <p className="font-fancy text-flax-smoke-500 text-xs uppercase tracking-widest mb-1">
        New {category === 'social' ? 'Social' : 'Product'} Link
      </p>
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Label *"
        required
        className={inputCls}
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL *"
        required
        className={inputCls}
      />
      <input
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
        placeholder="Icon name (optional)"
        className={inputCls}
      />
      {error && (
        <p className="text-red-400 text-xs font-fancy">{error}</p>
      )}
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-flax-smoke-500 hover:bg-flax-smoke-400 disabled:opacity-40 text-flax-smoke-50 rounded-full py-3 text-xs font-semibold uppercase font-fancy transition-colors"
        >
          {loading ? 'Adding…' : 'Add'}
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setError(''); }}
          className="flex-1 border border-flax-smoke-700 text-flax-smoke-400 hover:text-flax-smoke-200 rounded-full py-3 text-xs font-semibold uppercase font-fancy transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ─── Links Section (DnD) ─────────────────────────────────────────────────────

function LinksSection({
  title,
  category,
  links,
  onLinksChange,
}: {
  title: string;
  category: 'social' | 'product';
  links: Link[];
  onLinksChange: (links: Link[]) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);
    const reordered = arrayMove(links, oldIndex, newIndex);
    onLinksChange(reordered); // optimistic update

    await fetch('/api/admin/links/reorder', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, orderedIds: reordered.map((l) => l.id) }),
    });
  };

  const handleToggle = async (link: Link) => {
    const updated = { ...link, is_active: !link.is_active };
    onLinksChange(links.map((l) => (l.id === link.id ? updated : l)));
    await fetch(`/api/admin/links/${link.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !link.is_active }),
    });
  };

  const handleDelete = async (id: string) => {
    onLinksChange(links.filter((l) => l.id !== id));
    await fetch(`/api/admin/links/${id}`, { method: 'DELETE' });
  };

  const handleUpdate = async (updated: Link) => {
    onLinksChange(links.map((l) => (l.id === updated.id ? updated : l)));
    await fetch(`/api/admin/links/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        label: updated.label,
        url: updated.url,
        icon: updated.icon,
      }),
    });
  };

  const handleAdd = (newLink: Link) => {
    onLinksChange([...links, newLink]);
  };

  return (
    <section className="bg-[#111110] rounded-2xl p-3 sm:p-5 border border-flax-smoke-900">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-fancy text-flax-smoke-400 text-xs font-semibold uppercase tracking-widest">
          {title}
        </h2>
        <span className="font-fancy text-flax-smoke-700 text-xs">
          {links.length} link{links.length !== 1 ? 's' : ''}
        </span>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={links.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {links.length === 0 && (
              <p className="font-fancy text-flax-smoke-700 text-sm text-center py-4">
                No links yet.
              </p>
            )}
            {links.map((link) => (
              <SortableRow
                key={link.id}
                link={link}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <AddLinkForm category={category} onAdd={handleAdd} />
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminLinksPage() {
  const router = useRouter();
  const [socialLinks, setSocialLinks] = useState<Link[]>([]);
  const [productLinks, setProductLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetch('/api/admin/links')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Link[]) => {
        setSocialLinks(data.filter((l) => l.category === 'social'));
        setProductLinks(data.filter((l) => l.category === 'product'));
      })
      .catch(() => setError('Failed to load links. Check your Supabase connection.'))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0B0B0A] text-flax-smoke-200 selection:bg-flax-smoke-500 selection:text-flax-smoke-100">
      {/* ── Header ── */}
      <header className="sticky top-0 z-20 border-b border-flax-smoke-900 bg-[#0B0B0A]/90 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2">
          {/* Left: breadcrumb */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="hidden sm:inline font-fancy text-flax-smoke-600 text-xs uppercase tracking-widest shrink-0">
              Admin
            </span>
            <span className="hidden sm:inline text-flax-smoke-800">/</span>
            <h1 className="font-fancy text-flax-smoke-100 text-sm font-semibold truncate">
              Links Manager
            </h1>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* On mobile: icon-only link; on sm+: full label */}
            <a
              href="/links"
              target="_blank"
              rel="noopener noreferrer"
              className="font-fancy text-flax-smoke-500 hover:text-flax-smoke-200 text-xs underline underline-offset-2 transition-colors"
              aria-label="View public links page"
            >
              <span className="sm:hidden">↗</span>
              <span className="hidden sm:inline">View public page ↗</span>
            </a>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="bg-flax-smoke-900 hover:bg-flax-smoke-800 border border-flax-smoke-700 text-flax-smoke-300 rounded-full px-3 sm:px-4 py-2 text-xs font-semibold uppercase font-fancy transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {loggingOut ? '…' : <><span className="sm:hidden">Out</span><span className="hidden sm:inline">Log out</span></>}
            </button>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {loading && (
          <div className="flex items-center justify-center py-24">
            <p className="font-fancy text-flax-smoke-600 text-sm uppercase tracking-widest">
              Loading…
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-4 text-center">
            <p className="font-fancy text-red-400 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-col gap-6">
            <LinksSection
              title="Social Links"
              category="social"
              links={socialLinks}
              onLinksChange={setSocialLinks}
            />
            <LinksSection
              title="Products I Review"
              category="product"
              links={productLinks}
              onLinksChange={setProductLinks}
            />
          </div>
        )}
      </main>
    </div>
  );
}
