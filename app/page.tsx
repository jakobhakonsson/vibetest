 
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
  <svg className="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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

// New tutorial/book icon
const BookIcon = () => (
  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4.5A2.5 2.5 0 016.5 2H20v18H6.5A2.5 2.5 0 014 17.5v-13z" />
  </svg>
);

// New ingredients/beaker icon
const BeakerIcon = () => (
  <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6M10 3v5l-5.5 9.5A3 3 0 007 21h10a3 3 0 002.5-3.5L14 8V3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 14h8" />
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
    ingredientsScore?: number | null;
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
        if (moduleId === "Ingredients") {
          // Mock an ingredients score (e.g., ingredient identification correctness)
          base.ingredientsScore = status === "completed" ? getRandomInt(50, 100) : null; // percent 50-100 when completed
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
  // Generate mock total modules played between 200-300 and split into completed/exited
  const [totalModulesPlayed] = useState(() => getRandomInt(200, 300));
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
  // Date range for custom picking
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [pickerYear, setPickerYear] = useState<number>(new Date().getFullYear());
  const [pickerMonth, setPickerMonth] = useState<number>(new Date().getMonth()); // 0-11
  const formatYMD = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };
  const buildMonthCells = (year: number, month: number) => {
    const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
    const totalDays = new Date(year, month + 1, 0).getDate();
    const cells: (string | null)[] = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let d = 1; d <= totalDays; d++) {
      cells.push(formatYMD(new Date(year, month, d)));
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  };
  const onDayClick = (key: string) => {
    if (!customStartDate || (customStartDate && customEndDate)) {
      setCustomStartDate(key);
      setCustomEndDate("");
    } else {
      if (key < customStartDate) {
        setCustomEndDate(customStartDate);
        setCustomStartDate(key);
      } else {
        setCustomEndDate(key);
      }
    }
  };

  // Generate mock fun stats for glasses broken and beer spilled
  const [funStats] = useState(() => ({
    glassesBroken: getRandomInt(150, 250),
    beerSpilled: getRandomInt(0, 12)
  }));

  // Additional fun facts metrics
  const [funFacts] = useState(() => {
    const virtualBeersPoured = getRandomInt(500, 2000);
    const beersServed = getRandomInt(400, virtualBeersPoured);
    const glassesTouchingTap = getRandomInt(Math.max(0, Math.floor(totalSessions * 2)), Math.max(1, Math.floor(totalSessions * 3)));
    return { virtualBeersPoured, beersServed, glassesTouchingTap };
  });

  // Metrics
  const avgSessionDuration = sessions.reduce((acc, s) => acc + s.duration, 0) / sessions.length;
  const longestSessionDuration = sessions.reduce((max, s) => Math.max(max, s.duration), 0);
  const longestSessionDisplayMinutes = Math.max(longestSessionDuration, Math.ceil(avgSessionDuration) + 1);
  const totalModules = modules.length;
  const avgModuleDuration = modules.length > 0 ? modules.reduce((acc, m) => acc + m.duration, 0) / modules.length : 0;
  const longestModuleDuration = modules.length > 0 ? modules.reduce((max, m) => Math.max(max, m.duration), 0) : 0;
  const longestModuleDisplayMinutes = Math.max(longestModuleDuration, Math.ceil(avgModuleDuration) + 1);
  const avgModulesPerSession = totalSessions > 0 ? totalModulesPlayed / totalSessions : 0;
  const completionRate = totalModules > 0 ? (completedModulesPlayed / totalModulesPlayed) * 100 : 0;
  // Total time spent training across all sessions (minutes → hours, minutes)
  const totalTrainingMinutes = Math.round(sessions.reduce((acc, s) => acc + s.duration, 0));
  const totalTrainingHours = Math.floor(totalTrainingMinutes / 60);
  const totalTrainingRemainderMinutes = totalTrainingMinutes % 60;
  const totalTrainingDays = Math.floor(totalTrainingHours / 24);

  // Drilldown per module type
  const moduleTypes = Array.from(new Set(modules.map(m => m.moduleId)));
  // Fixed order for Session & Module Completion Overview (includes new challenge variants)
  const moduleTypesForStats = [
    'Tutorial',
    'Perfect Pour - The basics',
    'Perfect Pour - The basics - Intro',
    'The basics Challenge',
    'Perfect Pour - Masterclass',
    'Perfect Pour - Masterclass - Intro',
    'Masterclass challenge',
    'Ingredients',
    'Beer types',
    'Beer types - Intro',
    'Beer types challenge',
  ];
  // Generate once per page load so expanding/collapsing sessions won't change these numbers
  const [moduleStats] = useState(() => moduleTypesForStats.map(type => {
    const started = getRandomInt(100, 200);
    const completed = getRandomInt(0, started);
    const exited = started - completed;
    const repeated = getRandomInt(0, Math.max(0, completed));
    // Avg duration: cap Ingredients at <= 5 minutes
    const avgDuration = type === "Ingredients"
      ? (getRandomInt(0, 5) + (getRandomInt(0, 5) === 5 ? 0 : getRandomInt(0, 59)) / 60)
      : (getRandomInt(3, 10) + getRandomInt(0, 59) / 60);
    return { type, started, exited, completed, repeated, avgDuration };
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

  // Format duration when value is in seconds (e.g., 241 -> 4m 1s)
  const formatDurationFromSeconds = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}m, ${secs}s`;
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

  // Format large numbers with thousands separators
  const formatNumber = (num: number) => {
    try { return num.toLocaleString(); } catch { return String(num); }
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

  // Stable overview subheading numbers
  const [headsetsReported] = useState(() => getRandomInt(50, 130));
  const headsetsReportedPct = Math.round((headsetsReported / 130) * 100);

  // Stable line chart data (sessions per day and unique headsets) — generate once per reload
  type ChartDay = { key: string; label: string; count: number };
  const [chartDays] = useState<ChartDay[]>(() => {
    const out: ChartDay[] = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - (29 - i));
      const label = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      out.push({ key: d.toISOString().slice(0, 10), label, count: getRandomInt(0, 15) });
    }
    return out;
  });
  const [chartUniques] = useState<ChartDay[]>(() => chartDays.map(d => {
    if (d.count === 0) return { ...d, count: 0 };
    const minU = Math.max(0, Math.floor(d.count * 0.4));
    const maxU = Math.max(0, d.count - 1);
    return { ...d, count: getRandomInt(minU, maxU) };
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 font-sans">
             {/* Header */}
       <header className="bg-white/80 shadow-sm border-b sticky top-0 z-50 backdrop-blur">
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
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-3">
            <h2 className="text-2xl font-bold text-gray-800">Show data from:</h2>
            <div className="relative group">
              <select
                className="appearance-none rounded-full pl-4 pr-12 py-2 bg-white/95 border-2 border-blue-100 text-gray-800 font-medium shadow-sm hover:shadow focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-colors duration-200 backdrop-blur"
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe((e.target as HTMLSelectElement).value)}
              >
                <option value="24h">Last 24 hours</option>
                <option value="30d">Last 30 days</option>
                <option value="all">All time</option>
                <option value="pick">Pick dates</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition-colors duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {(() => {
              const x = headsetsReported;
              const y = headsetsReportedPct;
              return (
                <>
                  Showing data reported from <span className="font-bold">{x}</span> out of 130 headsets. <span className="font-bold">{y}%</span>. Note that data may be unrepresentative if reported from only a few headsets.
                </>
              );
            })()}
          </p>
          <AnimatePresence initial={false}>
            {selectedTimeframe === 'pick' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="mt-4 p-4 rounded-xl bg-white text-gray-900 border border-gray-200 shadow-lg"
              >
                <div className="mb-3 text-sm text-gray-600">Pick a date range</div>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end mb-3">
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-700 mb-1">Start date</label>
                    <input type="date" value={customStartDate} onChange={(e) => setCustomStartDate((e.target as HTMLInputElement).value)} className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-700 mb-1">End date</label>
                    <input type="date" value={customEndDate} onChange={(e) => setCustomEndDate((e.target as HTMLInputElement).value)} className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400" />
                  </div>
                  <button type="button" onClick={() => setShowCalendar(v => !v)} className="h-10 px-3 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2 justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18"/></svg>
                    <span className="text-sm font-semibold text-gray-700">Calendar</span>
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {showCalendar && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="rounded-lg border border-gray-200 p-3"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-lg font-semibold">{new Date(pickerYear, pickerMonth).toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-md hover:bg-gray-100" onClick={() => { const m = new Date(pickerYear, pickerMonth - 1, 1); setPickerYear(m.getFullYear()); setPickerMonth(m.getMonth()); }}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                          </button>
                          <button className="p-2 rounded-md hover:bg-gray-100" onClick={() => { const m = new Date(pickerYear, pickerMonth + 1, 1); setPickerYear(m.getFullYear()); setPickerMonth(m.getMonth()); }}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-2 text-xs text-gray-500 mb-2">
                        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (<div key={d} className="text-center">{d}</div>))}
        </div>
                      <div className="grid grid-cols-7 gap-2">
                        {buildMonthCells(pickerYear, pickerMonth).map((key, idx) => {
                          const isInRange = key && customStartDate && customEndDate && key >= customStartDate && key <= customEndDate;
                          const isStart = key && key === customStartDate;
                          const isEnd = key && key === customEndDate;
                          return (
                            <button
                              key={idx}
                              disabled={!key}
                              onClick={() => key && onDayClick(key)}
                              className={`h-9 rounded-md text-sm flex items-center justify-center ${!key ? 'opacity-0 cursor-default' : 'hover:bg-gray-100'} ${isInRange ? 'bg-emerald-50 text-emerald-700' : ''} ${isStart || isEnd ? 'bg-emerald-500 text-white hover:bg-emerald-600' : ''}`}
                            >
                              {key ? Number(key.split('-')[2]) : ''}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-600">Start: <span className="font-semibold text-gray-900">{customStartDate || '-'}</span></div>
                  <div className="text-gray-600">End: <span className="font-semibold text-gray-900">{customEndDate || '-'}</span></div>
                </div>
                {customStartDate && customEndDate && customEndDate < customStartDate && (
                  <div className="text-sm text-red-600 mt-2">End date must be after start date</div>
                )}
                <div className="mt-4 flex items-center gap-2">
                  <button className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-semibold shadow hover:bg-emerald-600 active:scale-95">Apply</button>
                  <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold shadow hover:bg-gray-200 active:scale-95" onClick={() => { setSelectedTimeframe('30d'); setShowCalendar(false); }}>Cancel</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
                <p className="text-3xl font-bold text-blue-900">{totalSessions}</p>
                <h3 className="text-xs font-semibold text-blue-700 uppercase mt-1">Total Sessions</h3>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl shadow hover:shadow-lg transition p-6">
              <div className="bg-purple-200 rounded-full p-2">
                <DurationIcon />
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-900">{avgSessionDuration.toFixed(1)}m</p>
                <h3 className="text-xs font-semibold text-purple-700 uppercase mt-1">TRAINED ON AVERAGE PER SESSION</h3>
                <p className="text-xs text-purple-700 mt-1">Longest: {longestSessionDisplayMinutes} minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gradient-to-r from-green-100 to-green-50 rounded-xl shadow hover:shadow-lg transition p-6">
              <div className="bg-green-200 rounded-full p-2">
                <CheckmarkIcon />
              </div>
              <div>
                <p className="text-3xl font-bold text-green-900">{totalModulesPlayed}</p>
                <h3 className="text-xs font-semibold text-green-700 uppercase mt-1">Total Modules Played</h3>
                <p className="text-xs text-green-700 mt-1">Avg {avgModulesPerSession.toFixed(2)} modules per session</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gradient-to-r from-teal-100 to-teal-50 rounded-xl shadow hover:shadow-lg transition p-6">
              <div className="bg-teal-200 rounded-full p-2">
                <DurationIcon />
              </div>
              <div>
                <p className="text-3xl font-bold text-teal-900">{avgModuleDuration.toFixed(1)}m</p>
                <h3 className="text-xs font-semibold text-teal-700 uppercase mt-1">TRAINED ON AVERAGE PER MODULE</h3>
                <p className="text-xs text-teal-700 mt-1">Longest: {Math.ceil(longestModuleDisplayMinutes)} minutes</p>
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
                      <g key={slice.label}>
                        <path
                          d={path}
                          fill={slice.color}
                          stroke="#ffffff"
                          strokeWidth="1"
                          style={{ cursor: "pointer", transform: `translate(${dx}px, ${dy}px)`, transition: "transform 0.25s ease-in-out" }}
                        />
                        <path
                          d={path}
                          fill="#000"
                          fillOpacity="0.001"
                          stroke="transparent"
                          onMouseEnter={() => setHoveredSlice(i)}
                          onMouseLeave={() => setHoveredSlice(null)}
                          pointerEvents="all"
                        />
                      </g>
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

      {/* Fun facts + Copilot Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Fun facts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:col-span-1">
            <div className="flex items-center gap-4 bg-white rounded-xl shadow hover:shadow-lg transition p-6">
              <div className="hidden">
                <FunStatsIcon />
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-900">{funFacts.virtualBeersPoured}</p>
                <h3 className="text-xs font-semibold text-amber-700 uppercase mt-1">Virtual beers poured</h3>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white rounded-xl shadow hover:shadow-lg transition p-6">
              <div className="hidden">
                <FunStatsIcon />
              </div>
              <div>
                <p className="text-3xl font-bold text-violet-900">{funFacts.beersServed}</p>
                <h3 className="text-xs font-semibold text-violet-700 uppercase mt-1">Virtual customers served</h3>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white rounded-xl shadow hover:shadow-lg transition p-6">
              <div className="hidden">
                <FunStatsIcon />
              </div>
              <div>
                <p className="text-3xl font-bold text-cyan-900">{funStats.glassesBroken}</p>
                <h3 className="text-xs font-semibold text-cyan-700 uppercase mt-1">Glasses broken</h3>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white rounded-xl shadow hover:shadow-lg transition p-6">
              <div className="hidden">
                <FunStatsIcon />
              </div>
              <div>
                <p className="text-3xl font-bold text-indigo-900">{totalTrainingHours} h, {totalTrainingRemainderMinutes} m</p>
                <h3 className="text-xs font-semibold text-indigo-700 uppercase mt-1">Spent training. That's over {totalTrainingDays} days!</h3>
              </div>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden w-full lg:col-span-1 h-full flex">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-teal-500 to-emerald-400"></div>
            <div className="relative p-6 flex flex-col justify-between h-full w-full">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center">
                <CopilotIcon /> Copilot
              </h3>
              <div className="w-full space-y-3">
                {!showAIResponse ? (
                  <>
                    <textarea
                      className="w-full p-3 rounded-lg resize-none focus:ring-2 focus:ring-white/70 focus:border-white/60 placeholder-gray-600 text-gray-900 bg-white border border-white/50"
                      placeholder="Ask questions about your data, and have CoPilot answer and visualize."
                      rows={4}
                    />
                    <button
                      className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-4 rounded-xl transition-all shadow-lg text-blue-900 text-base ${isLoading ? 'bg-white/60 cursor-not-allowed' : 'bg-white hover:bg-white/90 active:scale-95'}`}
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
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                  <div className="w-full p-4 bg-white/90 border border-white/60 rounded-lg shadow">
                    <p className="text-blue-900 text-sm leading-relaxed">
                      Sure! I will do that as soon as AI has been implemented. I'm just a dummy for now. One day I will grow up to be a real AI
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* New Section: Session & Module Completion Overview (full width) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Session & Module Completion Overview</h2>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-xl shadow p-6 w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Completion Rate per Module</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">Module</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">Started</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">Exited</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">Completed</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">Repeated</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">Avg Duration</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-transparent">
                  {moduleStats.map(stat => (
                    <tr key={stat.type}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        <span className={`${stat.type.toLowerCase().includes('intro') || stat.type.toLowerCase().includes('challenge') ? 'pl-6 text-gray-700 font-medium' : 'font-bold'}`}>
                          {stat.type.toLowerCase().includes('intro') ? 'Intro' : (stat.type.toLowerCase().includes('challenge') ? 'Challenge' : stat.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{stat.started}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{stat.exited}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{stat.completed} ({Math.round((stat.completed / Math.max(1, stat.started)) * 100)}%)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{stat.repeated}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{formatDuration(stat.avgDuration)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Module Overview Section - moved to its own section before Session Activity */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Module Comparison</h2>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {(() => {
            // Aggregate stats per module type from existing mock data
            const byType = moduleTypes.map((type) => {
              const items = modules.filter(m => m.moduleId === type);
              const plays = items.length;
              const uniqueSessions = new Set(items.map(m => m.sessionId)).size;
              const completed = items.filter(m => m.status === 'completed').length;
              const completion = plays > 0 ? Math.round((completed / plays) * 100) : 0;
              const avgDurationMins = plays > 0 ? (items.reduce((s, m) => s + m.duration, 0) / plays) : 0;
              const avgPlaysPerSession = uniqueSessions > 0 ? (plays / uniqueSessions) : 0;
              // Highscores for Perfect Pour variants
              let avgHighScore: number | null = null;
              let maxHighScore: number | null = null;
              let avgScoreImprovementPct: number | null = null;
              if (type === 'Perfect Pour - The basics' || type === 'Perfect Pour - Masterclass') {
                const hs = items
                  .map(m => (typeof m.challengeHighScore === 'number' ? m.challengeHighScore as number : null))
                  .filter((v): v is number => v !== null);
                const avgTotals = items
                  .map(m => (typeof m.averageTotal === 'number' ? m.averageTotal as number : null))
                  .filter((v): v is number => v !== null);
                if (hs.length > 0) {
                  avgHighScore = Math.round(hs.reduce((s, v) => s + v, 0) / hs.length);
                  maxHighScore = Math.max(...hs);
                }
                if (avgHighScore !== null && avgTotals.length > 0) {
                  const avgBaseline = avgTotals.reduce((s, v) => s + v, 0) / avgTotals.length;
                  if (avgBaseline > 0) {
                    avgScoreImprovementPct = Math.round(((avgHighScore / avgBaseline) - 1) * 100);
                  }
                }
              } else if (type === 'Ingredients') {
                // Mock highscores for Ingredients similar to other modules
                const base = 42000;
                const jitter = Math.floor(Math.random() * 8000) - 4000; // ±4,000
                avgHighScore = base + jitter;
                const extra = Math.floor(Math.random() * 6000) + 2000; // +2,000–7,999
                maxHighScore = (avgHighScore as number) + extra;
                avgScoreImprovementPct = Math.floor(Math.random() * 21) + 5; // 5–25%
              } else if (type === 'Beer types') {
                // Mock highscores for Beer types similar scale to Perfect Pour
                const base = 50000;
                const jitter = Math.floor(Math.random() * 8000) - 4000; // ±4,000
                avgHighScore = base + jitter; // ~46,000–54,000
                const extra = Math.floor(Math.random() * 6000) + 2000; // avg + 2,000–7,999
                maxHighScore = (avgHighScore as number) + extra;
                // optional improvement metric even if not displayed
                avgScoreImprovementPct = Math.floor(Math.random() * 21) + 5; // 5–25%
              }
              // Intro/challenge mock percentages
              // Rule: exactly one of the two should be 100% (randomized per reload per card)
              let introPct = 0;
              let challengePct = 0;
              if (type === 'Tutorial') {
                // Tutorial handled as N/A in UI; set to 0 placeholders
                introPct = 0;
                challengePct = 0;
              } else {
                const makeIntroFull = Math.random() < 0.5;
                if (makeIntroFull) {
                  introPct = 100;
                  challengePct = Math.min(99, getRandomInt(10, 95));
                } else {
                  challengePct = 100;
                  introPct = Math.min(99, getRandomInt(40, 95));
                }
              }
              return { type, plays, uniqueSessions, completion, avgDurationMins, avgPlaysPerSession, avgHighScore, avgScoreImprovementPct, maxHighScore, introPct, challengePct };
            });
            const gradientForType = (type: string) => {
              if (type === 'Perfect Pour - The basics' || type === 'Perfect Pour - Masterclass') {
                return 'from-green-100 to-green-50';
              }
              if (type === 'Ingredients') {
                return 'from-amber-100 to-amber-50';
              }
              if (type === 'Beer types') {
                return 'from-blue-100 to-blue-50';
              }
              if (type === 'Tutorial') {
                return 'from-purple-100 to-purple-50';
              }
              return 'from-gray-100 to-gray-50';
            };
            const iconForType = (type: string) => {
              if (type === 'Tutorial') return BookIcon;
              if (type === 'Perfect Pour - The basics') return CheckmarkIcon;
              if (type === 'Perfect Pour - Masterclass') return BarChartIcon;
              if (type === 'Ingredients') return BeakerIcon;
              if (type === 'Beer types') return FunStatsIcon;
              return CheckmarkIcon;
            };
            // Desired display order for cards (Tutorial first)
            const desiredOrder = [
              'Tutorial',
              'Perfect Pour - The basics',
              'Perfect Pour - Masterclass',
              'Ingredients',
              'Beer types',
            ];
            const byTypeSorted = [...byType].sort((a, b) => desiredOrder.indexOf(a.type) - desiredOrder.indexOf(b.type));

             return (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                 {byTypeSorted.map((row, idx) => {
                   const GIcon = iconForType(row.type);
                   return (
                     <div
                       key={row.type}
                       className={`rounded-xl bg-gradient-to-r ${gradientForType(row.type)} p-5 shadow hover:shadow-lg transition`}
                     >
                       <div className="flex flex-col items-center text-center">
                         <div className="mb-2">
                           <GIcon />
                         </div>
                         <div className="text-sm font-semibold text-gray-900">{row.type}</div>
                         <div className="mt-3 grid grid-cols-2 gap-2 w-full">
                           <div className="bg-white/80 rounded-lg px-2 py-2 col-span-2">
                             {(() => {
                               const usersPlayed = row.uniqueSessions;
                               const total = Math.max(1, totalSessions);
                               const pct = Math.round((usersPlayed / total) * 100);
                               const radius = 28;
                               const circumference = 2 * Math.PI * radius;
                               const dashoffset = circumference * (1 - pct / 100);
                               return (
                                 <div className="flex flex-col items-center text-center">
                                   <div className="relative w-16 h-16">
                                     <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                                       <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-200" />
                                       <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="none" className="text-green-500" strokeDasharray={`${circumference}`} strokeDashoffset={`${dashoffset}`} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }} />
                                     </svg>
                                     <div className="absolute inset-0 flex items-center justify-center">
                                       <span className="text-sm font-semibold text-gray-700">{pct}%</span>
                                     </div>
                                   </div>
                                   <div className="text-xs text-gray-600 mt-2">
                                     of users played this module ({usersPlayed} out of {total} total sessions)
                                   </div>
                                 </div>
                               );
                             })()}
                           </div>
                           {/* Played introduction */}
                           <div className="bg-white/80 rounded-lg px-2 py-2 col-span-1">
                             {(() => {
                               if (row.type === 'Tutorial') {
                                 return (
                                   <div className="flex items-center justify-center h-16">
                                     <span className="text-sm font-semibold text-gray-700">N/A</span>
                                   </div>
                                 );
                               }
                               const pct = Math.max(0, Math.min(100, row.introPct ?? getRandomInt(40, 95)));
                               const radius = 24;
                               const circumference = 2 * Math.PI * radius;
                               const dashoffset = circumference * (1 - pct / 100);
                               return (
                                 <div className="flex flex-col items-center justify-center gap-1">
                                   <div className="relative w-14 h-14">
                                     <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 64 64">
                                       <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-200" />
                                       <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="none" className="text-blue-500" strokeDasharray={`${circumference}`} strokeDashoffset={`${dashoffset}`} strokeLinecap="round" />
                                     </svg>
                                     <div className="absolute inset-0 flex items-center justify-center">
                                       <span className="text-xs font-semibold text-gray-700">{pct}%</span>
                                     </div>
                                   </div>
                                   <div className="text-xs text-gray-700 font-medium">played introduction</div>
                                 </div>
                               );
                             })()}
                           </div>
                           {/* Played challenge */}
                           <div className="bg-white/80 rounded-lg px-2 py-2 col-span-1">
                             {(() => {
                               if (row.type === 'Tutorial') {
                                 return (
                                   <div className="flex items-center justify-center h-16">
                                     <span className="text-sm font-semibold text-gray-700">N/A</span>
                                   </div>
                                 );
                               }
                               const pct = Math.max(0, Math.min(100, row.challengePct ?? getRandomInt(10, 70)));
                               const radius = 24;
                               const circumference = 2 * Math.PI * radius;
                               const dashoffset = circumference * (1 - pct / 100);
                               return (
                                 <div className="flex flex-col items-center justify-center gap-1">
                                   <div className="relative w-14 h-14">
                                     <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 64 64">
                                       <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-200" />
                                       <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="none" className="text-emerald-500" strokeDasharray={`${circumference}`} strokeDashoffset={`${dashoffset}`} strokeLinecap="round" />
                                     </svg>
                                     <div className="absolute inset-0 flex items-center justify-center">
                                       <span className="text-xs font-semibold text-gray-700">{pct}%</span>
                                     </div>
                                   </div>
                                   <div className="text-xs text-gray-700 font-medium">played challenge</div>
                                 </div>
                               );
                             })()}
                           </div>
                           <div className="bg-white/80 rounded-lg px-2 py-2 col-span-2">
                             <div className="text-[11px] text-gray-600"><span>Avg<br/>highscore</span></div>
                             <div className="text-sm font-semibold text-gray-900">{row.avgHighScore !== null ? formatNumber(row.avgHighScore) : 'N / A'}</div>
                           </div>
                           <div className="bg-white/80 rounded-lg px-2 py-2 col-span-2">
                             <div className="text-[11px] text-gray-600">Global highscore</div>
                             <div className="text-sm font-semibold text-gray-900">{row.maxHighScore !== null ? formatNumber(row.maxHighScore) : 'N / A'}</div>
                           </div>
                         </div>
                       </div>
                     </div>
                   );
                 })}
               </div>
             );
           })()}
         </div>
       </section>

                               {/* New Spreadsheet-style Module Data Section */}
         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
           
           <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
             {(() => {
              // Aggregate stats per module type from existing mock data
              const [byType] = useState(() => moduleTypes.map((type) => {
                const items = modules.filter(m => m.moduleId === type);
                const plays = items.length;
                const uniqueSessions = new Set(items.map(m => m.sessionId)).size;
                const completed = items.filter(m => m.status === 'completed').length;
                const completion = plays > 0 ? Math.round((completed / plays) * 100) : 0;
                const avgDurationMins = plays > 0 ? (items.reduce((s, m) => s + m.duration, 0) / plays) : 0;
                const avgPlaysPerSession = uniqueSessions > 0 ? (plays / uniqueSessions) : 0;
                // Highscores for Perfect Pour variants
                let avgHighScore: number | null = null;
                let maxHighScore: number | null = null;
                let avgScoreImprovementPct: number | null = null;
                if (type === 'Perfect Pour - The basics' || type === 'Perfect Pour - Masterclass') {
                  const hs = items
                    .map(m => (typeof m.challengeHighScore === 'number' ? m.challengeHighScore as number : null))
                    .filter((v): v is number => v !== null);
                  const avgTotals = items
                    .map(m => (typeof m.averageTotal === 'number' ? m.averageTotal as number : null))
                    .filter((v): v is number => v !== null);
                  if (hs.length > 0) {
                    avgHighScore = Math.round(hs.reduce((s, v) => s + v, 0) / hs.length);
                    maxHighScore = Math.max(...hs);
                  }
                  if (avgHighScore !== null && avgTotals.length > 0) {
                    const avgBaseline = avgTotals.reduce((s, v) => s + v, 0) / avgTotals.length;
                    if (avgBaseline > 0) {
                      avgScoreImprovementPct = Math.round(((avgHighScore / avgBaseline) - 1) * 100);
                    }
                  }
                } else if (type === 'Beer types') {
                  // Mock highscores for Beer types ~ around 50,000 like other modules
                  const base = 50000;
                  const jitter = Math.floor(Math.random() * 8000) - 4000; // ±4,000
                  avgHighScore = base + jitter; // ~46,000–54,000
                  const extra = Math.floor(Math.random() * 6000) + 2000; // 2,000–7,999 above avg
                  maxHighScore = (avgHighScore as number) + extra;
                  avgScoreImprovementPct = Math.floor(Math.random() * 21) + 5; // 5–25%
                }
                return { type, plays, uniqueSessions, completion, avgDurationMins, avgPlaysPerSession, avgHighScore, avgScoreImprovementPct, maxHighScore };
              }));
              
              // Desired display order for modules
              const desiredOrder = [
                 'Tutorial',
                 'Perfect Pour - The basics',
                 'Perfect Pour - Masterclass',
                 'Ingredients',
                 'Beer types',
               ];
               const byTypeSorted = [...byType].sort((a, b) => desiredOrder.indexOf(a.type) - desiredOrder.indexOf(b.type));

              const columnGradientForType = (type: string) => {
                if (type === 'Perfect Pour - The basics' || type === 'Perfect Pour - Masterclass') {
                  return 'from-green-50 to-transparent';
                }
                if (type === 'Ingredients') {
                  return 'from-amber-50 to-transparent';
                }
                if (type === 'Beer types') {
                  return 'from-blue-50 to-transparent';
                }
                if (type === 'Tutorial') {
                  return 'from-purple-50 to-transparent';
                }
                return 'from-gray-50 to-transparent';
              };

              const columnHeaderGradientForType = (type: string) => {
                if (type === 'Perfect Pour - The basics' || type === 'Perfect Pour - Masterclass') {
                  return 'from-green-200 to-green-50';
                }
                if (type === 'Ingredients') {
                  return 'from-amber-200 to-amber-50';
                }
                if (type === 'Beer types') {
                  return 'from-blue-200 to-blue-50';
                }
                if (type === 'Tutorial') {
                  return 'from-purple-200 to-purple-50';
                }
                return 'from-gray-200 to-gray-50';
              };

                               // Define the metrics to display
                const metrics = [
                  { key: 'plays', label: 'Total times played', formatter: (value: number) => value.toString() },
                  { key: 'avgDuration', label: 'Average duration', formatter: (value: number) => value.toString() },
                  { key: 'completion', label: 'Completion rate', formatter: (value: number) => `${value}%` },
                  { key: 'avgPlaysPerSession', label: 'Avg plays per session', formatter: (value: number) => value.toFixed(2) },
                ];

                // Generate random duration data between 5 and 300 (stable per page load)
                const [randomDurationData] = useState(() => ({
                  'Tutorial': Math.floor(Math.random() * 296) + 5,
                  'Perfect Pour - The basics': Math.floor(Math.random() * 296) + 5,
                  'Perfect Pour - Masterclass': Math.floor(Math.random() * 296) + 5,
                  'Ingredients': Math.floor(Math.random() * 296) + 5,
                  'Beer types': Math.floor(Math.random() * 296) + 5,
                }));

               return (
                 <div className="overflow-hidden">
                   <table className="min-w-full border-separate border-spacing-x-4 border-spacing-y-0">
                     <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                       <tr>
                                                   <th className="px-8 py-6 text-left text-sm font-bold text-gray-800 uppercase tracking-wider bg-gradient-to-r from-blue-100 to-indigo-100 sticky left-0 z-20 border-r-2 border-gray-200 shadow-sm">
                           <div className="flex items-center gap-3">Metrics</div>
                         </th>
                         {byTypeSorted.map((module) => (
                           <th key={module.type} className={`px-8 py-6 text-center text-sm font-bold text-gray-800 uppercase tracking-wider min-w-[160px] bg-gradient-to-r ${columnHeaderGradientForType(module.type)}`}>
                             <div className="flex flex-col items-center space-y-3">
                               <div className="p-3 bg-white rounded-full shadow-md border-2 border-gray-100">
                                 {(() => {
                                   const iconForType = (type: string) => {
                                     if (type === 'Tutorial') return BookIcon;
                                     if (type === 'Perfect Pour - The basics') return CheckmarkIcon;
                                     if (type === 'Perfect Pour - Masterclass') return BarChartIcon;
                                     if (type === 'Ingredients') return BeakerIcon;
                                     if (type === 'Beer types') return FunStatsIcon;
                                     return CheckmarkIcon;
                                   };
                                   const Icon = iconForType(module.type);
                                   return <Icon />;
                                 })()}
                               </div>
                               <div className="text-xs text-gray-700 font-medium leading-tight px-2">
                                 {module.type}
                               </div>
                             </div>
                           </th>
                         ))}
                       </tr>
                     </thead>
                     <tbody className="bg-white divide-y divide-transparent">
                       {metrics.map((metric, metricIndex) => (
                         <tr key={metric.key} className={`bg-white`}>
                                                       <td className="px-8 py-6 whitespace-nowrap text-sm font-semibold text-gray-800 bg-gradient-to-r from-blue-50 to-indigo-100 sticky left-0 z-20 border-r-2 border-gray-200 shadow-sm">
                             <div className="flex items-center gap-3">{metric.label}</div>
                           </td>
                                                       {byTypeSorted.map((module) => (
                              <td key={`${module.type}-${metric.key}`} className={`px-8 py-6 whitespace-nowrap text-sm text-gray-700 text-center hover:bg-blue-100/30 transition-colors duration-200 bg-gradient-to-r ${columnGradientForType(module.type)}`}>
                                {metric.key === 'plays' ? (
                                  <div className="flex flex-col items-center space-y-2">
                                                                         {/* Bar Chart for Total times played */}
                                     <div className="w-full max-w-[120px]">
                                       <div className="relative">
                                         {/* Bar Container */}
                                         <div className="w-full h-20 bg-transparent rounded-lg overflow-hidden relative flex items-end">
                                           <div
                                             className="bar-narrow bg-blue-500 rounded-lg transition-all duration-300 ease-out"
                                             style={{ 
                                               height: `${Math.max(4, (module.plays / Math.max(...byTypeSorted.map(m => m.plays))) * 100)}%`,
                                               minHeight: '4px'
                                             }}
                                           />
                                         </div>
                                        {/* Value Label */}
                                        <div className="text-xs font-semibold text-gray-700 mt-1">
                                          {module.plays}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                                                 ) : metric.key === 'avgDuration' ? (
                                  <div className="flex flex-col items-center space-y-2">
                                    {/* Pie for Average duration (0–60 minutes) */}
                                    <div className="relative w-16 h-16">
                                      {(() => {
                                        const seconds = randomDurationData[module.type as keyof typeof randomDurationData];
                                        const minutes = Math.min(60, Math.max(0, Math.round(seconds / 60)));
                                        const radius = 28;
                                        const circumference = 2 * Math.PI * radius;
                                        const progress = minutes / 60;
                                        const offset = circumference * (1 - progress);
                                        return (
                                          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                                            <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="6" fill="none" className="text-gray-200" />
                                            <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="6" fill="none" className="text-teal-500" strokeDasharray={`${circumference}`} strokeDashoffset={`${offset}`} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }} />
                                          </svg>
                                        );
                                      })()}
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xs font-semibold text-gray-700">
                                          {formatDurationFromSeconds(randomDurationData[module.type as keyof typeof randomDurationData])}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ) : metric.key === 'avgHighScore' ? (
                                  <div className="flex flex-col items-center space-y-2">
                                    <div className="w-full max-w-[120px]">
                                      {module.avgHighScore === null ? (
                                        <div className="h-20 flex items-center justify-center text-gray-400 font-semibold">N/A</div>
                                      ) : (
                                        <div className="relative">
                                          <div className="w-full h-20 bg-transparent rounded-lg overflow-hidden relative flex items-end">
                                            <div
                                              className="bar-narrow bg-purple-500 rounded-lg transition-all duration-300 ease-out"
                                              style={{
                                                height: `${Math.max(4, (((module.avgHighScore ?? 0) / Math.max(...byTypeSorted.map(m => (m.avgHighScore ?? 0)))) * 100))}%`,
                                                minHeight: '4px'
                                              }}
                                            />
                                          </div>
                                          <div className="text-xs font-semibold text-gray-700 mt-1">
                                            {formatNumber(module.avgHighScore as number)}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ) : metric.key === 'maxHighScore' ? (
                                  <div className="flex flex-col items-center space-y-2">
                                    <div className="w-full max-w-[120px]">
                                      {module.maxHighScore === null ? (
                                        <div className="h-20 flex items-center justify-center text-gray-400 font-semibold">N/A</div>
                                      ) : (
                                        <div className="relative">
                                          <div className="w-full h-20 bg-transparent rounded-lg overflow-hidden relative flex items-end">
                                            <div
                                              className="bar-narrow bg-amber-500 rounded-lg transition-all duration-300 ease-out"
                                              style={{
                                                height: `${Math.max(4, (((module.maxHighScore ?? 0) / Math.max(...byTypeSorted.map(m => (m.maxHighScore ?? 0)))) * 100))}%`,
                                                minHeight: '4px'
                                              }}
                                            />
                                          </div>
                                          <div className="text-xs font-semibold text-gray-700 mt-1">
                                            {formatNumber(module.maxHighScore as number)}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ) : metric.key === 'completion' ? (
                                   <div className="flex flex-col items-center space-y-2">
                                     {/* Circular Progress for Completion Rate */}
                                     <div className="relative w-16 h-16">
                                       {/* Background Circle */}
                                       <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                                         <circle
                                           cx="32"
                                           cy="32"
                                           r="28"
                                           stroke="currentColor"
                                           strokeWidth="4"
                                           fill="none"
                                           className="text-gray-200"
                                         />
                                         {/* Progress Circle */}
                                         <circle
                                           cx="32"
                                           cy="32"
                                           r="28"
                                           stroke="currentColor"
                                           strokeWidth="4"
                                           fill="none"
                                           className="text-green-500"
                                           strokeDasharray={`${2 * Math.PI * 28}`}
                                           strokeDashoffset={`${2 * Math.PI * 28 * (1 - (module.completion / 100))}`}
                                           strokeLinecap="round"
                                           style={{
                                             transition: 'stroke-dashoffset 0.5s ease-in-out'
                                           }}
                                         />
                                       </svg>
                                       {/* Percentage Text */}
                                       <div className="absolute inset-0 flex items-center justify-center">
                                         <span className="text-sm font-semibold text-gray-700">
                                           {module.completion}%
                                         </span>
                                       </div>
                                     </div>
                                   </div>
                                 ) : (
                                   <div className="font-medium">
                                     {metric.formatter(module[metric.key as keyof typeof module] as any)}
                                   </div>
                                 )}
                              </td>
                            ))}
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               );
            })()}
          </div>
        </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Latest reported headset activity */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Latest reported headset activity</h2>
          <div className="bg-white rounded-2xl shadow p-6 w-full">
            {(() => {
              const days = chartDays;
              const width = 960;
              const height = 260;
              const pad = 32;
              const innerW = width - pad * 2;
              const innerH = height - pad * 2;
              const maxY = 15; // fixed axis 0–15
              const x = (i: number) => pad + (i * innerW) / (days.length - 1);
              const y = (v: number) => height - pad - (v / maxY) * innerH;
              // Secondary series: unique headsets (stable per reload)
              const uniques = chartUniques;
              // Build paths
              let path = '';
              let pathU = '';
              days.forEach((pt, i) => {
                const cx = x(i);
                const cy = y(pt.count);
                path += i === 0 ? `M ${cx} ${cy}` : ` L ${cx} ${cy}`;
                const cyU = y(uniques[i].count);
                pathU += i === 0 ? `M ${cx} ${cyU}` : ` L ${cx} ${cyU}`;
              });
              const yTicks = 5;
              const xLabelEvery = 5;
              return (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">Sessions started (last 30 days)</div>
                    <div className="hidden sm:flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1"><span className="inline-block w-3 h-2 rounded bg-blue-500"></span> Sessions</div>
                      <div className="flex items-center gap-1"><span className="inline-block w-3 h-2 rounded bg-emerald-500"></span> Unique headsets</div>
                    </div>
                  </div>
                  <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[260px] select-none">
                    <rect x="0" y="0" width={width} height={height} fill="transparent" />
                    {Array.from({ length: yTicks + 1 }, (_, i) => {
                      const ratio = i / yTicks;
                      const gy = pad + ratio * innerH;
                      const val = Math.round(maxY * (1 - ratio));
                      return (
                        <g key={`gy-${i}`}> 
                          <line x1={pad} y1={gy} x2={width - pad} y2={gy} stroke="#e5e7eb" strokeWidth="1" />
                          <text x={pad - 8} y={gy + 4} textAnchor="end" fontSize="10" fill="#6b7280">{val}</text>
                        </g>
                      );
                    })}
                    <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#e5e7eb" strokeWidth="1.25" />
                    <path d={path} fill="none" stroke="#3b82f6" strokeWidth="2.75" />
                    <path d={pathU} fill="none" stroke="#10b981" strokeWidth="2.25" />
                    {days.map((pt, i) => (
                      <circle key={`pt-${pt.key}`} cx={x(i)} cy={y(pt.count)} r={5} fill="#3b82f6" style={{ cursor: 'pointer' }}>
                        <title>{`${pt.label}: ${pt.count} sessions`}</title>
                      </circle>
                    ))}
                    {uniques.map((pt, i) => (
                      <circle key={`pu-${pt.key}`} cx={x(i)} cy={y(pt.count)} r={4} fill="#10b981" style={{ cursor: 'pointer' }}>
                        <title>{`${pt.label}: ${pt.count} unique headsets`}</title>
                      </circle>
                    ))}
                    {days.map((pt, i) => (
                      i % xLabelEvery === 0 ? (
                        <text key={`xl-${pt.key}`} x={x(i)} y={height - pad + 16} textAnchor="middle" fontSize="10" fill="#6b7280">{pt.label}</text>
                      ) : null
                    ))}
                  </svg>
                </>
              );
            })()}
          </div>
        </section>
        {/* Section: Activity */}
        <div className="mb-10">
          {/* Session Activity */}
          <div className="bg-gray-50 rounded-2xl shadow-lg p-6 hover:bg-gray-100 transition">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                <CalendarIcon /> Latest sessions
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
                                                  <div className="text-xs text-gray-600 font-medium">Correct beers served</div>
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
        </div>

        {/* Section: Details */}
        {/* Removed Session Details and Module Details panels as requested */}
      </main>
    </div>
  );
}
