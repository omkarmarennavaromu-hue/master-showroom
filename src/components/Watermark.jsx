export default function Watermark() {
  return (
    <aside className="developer-credit" aria-label="Developer credit">
      <div className="credit-topline">
        <span className="credit-side credit-left">BUILT &amp; DEVELOPED BY</span>
        <a
          className="credit-handle"
          href="https://www.instagram.com/omkar_.builds/"
          target="_blank"
          rel="noreferrer"
          aria-label="omkar_.builds — open Instagram"
        >
          omkar_.builds
        </a>
        <span className="credit-side credit-right">DESIGN · CODE · MOTION</span>
      </div>
      <span className="credit-ghost" aria-hidden="true">omkar_.builds</span>
    </aside>
  );
}
