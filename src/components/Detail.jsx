import { AnimatePresence, motion } from 'framer-motion';

const spring = { type: 'spring', stiffness: 230, damping: 28, mass: 0.9 };

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

function ColorTags({ variants, activeIndex, onSelect }) {
  if (variants.length < 2) return null;

  return (
    <div className="color-tags" role="group" aria-label="Choose a color">
      {variants.map((variant, index) => (
        <button
          key={variant.id}
          className={`color-tag-wrap${index === activeIndex ? ' is-selected' : ''}`}
          onClick={() => onSelect(index)}
          aria-label={`${variant.name} color`}
          aria-pressed={index === activeIndex}
        >
          <span className="tag-string" aria-hidden="true" />
          <span
            className="color-tag"
            style={{ '--tag-color': variant.hex, '--tag-index': index }}
          >
            <span className="tag-hole" aria-hidden="true" />
            <span className="tag-label">{variant.name}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

export default function Detail({
  product,
  productIndex,
  productCount,
  variant,
  variantIndex,
  side,
  onBack,
  onVariant,
  onSide,
  onAvailability,
}) {
  const image = side === 'back' && variant.back ? variant.back : variant.front;

  return (
    <motion.section
      className="detail-view"
      aria-label={`${product.name} detail`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <motion.button
        className="back-button"
        onClick={onBack}
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.28 }}
      >
        <BackIcon /> <span>COLLECTION</span>
      </motion.button>

      <motion.span
        className="detail-count"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        aria-hidden="true"
      >
        {String(productIndex + 1).padStart(2, '0')} / {String(productCount).padStart(2, '0')}
      </motion.span>

      <div className="detail-stage">
        <motion.div
          className="detail-visual"
          layoutId={`product-${product.id}`}
          transition={spring}
        >
          <AnimatePresence initial={false} mode="sync">
            <motion.img
              key={image}
              src={image}
              alt={`${product.name}, ${variant.name}, ${side} view`}
              initial={{ opacity: 0, scale: 0.985, rotateY: side === 'back' ? -8 : 8 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 1.015 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              draggable="false"
            />
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.38 }}
        >
          <ColorTags variants={product.variants} activeIndex={variantIndex} onSelect={onVariant} />
        </motion.div>
      </div>

      <motion.div
        className="detail-info"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.45 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.h1
            key={product.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {product.name}
          </motion.h1>
        </AnimatePresence>

        {variant.back ? (
          <div className="view-toggle" role="group" aria-label="Product view">
            {['front', 'back'].map((itemSide) => (
              <button
                key={itemSide}
                className={side === itemSide ? 'is-active' : ''}
                onClick={() => onSide(itemSide)}
                aria-pressed={side === itemSide}
              >
                {side === itemSide && <motion.span className="toggle-active" layoutId="side-toggle" />}
                <span>{itemSide.toUpperCase()}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="single-view-label">ORIGINAL SERIES · 001</div>
        )}

        <button className="availability-link" onClick={onAvailability}>
          SEE AVAILABILITY <span aria-hidden="true">↗</span>
        </button>
      </motion.div>
    </motion.section>
  );
}
