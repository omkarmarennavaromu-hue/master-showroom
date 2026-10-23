import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import Collection from './components/Collection.jsx';
import Detail from './components/Detail.jsx';
import Logo from './components/Logo.jsx';
import Ticker from './components/Ticker.jsx';
import Watermark from './components/Watermark.jsx';
import AvailabilityModal from './components/AvailabilityModal.jsx';
import { products } from './data.js';

function useViewportWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return width;
}

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [view, setView] = useState('collection');
  const [variantIndex, setVariantIndex] = useState(0);
  const [side, setSide] = useState('front');
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const viewportWidth = useViewportWidth();

  const product = products[selectedIndex];
  const variant = product.variants[Math.min(variantIndex, product.variants.length - 1)];
  const spacing = useMemo(() => {
    if (viewportWidth < 600) return Math.max(112, viewportWidth * 0.32);
    if (viewportWidth < 1000) return Math.max(140, viewportWidth * 0.18);
    return Math.min(218, Math.max(165, viewportWidth * 0.145));
  }, [viewportWidth]);

  const resetProductState = () => {
    setVariantIndex(0);
    setSide('front');
  };

  const navigate = useCallback((direction) => {
    setSelectedIndex((current) => (current + direction + products.length) % products.length);
    setVariantIndex(0);
    setSide('front');
  }, []);

  const selectProduct = (index) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
    resetProductState();
  };

  const openDetail = () => {
    resetProductState();
    setView('detail');
  };

  const closeDetail = useCallback(() => {
    setSide('front');
    setView('collection');
  }, []);

  const selectVariant = (index) => {
    setVariantIndex(index);
    setSide('front');
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (availabilityOpen) setAvailabilityOpen(false);
        else if (view === 'detail') closeDetail();
        return;
      }
      if (availabilityOpen) return;
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigate(1);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigate(-1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [availabilityOpen, view, navigate, closeDetail]);

  useEffect(() => {
    products.forEach((item) => {
      item.variants.forEach((itemVariant) => {
        [itemVariant.front, itemVariant.back].filter(Boolean).forEach((source) => {
          const image = new Image();
          image.src = source;
        });
      });
    });
  }, []);

  return (
    <div className="site-shell">
      <div className="paper-grain" aria-hidden="true" />
      <Logo
        isDetail={view === 'detail'}
        onClick={() => {
          if (view === 'detail') closeDetail();
          else selectProduct(1);
        }}
      />

      <LayoutGroup>
        <AnimatePresence initial={false} mode="sync">
          {view === 'collection' ? (
            <Collection
              key="collection"
              products={products}
              selectedIndex={selectedIndex}
              onSelect={selectProduct}
              onNavigate={navigate}
              onOpen={openDetail}
              onAvailability={() => setAvailabilityOpen(true)}
              spacing={spacing}
            />
          ) : (
            <Detail
              key="detail"
              product={product}
              productIndex={selectedIndex}
              productCount={products.length}
              variant={variant}
              variantIndex={variantIndex}
              side={side}
              onBack={closeDetail}
              onVariant={selectVariant}
              onSide={setSide}
              onAvailability={() => setAvailabilityOpen(true)}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>

      <AvailabilityModal
        open={availabilityOpen}
        product={product}
        variant={variant}
        onClose={() => setAvailabilityOpen(false)}
      />

      <Watermark />
      <Ticker />
    </div>
  );
}
