import React, { useRef, useState, useEffect } from 'react';
import { Edit3, Trash2, X, Minimize2, Maximize2 } from 'lucide-react';

interface ScratchpadProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Scratchpad: React.FC<ScratchpadProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#1e293b'); // default charcoal
  const [lineWidth, setLineWidth] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const colors = [
    { name: 'Charcoal', hex: '#1e293b' },
    { name: 'Blue', hex: '#2563eb' },
    { name: 'Emerald', hex: '#059669' },
    { name: 'Purple', hex: '#7c3aed' },
  ];

  // Resize canvas according to device pixel ratio
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [isOpen, isExpanded]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(clientX - rect.left, clientY - rect.top);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = isEraser ? '#ffffff' : color;
      ctx.lineWidth = isEraser ? 16 : lineWidth;
      ctx.lineTo(clientX - rect.left, clientY - rect.top);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 bg-white border-2 border-indigo-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
        isExpanded
          ? 'inset-4 sm:inset-10'
          : 'bottom-4 right-4 w-[92vw] sm:w-[420px] h-[340px] max-h-[85vh]'
      }`}
    >
      {/* Header toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100/90 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
            <Edit3 className="w-4 h-4" />
          </span>
          <span className="font-bold text-sm text-slate-800">Scratchpad / Rough Work</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
            title={isExpanded ? 'Minimize' : 'Expand'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Drawing tools */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border-b border-slate-200 text-xs">
        {/* Colors */}
        <div className="flex items-center gap-1.5">
          {colors.map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() => {
                setColor(c.hex);
                setIsEraser(false);
              }}
              style={{ backgroundColor: c.hex }}
              className={`w-5 h-5 rounded-full transition-transform ${
                !isEraser && color === c.hex
                  ? 'ring-2 ring-indigo-500 ring-offset-1 scale-110'
                  : 'hover:scale-105'
              }`}
              title={c.name}
            />
          ))}

          <button
            type="button"
            onClick={() => setIsEraser(true)}
            className={`px-2 py-0.5 rounded-md font-semibold text-[11px] transition-colors ${
              isEraser
                ? 'bg-amber-500 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            Eraser
          </button>
        </div>

        {/* Thickness & Clear */}
        <div className="flex items-center gap-2">
          <select
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="text-[11px] py-0.5 px-1.5 bg-white border border-slate-300 rounded font-medium text-slate-700"
          >
            <option value={2}>Thin</option>
            <option value={4}>Medium</option>
            <option value={7}>Thick</option>
          </select>

          <button
            type="button"
            onClick={clearCanvas}
            className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 py-0.5 rounded transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Canvas workspace */}
      <div className="relative flex-1 bg-white cursor-crosshair touch-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
};
