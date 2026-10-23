import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const spring = { type: 'spring', stiffness: 240, damping: 29, mass: 0.85 };

export default function Collection({
  products,
  selectedIndex,
  onSelect,
  onNavigate,
  onOpen,
  onAvailability,
  spacing,
}) {
  const pointer = useRef({ x: 0, y: 0, down: false });
  const suppressClick = useRef(false);
  const lastWheel = useRef(0);
  const selected = products[selectedIndex];

  const relativeOffset = (index) => {
    const count = products.length;
    let offset = index - selectedIndex;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset;
  };

  const handlePointerDown = (event) => {
    pointer.current = { x: event.clientX, y: event.clientY, down: true };
    event.target.setPointerCapture?.(event.pointerId);
  };

  const handlePointerUp = (event) => {
    if (!pointer.current.down) return;
    const dx = event.clientX - pointer.current.x;
    const dy = event.clientY - pointer.current.y;
    pointer.current.down = false;

    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) {
      suppressClick.current = true;
      onNavigate(dx < 0 ? 1 : -1);
      window.setTimeout(() => { suppressClick.current = false; }, 120);
    }
  };

  const handleWheel = (event) => {
    const now = Date.now();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 18 || now - lastWheel.current < 520) return;
    lastWheel.current = now;
    onNavigate(delta > 0 ? 1 : -1);
  };

  return (
    <motion.section
      className="collection-view"
      aria-label="master collection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.22 } }}
    >
      <div
        className="collection-stage"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { pointer.current.down = false; }}
        onWheel={handleWheel}
      >
        <div className="clothing-rail" aria-hidden="true">
          <span className="rail-shine" />
          <span className="rail-cap rail-cap-left" />
          <span className="rail-cap rail-cap-right" />
        </div>

        <div className="carousel-items">
          {products.map((product, index) => {
            const offset = relativeOffset(index);
            const distance = Math.abs(offset);
            const active = offset === 0;

            return (
              <motion.button
                key={product.id}
                className={`carousel-item${active ? ' is-active' : ''}`}
                style={{ zIndex: 20 - distance }}
                initial={{ opacity: 0, y: 70 }}
                animate={{
                  x: offset * spacing,
                  y: 0,
                  scale: active ? 1 : Math.max(0.64, 0.79 - distance * 0.025),
                  rotateY: active ? 0 : offset < 0 ? 40 : -40,
                  rotateZ: active ? 0 : offset < 0 ? -1.5 : 1.5,
                  opacity: distance > 3 ? 0 : active ? 1 : Math.max(0.48, 0.84 - distance * 0.09),
                }}
                transition={{ ...spring, delay: 0.025 * distance }}
                whileHover={active ? { scale: 1.025 } : { opacity: 0.95 }}
                onClick={() => {
                  if (suppressClick.current) return;
                  if (active) onOpen();
                  else onSelect(index);
                }}
                aria-label={active ? `Open ${product.name}` : `Select ${product.name}`}
                aria-current={active ? 'true' : undefined}
              >
                <motion.div
                  className="hanger-visual"
                  layoutId={`product-${product.id}`}
                  transition={spring}
                >
                  <img
                    src={product.variants[0].front}
                    alt={active ? product.name : ''}
                    draggable="false"
                    loading="eager"
                  />
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="collection-meta">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={selected.id}
            className="rail-product-name"
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -7 }}
            transition={{ duration: 0.2 }}
          >
            {selected.railName}
          </motion.p>
        </AnimatePresence>
        <button className="availability-pill" onClick={onAvailability}>
          SEE AVAILABILITY
        </button>
      </div>

      <div className="collection-hint" aria-hidden="true">
        <span className="hint-line" /> DRAG · SCROLL · EXPLORE
      </div>
      <div className="collection-count" aria-hidden="true">
        {String(selectedIndex + 1).padStart(2, '0')} <span>/ {String(products.length).padStart(2, '0')}</span>
      </div>
    </motion.section>
  );
}
