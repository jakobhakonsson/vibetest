"use client";

import { useState } from "react";
import Image from "next/image";

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

// Mock data for demonstration - replace with real API calls
const mockSessionData = [
  {
    id: "session-001",
    deviceId: "VR-Headset-001",
    appId: "the-experience-v1.2",
    startTime: "2025-07-10T09:30:00Z",
    endTime: "2025-07-10T10:15:00Z",
    duration: 45, // minutes
    status: "completed"
  },
  {
    id: "session-002", 
    deviceId: "VR-Headset-002",
    appId: "the-experience-v1.2",
    startTime: "2025-07-10T10:00:00Z",
    endTime: "2025-07-10T10:08:00Z",
    duration: 8,
    status: "exited"
  },
  {
    id: "session-003",
    deviceId: "VR-Headset-001", 
    appId: "the-experience-v1.2",
    startTime: "2025-07-10T11:00:00Z",
    endTime: "2025-07-10T11:45:00Z",
    duration: 45,
    status: "completed"
  }
];

const mockModuleData = [
  {
    id: "module-001",
    moduleId: "Perfect Pour",
    sessionId: "session-001",
    startTime: "2025-07-10T09:30:00Z",
    endTime: "2025-07-10T09:34:17Z",
    duration: 4 + 17/60, // 4m 17s
    status: "exited"
  },
  {
    id: "module-002",
    moduleId: "Ingredients",
    sessionId: "session-001", 
    startTime: "2025-07-10T09:34:17Z",
    endTime: "2025-07-10T09:42:42Z",
    duration: 8 + 25/60, // 8m 25s
    status: "completed"
  },
  {
    id: "module-003",
    moduleId: "Beer types",
    sessionId: "session-002",
    startTime: "2025-07-10T10:00:00Z", 
    endTime: "2025-07-10T10:04:45Z",
    duration: 4 + 45/60, // 4m 45s
    status: "exited"
  },
  {
    id: "module-004",
    moduleId: "Perfect Pour",
    sessionId: "session-003",
    startTime: "2025-07-10T11:00:00Z",
    endTime: "2025-07-10T11:07:03Z", 
    duration: 7 + 3/60, // 7m 3s
    status: "completed"
  },
  {
    id: "module-005",
    moduleId: "Ingredients",
    sessionId: "session-003",
    startTime: "2025-07-10T11:07:03Z",
    endTime: "2025-07-10T11:11:59Z",
    duration: 4 + 56/60, // 4m 56s
    status: "exited"
  }
];

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

export default function Home() {
  const [sessions] = useState(mockSessionData);
  const [modules] = useState(mockModuleData);
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");

  // Metrics
  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(s => s.status === "completed").length;
  const exitedSessions = sessions.filter(s => s.status === "exited").length;
  const avgSessionDuration = sessions.reduce((acc, s) => acc + s.duration, 0) / sessions.length;
  const maxSessionDuration = Math.max(...sessions.map(s => s.duration));

  const totalModules = modules.length;
  const completedModules = modules.filter(m => m.status === "completed").length;
  const exitedModules = modules.filter(m => m.status === "exited").length;
  const avgModuleDuration = modules.reduce((acc, m) => acc + m.duration, 0) / modules.length;
  const maxModuleDuration = Math.max(...modules.map(m => m.duration));

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
              <Image
                src="/next.svg"
                alt="Logo"
                width={36}
                height={36}
                className="mr-3"
              />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                The Experience <span className="[color:#4AB2AC]">Dashboard</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-200"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Section: Overview */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="flex items-center gap-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl shadow hover:shadow-lg transition p-6">
            <div className="bg-blue-200 rounded-full p-2">
              <SessionIcon />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-blue-700 uppercase">Total Sessions</h3>
              <p className="text-3xl font-bold text-blue-900">{totalSessions}</p>
              <p className="text-xs text-blue-700 mt-1">{completedSessions} completed, {exitedSessions} exited</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl shadow hover:shadow-lg transition p-6">
            <div className="bg-purple-200 rounded-full p-2">
              <DurationIcon />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-purple-700 uppercase">Avg Session Duration</h3>
              <p className="text-3xl font-bold text-purple-900">{avgSessionDuration.toFixed(1)}m</p>
              <p className="text-xs text-purple-700 mt-1">{formatDuration(Math.round(avgSessionDuration))} average</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-gradient-to-r from-green-100 to-green-50 rounded-xl shadow hover:shadow-lg transition p-6">
            <div className="bg-green-200 rounded-full p-2">
              <ModuleIcon />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-green-700 uppercase">Total Modules</h3>
              <p className="text-3xl font-bold text-green-900">{totalModules}</p>
              <p className="text-xs text-green-700 mt-1">{completedModules} completed, {exitedModules} exited</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-gradient-to-r from-teal-100 to-teal-50 rounded-xl shadow hover:shadow-lg transition p-6">
            <div className="bg-teal-200 rounded-full p-2">
              <DurationIcon />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-teal-700 uppercase">Avg Module Duration</h3>
              <p className="text-3xl font-bold text-teal-900">{avgModuleDuration.toFixed(1)}m</p>
              <p className="text-xs text-teal-700 mt-1">{formatDuration(Math.round(avgModuleDuration))} average</p>
            </div>
          </div>
        </div>

        {/* Section: Activity */}
        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          {/* Session Activity */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
              <SessionIcon /> Session Activity
            </h3>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="border-l-4 border-blue-400 pl-4 py-2 bg-blue-50/50 rounded-lg hover:bg-blue-100/70 transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">Session <span className="font-mono">{session.id}</span></p>
                      <p className="text-xs text-gray-500">Device: {session.deviceId} | App: {session.appId}</p>
                      <p className="text-xs text-gray-500">Start: {formatTime(session.startTime)}</p>
                    </div>
                    <div className="text-right min-w-[120px]">
                      <p className="text-xs text-gray-500">Duration: {formatDuration(session.duration)}</p>
                      <Bar value={session.duration} max={maxSessionDuration} color="bg-blue-400" />
                      <div className="h-2" />
                      <StatusBadge status={session.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module Performance */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
              <ModuleIcon /> Module Performance
            </h3>
            <div className="space-y-4">
              {modules.map((module) => (
                <div key={module.id} className="border-l-4 border-green-400 pl-4 py-2 bg-green-50/50 rounded-lg hover:bg-green-100/70 transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{module.moduleId} <span className="font-mono text-xs text-gray-500">({module.id})</span></p>
                      <p className="text-xs text-gray-500">Session: {module.sessionId}</p>
                      <p className="text-xs text-gray-500">Start: {formatTime(module.startTime)}</p>
                    </div>
                    <div className="text-right min-w-[120px]">
                      <p className="text-xs text-gray-500">Duration: {formatDuration(module.duration)}</p>
                      <Bar value={module.duration} max={maxModuleDuration} color="bg-green-400" />
                      <div className="h-2" />
                      <StatusBadge status={module.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section: Details */}
        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-10">Details</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sessions Table */}
          <div className="bg-white rounded-2xl shadow-lg">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
              <SessionIcon />
              <h3 className="text-lg font-semibold text-blue-900">Session Details</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold text-blue-700 uppercase tracking-wider">Session ID</th>
                    <th className="px-6 py-3 text-left font-bold text-blue-700 uppercase tracking-wider">Device</th>
                    <th className="px-6 py-3 text-left font-bold text-blue-700 uppercase tracking-wider">Start Time</th>
                    <th className="px-6 py-3 text-left font-bold text-blue-700 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left font-bold text-blue-700 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {sessions.map((session) => (
                    <tr key={session.id} className="hover:bg-blue-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-blue-900">{session.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{session.deviceId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{formatTime(session.startTime)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{formatDuration(session.duration)}</td>
                      <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={session.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modules Table */}
          <div className="bg-white rounded-2xl shadow-lg">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
              <ModuleIcon />
              <h3 className="text-lg font-semibold text-green-900">Module Details</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold text-green-700 uppercase tracking-wider">Module ID</th>
                    <th className="px-6 py-3 text-left font-bold text-green-700 uppercase tracking-wider">Session</th>
                    <th className="px-6 py-3 text-left font-bold text-green-700 uppercase tracking-wider">Start Time</th>
                    <th className="px-6 py-3 text-left font-bold text-green-700 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left font-bold text-green-700 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {modules.map((module) => (
                    <tr key={module.id} className="hover:bg-green-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-green-900">{module.moduleId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{module.sessionId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{formatTime(module.startTime)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{formatDuration(module.duration)}</td>
                      <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={module.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
