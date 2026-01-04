import { useState } from 'react';
import { X, Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DownloadAppBanner() {
  const [isOpen, setIsOpen] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | null>(null);

  if (!isOpen) return null;

  const iosInstructions = [
    { step: '1', text: 'Tap the Share button (arrow up)' },
    { step: '2', text: 'Scroll down and tap "Add to Home Screen"' },
    { step: '3', text: 'Tap "Add" in the top right' },
    { step: '4', text: 'Done! Drift is now on your home screen' },
  ];

  const androidInstructions = [
    { step: '1', text: 'Tap the menu button (⋮)' },
    { step: '2', text: 'Tap "Install app"' },
    { step: '3', text: 'Tap "Install"' },
    { step: '4', text: 'Done! Drift is now on your home screen' },
  ];

  const instructions = deviceType === 'ios' ? iosInstructions : androidInstructions;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-burgundy via-gold to-burgundy text-white shadow-lg">
      <div className="container py-4 px-4">
        {!showInstructions ? (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Download className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-sm">📱 Download Drift as an App</p>
                <p className="text-xs opacity-90">Get instant access on your home screen</p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button
                onClick={() => {
                  setShowInstructions(true);
                  setDeviceType('ios');
                }}
                size="sm"
                variant="outline"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                iPhone
              </Button>
              <Button
                onClick={() => {
                  setShowInstructions(true);
                  setDeviceType('android');
                }}
                size="sm"
                variant="outline"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Android
              </Button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5" />
                <div>
                  <p className="font-semibold">How to Install Drift</p>
                  <p className="text-xs opacity-90">{deviceType === 'ios' ? 'iPhone/iPad' : 'Android'}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowInstructions(false);
                  setDeviceType(null);
                }}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {instructions.map((instruction, idx) => (
                <div key={idx} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-2">{instruction.step}</div>
                  <p className="text-sm leading-tight">{instruction.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <p className="text-sm">
                ✨ Once installed, Drift works like a native app with offline access and push notifications!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
