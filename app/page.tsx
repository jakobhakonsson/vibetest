"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// SVG Icon components
const SessionIcon = () => (
  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
);
const DurationIcon = () => (
  <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
);
const ModuleIcon = () => (
  <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" /></svg>
);

// Chevron icon component
const ChevronIcon = ({ expanded, colorClass }: { expanded: boolean; colorClass: string }) => (
  <svg
    className={`w-4 h-4 ml-1 transition-transform duration-300 ${expanded ? 'rotate-180' : ''} ${colorClass}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// Add PaperPlaneIcon component near the other icon components
const PaperPlaneIcon = () => (
  <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2.94 2.94a1.5 1.5 0 012.12 0l12 12a1.5 1.5 0 01-2.12 2.12l-3.39-3.39-2.3 2.3a1 1 0 01-1.7-.7V13.4l-3.39-3.39a1.5 1.5 0 010-2.12l12-12z" /></svg>
);

// Add CopilotIcon component near the other icon components
const CopilotIcon = () => (
  <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" />
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

// Add a CalendarIcon component
const CalendarIcon = () => (
  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

// Add a BarChartIcon component
const BarChartIcon = () => (
  <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="10" width="4" height="10" rx="1" fill="currentColor" className="text-green-300" />
    <rect x="9" y="6" width="4" height="14" rx="1" fill="currentColor" className="text-green-400" />
    <rect x="15" y="2" width="4" height="18" rx="1" fill="currentColor" className="text-green-500" />
  </svg>
);

// Replace TrophyIcon with a CheckmarkIcon (checkmark in a circle)
const CheckmarkIcon = () => (
  <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l3 3 5-5" />
  </svg>
);

// Replace FunStatsIcon with a more beautiful beer mug icon
const FunStatsIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="12" width="16" height="16" rx="4" fill="#FBBF24" stroke="#B45309" strokeWidth="2"/>
    <rect x="24" y="16" width="4" height="10" rx="2" fill="#FDE68A" stroke="#F59E42" strokeWidth="1.5"/>
    <ellipse cx="16" cy="12" rx="8" ry="4" fill="#FEF3C7"/>
    <ellipse cx="16" cy="12" rx="6" ry="3" fill="#FFF" opacity="0.8"/>
    <circle cx="12" cy="10" r="1.2" fill="#FFF"/>
    <circle cx="20" cy="10.5" r="1" fill="#FFF"/>
    <path d="M28 20c2 0 2 6 0 6" stroke="#F59E42" strokeWidth="1.5" strokeLinecap="round"/>
    <g>
      <path d="M30 6l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" fill="#FDE68A" stroke="#FBBF24" strokeWidth="0.7"/>
    </g>
  </svg>
);

// Move StatusBadge and Bar above Home so they are in scope
const StatusBadge = ({ status }: { status: string }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
    status === "completed"
      ? "bg-green-100 text-green-700 border border-green-300"
      : "bg-red-100 text-red-700 border border-red-300"
  }`}>
    {status === "completed" ? (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
    ) : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
    )}
    {status}
  </span>
);

const Bar = ({ value, max, color }: { value: number; max: number; color: string }) => (
  <div className="w-full h-2 bg-gray-200 rounded">
    <div
      className={color + " h-2 rounded"}
      style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
    ></div>
  </div>
);

// Compact bar variant for tighter UI
const SmallBar = ({ value, max, color }: { value: number; max: number; color: string }) => (
  <div className="w-full h-1 bg-gray-200 rounded">
    <div
      className={color + " h-1 rounded"}
      style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
    ></div>
  </div>
);

// Move getRandomInt above Home so it's in scope
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Home() {
  // Define ModuleType for correct typing
  type ModuleType = {
    id: string;
    moduleId: string;
    sessionId: string;
    startTime: string;
    endTime: string;
    duration: number;
    status: string;
    averageScorePerBeer?: number;
    challengeHighScore?: number | null;
    averageScorePour1?: number;
    averageScorePour2?: number;
    averageScorePour3?: number;
    averageScorePour4?: number;
    averageScorePour5?: number;
    averageTotal?: number;
    // Beer types specific
    customersServed?: number;
    correctBeersServed?: number;
    beerTypesScore?: number;
  };
  // Move mock data generation here so it runs on every reload
  const [sessions] = useState(() => Array.from({ length: 120 }, (_, i) => {
    const id = `session-${(i + 1).toString().padStart(3, '0')}`;
    const deviceId = `VR-Headset-${getRandomInt(1, 10).toString().padStart(3, '0')}`;
    const appId = "the-experience-v1.2";
    const start = new Date(Date.now() - (120 - i) * 60 * 60 * 1000);
    const duration = getRandomInt(5, 60);
    const end = new Date(start.getTime() + duration * 60 * 1000);
    const status = getRandomInt(0, 4) === 0 ? "exited" : "completed";
    return {
      id,
      deviceId,
      appId,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      duration,
      status
    };
  }));

  const moduleTypesList = [
    "Tutorial",
    "Perfect Pour - The basics",
    "Perfect Pour - Masterclass",
    "Ingredients",
    "Beer types"
  ];
  const [modules] = useState<ModuleType[]>(() => {
    const generated: ModuleType[] = [];
    let moduleCounter = 1;
    sessions.forEach((s) => {
      // Pick a random number of module plays for this session (allow repeats)
      const numModulePlays = getRandomInt(1, moduleTypesList.length);
      let rollingOffsetMinutes = getRandomInt(0, 15);
      for (let k = 0; k < numModulePlays; k++) {
        const moduleId = moduleTypesList[getRandomInt(0, moduleTypesList.length - 1)];
        const id = `module-${(moduleCounter++).toString().padStart(3, '0')}`;
        const sessionId = s.id;
        const sessionStart = new Date(s.startTime);
        const start = new Date(sessionStart.getTime() + rollingOffsetMinutes * 60 * 1000);
        // Duration rules (Ingredients <= 5 min, others 3-10 min) with seconds
        let minutes: number;
        let seconds: number;
        if (moduleId === "Ingredients") {
          minutes = getRandomInt(0, 5);
          seconds = minutes === 5 ? 0 : getRandomInt(0, 59);
        } else {
          minutes = getRandomInt(3, 10);
          seconds = minutes === 10 ? 0 : getRandomInt(0, 59);
        }
        const duration = minutes + seconds / 60;
        const end = new Date(start.getTime() + duration * 60 * 1000);
        const status = duration < 5 ? "exited" : "completed";
        const base: ModuleType = {
          id,
          moduleId,
          sessionId,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          duration,
          status
        };
        if (moduleId === "Perfect Pour - The basics" || moduleId === "Perfect Pour - Masterclass") {
          let p1 = getRandomInt(1000, 6000);
          let p2 = p1 + getRandomInt(1000, 6000);
          let p3 = p2 + getRandomInt(1000, 6000);
          let p4 = p3 + getRandomInt(1000, 6000);
          let p5 = p4 + getRandomInt(1000, 6000);
          base.averageScorePour1 = p1;
          base.averageScorePour2 = p2;
          base.averageScorePour3 = p3;
          base.averageScorePour4 = p4;
          base.averageScorePour5 = p5;
          base.averageScorePerBeer = Math.round((p1 + p2 + p3 + p4 + p5) / 5);
          base.challengeHighScore = status === "exited" ? null : getRandomInt(p5, p5 + 50000);
          base.averageTotal = Math.round((p1 + p2 + p3 + p4 + p5) / 5);
        }
        if (moduleId === "Beer types") {
          const customers = getRandomInt(5, 30);
          base.customersServed = customers;
          base.correctBeersServed = getRandomInt(0, customers);
          base.beerTypesScore = getRandomInt(0, 150000);
        }
        generated.push(base);
        // Advance rolling offset to stagger module starts within session
        rollingOffsetMinutes += Math.max(1, Math.floor(minutes / 2));
      }
    });
    return generated;
  });

  // Generate mock total sessions between 100-200
  const [totalSessions] = useState(() => getRandomInt(100, 200));
  // Generate mock total modules played between 100-200 and split into completed/exited
  const [totalModulesPlayed] = useState(() => getRandomInt(100, 200));
  const [modulesPlayedSplit] = useState(() => {
    const completed = getRandomInt(0, totalModulesPlayed);
    return [completed, totalModulesPlayed - completed];
  });
  const completedModulesPlayed = modulesPlayedSplit[0];
  const exitedModulesPlayed = modulesPlayedSplit[1];
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const [showAllSessions, setShowAllSessions] = useState(false);
  const [expandedSessions, setExpandedSessions] = useState<Record<string, boolean>>({});
  // Module rows show drilldown by default; no per-row toggle needed
  const [isLoading, setIsLoading] = useState(false);
  const [showAIResponse, setShowAIResponse] = useState(false);

  // Generate mock fun stats for glasses broken and beer spilled
  const [funStats] = useState(() => ({
    glassesBroken: getRandomInt(0, 8),
    beerSpilled: getRandomInt(0, 12)
  }));

  // Additional fun facts metrics
  const [funFacts] = useState(() => {
    const virtualBeersPoured = getRandomInt(500, 2000);
    const beersServed = getRandomInt(400, virtualBeersPoured);
    const glassesTouchingTap = getRandomInt(10, 120);
    return { virtualBeersPoured, beersServed, glassesTouchingTap };
  });

  // Metrics
  const avgSessionDuration = sessions.reduce((acc, s) => acc + s.duration, 0) / sessions.length;
  const totalModules = modules.length;
  const avgModuleDuration = modules.length > 0 ? modules.reduce((acc, m) => acc + m.duration, 0) / modules.length : 0;
  const completionRate = totalModules > 0 ? (completedModulesPlayed / totalModulesPlayed) * 100 : 0;

  // Drilldown per module type
  const moduleTypes = Array.from(new Set(modules.map(m => m.moduleId)));
  // Generate once per page load so expanding/collapsing sessions won't change these numbers
  const [moduleStats] = useState(() => moduleTypes.map(type => {
    const started = getRandomInt(100, 200);
    const completed = getRandomInt(0, started);
    const exited = started - completed;
    // Avg duration: cap Ingredients at <= 5 minutes
    const avgDuration = type === "Ingredients"
      ? (getRandomInt(0, 5) + (getRandomInt(0, 5) === 5 ? 0 : getRandomInt(0, 59)) / 60)
      : (getRandomInt(3, 10) + getRandomInt(0, 59) / 60);
    return { type, started, exited, completed, avgDuration };
  }));

  // Format time
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleString();
  };

  // Format time as HH:MM (24-hour)
  const formatTimeHM = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  // Format duration
  const formatDuration = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${mins}m ${secs}s`;
  };

  // Format time as HH:MM:SS (24-hour)
  const formatTimeHMS = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };

  // In Session Activity, sort sessions by descending session number (most recent first)
  const sortedSessions = [...sessions].sort((a, b) => {
    // Extract the numeric part from the session id (e.g., 'session-120' -> 120)
    const numA = parseInt(a.id.replace('session-', ''), 10);
    const numB = parseInt(b.id.replace('session-', ''), 10);
    return numB - numA;
  });

  // Pie chart helpers for the right big card
  const pieColors = ["#60A5FA", "#34D399", "#FBBF24", "#A78BFA", "#F472B6"]; // blue, green, amber, purple, pink
  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    const start = { x: cx + r * Math.cos(toRadians(startAngle)), y: cy + r * Math.sin(toRadians(startAngle)) };
    const end = { x: cx + r * Math.cos(toRadians(endAngle)), y: cy + r * Math.sin(toRadians(endAngle)) };
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
  };

  // Build stable module breakdown (once) and derive pie data
  const [moduleBreakdown] = useState(() => moduleTypes.map((type, idx) => {
    const started = getRandomInt(100, 200);
    const completed = getRandomInt(0, started);
    const avgDuration = type === "Ingredients"
      ? (getRandomInt(0, 5) + (getRandomInt(0, 5) === 5 ? 0 : getRandomInt(0, 59)) / 60)
      : (getRandomInt(3, 10) + getRandomInt(0, 59) / 60);
    return { label: type, started, completed, avgDuration, color: pieColors[idx % pieColors.length] };
  }));
  const [pieData] = useState(() => moduleBreakdown.map(m => ({ label: m.label, count: Math.max(1, m.started), color: m.color })));
  const totalPie = pieData.reduce((s, d) => s + d.count, 0);
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 font-sans">
      {/* Header */}
      <header className="bg-white/80 shadow-sm border-b sticky top-0 z-10 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <Image
                src="/core-logo.png"
                alt="Core Logo"
                width={48}
                height={48}
                className="mr-3"
              />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                The Experience <span className="[color:#4AB2AC]">Dashboard</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Overview Title and Dropdown - moved to top */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
          <div className="relative">
            <select
              className="appearance-none border border-blue-200 rounded-lg pl-4 pr-10 py-2 bg-white shadow focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-800 font-medium transition-all duration-150"
              defaultValue="30d"
            >
              <option value="24h">Last 24 hours</option>
              <option value="30d">Last 30 days</option>
              <option value="all">All time</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>
      </section>

      {/* Overview Cards - moved to top */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Left: 2x2 grid with top 3 cards */}
          <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl shadow hover:shadow-lg transition p-6">
              <div className="bg-blue-200 rounded-full p-2">
                <CalendarIcon />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-blue-700 uppercase">Total Sessions</h3>
                <p className="text-3xl font-bold text-blue-900">{totalSessions}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl shadow hover:shadow-lg transition p-6">
              <div className="bg-purple-200 rounded-full p-2">
                <DurationIcon />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-purple-700 uppercase">Avg Session Duration</h3>
                <p className="text-3xl font-bold text-purple-900">{avgSessionDuration.toFixed(1)}m</p>
                <p className="text-xs text-purple-700 mt-1">{avgSessionDuration.toFixed(1)}m average</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gradient-to-r from-green-100 to-green-50 rounded-xl shadow hover:shadow-lg transition p-6">
              <div className="bg-green-200 rounded-full p-2">
                <CheckmarkIcon />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-green-700 uppercase">Total Modules Played</h3>
                <p className="text-3xl font-bold text-green-900">{totalModulesPlayed}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gradient-to-r from-teal-100 to-teal-50 rounded-xl shadow hover:shadow-lg transition p-6">
              <div className="bg-teal-200 rounded-full p-2">
                <DurationIcon />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-teal-700 uppercase">Avg Module Duration</h3>
                <p className="text-3xl font-bold text-teal-900">{avgModuleDuration.toFixed(1)}m</p>
                <p className="text-xs text-teal-700 mt-1">{avgModuleDuration.toFixed(1)}m average</p>
              </div>
            </div>
          </div>
          {/* Right: Big card spanning height of two rows */}
          <div className="bg-white rounded-xl shadow p-6 min-h-[260px] lg:min-h-[100%] lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Average time share per session</h3>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Pie Chart */}
              <svg width="260" height="260" viewBox="0 0 260 260" className="shrink-0">
                {(() => {
                  const cx = 130, cy = 130, r = 100;
                  let currentAngle = -90; // start at top
                  return pieData.map((slice, i) => {
                    const angle = (slice.count / totalPie) * 360;
                    const path = describeArc(cx, cy, r, currentAngle, currentAngle + angle);
                    const midAngle = currentAngle + angle / 2;
                    const offset = hoveredSlice === i ? 8 : 0; // how far to "explode" the slice
                    const dx = Math.cos(toRadians(midAngle)) * offset;
                    const dy = Math.sin(toRadians(midAngle)) * offset;
                    const el = (
                      <path
                        key={slice.label}
                        d={path}
                        fill={slice.color}
                        stroke="#ffffff"
                        strokeWidth="1"
                        onMouseEnter={() => setHoveredSlice(i)}
                        onMouseLeave={() => setHoveredSlice(null)}
                        style={{ cursor: "pointer", transform: `translate(${dx}px, ${dy}px)`, transition: "transform 0.25s ease-in-out" }}
                      />
                    );
                    currentAngle += angle;
                    return el;
                  });
                })()}
              </svg>
              {/* Legend */}
              <div className="flex flex-col gap-2">
                {pieData.map((d, i) => {
                  const details = moduleBreakdown[i];
                  const pct = Math.round((d.count / totalPie) * 100);
                  const completedPct = Math.round((details.completed / Math.max(1, details.started)) * 100);
                  const completedPctDisplay = Math.max(50, Math.min(95, completedPct));
                  return (
                  <div key={d.label} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="inline-block w-3 h-3 rounded mt-1" style={{ backgroundColor: d.color }}></span>
                    <div className="leading-tight">
                      <div className="font-medium">{d.label}</div>
                      <div className="text-xs text-gray-500">{pct}%</div>
                      <AnimatePresence initial={false}>
                        {hoveredSlice === i && (
                          <motion.div
                            key={`extra-${i}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="mt-1 text-xs text-gray-500"
                          >
                            <div><span className="font-semibold">{details.started}</span> sessions played in total</div>
                            <div><span className="font-semibold">{formatDuration(details.avgDuration)}</span> spent on average</div>
                            <div><span className="font-semibold">{completedPctDisplay}%</span> of players finished the module</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )})}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fun facts Section - between Overview and Session & Module Completion Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Fun facts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 bg-teal-50 hover:bg-teal-100 rounded-xl shadow transition p-6">
            <div className="hidden">
              <FunStatsIcon />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-amber-700 uppercase">Virtual beers poured</h3>
              <p className="text-3xl font-bold text-amber-900">{funFacts.virtualBeersPoured}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-teal-50 hover:bg-teal-100 rounded-xl shadow transition p-6">
            <div className="hidden">
              <FunStatsIcon />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-violet-700 uppercase">Virtual customers served</h3>
              <p className="text-3xl font-bold text-violet-900">{funFacts.beersServed}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-teal-50 hover:bg-teal-100 rounded-xl shadow transition p-6">
            <div className="hidden">
              <FunStatsIcon />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-cyan-700 uppercase">Glasses broken</h3>
              <p className="text-3xl font-bold text-cyan-900">{funStats.glassesBroken}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-teal-50 hover:bg-teal-100 rounded-xl shadow transition p-6">
            <div className="hidden">
              <FunStatsIcon />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-indigo-700 uppercase">Glasses touching the tap</h3>
              <p className="text-3xl font-bold text-indigo-900">{funFacts.glassesTouchingTap}</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Section: Session & Module Completion Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Session & Module Completion Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Completion Rate per Module (2/3 width) */}
          <div className="bg-white rounded-xl shadow p-6 md:col-span-2 w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Completion Rate per Module</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">Module</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">Started</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">Exited</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">Completed</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">Avg Duration</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {moduleStats.map(stat => (
                    <tr key={stat.type}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{stat.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{stat.started}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{stat.exited}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{stat.completed}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{formatDuration(stat.avgDuration)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* New empty card (1/3 width) */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center min-h-[200px] justify-center md:col-span-1 w-full">
            {/* Copilot card (was AI Query) */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center">
              <CopilotIcon /> Copilot
            </h3>
            <div className="w-full space-y-3">
              {!showAIResponse ? (
                <>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 placeholder-gray-600 text-gray-900"
                    placeholder="Ask questions about your data, and have CoPilot answer and visualize."
                    rows={4}
                  />
                  <button
                    className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-4 rounded-xl transition-all shadow-md text-white text-base
                      ${isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 active:scale-95'}
                    `}
                    onClick={() => {
                      if (!isLoading) {
                        setIsLoading(true);
                        setTimeout(() => {
                          setIsLoading(false);
                          setShowAIResponse(true);
                        }, 2000);
                      }
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </div>
                    ) : (
                      'Send'
                    )}
                  </button>
                </>
              ) : (
                <div className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Sure! I will do that as soon as AI has been implemented. I'm just a dummy for now. One day I will grow up to be a real AI
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Section: Activity */}
        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          {/* Session Activity */}
          <div className="flex-1 bg-gray-50 rounded-2xl shadow-lg p-6 hover:bg-gray-100 transition">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                <CalendarIcon /> Session Activity
              </h3>
              <button
                className="flex items-center px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors"
                onClick={() => setShowAllSessions(v => !v)}
              >
                {showAllSessions ? "See less" : "See more"}
                <ChevronIcon expanded={showAllSessions} colorClass="text-blue-700" />
              </button>
            </div>
            <AnimatePresence initial={false}>
              <motion.div
                key={showAllSessions ? 'expanded' : 'collapsed'}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="space-y-4">
                  {(showAllSessions ? sortedSessions : sortedSessions.slice(0, 5)).map((session) => {
                    const isExpanded = !!expandedSessions[session.id];
                    const sessionModules = modules.filter(m => m.sessionId === session.id);
                    return (
                      <div
                        key={session.id}
                        className="border-l-4 border-[#4AB2AC] pl-4 pr-6 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                        onClick={() => setExpandedSessions(prev => ({ ...prev, [session.id]: !prev[session.id] }))}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">Session <span className="font-mono">{session.id.replace('session-', '')}</span></p>
                            <p className="text-xs text-gray-500">Device: {session.deviceId} | App: {session.appId}</p>
                            <p className="text-xs text-gray-500">Start: {formatTime(session.startTime)}</p>
                          </div>
                          <div className="text-right min-w-[120px]">
                            <p className="text-xs text-gray-500">Duration: {formatDuration(session.duration)}</p>
                            <Bar value={session.duration} max={avgSessionDuration} color="bg-[#4AB2AC]" />
                          </div>
                        </div>
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 pl-1">
                                <div className="text-xs font-semibold text-blue-900 mb-2">Modules played in this session</div>
                                <div className="flex flex-col space-y-3 bg-white/60 rounded-md">
                                  {sessionModules.length === 0 ? (
                                    <div className="text-xs text-gray-500 px-3 py-2">No modules recorded</div>
                                  ) : (
                                    sessionModules.map((m) => {
                                      const isPerfectPour = m.moduleId === "Perfect Pour - The basics" || m.moduleId === "Perfect Pour - Masterclass";
                                      const isBeerTypes = m.moduleId === "Beer types";
                                      return (
                                        <div key={m.id} className={`px-4 py-3 rounded bg-gray-50 border-2 border-gray-200 border-l-4 border-l-gray-300`}>
                                          <div className="flex items-start justify-between">
                                            <div className="flex flex-col gap-1">
                                              <span className="text-sm text-gray-800 font-semibold">{m.moduleId}</span>
                                              <div className="flex items-center gap-1">
                                                <span className="text-xs text-gray-700">Duration: {formatDuration(m.duration)}</span>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-gray-100 text-gray-600 border border-gray-200">{formatTimeHMS(m.startTime)} <span className="mx-1">→</span>{formatTimeHMS(m.endTime)}</span>
                                              </div>
                                            </div>
                                            <div className="flex items-start">
                                              <StatusBadge status={m.status} />
                                            </div>
                                          </div>
                                          {isPerfectPour && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: 'auto', opacity: 1 }}
                                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                                              className="overflow-hidden"
                                            >
                                              {(() => {
                                                const pours = [
                                                  m.averageScorePour1 || 0,
                                                  m.averageScorePour2 || 0,
                                                  m.averageScorePour3 || 0,
                                                  m.averageScorePour4 || 0,
                                                  m.averageScorePour5 || 0,
                                                ];
                                                const maxVal = Math.max(1, ...pours);
                                                return (
                                                  <div className="mt-2">
                                                    <div className="p-3 rounded-md bg-gray-50">
                                                      <div className="flex items-start gap-4">
                                                        <div className="text-xs text-gray-700 font-medium leading-snug w-40">
                                                          Score of beers poured in challenge
                                                        </div>
                                                        <div className="h-24 flex items-end gap-3">
                                                          {pours.map((val, idx) => (
                                                            <div key={idx} className="flex flex-col items-center w-10">
                                                              <div className="text-[10px] text-gray-600 mb-1 font-semibold">{val}</div>
                                                              <div className="w-full h-16 bg-gray-100 rounded flex items-end">
                                                                <div
                                                                  className="w-full rounded-t"
                                                                  style={{ height: `${Math.max(6, Math.round((val / maxVal) * 100))}%`, backgroundColor: '#4AB2AC' }}
                                                                ></div>
                                                              </div>
                                                              <div className="text-[10px] text-gray-500 mt-1">{idx + 1}</div>
                                                            </div>
                                                          ))}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              })()}
                                            </motion.div>
                                          )}
                                          {isBeerTypes && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: 'auto', opacity: 1 }}
                                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                                              className="overflow-hidden"
                                            >
                                              <div className="mt-2 p-3 rounded-md bg-gray-50 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <div className="flex flex-col items-center">
                                                  <div className="text-[11px] text-gray-600 font-medium">Customers served</div>
                                                  <div className="text-base font-semibold text-teal-900">{m.customersServed}</div>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                  <div className="text-[11px] text-gray-600 font-medium">Correct beers served</div>
                                                  <div className="text-base font-semibold text-teal-900">{m.correctBeersServed} / {m.customersServed}</div>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                  <div className="text-[11px] text-gray-600 font-medium">Score</div>
                                                  <div className="text-base font-semibold text-teal-900">{m.status === 'completed' ? m.beerTypesScore : 'N / A'}</div>
                                                </div>
                                              </div>
                                            </motion.div>
                                          )}
                                        </div>
                                      );
                                    })
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right column placeholder card */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 min-h-[200px]" />
        </div>

        {/* Section: Details */}
        {/* Removed Session Details and Module Details panels as requested */}
      </main>
    </div>
  );
}
