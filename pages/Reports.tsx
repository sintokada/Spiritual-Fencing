import React, { useMemo, useState } from 'react';
import { AppData } from '../types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, LabelList
} from 'recharts';
import { Download, FileText, Calendar as CalendarIcon, Check, X, Sparkles, Wand2, RefreshCw, Quote } from 'lucide-react';
import { exportToCSV, exportToPDF } from '../services/exportService';
import { GoogleGenAI } from "@google/genai";

interface ReportsProps {
  data: AppData;
  onUpdateReflection: (month: string, text: string) => void;
}

// Custom Tooltip for Bar Chart (Average Scores)
const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-panel p-3 rounded-xl shadow-xl text-sm min-w-[200px] z-50">
        <p className="font-bold text-stone-800 dark:text-stone-100 mb-1 border-b border-stone-200/50 dark:border-stone-700 pb-1">
          {data.name}
        </p>
        <div className="flex items-center justify-between gap-4 mt-2">
           <span className="text-stone-500 dark:text-stone-400">Average Score</span>
           <div className="flex items-baseline gap-1">
             <span className="text-lg font-bold text-sacred-red">{data.avg}</span>
             <span className="text-xs text-stone-400">/ 10</span>
           </div>
        </div>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Line Chart (Daily Trends)
const CustomLineTooltip = ({ active, payload, label, selectedMonth }: any) => {
  if (active && payload && payload.length) {
    const dateStr = `${selectedMonth}-${label}`; 
    const dateObj = new Date(dateStr);
    const formattedDate = !isNaN(dateObj.getTime()) 
      ? dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      : `${selectedMonth}-${label}`;

    return (
      <div className="glass-panel p-3 rounded-xl shadow-xl text-xs min-w-[240px] z-50">
        <p className="font-bold text-stone-800 dark:text-stone-100 mb-2 border-b border-stone-200/50 dark:border-stone-700 pb-1 flex justify-between items-center">
          <span>{formattedDate}</span>
          <span className="text-[10px] font-normal text-stone-400">Daily Scores</span>
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 overflow-hidden">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
                <span className="text-stone-600 dark:text-stone-300 truncate max-w-[80px]" title={entry.name}>
                  {entry.name}
                </span>
              </div>
              <span className="font-bold text-stone-800 dark:text-stone-200 font-mono">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const Reports: React.FC<ReportsProps> = ({ data, onUpdateReflection }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7) // YYYY-MM
  );
  
  // AI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const isDark = data.settings.darkMode;
  const textColor = isDark ? '#e7e5e4' : '#44403c'; 
  const gridColor = isDark ? '#44403c' : '#e5e7eb'; 
  
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    months.add('2025-06');
    months.add('2025-07');
    months.add('2025-12');
    months.add(new Date().toISOString().slice(0, 7));
    Object.keys(data.logs).forEach(date => {
      months.add(date.slice(0, 7));
    });
    return Array.from(months).sort().reverse();
  }, [data.logs]);

  const chartData = useMemo(() => {
    const daysInMonth = Object.keys(data.logs)
      .filter(date => date.startsWith(selectedMonth))
      .sort();

    return daysInMonth.map(date => {
      const log = data.logs[date];
      const entry: any = { name: date.split('-')[2] };
      data.activities.forEach(act => {
        entry[act.name] = log.scores[act.id] || 0;
      });
      return entry;
    });
  }, [data, selectedMonth]);

  const averageData = useMemo(() => {
    const sums: Record<string, number> = {};
    const counts: Record<string, number> = {};
    data.activities.forEach(act => {
      sums[act.id] = 0;
      counts[act.id] = 0;
    });
    Object.keys(data.logs)
      .filter(date => date.startsWith(selectedMonth))
      .forEach(date => {
        const scores = data.logs[date].scores;
        Object.entries(scores).forEach(([actId, score]) => {
          if (typeof score === 'number') {
            sums[actId] += score;
            counts[actId] += 1;
          }
        });
      });
    return data.activities.map(act => {
      const avg = counts[act.id] ? parseFloat((sums[act.id] / counts[act.id]).toFixed(1)) : 0;
      return {
        name: act.name,
        shortName: act.name.length > 25 ? act.name.slice(0, 25) + '...' : act.name,
        avg: avg,
        label: `${avg}`
      };
    }).sort((a, b) => b.avg - a.avg);
  }, [data, selectedMonth]);

  const calendarData = useMemo(() => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const date = new Date(year, month - 1, 1);
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfWeek = date.getDay();
    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [selectedMonth]);

  const todayStr = new Date().toISOString().split('T')[0];
  const colors = ['#880808', '#d4af37', '#b45309', '#be123c', '#7f1d1d', '#92400e', '#0f766e', '#1e40af', '#5b21b6', '#86198f'];

  // --- GEMINI AI GENERATION ---
  const handleMotivateMe = async () => {
    setIsGenerating(true);
    setAiResponse(null);

    try {
      // Note: Assuming process.env.API_KEY is available in the environment
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Prepare context from data
      const stats = averageData.map(a => `${a.name}: ${a.avg}/10`).join(', ');
      const topStrength = averageData.length > 0 && averageData[0].avg > 0 ? averageData[0].name : "Starting Out";
      const struggleArea = averageData.length > 0 ? averageData[averageData.length - 1].name : "Everything";

      const prompt = `
        You are a wise and compassionate Catholic Spiritual Director.
        
        The user is practicing "Spiritual Fencing" (guarding the mind and heart).
        Here is their report for ${selectedMonth}:
        - Overall Stats: ${stats}
        - Strongest Area: ${topStrength}
        - Area Needing Grace: ${struggleArea}

        Based on this data, provide a short, personalized spiritual encouragement.
        1. Acknowledge their effort specifically (mention the struggle or strength).
        2. Provide 1 specific Bible Verse (Word of God) related to their situation.
        3. Provide 1 Quote from a Catholic Saint that fits their data.
        4. End with a short prayer invoking the Eucharistic Heart of Jesus.

        Keep the tone encouraging, holy, and motivating. Use Markdown for bolding key parts.
      `;

      // Correct API usage per @google/genai guidelines
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });
      
      const responseText = response.text;
      
      if (responseText) {
        setAiResponse(responseText);
        onUpdateReflection(selectedMonth, responseText);
      } else {
        throw new Error("No response text received from AI");
      }

    } catch (error) {
      console.error("AI Generation Error:", error);
      setAiResponse("⚠️ Unable to connect to the Spiritual Director at this moment. Please try again later or say a short prayer for connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/20 dark:border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-serif font-bold text-stone-800 dark:text-stone-100 drop-shadow-sm">Monthly Report</h2>
          <p className="text-stone-600 dark:text-stone-400 font-medium">Growth in the Eucharistic Heart</p>
        </div>
        <div className="flex gap-2">
           <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-white/50 dark:bg-stone-800/50 backdrop-blur border border-white/30 dark:border-white/10 rounded-xl px-4 py-2 font-bold text-stone-700 dark:text-stone-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sacred-red/50 cursor-pointer"
          >
            {availableMonths.map(m => (
              <option key={m} value={m}>{new Date(m + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button 
          onClick={() => exportToCSV(data, selectedMonth)}
          className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-stone-800/60 border border-white/30 rounded-lg text-sm font-bold text-stone-600 dark:text-stone-300 hover:bg-white/80 transition-colors shadow-sm active:scale-95 duration-200"
        >
          <FileText className="w-4 h-4" /> Export CSV
        </button>
        <button 
          onClick={() => exportToPDF('report-content', selectedMonth)}
          className="flex items-center gap-2 px-4 py-2 bg-sacred-red text-white rounded-lg text-sm font-bold hover:bg-red-900 transition-all shadow-md active:scale-95 duration-200"
        >
          <Download className="w-4 h-4" /> Export PDF
        </button>
      </div>

      <div id="report-content" className="space-y-8">
        
        {/* Horizontal Bar Chart */}
        <div className="glass-panel p-6 rounded-3xl shadow-glass">
          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-2 flex items-center gap-2">
            <span className="text-sacred-red">❤️</span> Average Fencing Score
          </h3>
          <p className="text-sm text-stone-500 mb-6 italic">Higher is stronger protection</p>
          
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={averageData}
                margin={{ top: 5, right: 50, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={gridColor} />
                <XAxis type="number" domain={[0, 10]} hide />
                <YAxis 
                  type="category" 
                  dataKey="shortName" 
                  width={180} 
                  tick={{fontSize: 12, fill: textColor, fontWeight: 600}}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  content={<CustomBarTooltip />}
                  cursor={{fill: isDark ? '#ffffff10' : '#ffffff50'}}
                />
                <Bar dataKey="avg" fill="#880808" radius={[0, 4, 4, 0]} barSize={24}>
                  <LabelList dataKey="label" position="right" style={{ fill: '#b45309', fontSize: 12, fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Interactive Trends */}
        <div className="glass-panel p-6 rounded-3xl shadow-glass">
          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-6">Daily Trends</h3>
          <div className="h-[400px] w-full text-xs">
            {chartData.length > 0 ? (
               <ResponsiveContainer width="100%" height="100%">
               <LineChart
                 data={chartData}
                 margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
               >
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                 <XAxis 
                   dataKey="name" 
                   padding={{ left: 10, right: 10 }} 
                   tick={{fill: textColor}} 
                   axisLine={{stroke: gridColor}}
                 />
                 <YAxis domain={[0, 10]} tick={{fill: textColor}} axisLine={{stroke: gridColor}} />
                 <Tooltip content={(props) => <CustomLineTooltip {...props} selectedMonth={selectedMonth} />} />
                 <Legend wrapperStyle={{paddingTop: '20px'}} />
                 {data.activities.map((act, idx) => (
                   <Line
                     key={act.id}
                     type="monotone"
                     dataKey={act.name}
                     stroke={colors[idx % colors.length]}
                     strokeWidth={2}
                     dot={{r: 3, strokeWidth: 0}}
                     activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                     connectNulls
                   />
                 ))}
               </LineChart>
             </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-stone-400 italic">
                No daily logs recorded for this month yet.
              </div>
            )}
          </div>
        </div>

        {/* Activity Calendar */}
        <div className="glass-panel p-6 rounded-3xl shadow-glass break-inside-avoid">
          <div className="flex items-center gap-2 mb-6">
            <CalendarIcon className="w-5 h-5 text-gold-accent" />
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">Attendance Calendar</h3>
          </div>
          
          <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={i} className="text-center text-xs font-bold text-stone-400 dark:text-stone-500 py-2">
                {d}
              </div>
            ))}
            
            {calendarData.map((day, index) => {
              if (day === null) return <div key={`empty-${index}`} className="aspect-square"></div>;

              const dateStr = `${selectedMonth}-${String(day).padStart(2, '0')}`;
              const isLogged = !!data.logs[dateStr];
              const isToday = dateStr === todayStr;
              const isFuture = dateStr > todayStr;
              const isMissed = !isLogged && !isFuture;

              let bgClass = "bg-white/30 dark:bg-white/5 border-transparent"; 
              let textClass = "text-stone-400 dark:text-stone-600";
              let content = <span className="text-sm font-medium">{day}</span>;

              if (isLogged) {
                bgClass = "bg-green-100/60 dark:bg-green-900/40 border-green-200 dark:border-green-800";
                textClass = "text-green-700 dark:text-green-400 font-bold";
                content = (
                  <div className="flex flex-col items-center">
                    <span className="text-xs mb-1">{day}</span>
                    <Check className="w-4 h-4" />
                  </div>
                );
              } else if (isMissed) {
                 bgClass = "bg-red-50/60 dark:bg-red-900/20 border-red-100 dark:border-red-900/50";
                 textClass = "text-red-400 dark:text-red-500";
                 content = (
                  <div className="flex flex-col items-center">
                    <span className="text-xs mb-1">{day}</span>
                    <X className="w-3 h-3 opacity-50" />
                  </div>
                );
              }

              if (isToday) {
                 bgClass += " ring-2 ring-sacred-red ring-offset-2 ring-offset-transparent";
              }

              return (
                <div 
                  key={day} 
                  className={`aspect-square rounded-xl border flex items-center justify-center transition-all ${bgClass} ${textClass}`}
                  title={isLogged ? "Completed" : (isMissed ? "Missed" : "Future")}
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Spiritual Direction Section (Gemini) */}
        <div className="glass-panel p-6 rounded-3xl shadow-glass break-inside-avoid relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold-accent/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-sacred-red/10 dark:bg-sacred-red/20 rounded-full text-sacred-red">
                <Wand2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">Spiritual Direction</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">Receive Catholic motivation based on your data</p>
              </div>
            </div>
            
            <button
              onClick={handleMotivateMe}
              disabled={isGenerating}
              className="group relative px-6 py-2.5 bg-gradient-to-r from-sacred-red to-orange-600 text-white rounded-xl font-bold shadow-lg hover:shadow-orange-500/30 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="flex items-center justify-center gap-2">
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Praying...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>Motivate Me</span>
                  </>
                )}
              </div>
            </button>
          </div>

          <div className="bg-white/40 dark:bg-black/20 rounded-2xl border border-stone-200 dark:border-stone-700 min-h-[160px] p-6 relative">
            {aiResponse || data.reflections[selectedMonth] ? (
              <div className="prose prose-stone dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap font-medium">
                {/* Displaying AI Response or Saved Reflection */}
                {aiResponse || data.reflections[selectedMonth]}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-stone-400 text-center py-8">
                <div className="mb-4 relative">
                   <Sparkles className="w-8 h-8 opacity-30 text-gold-accent" />
                   <Quote className="w-6 h-6 absolute -top-2 -right-4 text-sacred-red/40" />
                </div>
                <p className="italic mb-1">
                  "Click 'Motivate Me' to receive spiritual guidance for this month."
                </p>
                <p className="text-xs opacity-70">
                  Powered by Gemini AI • Catholic Perspective
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;