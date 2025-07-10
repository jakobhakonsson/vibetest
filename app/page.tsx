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

  const moduleTypesList = ["Perfect Pour", "Ingredients", "Beer types"];
  const [modules] = useState<ModuleType[]>(() => Array.from({ length: 120 }, (_, i) => {
    const id = `module-${(i + 1).toString().padStart(3, '0')}`;
    const moduleId = moduleTypesList[i % moduleTypesList.length];
    const sessionId = `session-${(i + 1).toString().padStart(3, '0')}`;
    const start = new Date(Date.now() - (120 - i) * 60 * 60 * 1000 + getRandomInt(0, 30) * 60 * 1000);
    const duration = getRandomInt(3, 10) + getRandomInt(0, 59) / 60;
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
    if (moduleId === "Perfect Pour") {
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
    return base;
  }));

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
  const [showAllModules, setShowAllModules] = useState(false);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAIResponse, setShowAIResponse] = useState(false);

  // Metrics
  const avgSessionDuration = sessions.reduce((acc, s) => acc + s.duration, 0) / sessions.length;
  const totalModules = modules.length;
  const avgModuleDuration = modules.length > 0 ? modules.reduce((acc, m) => acc + m.duration, 0) / modules.length : 0;
  const completionRate = totalModules > 0 ? (completedModulesPlayed / totalModulesPlayed) * 100 : 0;

  // Drilldown per module type
  const moduleTypes = Array.from(new Set(modules.map(m => m.moduleId)));
  const moduleStats = moduleTypes.map(type => {
    const started = getRandomInt(100, 200);
    const completed = getRandomInt(0, started);
    const exited = started - completed;
    const avgDuration = getRandomInt(3, 10) + getRandomInt(0, 59) / 60;
    return { type, started, exited, completed, avgDuration };
  });

  // Format time
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleString();
  };

  // Format duration
  const formatDuration = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${mins}m ${secs}s`;
  };

  // In Session Activity, sort sessions by descending session number (most recent first)
  const sortedSessions = [...sessions].sort((a, b) => {
    // Extract the numeric part from the session id (e.g., 'session-120' -> 120)
    const numA = parseInt(a.id.replace('session-', ''), 10);
    const numB = parseInt(b.id.replace('session-', ''), 10);
    return numB - numA;
  });

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
              <p className="text-xs text-purple-700 mt-1">
                {avgSessionDuration.toFixed(1)}m average
              </p>
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
              <p className="text-xs text-teal-700 mt-1">
                {avgModuleDuration.toFixed(1)}m average
              </p>
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
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
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
                  {(showAllSessions ? sortedSessions : sortedSessions.slice(0, 5)).map((session) => (
                    <div key={session.id} className="border-l-4 border-blue-400 pl-4 pr-6 py-2 bg-blue-50/50 rounded-lg hover:bg-blue-100/70 transition">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">Session <span className="font-mono">{session.id}</span></p>
                          <p className="text-xs text-gray-500">Device: {session.deviceId} | App: {session.appId}</p>
                          <p className="text-xs text-gray-500">Start: {formatTime(session.startTime)}</p>
                        </div>
                        <div className="text-right min-w-[120px]">
                          <p className="text-xs text-gray-500">Duration: {formatDuration(session.duration)}</p>
                          <Bar value={session.duration} max={avgSessionDuration} color="bg-blue-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Module Performance */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-green-900 flex items-center gap-2">
                <CheckmarkIcon /> Module Performance
              </h3>
              <button
                className="flex items-center px-3 py-1 rounded-full bg-green-50 hover:bg-green-100 text-green-700 font-semibold text-xs transition-colors"
                onClick={() => setShowAllModules(v => !v)}
              >
                {showAllModules ? "See less" : "See more"}
                <ChevronIcon expanded={showAllModules} colorClass="text-green-700" />
              </button>
            </div>
            <AnimatePresence initial={false}>
              <motion.div
                key={showAllModules ? 'expanded' : 'collapsed'}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="space-y-4">
                  {(showAllModules ? modules : modules.slice(-5)).map((module) => (
                    <div
                      key={module.id}
                      className={`border-l-4 border-green-400 pl-4 pr-6 py-2 bg-green-50/50 rounded-lg hover:bg-green-100/70 transition cursor-pointer`}
                      onClick={() => module.moduleId === "Perfect Pour" ? setExpandedModuleId(expandedModuleId === module.id ? null : module.id) : null}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{module.moduleId} <span className="font-mono text-xs text-gray-500">({module.id})</span></p>
                          <p className="text-xs text-gray-500">Session: {module.sessionId}</p>
                          <p className="text-xs text-gray-500">Start: {formatTime(module.startTime)}</p>
                        </div>
                        <div className="text-right min-w-[120px]">
                          <p className="text-xs text-gray-500">Duration: {formatDuration(module.duration)}</p>
                          <Bar value={module.duration} max={avgModuleDuration} color="bg-green-400" />
                          <div className="h-2" />
                          <StatusBadge status={module.status} />
                        </div>
                      </div>
                      {module.moduleId === "Perfect Pour" && (
                        <>
                          {/* Always visible: first two lines */}
                          <div className="mt-2 text-xs text-gray-700">
                            <div>Avg. score per beer: <span className="font-semibold">{typeof module.averageScorePerBeer === 'number' ? module.averageScorePerBeer : 0}</span></div>
                            <div>Challenge high score: <span className="font-semibold">{module.status === 'exited' ? 'none' : (typeof module.challengeHighScore === 'number' ? module.challengeHighScore : 0)}</span></div>
                          </div>
                          {/* Expandable: pour scores and avg. total */}
                          <AnimatePresence initial={false}>
                            {expandedModuleId === module.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className="mt-1 flex flex-col gap-y-1 text-xs text-gray-700">
                                  <div>Pour 1: <span className="font-semibold">{module.averageScorePour1}</span></div>
                                  <div>Pour 2: <span className="font-semibold">{module.averageScorePour2}</span></div>
                                  <div>Pour 3: <span className="font-semibold">{module.averageScorePour3}</span></div>
                                  <div>Pour 4: <span className="font-semibold">{module.averageScorePour4}</span></div>
                                  <div>Pour 5: <span className="font-semibold">{module.averageScorePour5}</span></div>
                                  <div className="pt-1">Avg. total: <span className="font-semibold">{module.averageTotal}</span></div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </div>
                  ))}
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
