import { useState } from 'react';
import { X, Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GetAppButton() {
  const [showModal, setShowModal] = useState(false);
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | null>(null);

  const iosInstructions = [
    { step: '1', text: 'Tap Share button' },
    { step: '2', text: 'Tap "Add to Home Screen"' },
    { step: '3', text: 'Tap "Add"' },
  ];

  const androidInstructions = [
    { step: '1', text: 'Tap menu (⋮)' },
    { step: '2', text: 'Tap "Install app"' },
    { step: '3', text: 'Tap "Install"' },
  ];

  const instructions = deviceType === 'ios' ? iosInstructions : androidInstructions;

  return (
    <>
      {/* Compact Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-burgundy text-white rounded-full shadow-2xl hover:shadow-2xl hover:scale-110 transition-all text-sm font-bold border-2 border-gold"
      >
        <Download className="w-5 h-5" />
        <span>Get App</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            {!deviceType ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-burgundy">Download Drift</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <p className="text-gray-600 mb-6">
                  Install Drift as an app on your home screen for instant access.
                </p>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setDeviceType('ios')}
                    className="flex-1 bg-burgundy hover:bg-burgundy/90 text-white"
                  >
                    iPhone
                  </Button>
                  <Button
                    onClick={() => setDeviceType('android')}
                    className="flex-1 bg-burgundy hover:bg-burgundy/90 text-white"
                  >
                    Android
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-burgundy" />
                    <h3 className="font-semibold text-burgundy">
                      {deviceType === 'ios' ? 'iPhone' : 'Android'}
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  {instructions.map((instruction, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-burgundy/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-burgundy">{instruction.step}</span>
                      </div>
                      <p className="text-gray-700 pt-1">{instruction.text}</p>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => setDeviceType(null)}
                  variant="outline"
                  className="w-full border-burgundy text-burgundy hover:bg-burgundy/5"
                >
                  Back
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
