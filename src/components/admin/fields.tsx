import { useRef, useState, type ReactNode } from "react";
import * as Lucide from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { uploadMedia, videoThumbnail, isVideoUrl } from "@/lib/media";
import { ICON_OPTIONS } from "@/content/site-content";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

export function TextField({
  label, value, onChange, placeholder,
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <Field label={label}>
      <Input value={value ?? ""} placeholder={placeholder ?? ""} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

export function AreaField({
  label, value, onChange, rows = 3,
}: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <Field label={label}>
      <Textarea rows={rows} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

export function SwitchField({
  label, checked, onChange,
}: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between rounded-md border p-3">
      <Label className="text-sm">{label}</Label>
      <Switch checked={!!checked} onCheckedChange={onChange} />
    </div>
  );
}

export function IconPicker({
  label, value, onChange,
}: { label: string; value: string; onChange: (v: string) => void }) {
  const Cmp = (Lucide as unknown as Record<string, React.ComponentType<{ className?: string }>>)[value] ?? Lucide.Sparkles;
  return (
    <Field label={label}>
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border">
          <Cmp className="h-4 w-4" />
        </span>
        <select
          className="h-9 w-full rounded-md border bg-background px-2 text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {ICON_OPTIONS.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>
    </Field>
  );
}

export function MediaField({
  label, value, onChange, accept = "image/*,video/*",
}: { label: string; value: string; onChange: (v: string) => void; accept?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function pick(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadMedia(file));
      toast.success("Uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Field label={label}>
      <div className="flex flex-wrap items-start gap-3">
        <div className="flex h-20 w-28 items-center justify-center overflow-hidden rounded-md border bg-muted">
          {value ? (
            isVideoUrl(value) ? (
              <video src={value} className="h-full w-full object-cover" muted />
            ) : (
              <img src={value} alt={label} className="h-full w-full object-cover" />
            )
          ) : (
            <Lucide.Image className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 space-y-2 min-w-[180px]">
          <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder="URL or upload a file" />
          <div className="flex gap-2">
            <Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => inputRef.current?.click()}>
              {busy ? <Lucide.Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Lucide.Upload className="mr-1 h-3.5 w-3.5" />}
              Upload
            </Button>
            {value ? (
              <Button type="button" size="sm" variant="ghost" onClick={() => onChange("")}>Clear</Button>
            ) : null}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => void pick(e.target.files?.[0])}
          />
        </div>
      </div>
    </Field>
  );
}

/** Video field accepting an upload or a pasted YouTube / Reel / Vimeo link. */
export function VideoField({
  value, onChange, onThumb,
}: { value: string; onChange: (v: string) => void; onThumb?: (url: string) => void }) {
  const thumb = videoThumbnail(value);
  return (
    <div className="space-y-2">
      <MediaField label="Video (upload or paste link)" value={value} onChange={onChange} accept="video/*" />
      {thumb ? (
        <div className="flex items-center gap-2">
          <img src={thumb} alt="Video preview" className="h-14 w-24 rounded object-cover" />
          {onThumb ? (
            <Button type="button" size="sm" variant="outline" onClick={() => onThumb(thumb)}>
              Use as thumbnail
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function ListEditor<T extends { id: string }>({
  items, onChange, create, render, addLabel = "Add item",
}: {
  items: T[];
  onChange: (items: T[]) => void;
  create: () => T;
  render: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
  addLabel?: string;
}) {
  const move = (index: number, dir: -1 | 1) => {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    const a = next[index]!;
    const b = next[target]!;
    next[index] = b;
    next[target] = a;
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.id} className="rounded-lg border p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
            <div className="flex gap-1">
              <Button type="button" size="icon" variant="ghost" onClick={() => move(index, -1)} aria-label="Move up">
                <Lucide.ArrowUp className="h-4 w-4" />
              </Button>
              <Button type="button" size="icon" variant="ghost" onClick={() => move(index, 1)} aria-label="Move down">
                <Lucide.ArrowDown className="h-4 w-4" />
              </Button>
              <Button
                type="button" size="icon" variant="ghost" aria-label="Remove"
                onClick={() => onChange(items.filter((i) => i.id !== item.id))}
              >
                <Lucide.Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            {render(item, (patch) =>
              onChange(items.map((i) => (i.id === item.id ? { ...i, ...patch } : i))),
            )}
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => onChange([...items, create()])}>
        <Lucide.Plus className="mr-1 h-4 w-4" /> {addLabel}
      </Button>
    </div>
  );
}
