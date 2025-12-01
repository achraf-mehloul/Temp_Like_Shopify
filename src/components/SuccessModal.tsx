import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-8 max-w-md w-full border border-yellow-600/30 animate-bounce-in text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-scale-in shadow-lg shadow-green-500/50">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-3">
          Commande Confirmée!
        </h2>

        <p className="text-gray-300 text-lg mb-2">
          Merci pour votre commande
        </p>
        <p className="text-gray-400 mb-6">
          Nous vous contactons bientôt pour confirmer les détails de livraison
        </p>

        <div className="bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-700">
          <p className="text-sm text-gray-400">
            Un membre de notre équipe vous appellera dans les 24 heures pour finaliser votre commande
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/50"
        >
          Continuer vos Achats
        </button>
      </div>
    </div>
  );
}
