import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, CreditCard, Mail, User, MapPin } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  cartItems: CartItem[];
  onClose: () => void;
  onOrderPlaced: (order: Order) => void;
}

export default function CheckoutModal({ cartItems, onClose, onOrderPlaced }: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'loading' | 'success'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% luxury sales tax
  const total = subtotal + tax;

  const validateDetails = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Valid email is required';
    }
    if (!formData.address.trim()) tempErrors.address = 'Shipping address is required';
    if (!formData.city.trim()) tempErrors.city = 'City is required';
    if (!formData.postalCode.trim()) tempErrors.postalCode = 'Postal code is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validatePayment = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.cardName.trim()) tempErrors.cardName = 'Name on card is required';
    
    // Simple mock credit card validation
    const cardNumClean = formData.cardNumber.replace(/\s+/g, '');
    if (!cardNumClean || cardNumClean.length < 16) {
      tempErrors.cardNumber = 'Valid 16-digit card number is required';
    }
    if (!formData.cardExpiry.trim() || !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
      tempErrors.cardExpiry = 'Format MM/YY is required';
    }
    if (!formData.cardCVV.trim() || formData.cardCVV.length < 3) {
      tempErrors.cardCVV = 'Valid CVV code required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDetails()) {
      setStep('payment');
      setErrors({});
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePayment()) {
      setStep('loading');
      setErrors({});

      // Simulate a high-end luxury transaction gateway clearance
      setTimeout(() => {
        const orderId = `ATL-${Math.floor(100000 + Math.random() * 900000)}`;
        const newOrder: Order = {
          id: orderId,
          items: [...cartItems],
          total: total,
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          status: 'Processing',
          shippingAddress: {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
          },
        };

        setPlacedOrder(newOrder);
        onOrderPlaced(newOrder);
        setStep('success');
      }, 2400); // realistic payment security check
    }
  };

  // Card number input formatter
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.substring(i, i + 4));
    }
    setFormData({ ...formData, cardNumber: parts.join(' ') });
  };

  // Expiry date input formatter
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      setFormData({ ...formData, cardExpiry: `${value.slice(0, 2)}/${value.slice(2)}` });
    } else {
      setFormData({ ...formData, cardExpiry: value });
    }
  };

  return (
    <div
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-brand-950/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative bg-white w-full max-w-4xl rounded-xs shadow-2xl overflow-hidden animate-slide-up flex flex-col md:flex-row max-h-[95vh] md:max-h-[90vh]">
        
        {/* Close Button (Hidden on loading and success) */}
        {step !== 'loading' && step !== 'success' && (
          <button
            id="close-checkout-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-brand-500 hover:text-brand-950 hover:bg-brand-100 rounded-full transition-all focus:outline-none"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Step 1 & 2: Main checkout flow container */}
        {(step === 'details' || step === 'payment') && (
          <>
            {/* Left: Interactive Form */}
            <div className="w-full md:w-3/5 p-6 sm:p-8 overflow-y-auto">
              
              {/* Stepper Progress */}
              <div className="flex items-center space-x-3 mb-8">
                <span className={`text-[10px] uppercase tracking-widest font-sans font-bold ${step === 'details' ? 'text-brand-950' : 'text-brand-400'}`}>
                  01 / Shipping Details
                </span>
                <span className="text-brand-300">→</span>
                <span className={`text-[10px] uppercase tracking-widest font-sans font-bold ${step === 'payment' ? 'text-brand-950' : 'text-brand-400'}`}>
                  02 / Premium Payment
                </span>
              </div>

              {step === 'details' ? (
                <form id="shipping-form" onSubmit={handleDetailsSubmit} className="space-y-5">
                  <h3 className="font-serif text-lg font-medium text-brand-950 mb-4 border-b border-brand-100 pb-2">
                    Shipping Information
                  </h3>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-sans font-semibold text-brand-500 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-brand-400" />
                      <input
                        id="checkout-name"
                        type="text"
                        placeholder="Elizabeth Bennett"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full pl-9 pr-4 py-2.5 text-xs font-sans border rounded-xs focus:outline-none focus:border-brand-950 ${
                          errors.name ? 'border-red-500 bg-red-50/10' : 'border-brand-200 bg-brand-50/30'
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-[10px] text-red-500 mt-1 font-sans">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-sans font-semibold text-brand-500 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-brand-400" />
                      <input
                        id="checkout-email"
                        type="email"
                        placeholder="elizabeth@boutique.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full pl-9 pr-4 py-2.5 text-xs font-sans border rounded-xs focus:outline-none focus:border-brand-950 ${
                          errors.email ? 'border-red-500 bg-red-50/10' : 'border-brand-200 bg-brand-50/30'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-[10px] text-red-500 mt-1 font-sans">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-sans font-semibold text-brand-500 mb-1.5">
                      Delivery Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-brand-400" />
                      <input
                        id="checkout-address"
                        type="text"
                        placeholder="Via della Spiga, 12"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className={`w-full pl-9 pr-4 py-2.5 text-xs font-sans border rounded-xs focus:outline-none focus:border-brand-950 ${
                          errors.address ? 'border-red-500 bg-red-50/10' : 'border-brand-200 bg-brand-50/30'
                        }`}
                      />
                    </div>
                    {errors.address && <p className="text-[10px] text-red-500 mt-1 font-sans">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-sans font-semibold text-brand-500 mb-1.5">
                        City
                      </label>
                      <input
                        id="checkout-city"
                        type="text"
                        placeholder="Milan"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={`w-full px-4 py-2.5 text-xs font-sans border rounded-xs focus:outline-none focus:border-brand-950 ${
                          errors.city ? 'border-red-500 bg-red-50/10' : 'border-brand-200 bg-brand-50/30'
                        }`}
                      />
                      {errors.city && <p className="text-[10px] text-red-500 mt-1 font-sans">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-sans font-semibold text-brand-500 mb-1.5">
                        Postal Code
                      </label>
                      <input
                        id="checkout-postal"
                        type="text"
                        placeholder="20121"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className={`w-full px-4 py-2.5 text-xs font-sans border rounded-xs focus:outline-none focus:border-brand-950 ${
                          errors.postalCode ? 'border-red-500 bg-red-50/10' : 'border-brand-200 bg-brand-50/30'
                        }`}
                      />
                      {errors.postalCode && <p className="text-[10px] text-red-500 mt-1 font-sans">{errors.postalCode}</p>}
                    </div>
                  </div>

                  <button
                    id="checkout-to-payment-btn"
                    type="submit"
                    className="w-full py-4 mt-6 bg-brand-950 text-white hover:bg-brand-800 text-xs font-sans uppercase tracking-[0.25em] font-semibold transition-all duration-300"
                  >
                    Continue to Payment
                  </button>
                </form>
              ) : (
                <form id="payment-form" onSubmit={handlePaymentSubmit} className="space-y-5">
                  <h3 className="font-serif text-lg font-medium text-brand-950 mb-4 border-b border-brand-100 pb-2">
                    Payment Gateway
                  </h3>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-sans font-semibold text-brand-500 mb-1.5">
                      Cardholder Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-brand-400" />
                      <input
                        id="card-name"
                        type="text"
                        placeholder="Elizabeth Bennett"
                        value={formData.cardName}
                        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                        className={`w-full pl-9 pr-4 py-2.5 text-xs font-sans border rounded-xs focus:outline-none focus:border-brand-950 ${
                          errors.cardName ? 'border-red-500 bg-red-50/10' : 'border-brand-200 bg-brand-50/30'
                        }`}
                      />
                    </div>
                    {errors.cardName && <p className="text-[10px] text-red-500 mt-1 font-sans">{errors.cardName}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-sans font-semibold text-brand-500 mb-1.5">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 w-4 h-4 text-brand-400" />
                      <input
                        id="card-number"
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        className={`w-full pl-9 pr-4 py-2.5 text-xs font-sans border rounded-xs focus:outline-none focus:border-brand-950 ${
                          errors.cardNumber ? 'border-red-500 bg-red-50/10' : 'border-brand-200 bg-brand-50/30'
                        }`}
                      />
                    </div>
                    {errors.cardNumber && <p className="text-[10px] text-red-500 mt-1 font-sans">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-sans font-semibold text-brand-500 mb-1.5">
                        Expiration
                      </label>
                      <input
                        id="card-expiry"
                        type="text"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleExpiryChange}
                        className={`w-full px-4 py-2.5 text-xs font-sans border rounded-xs focus:outline-none focus:border-brand-950 ${
                          errors.cardExpiry ? 'border-red-500 bg-red-50/10' : 'border-brand-200 bg-brand-50/30'
                        }`}
                      />
                      {errors.cardExpiry && <p className="text-[10px] text-red-500 mt-1 font-sans">{errors.cardExpiry}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-sans font-semibold text-brand-500 mb-1.5">
                        CVV
                      </label>
                      <input
                        id="card-cvv"
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={formData.cardCVV}
                        onChange={(e) => setFormData({ ...formData, cardCVV: e.target.value.replace(/\D/g, '') })}
                        className={`w-full px-4 py-2.5 text-xs font-sans border rounded-xs focus:outline-none focus:border-brand-950 ${
                          errors.cardCVV ? 'border-red-500 bg-red-50/10' : 'border-brand-200 bg-brand-50/30'
                        }`}
                      />
                      {errors.cardCVV && <p className="text-[10px] text-red-500 mt-1 font-sans">{errors.cardCVV}</p>}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      id="checkout-back-btn"
                      type="button"
                      onClick={() => setStep('details')}
                      className="w-1/3 py-4 border border-brand-200 text-brand-800 hover:border-brand-950 hover:text-brand-950 text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all"
                    >
                      Back
                    </button>
                    <button
                      id="checkout-place-order-btn"
                      type="submit"
                      className="w-2/3 py-4 bg-brand-950 text-white hover:bg-brand-800 text-xs font-sans uppercase tracking-[0.25em] font-semibold transition-all duration-300"
                    >
                      Authorize Payment
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Order Summary Details panel */}
            <div className="w-full md:w-2/5 bg-brand-50/60 p-6 sm:p-8 border-t md:border-t-0 md:border-l border-brand-100 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-base font-medium text-brand-950 mb-6 pb-2 border-b border-brand-200/50">
                  My Order Bag
                </h3>

                {/* Items preview list */}
                <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 text-xs">
                      <div className="w-12 aspect-[3/4] bg-brand-100 overflow-hidden rounded-xs flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif font-medium text-brand-900 leading-tight">
                          {item.product.name}
                        </h4>
                        <div className="text-[10px] text-brand-400 mt-0.5 uppercase tracking-wider">
                          Qty: {item.quantity} / Size: {item.selectedSize}
                        </div>
                      </div>
                      <div className="font-mono text-brand-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Calculation details */}
              <div className="border-t border-brand-200/50 pt-5 mt-6 space-y-2">
                <div className="flex justify-between text-xs text-brand-500 font-sans">
                  <span>Bag Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-brand-500 font-sans">
                  <span>Tax (8% state fee)</span>
                  <span className="font-mono">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-brand-500 font-sans">
                  <span>Complimentary Shipping</span>
                  <span className="text-emerald-700 uppercase tracking-widest font-semibold text-[10px]">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-brand-950 border-t border-brand-100 pt-3">
                  <span>Authorized Total</span>
                  <span className="font-mono text-base">${total.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-brand-400 mt-4 bg-white/60 p-2.5 border border-brand-100">
                  <ShieldCheck className="w-4 h-4 text-brand-500" />
                  <span>Payments secured by 256-bit SSL encrypted connection.</span>
                </div>
              </div>

            </div>
          </>
        )}

        {/* LOADING TRANSACTION GATEWAY */}
        {step === 'loading' && (
          <div className="w-full p-12 sm:p-20 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full border-4 border-brand-100 border-t-brand-950 animate-spin" />
              <CreditCard className="w-6 h-6 text-brand-800 absolute inset-0 m-auto" />
            </div>
            <h3 className="font-serif text-xl font-medium text-brand-950 mb-2">Clearing Merchant Settlement...</h3>
            <p className="text-xs text-brand-400 font-sans max-w-[320px]">
              Verifying card parameters with your financial institution. Please do not close or refresh this view.
            </p>
          </div>
        )}

        {/* TRANSACTION SUCCESS */}
        {step === 'success' && placedOrder && (
          <div className="w-full p-8 sm:p-12 text-center flex flex-col items-center justify-center animate-fade-in max-h-[90vh] overflow-y-auto">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mb-5" />
            
            <h3 className="font-serif text-2xl font-light text-brand-950 mb-2">Thank you for your order</h3>
            <p className="text-xs text-brand-400 font-sans uppercase tracking-[0.2em] mb-8">
              Order ID: <span className="font-mono font-bold text-brand-800">{placedOrder.id}</span>
            </p>

            <div className="max-w-md w-full bg-brand-50/50 border border-brand-100 p-6 text-left space-y-4 mb-8">
              <h4 className="font-serif text-sm font-medium text-brand-950 border-b border-brand-100 pb-2">
                Order Summary
              </h4>
              <div className="space-y-2 text-xs text-brand-600 font-sans font-light">
                <div className="flex justify-between">
                  <span>Receipt Date:</span>
                  <span className="font-medium text-brand-900">{placedOrder.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ship To:</span>
                  <span className="font-medium text-brand-900">{placedOrder.shippingAddress.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Address:</span>
                  <span className="font-medium text-brand-900 text-right">
                    {placedOrder.shippingAddress.address}, {placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.postalCode}
                  </span>
                </div>
                <div className="flex justify-between border-t border-brand-100/50 pt-2.5 font-semibold text-brand-950">
                  <span>Settled Total:</span>
                  <span className="font-mono text-sm">${placedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-brand-500 font-sans max-w-sm leading-relaxed mb-8">
              A luxury dispatch confirmation email with tracking links has been transmitted to <span className="font-medium text-brand-900">{placedOrder.shippingAddress.email}</span>. Your garment is being packaged in our Milan atelier.
            </p>

            <button
              id="checkout-success-continue-btn"
              onClick={onClose}
              className="px-8 py-3.5 bg-brand-950 text-white hover:bg-brand-800 text-xs font-sans uppercase tracking-[0.25em] font-semibold transition-all shadow-sm"
            >
              Back to Boutique
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
