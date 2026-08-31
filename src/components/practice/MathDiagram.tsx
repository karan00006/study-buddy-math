import React from 'react';
import { MathDiagramData } from '../../math-engine/types';

interface MathDiagramProps {
  diagram: MathDiagramData;
}

export const MathDiagram: React.FC<MathDiagramProps> = ({ diagram }) => {
  const { type, title, params } = diagram;

  return (
    <div className="my-4 p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl flex flex-col items-center justify-center shadow-xs">
      {title && (
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          {title}
        </span>
      )}
      <div className="w-full max-w-[280px] sm:max-w-[320px] flex items-center justify-center">
        {renderDiagram(type, params)}
      </div>
    </div>
  );
};

function renderDiagram(type: string, params: Record<string, any>) {
  switch (type) {
    case 'triangle-right': {
      const { a, b, c } = params;
      return (
        <svg viewBox="0 0 240 180" className="w-full h-auto max-h-48 text-indigo-600">
          {/* Right triangle: vertices at (40, 140), (200, 140), (40, 40) */}
          <polygon
            points="40,140 200,140 40,40"
            className="fill-indigo-50/70 stroke-indigo-600 stroke-[2.5]"
          />
          {/* Right angle marker */}
          <path
            d="M 40 125 L 55 125 L 55 140"
            fill="none"
            className="stroke-indigo-500 stroke-2"
          />
          {/* Left leg (vertical): a */}
          <text
            x="24"
            y="95"
            className="text-xs font-bold fill-slate-700 text-center"
            textAnchor="middle"
          >
            a = {a}
          </text>
          {/* Bottom leg (horizontal): b */}
          <text
            x="120"
            y="160"
            className="text-xs font-bold fill-slate-700"
            textAnchor="middle"
          >
            b = {b}
          </text>
          {/* Hypotenuse: c */}
          <text
            x="130"
            y="80"
            className="text-xs font-bold fill-indigo-700 font-mono-math"
            textAnchor="middle"
          >
            c = {c}
          </text>
        </svg>
      );
    }

    case 'triangle-generic': {
      const { base, height, unit = '' } = params;
      return (
        <svg viewBox="0 0 240 160" className="w-full h-auto max-h-44">
          {/* Triangle vertices: (30, 130), (210, 130), (100, 35) */}
          <polygon
            points="30,130 210,130 100,35"
            className="fill-indigo-50/70 stroke-indigo-600 stroke-[2.5]"
          />
          {/* Dashed altitude height line from (100, 35) to (100, 130) */}
          <line
            x1="100"
            y1="35"
            x2="100"
            y2="130"
            className="stroke-amber-500 stroke-2 stroke-dasharray-4"
            strokeDasharray="4 3"
          />
          {/* Right angle at altitude foot */}
          <path d="M 100 120 L 110 120 L 110 130" fill="none" className="stroke-amber-500 stroke-1.5" />
          {/* Height label */}
          <text x="118" y="85" className="text-xs font-bold fill-amber-700">
            h = {height} {unit}
          </text>
          {/* Base label */}
          <text x="120" y="148" className="text-xs font-bold fill-slate-700" textAnchor="middle">
            base = {base} {unit}
          </text>
        </svg>
      );
    }

    case 'rectangle': {
      const { length, width, unit = '' } = params;
      return (
        <svg viewBox="0 0 240 150" className="w-full h-auto max-h-40">
          <rect
            x="40"
            y="30"
            width="160"
            height="85"
            rx="6"
            className="fill-emerald-50/70 stroke-emerald-600 stroke-[2.5]"
          />
          {/* Top length */}
          <text x="120" y="22" className="text-xs font-bold fill-slate-700" textAnchor="middle">
            {length} {unit}
          </text>
          {/* Right width */}
          <text x="212" y="77" className="text-xs font-bold fill-slate-700" textAnchor="start">
            {width} {unit}
          </text>
        </svg>
      );
    }

    case 'circle': {
      const { radius, unit = '' } = params;
      return (
        <svg viewBox="0 0 200 170" className="w-full h-auto max-h-44">
          <circle
            cx="100"
            cy="85"
            r="60"
            className="fill-sky-50/70 stroke-sky-600 stroke-[2.5]"
          />
          {/* Center dot */}
          <circle cx="100" cy="85" r="3.5" className="fill-sky-700" />
          {/* Radius line from center to right */}
          <line
            x1="100"
            y1="85"
            x2="160"
            y2="85"
            className="stroke-sky-700 stroke-2"
          />
          {/* Radius text */}
          <text x="130" y="78" className="text-xs font-bold fill-sky-800" textAnchor="middle">
            r = {radius} {unit}
          </text>
        </svg>
      );
    }

    case 'cylinder': {
      const { radius, height, unit = '' } = params;
      return (
        <svg viewBox="0 0 200 180" className="w-full h-auto max-h-44">
          {/* Body */}
          <path
            d="M 60 40 L 60 140 A 40 15 0 0 0 140 140 L 140 40 Z"
            className="fill-teal-50/70 stroke-teal-600 stroke-[2.5]"
          />
          {/* Bottom ellipse dashed back */}
          <path
            d="M 60 140 A 40 15 0 0 1 140 140"
            fill="none"
            className="stroke-teal-400 stroke-2"
            strokeDasharray="4 3"
          />
          {/* Top ellipse */}
          <ellipse
            cx="100"
            cy="40"
            rx="40"
            ry="15"
            className="fill-teal-100/80 stroke-teal-600 stroke-[2.5]"
          />
          {/* Radius line on top */}
          <circle cx="100" cy="40" r="2.5" className="fill-teal-800" />
          <line x1="100" y1="40" x2="140" y2="40" className="stroke-teal-800 stroke-1.5" />
          <text x="120" y="34" className="text-[10px] font-bold fill-teal-900" textAnchor="middle">
            r = {radius}
          </text>
          {/* Height dimension on right */}
          <line x1="155" y1="40" x2="155" y2="140" className="stroke-slate-400 stroke-1" markerEnd="url(#arrow)" />
          <text x="162" y="94" className="text-xs font-bold fill-slate-700">
            h = {height} {unit}
          </text>
        </svg>
      );
    }

    case 'cone': {
      const { radius, height, unit = '' } = params;
      return (
        <svg viewBox="0 0 200 180" className="w-full h-auto max-h-44">
          {/* Base ellipse */}
          <ellipse
            cx="100"
            cy="140"
            rx="50"
            ry="16"
            className="fill-rose-50/70 stroke-rose-600 stroke-[2.5]"
          />
          {/* Cone body */}
          <path
            d="M 50 140 L 100 30 L 150 140"
            className="fill-rose-50/50 stroke-rose-600 stroke-[2.5]"
          />
          {/* Altitude height line */}
          <line
            x1="100"
            y1="30"
            x2="100"
            y2="140"
            className="stroke-amber-600 stroke-1.5"
            strokeDasharray="4 3"
          />
          {/* Radius line */}
          <line x1="100" y1="140" x2="150" y2="140" className="stroke-rose-800 stroke-2" />
          <text x="125" y="154" className="text-xs font-bold fill-rose-900" textAnchor="middle">
            r = {radius}
          </text>
          <text x="85" y="85" className="text-xs font-bold fill-amber-800" textAnchor="end">
            h = {height} {unit}
          </text>
        </svg>
      );
    }

    case 'rectangular-prism': {
      const { length, width, height, unit = '' } = params;
      return (
        <svg viewBox="0 0 240 160" className="w-full h-auto max-h-44">
          {/* Front face */}
          <rect
            x="40"
            y="65"
            width="110"
            height="65"
            className="fill-indigo-50/80 stroke-indigo-600 stroke-2"
          />
          {/* Top face */}
          <polygon
            points="40,65 75,35 185,35 150,65"
            className="fill-indigo-100/70 stroke-indigo-600 stroke-2"
          />
          {/* Right face */}
          <polygon
            points="150,65 185,35 185,100 150,130"
            className="fill-indigo-200/50 stroke-indigo-600 stroke-2"
          />
          {/* Dimensions */}
          <text x="95" y="146" className="text-xs font-bold fill-slate-700" textAnchor="middle">
            l = {length} {unit}
          </text>
          <text x="24" y="102" className="text-xs font-bold fill-slate-700" textAnchor="middle">
            h = {height}
          </text>
          <text x="175" y="60" className="text-xs font-bold fill-slate-700" textAnchor="start">
            w = {width}
          </text>
        </svg>
      );
    }

    case 'spinner': {
      const { sections = 8, colored = 3, colorName = 'yellow' } = params;
      const radius = 65;
      const cx = 100;
      const cy = 90;
      const angleStep = 360 / sections;

      const slices = [];
      for (let i = 0; i < sections; i++) {
        const startAngle = (i * angleStep * Math.PI) / 180;
        const endAngle = ((i + 1) * angleStep * Math.PI) / 180;
        const x1 = cx + radius * Math.cos(startAngle);
        const y1 = cy + radius * Math.sin(startAngle);
        const x2 = cx + radius * Math.cos(endAngle);
        const y2 = cy + radius * Math.sin(endAngle);
        const isTarget = i < colored;

        slices.push(
          <path
            key={i}
            d={`M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
            className={
              isTarget
                ? 'fill-amber-300 stroke-slate-600 stroke-1.5'
                : 'fill-emerald-200 stroke-slate-600 stroke-1.5'
            }
          />
        );
      }

      return (
        <svg viewBox="0 0 200 180" className="w-full h-auto max-h-44">
          <g>{slices}</g>
          {/* Center spinner needle */}
          <polygon
            points="100,60 94,95 106,95"
            className="fill-slate-900 stroke-white stroke-1"
          />
          <circle cx="100" cy="90" r="5" className="fill-red-500 stroke-slate-900 stroke-1.5" />
          <text x="100" y="172" className="text-xs font-semibold fill-slate-600" textAnchor="middle">
            {colored} {colorName} / {sections} total sections
          </text>
        </svg>
      );
    }

    case 'marble-bag': {
      const { red = 4, blue = 3, green = 2 } = params;
      return (
        <div className="flex flex-col items-center gap-2 p-2">
          <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[200px] p-3 bg-white rounded-xl border border-slate-200 shadow-inner">
            {Array.from({ length: red }).map((_, i) => (
              <span
                key={`r-${i}`}
                className="w-5 h-5 rounded-full bg-rose-500 shadow-xs ring-2 ring-rose-200"
                title="Red"
              />
            ))}
            {Array.from({ length: blue }).map((_, i) => (
              <span
                key={`b-${i}`}
                className="w-5 h-5 rounded-full bg-blue-500 shadow-xs ring-2 ring-blue-200"
                title="Blue"
              />
            ))}
            {Array.from({ length: green }).map((_, i) => (
              <span
                key={`g-${i}`}
                className="w-5 h-5 rounded-full bg-emerald-500 shadow-xs ring-2 ring-emerald-200"
                title="Green"
              />
            ))}
          </div>
          <div className="flex gap-3 text-xs font-medium text-slate-600">
            <span className="text-rose-600 font-bold">{red} Red</span>
            <span className="text-blue-600 font-bold">{blue} Blue</span>
            {green > 0 && <span className="text-emerald-600 font-bold">{green} Green</span>}
          </div>
        </div>
      );
    }

    case 'function-table': {
      const { rows = [] } = params;
      return (
        <div className="overflow-hidden rounded-xl border border-slate-300 shadow-xs bg-white text-xs min-w-[180px]">
          <div className="grid grid-cols-2 bg-indigo-50 font-bold text-slate-700 py-1.5 text-center border-b border-slate-300">
            <span className="border-r border-slate-300">x (Input)</span>
            <span>y (Output)</span>
          </div>
          {rows.map((row: any, i: number) => (
            <div
              key={i}
              className={`grid grid-cols-2 py-1.5 text-center font-mono-math ${
                i % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'
              } ${i !== rows.length - 1 ? 'border-b border-slate-200' : ''}`}
            >
              <span className="border-r border-slate-200 font-semibold">{row.x}</span>
              <span className="font-semibold text-indigo-600">{row.y}</span>
            </div>
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}
