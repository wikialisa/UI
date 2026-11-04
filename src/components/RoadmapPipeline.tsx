// src/components/RoadmapPipeline.tsx
import React, { useState } from 'react';
import { Smartphone, Database, Send, Server, CheckCheck } from 'lucide-react';

interface RoadmapPipelineProps {
  moduleId: string;
  onEmitEvent?: (eventName: string, payload: Record<string, unknown>) => void;
}

const STEPS = [
  {
    step: 1,
    title: 'Thao Tác Thực Địa',
    sub: 'App 390px nhập dữ liệu',
    icon: Smartphone,
    desc: 'Người dùng thực hiện thao tác trực tiếp trên khung màn hình di động 390px (nhập số liệu, quét mã QR hoặc ký số).'
  },
  {
    step: 2,
    title: 'Xác Thực Cục Bộ',
    sub: 'Lưu đệm SQLite an toàn',
    icon: Database,
    desc: 'Thiết bị di động kiểm tra định vị GPS trong bán kính cho phép, mã hóa dữ liệu và lưu vào cơ sở dữ liệu SQLite cục bộ (Zero-Loss).'
  },
  {
    step: 3,
    title: 'Mã Hóa & Gửi Broker',
    sub: 'REST / MQTT 5.0 TLS',
    icon: Send,
    desc: 'Gói tin JSON được gắn chữ ký số SHA-256, truyền qua kênh bảo mật TLS đến máy chủ MQTT / REST API với độ trễ dưới 50ms.'
  },
  {
    step: 4,
    title: 'Xử Lý Nghiệp Vụ Admin',
    sub: 'Cập nhật bảng điều khiển',
    icon: Server,
    desc: 'Tháp chỉ huy tiếp nhận dữ liệu, cập nhật bảng hiển thị theo thời gian thực và tự động kích hoạt các chỉ số KPI tương ứng.'
  },
  {
    step: 5,
    title: 'Kích Hoạt Tự Động',
    sub: 'Chuyển sang vai trò tiếp',
    icon: CheckCheck,
    desc: 'Hệ thống tự động chuyển tiếp hồ sơ sang phân hệ tiếp theo (VD: Giao hàng xong tự động giao việc cho Đội lắp đặt).'
  }
];

export const RoadmapPipeline: React.FC<RoadmapPipelineProps> = ({ moduleId, onEmitEvent }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const handleSelectStep = (stepNumber: number) => {
    setActiveStep(stepNumber);
    if (onEmitEvent) {
      onEmitEvent(`PIPELINE_STEP_${stepNumber}_INSPECTED`, {
        stepNumber,
        moduleId,
        stepTitle: STEPS[stepNumber - 1].title
      });
    }
  };

  const currentStep = STEPS[activeStep - 1];

  return (
    <section className="py-8 bg-slate-100/60 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Roadmap Dữ Liệu Thời Gian Thực
            </span>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Quy Trình Đồng Bộ 5 Bước: Mobile 390px ➔ Admin Control Tower
            </h2>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Chạm vào từng bước để kiểm tra luồng truyền
          </span>
        </div>

        {/* 5 Step Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {STEPS.map(s => {
            const IconComponent = s.icon;
            const isActive = activeStep === s.step;
            return (
              <button
                key={s.step}
                onClick={() => handleSelectStep(s.step)}
                className={`p-3 text-left rounded-xl transition-all ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 border-2 border-emerald-500 shadow-md scale-[1.02]'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${
                    isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                  }`}>
                    BƯỚC 0{s.step}
                  </span>
                  <IconComponent className={`w-3.5 h-3.5 ${
                    isActive ? 'text-emerald-500' : 'text-slate-400'
                  }`} />
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                  {s.title}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {s.sub}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail Box */}
        <div className="mt-3.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-300 flex items-start gap-2">
          <span className="font-bold shrink-0">Bước {currentStep.step} ({currentStep.title}):</span>
          <span>{currentStep.desc}</span>
        </div>
      </div>
    </section>
  );
};
