const LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

function renderInline(text: string, keyPrefix: string) {
  const nodes: Array<string | { label: string; href: string }> = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    nodes.push({ label: match[1] ?? "", href: match[2] ?? "" });
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));

  return nodes.map((node, index) => {
    if (typeof node === "string") return <span key={`${keyPrefix}-${index}`}>{node}</span>;
    return (
      <a
        key={`${keyPrefix}-${index}`}
        href={node.href}
        className="underline decoration-cyan/70 underline-offset-4 hover:decoration-cyan"
      >
        {node.label}
      </a>
    );
  });
}

export function RichText({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-base leading-7 text-ink">
          {renderInline(paragraph, `p${index}`)}
        </p>
      ))}
    </div>
  );
}
