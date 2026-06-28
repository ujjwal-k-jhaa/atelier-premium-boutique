import React from 'react';
import { ClipboardList, ArrowLeft, Package, Truck, Calendar, MapPin } from 'lucide-react';
import { Order } from '../types';

interface OrdersTabProps {
  orders: Order[];
  onBrowseCollections: () => void;
}

export default function OrdersTab({ orders, onBrowseCollections }: OrdersTabProps) {
  return (
    <div id="orders-tab-container" className="max-w-4xl mx-auto px-4 py-28 min-h-[75vh]">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-100 pb-6 mb-10">
        <div>
          <h2 className="text-3xl font-serif text-brand-950 font-medium tracking-tight">
            Order Atelier History
          </h2>
          <p className="text-xs text-brand-400 font-sans mt-1">
            Track and manage your luxury boutique purchases.
          </p>
        </div>
        <button
          id="orders-back-to-shop-btn"
          onClick={onBrowseCollections}
          className="flex items-center gap-2 text-xs text-brand-800 hover:text-brand-950 font-sans uppercase tracking-widest font-semibold focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-brand-50/40 border border-brand-100 p-12 text-center rounded-xs flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center mb-4">
            <ClipboardList className="w-5 h-5 text-brand-500" />
          </div>
          <h3 className="font-serif text-lg font-medium text-brand-900 mb-1">No Orders Logged Yet</h3>
          <p className="text-xs text-brand-400 font-sans max-w-sm mb-8 leading-relaxed">
            You have not initiated any luxury purchases. Complete a checkout transaction to generate a verified tracking code.
          </p>
          <button
            id="orders-shop-now-btn"
            onClick={onBrowseCollections}
            className="px-8 py-3.5 bg-brand-950 text-white hover:bg-brand-800 text-[10px] uppercase tracking-widest font-sans font-bold transition-all"
          >
            Browse Premium Catalog
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-brand-100 shadow-xs rounded-xs overflow-hidden"
            >
              
              {/* Order Header */}
              <div className="bg-brand-50 px-6 py-4 border-b border-brand-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-6 text-xs text-brand-500 font-sans">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-brand-400 font-semibold mb-0.5">
                      Order ID
                    </span>
                    <span className="font-mono font-bold text-brand-800">{order.id}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-brand-400 font-semibold mb-0.5">
                      Date Settled
                    </span>
                    <span className="font-medium text-brand-950">{order.date}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-brand-400 font-semibold mb-0.5">
                      Complimentary Delivery
                    </span>
                    <span className="font-medium text-emerald-700">Committed</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[9px] uppercase tracking-wider text-brand-400 font-semibold mb-0.5">
                    Settled Amount
                  </span>
                  <span className="font-mono text-sm font-bold text-brand-950">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Delivery Tracker Progress Bar */}
              <div className="p-6 border-b border-brand-100 bg-brand-50/10">
                <h4 className="text-[10px] uppercase tracking-widest font-sans font-bold text-brand-400 mb-4 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-brand-500" />
                  Real-Time Shipment Progress
                </h4>
                <div className="grid grid-cols-4 text-center text-[10px] font-sans font-medium text-brand-400 relative">
                  
                  {/* Step Connector Line */}
                  <div className="absolute top-2.5 left-1/8 right-1/8 h-0.5 bg-brand-200 z-0">
                    <div className="h-full bg-emerald-600 w-1/3" /> {/* progress highlight */}
                  </div>

                  <div className="z-10 flex flex-col items-center">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px] border-4 border-white mb-2">
                      ✓
                    </span>
                    <span className="text-brand-950 font-bold">Placed</span>
                  </div>

                  <div className="z-10 flex flex-col items-center">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px] border-4 border-white mb-2">
                      ✓
                    </span>
                    <span className="text-brand-950 font-bold">Milan Atelier</span>
                  </div>

                  <div className="z-10 flex flex-col items-center">
                    <span className="w-5 h-5 rounded-full bg-brand-200 text-brand-500 flex items-center justify-center font-mono text-[9px] border-4 border-white mb-2">
                      3
                    </span>
                    <span>Dispatched</span>
                  </div>

                  <div className="z-10 flex flex-col items-center">
                    <span className="w-5 h-5 rounded-full bg-brand-200 text-brand-500 flex items-center justify-center font-mono text-[9px] border-4 border-white mb-2">
                      4
                    </span>
                    <span>In Transit</span>
                  </div>
                </div>
              </div>

              {/* Items Summary & Info Grid */}
              <div className="grid md:grid-cols-3 gap-6 p-6">
                
                {/* Purchased Items List */}
                <div className="md:col-span-2 space-y-4 md:border-r border-brand-100/50 md:pr-6 border-b md:border-b-0 pb-6 md:pb-0">
                  <h5 className="text-[11px] uppercase tracking-wider font-sans font-bold text-brand-500 mb-3">
                    Purchased Atelier Garments
                  </h5>
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-12 aspect-[3/4] bg-brand-50 rounded-xs overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-serif text-sm font-medium text-brand-950 truncate">
                          {item.product.name}
                        </h5>
                        <p className="text-[10px] text-brand-400 mt-0.5 uppercase tracking-wider">
                          Size: {item.selectedSize} / Color: {item.selectedColor.name} / Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="font-mono text-xs font-semibold text-brand-950">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Delivery Addresses */}
                <div className="space-y-4">
                  <div>
                    <h5 className="text-[11px] uppercase tracking-wider font-sans font-bold text-brand-500 mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-400" />
                      Ship To Address
                    </h5>
                    <div className="text-xs text-brand-600 font-sans font-light leading-relaxed">
                      <span className="block font-medium text-brand-950">{order.shippingAddress.name}</span>
                      <span>{order.shippingAddress.address}</span>
                      <span className="block">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</span>
                    </div>
                  </div>

                  <div className="border-t border-brand-100/50 pt-3">
                    <h5 className="text-[11px] uppercase tracking-wider font-sans font-bold text-brand-500 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-400" />
                      Estimated Handover
                    </h5>
                    <p className="text-xs text-brand-600 font-sans font-light">
                      Scheduled for next business day delivery before 12:00 PM.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
