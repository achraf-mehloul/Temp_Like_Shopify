import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[480px] bg-gradient-to-br from-gray-900 to-black shadow-2xl flex flex-col animate-slide-in border-l border-yellow-600/30">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-800 bg-black/50">
          <h2 className="text-xl md:text-2xl font-bold text-white">Votre Panier</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Votre panier est vide</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700 hover:border-yellow-600/50 transition-colors">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-sm md:text-base mb-1">{item.name}</h3>
                      <p className="text-yellow-400 font-bold text-lg">
                        {item.price.toLocaleString('fr-DZ')} DA
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2 bg-gray-900/80 rounded-lg p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                          >
                            <Minus className="w-4 h-4 text-gray-400" />
                          </button>
                          <span className="w-8 text-center font-semibold text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-800 p-4 md:p-6 bg-black/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg text-gray-400">Total:</span>
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                {total.toLocaleString('fr-DZ')} DA
              </span>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/50"
            >
              Commander Maintenant
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
