// src/components/EventBusStream.tsx
import React from 'react';
import { TelemetryEvent } from '../types';
import { Activity, Trash2, Cpu } from 'lucide-react';

interface EventBusStreamProps {
  events: TelemetryEvent[];
  onClear: () => void;
}

export const EventBusStream: React.FC<EventBusStreamProps> = ({ events, onClear }) => {
  return (
    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-xs font-mono font-bold text-emerald-400">
            EVENT_BUS_STREAM (WebSocket MQTT 5.0)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
            TLS 1.3 / Latency &lt; 45ms
          </span>
          <button
            onClick={onClear}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
            title="Xóa nhật ký sự kiện"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
        {events.length === 0 ? (
          <div className="text-xs text-slate-500 italic p-4 text-center">
            Đang chờ sự kiện tương tác từ Mobile Simulator 390px...
          </div>
        ) : (
          events.slice(0, 8).map(evt => (
            <div
              key={evt.id}
              className="font-mono text-[11px] p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 leading-relaxed transition-all"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                <span className="text-emerald-400 font-bold">[{evt.source}]</span>
                <span>{evt.timestamp}</span>
              </div>
              <div className="text-amber-300 font-semibold flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-amber-400" />
                <span>{evt.eventName}</span>
              </div>
              <pre className="text-[10px] text-slate-400 overflow-x-auto mt-1 bg-slate-900/50 p-1.5 rounded">
                {JSON.stringify(evt.payload, null, 2)}
              </pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
