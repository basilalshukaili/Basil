import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Left */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <Shield size={11} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[13px] text-slate-500">
            © {new Date().getFullYear()} Basil AlShuakili. All Rights Reserved.
          </span>
        </div>

        {/* Right */}
        <span className="text-[12px] text-slate-600 tracking-wide">
          Senior Executive Information Security
        </span>
      </div>
    </footer>
  );
}
