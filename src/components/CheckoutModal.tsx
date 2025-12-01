import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { wilayas, communesByWilaya } from '../data/locations';
import { CartItem, OrderForm } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onSubmit: (formData: OrderForm) => void;
}

export default function CheckoutModal({ isOpen, onClose, items, onSubmit }: CheckoutModalProps) {
  const [formData, setFormData] = useState<OrderForm>({
    fullName: '',
    phone: '',
    wilaya: '',
    commune: ''
  });

  const [communes, setCommunes] = useState<string[]>([]);

  useEffect(() => {
    if (formData.wilaya) {
      setCommunes(communesByWilaya[formData.wilaya] || ['Autre']);
      setFormData(prev => ({ ...prev, commune: '' }));
    }
  }, [formData.wilaya]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.fullName && formData.phone.length === 9 && formData.wilaya && formData.commune) {
      onSubmit(formData);
    }
  };

  const handlePhoneChange = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 9) {
      setFormData({ ...formData, phone: numbers });
    }
  };

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl w-full max-w-2xl border border-yellow-600/30 animate-fade-in">
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Finaliser la Commande
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="mb-6 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">Récapitulatif</h3>
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.name} x {item.quantity}</span>
                    <span className="text-yellow-400 font-semibold">
                      {(item.price * item.quantity).toLocaleString('fr-DZ')} DA
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between">
                  <span className="text-white font-bold">Total:</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    {total.toLocaleString('fr-DZ')} DA
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Nom Complet *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  placeholder="Entrez votre nom complet"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Numéro de Téléphone *
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white font-semibold">
                    +213
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                    placeholder="5XX XXX XXX"
                    maxLength={9}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">9 chiffres requis</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  الولاية (Wilaya) *
                </label>
                <select
                  required
                  value={formData.wilaya}
                  onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                >
                  <option value="">Sélectionnez une wilaya</option>
                  {wilayas.map((wilaya) => (
                    <option key={wilaya.code} value={wilaya.code}>
                      {wilaya.code} - {wilaya.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  البلدية (Commune) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.commune}
                  onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                  list="communes-list"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  placeholder={formData.wilaya ? "Sélectionnez ou tapez votre commune" : "Sélectionnez d'abord une wilaya"}
                  disabled={!formData.wilaya}
                />
                {communes.length > 0 && (
                  <datalist id="communes-list">
                    {communes.map((commune, index) => (
                      <option key={index} value={commune} />
                    ))}
                  </datalist>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/50 flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Confirmer la Commande</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
