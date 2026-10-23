import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { formatPrice, sizes } from '../data.js';

export default function AvailabilityModal({ open, product, variant, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (open) {
      setSelectedSize(null);
      window.setTimeout(() => closeRef.current?.focus(), 120);
    }
  }, [open, product.id, variant.id]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="availability-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="availability-title"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close availability">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>

            <div className="modal-product-image">
              <img src={variant.front} alt="" />
            </div>

            <div className="modal-product-copy">
              <p className="modal-eyebrow">MASTER · RELEASE 001</p>
              <h2 id="availability-title">{product.name}</h2>
              <div className="modal-price-row">
                <span>{formatPrice(product.price)}</span>
                <span>{variant.name}</span>
              </div>
              <p className="modal-description">{product.description}</p>

              <div className="size-heading">
                <span>SELECT SIZE</span>
                <span>TRUE TO SIZE</span>
              </div>
              <div className="size-options" role="group" aria-label="Available sizes">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={selectedSize === size ? 'is-selected' : ''}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className={`availability-status${selectedSize ? ' is-ready' : ''}`} aria-live="polite">
                <span className="status-dot" />
                {selectedSize ? `SIZE ${selectedSize} · AVAILABLE TO ORDER` : 'SELECT A SIZE TO CHECK AVAILABILITY'}
              </div>
              <p className="release-note">Small-batch production · Ships in 2–4 working days</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
