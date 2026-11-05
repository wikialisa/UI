// src/context/PrototypeContext.tsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { RoleType, TelemetryEvent } from '../types';
import { LIFECYCLE_STEPS } from '../data/lifecycleData';
import { MODULES_DATA } from '../data/modulesData';

export type ClusterType = 'cluster-1' | 'cluster-2' | 'cluster-3';

export interface SolarTelemetryState {
  siteId: string;
  deviceId: string;
  vDc: number;       // V
  iDc: number;       // A
  pDc: number;       // W
  vAc: number;       // V
  iAc: number;       // A
  pAc: number;       // W
  frequency: number; // Hz
  dailyYield: number;// kWh
  temperature: number;// °C
  afciStatus: 0 | 1 | 2; // 0: Normal, 1: Warning, 2: Tripped (Arc Fault Detected)
  afciTripTimestamp: string | null;
  afciResponseTimeMs: number;
  mqttBrokerConnected: boolean;
  timescaleDbLatencyMs: number;
}

export interface OrderState {
  id: string;
  pumpModel: string;
  farmerName: string;
  farmerPhone: string;
  farmerAddress: string;
  farmerCoords: string;
  serialNumber: string;
  qrScanned: boolean;
  customerOtp: string;
  otpVerified: boolean;
  signatureCaptured: boolean;
  deliveryStatus: 'PENDING' | 'IN_TRANSIT' | 'ARRIVED' | 'POD_COMPLETED';
  installChecklist: {
    mountFrame15Deg: boolean;
    pvWiringChecked: boolean;
    inverterVfdMounted: boolean;
    groundingResistUnder4Ohm: boolean;
  };
  pumpFlowRate: number; // m³/h
  installStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  qaDistanceDelta: number; // meters from geofence
  qaTcvnPassed: boolean;
  qaStatus: 'PENDING' | 'APPROVED' | 'REWORK';
  subsidyGranted: boolean;
  farmerPumpRunning: boolean;
  farmerWaterTotal: number; // m³
  farmerMoisture: number; // %
  activeAlarm: string | null;
  serviceTicketStatus: 'NONE' | 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  serviceReplacedPart: string | null;
  farmerRating: number;
  technicianOnDuty: boolean;
  offlineQueueCount: number;
}

interface PrototypeContextType {
  activeModuleId: string;
  activeCluster: ClusterType;
  activeRole: RoleType;
  activeStep: number;
  mobileNavTab: 'home' | 'tasks' | 'map' | 'alerts' | 'profile';
  mobileSubScreen: string;
  networkMode: 'online' | 'offline' | 'syncing';
  isAutoPlaying: boolean;
  order: OrderState;
  solarTelemetry: SolarTelemetryState;
  events: TelemetryEvent[];
  handoverMessage: string | null;
  isConfigDrawerOpen: boolean;
  setIsConfigDrawerOpen: (open: boolean) => void;
  toggleConfigDrawer: () => void;
  setModule: (id: string) => void;
  setCluster: (cluster: ClusterType) => void;
  setRole: (role: RoleType) => void;
  setStep: (stepNumber: number) => void;
  setMobileNavTab: (tab: 'home' | 'tasks' | 'map' | 'alerts' | 'profile') => void;
  setMobileSubScreen: (screen: string) => void;
  setNetworkMode: (mode: 'online' | 'offline' | 'syncing') => void;
  emitEvent: (eventName: string, payload: Record<string, unknown>, source?: string) => void;
  clearEvents: () => void;
  nextLifecycleStep: () => void;
  prevLifecycleStep: () => void;
  jumpToHandover: (targetModuleId: string, customMessage?: string) => void;
  resetEntireFlow: () => void;
  toggleAutoPlay: () => void;
  updateOrder: (updates: Partial<OrderState>) => void;
  triggerAfciFault: (severity: 1 | 2) => void;
  resetAfciFault: () => void;
}

const initialOrder: OrderState = {
  id: 'ORD-2026-SLR-892',
  pumpModel: 'WikiAlisa SolarPump 7.5HP Dual-MPPT',
  farmerName: 'Nguyễn Văn Nông (HTX Thới Thuận)',
  farmerPhone: '0918 842 901',
  farmerAddress: 'Ấp Thới Thuận, Thốt Nốt, Cần Thơ',
  farmerCoords: '10.2742° N, 105.5342° E',
  serialNumber: 'SN-SLR-2026-9941',
  qrScanned: false,
  customerOtp: '5821',
  otpVerified: false,
  signatureCaptured: false,
  deliveryStatus: 'IN_TRANSIT',
  installChecklist: {
    mountFrame15Deg: false,
    pvWiringChecked: false,
    inverterVfdMounted: false,
    groundingResistUnder4Ohm: false,
  },
  pumpFlowRate: 0,
  installStatus: 'PENDING',
  qaDistanceDelta: 3.2,
  qaTcvnPassed: true,
  qaStatus: 'PENDING',
  subsidyGranted: false,
  farmerPumpRunning: false,
  farmerWaterTotal: 184.5,
  farmerMoisture: 42,
  activeAlarm: null,
  serviceTicketStatus: 'NONE',
  serviceReplacedPart: null,
  farmerRating: 5,
  technicianOnDuty: true,
  offlineQueueCount: 0,
};

const initialSolarTelemetry: SolarTelemetryState = {
  siteId: 'SITE-CANTHO-001',
  deviceId: 'INV-AFCI-7K5-VN99',
  vDc: 580.4,
  iDc: 12.8,
  pDc: 7429.1,
  vAc: 228.6,
  iAc: 31.5,
  pAc: 7198.5,
  frequency: 50.02,
  dailyYield: 38.64,
  temperature: 46.5,
  afciStatus: 0, // Normal
  afciTripTimestamp: null,
  afciResponseTimeMs: 38,
  mqttBrokerConnected: true,
  timescaleDbLatencyMs: 14
};

const PrototypeContext = createContext<PrototypeContextType | undefined>(undefined);

export const PrototypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModuleId, setActiveModuleId] = useState<string>('04');
  const [activeCluster, setActiveCluster] = useState<ClusterType>('cluster-2');
  const [activeRole, setActiveRole] = useState<RoleType>('delivery');
  const [activeStep, setActiveStep] = useState<number>(3);
  const [mobileNavTab, setMobileNavTab] = useState<'home' | 'tasks' | 'map' | 'alerts' | 'profile'>('tasks');
  const [mobileSubScreen, setMobileSubScreen] = useState<string>('default');
  const [networkMode, setNetworkMode] = useState<'online' | 'offline' | 'syncing'>('online');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderState>(initialOrder);
  const [solarTelemetry, setSolarTelemetry] = useState<SolarTelemetryState>(initialSolarTelemetry);
  const [handoverMessage, setHandoverMessage] = useState<string | null>(
    '🚚 Đối tác Giao Hàng đang di chuyển đến trang trại Thốt Nốt theo lộ trình GPS tối ưu.'
  );

  const [events, setEvents] = useState<TelemetryEvent[]>([
    {
      id: 'init-flow-1',
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      source: 'PROTOTYPE_ORCHESTRATOR',
      eventName: 'WORKFLOW_ENGINE_STARTED',
      payload: {
        activeCluster: 'cluster-2',
        initialModule: '04',
        orderId: initialOrder.id,
        farmer: initialOrder.farmerName,
        step: 3
      }
    }
  ]);

  const autoPlayTimer = useRef<number | null>(null);

  // Sync hash when module changes
  const setModule = (id: string) => {
    setActiveModuleId(id);
    const mod = MODULES_DATA.find(m => m.id === id);
    if (mod) {
      window.location.hash = mod.slug;
    }
  };

  const emitEvent = (eventName: string, payload: Record<string, unknown>, source?: string) => {
    const newEvent: TelemetryEvent = {
      id: 'evt-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      source: source || `MODULE_${activeModuleId}_PROTOTYPE`,
      eventName,
      payload
    };
    setEvents(prev => [newEvent, ...prev.slice(0, 49)]); // Keep last 50
  };

  const clearEvents = () => {
    setEvents([]);
  };

  const updateOrder = (updates: Partial<OrderState>) => {
    setOrder(prev => ({ ...prev, ...updates }));
  };

  // AFCI Trigger
  const triggerAfciFault = (severity: 1 | 2) => {
    const tripTime = new Date().toLocaleTimeString('vi-VN');
    const responseMs = Math.floor(28 + Math.random() * 15); // e.g. 28-43ms (< 50ms)

    if (severity === 2) {
      // Emergency Cutoff
      setSolarTelemetry(prev => ({
        ...prev,
        afciStatus: 2,
        afciTripTimestamp: tripTime,
        afciResponseTimeMs: responseMs,
        iDc: 0.0,
        pDc: 0.0,
        iAc: 0.0,
        pAc: 0.0,
      }));

      emitEvent('AFCI_ARC_FAULT_TRIPPED', {
        severity: 'CRITICAL',
        standard: 'UL1699B / IEC 63027',
        edgeCutoffResponseTimeMs: responseMs,
        tripTimestamp: tripTime,
        actionTaken: 'DC_ISOLATOR_OPENED_EMERGENCY_CUTOFF',
        inverterId: solarTelemetry.deviceId,
        siteId: solarTelemetry.siteId
      }, 'AFCI_EDGE_SENSOR');

      setHandoverMessage(`🚨 [AFCI TRIP < 50ms] Phát hiện hồ quang điện DC! Biến tần đã tự động ngắt mạch trong ${responseMs}ms để chống cháy nổ!`);
    } else {
      setSolarTelemetry(prev => ({
        ...prev,
        afciStatus: 1
      }));

      emitEvent('AFCI_ARC_NOISE_WARNING', {
        severity: 'WARNING',
        inverterId: solarTelemetry.deviceId,
        noiseFreqKhz: 142.5
      }, 'AFCI_EDGE_SENSOR');

      setHandoverMessage('⚠️ [AFCI Cảnh Báo] Phát hiện nhiễu xung hồ quang vi mô trên String #2. Tiếp tục giám sát.');
    }
  };

  const resetAfciFault = () => {
    setSolarTelemetry(initialSolarTelemetry);
    emitEvent('AFCI_BREAKER_RESET', {
      inverterId: initialSolarTelemetry.deviceId,
      restoredAt: new Date().toLocaleTimeString('vi-VN'),
      status: 'NORMAL'
    }, 'AFCI_MANAGEMENT');
    setHandoverMessage('✓ Rơ-le AFCI đã được phục hồi. Đóng cầu dao DC và khôi phục dòng điện biến tần.');
  };

  // Switch cluster helper
  const setCluster = (cluster: ClusterType) => {
    setActiveCluster(cluster);
    if (cluster === 'cluster-1') {
      setModule('01');
      setActiveRole('delivery');
      setActiveStep(1);
    } else if (cluster === 'cluster-2') {
      setModule('04');
      setActiveRole('delivery');
      setActiveStep(3);
    } else if (cluster === 'cluster-3') {
      setModule('08');
      setActiveRole('farmer');
      setActiveStep(15);
    }
  };

  const setRole = (role: RoleType) => {
    setActiveRole(role);
    emitEvent('ROLE_SWITCHED', { role, timestamp: new Date().toISOString() });
  };

  // Seamless cross-module handover
  const jumpToHandover = (targetModuleId: string, customMessage?: string) => {
    setActiveModuleId(targetModuleId);
    const mod = MODULES_DATA.find(m => m.id === targetModuleId);
    if (mod) {
      window.location.hash = mod.slug;
    }

    if (targetModuleId === '01') {
      setActiveCluster('cluster-1');
      setActiveRole('delivery');
      setActiveStep(1);
    } else if (targetModuleId === '02') {
      setActiveCluster('cluster-1');
      setActiveRole('delivery');
      setActiveStep(2);
    } else if (targetModuleId === '03') {
      setActiveCluster('cluster-1');
      setActiveRole('admin');
      setActiveStep(1);
    } else if (targetModuleId === '04') {
      setActiveCluster('cluster-2');
      setActiveRole('delivery');
      setActiveStep(4);
    } else if (targetModuleId === '05') {
      setActiveCluster('cluster-2');
      setActiveRole('install');
      setActiveStep(7);
      setMobileNavTab('tasks');
    } else if (targetModuleId === '06') {
      setActiveCluster('cluster-2');
      setActiveRole('qa');
      setActiveStep(12);
      setMobileNavTab('tasks');
    } else if (targetModuleId === '07') {
      setActiveCluster('cluster-3');
      setActiveRole('service');
      setActiveStep(17);
      setMobileNavTab('tasks');
    } else if (targetModuleId === '08') {
      setActiveCluster('cluster-3');
      setActiveRole('farmer');
      setActiveStep(15);
      setMobileNavTab('home');
    } else if (targetModuleId === '09') {
      setActiveCluster('cluster-3');
      setMobileNavTab('alerts');
    } else if (targetModuleId === '10') {
      setActiveCluster('cluster-3');
      setMobileNavTab('profile');
    } else if (targetModuleId === '11') {
      setActiveCluster('cluster-3');
      setNetworkMode('offline');
    }

    if (customMessage) {
      setHandoverMessage(customMessage);
    }

    emitEvent('CROSS_MODULE_HANDOVER_TRIGGERED', {
      fromModule: activeModuleId,
      toModule: targetModuleId,
      handoverMessage: customMessage || 'Next stage activated'
    });
  };

  const setStep = (stepNumber: number) => {
    const clamped = Math.max(1, Math.min(20, stepNumber));
    setActiveStep(clamped);

    // Sync module according to step
    const stepDef = LIFECYCLE_STEPS[clamped - 1];
    if (stepDef) {
      const foundMod = MODULES_DATA.find(m => m.slug === stepDef.moduleSlug);
      if (foundMod && foundMod.id !== activeModuleId) {
        setActiveModuleId(foundMod.id);
        window.location.hash = foundMod.slug;
      }
      setHandoverMessage(`[Bước ${stepDef.step}/20] ${stepDef.title}: ${stepDef.description}`);
    }
  };

  const nextLifecycleStep = () => {
    if (activeStep < 20) {
      setStep(activeStep + 1);
    }
  };

  const prevLifecycleStep = () => {
    if (activeStep > 1) {
      setStep(activeStep - 1);
    }
  };

  const resetEntireFlow = () => {
    setOrder(initialOrder);
    setSolarTelemetry(initialSolarTelemetry);
    setActiveModuleId('04');
    setActiveCluster('cluster-2');
    setActiveRole('delivery');
    setActiveStep(3);
    setMobileNavTab('tasks');
    setNetworkMode('online');
    setIsAutoPlaying(false);
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
      autoPlayTimer.current = null;
    }
    setHandoverMessage('🔄 Đã làm mới chu trình prototype về trạng thái ban đầu.');
    emitEvent('PROTOTYPE_RESET', { timestamp: new Date().toISOString() });
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev);
  };

  // AutoPlay effect
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimer.current = window.setInterval(() => {
        setActiveStep(prev => {
          if (prev >= 20) {
            setIsAutoPlaying(false);
            if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
            return 1;
          }
          const next = prev + 1;
          const stepDef = LIFECYCLE_STEPS[next - 1];
          if (stepDef) {
            const foundMod = MODULES_DATA.find(m => m.slug === stepDef.moduleSlug);
            if (foundMod) {
              setActiveModuleId(foundMod.id);
              window.location.hash = foundMod.slug;
            }
            setHandoverMessage(`[Auto-Demo ${stepDef.step}/20] ${stepDef.title}: ${stepDef.description}`);
          }
          return next;
        });
      }, 3500);
    } else {
      if (autoPlayTimer.current) {
        clearInterval(autoPlayTimer.current);
        autoPlayTimer.current = null;
      }
    }
    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isAutoPlaying]);

  const toggleConfigDrawer = () => setIsConfigDrawerOpen(prev => !prev);

  return (
    <PrototypeContext.Provider
      value={{
        activeModuleId,
        activeCluster,
        activeRole,
        activeStep,
        mobileNavTab,
        mobileSubScreen,
        networkMode,
        isAutoPlaying,
        isConfigDrawerOpen,
        setIsConfigDrawerOpen,
        toggleConfigDrawer,
        order,
        solarTelemetry,
        events,
        handoverMessage,
        setModule,
        setCluster,
        setRole,
        setStep,
        setMobileNavTab,
        setMobileSubScreen,
        setNetworkMode,
        emitEvent,
        clearEvents,
        nextLifecycleStep,
        prevLifecycleStep,
        jumpToHandover,
        resetEntireFlow,
        toggleAutoPlay,
        updateOrder,
        triggerAfciFault,
        resetAfciFault
      }}
    >
      {children}
    </PrototypeContext.Provider>
  );
};

export const usePrototype = (): PrototypeContextType => {
  const context = useContext(PrototypeContext);
  if (!context) {
    throw new Error('usePrototype must be used within a PrototypeProvider');
  }
  return context;
};
