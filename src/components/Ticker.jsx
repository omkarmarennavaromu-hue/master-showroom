const phrase = ['MASTER', 'NEVER ORDINARY', 'NEW DROPS', 'EST. 2026'];

function TickerLine({ ariaHidden = false }) {
  return (
    <div className="ticker-line" aria-hidden={ariaHidden}>
      {Array.from({ length: 5 }, (_, repeat) =>
        phrase.map((word) => (
          <span key={`${repeat}-${word}`}>
            {word}<i>•</i>
          </span>
        )),
      )}
    </div>
  );
}

export default function Ticker() {
  return (
    <footer className="ticker" aria-label="master — never ordinary — new drops">
      <div className="ticker-track">
        <TickerLine />
        <TickerLine ariaHidden />
      </div>
    </footer>
  );
}
