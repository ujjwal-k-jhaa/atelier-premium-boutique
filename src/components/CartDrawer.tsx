import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 250;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            id="cart-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-950/40 backdrop-blur-xs"
          />

          {/* Drawer Body */}
          <motion.div
            id="cart-drawer-body"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 h-full w-full max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-brand-950 animate-pulse" />
                <h2 className="text-base uppercase tracking-widest font-sans font-semibold text-brand-950">
                  Shopping Bag ({cartItems.length})
                </h2>
              </div>
              <button
                id="close-cart-btn"
                onClick={onClose}
                className="p-1.5 text-brand-500 hover:text-brand-950 hover:bg-brand-50 rounded-full transition-all focus:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator (Boutique touch) */}
            {cartItems.length > 0 && (
              <div className="px-6 py-4 bg-brand-50 border-b border-brand-100">
                <div className="text-[11px] font-sans font-medium text-brand-700 mb-2">
                  {isFreeShipping ? (
                    <span className="text-emerald-700 font-semibold">Your order qualifies for complimentary delivery.</span>
                  ) : (
                    <span>
                      Spend <span className="font-semibold">${(freeShippingThreshold - subtotal).toFixed(2)}</span> more for complimentary delivery.
                    </span>
                  )}
                </div>
                <div className="w-full bg-brand-200 h-1 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isFreeShipping ? 'bg-emerald-600' : 'bg-brand-950'
                    }`}
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Item List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-brand-900 mb-1">Your bag is empty</h3>
                  <p className="text-xs text-brand-400 font-sans max-w-[240px] mb-6 font-light">
                    Curate your closet with our timeless collections.
                  </p>
                  <button
                    id="cart-continue-shopping-btn"
                    onClick={onClose}
                    className="border border-brand-950 text-brand-950 hover:bg-brand-950 hover:text-white px-6 py-3 text-[10px] uppercase tracking-widest font-sans font-bold transition-colors focus:outline-none cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-brand-100/50 pb-5 last:border-b-0 last:pb-0"
                  >
                    {/* Thumb */}
                    <div className="w-20 aspect-[3/4] bg-brand-50 rounded-xs overflow-hidden flex-shrink-0 border border-brand-100">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-serif text-sm font-medium text-brand-900 leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          id={`remove-item-${item.id}`}
                          onClick={() => onRemoveItem(item.id)}
                          className="text-brand-300 hover:text-brand-600 p-0.5 transition-colors cursor-pointer"
                          title="Remove Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Size and Color attributes */}
                      <div className="flex flex-wrap gap-2 text-[10px] font-sans text-brand-400 uppercase tracking-wider mb-3">
                        <span>Size: {item.selectedSize}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          Color: {item.selectedColor.name}
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-brand-100"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                        </span>
                      </div>

                      {/* Qty and Price row */}
                      <div className="flex justify-between items-center mt-auto">
                        {/* Qty button container */}
                        <div className="flex items-center border border-brand-200 rounded-xs">
                          <button
                            id={`qty-dec-${item.id}`}
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-brand-500 hover:text-brand-950 transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2.5 text-xs font-mono font-medium text-brand-900">{item.quantity}</span>
                          <button
                            id={`qty-inc-${item.id}`}
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-brand-500 hover:text-brand-950 transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-mono font-semibold text-brand-950">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer actions */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-brand-100 bg-brand-50/50 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-brand-500">
                    <span>Subtotal</span>
                    <span className="font-mono">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-brand-500">
                    <span>Estimated complimentary delivery</span>
                    <span>Complimentary</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-brand-950 border-t border-brand-100 pt-3">
                    <span>Total Amount</span>
                    <span className="font-mono text-base">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  id="checkout-btn"
                  onClick={onCheckout}
                  className="w-full py-4 bg-brand-950 text-white hover:bg-brand-800 text-xs font-sans uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-sm cursor-pointer"
                >
                  Checkout Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
