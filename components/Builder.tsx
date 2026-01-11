import React, { useState, useEffect, useRef } from 'react';
import { AutomationConfig, AutomationLog, SpamField } from '../types';
import { Play, Square, Settings, Activity, Terminal, Zap, Cpu, Database, Smartphone, Plus, Trash2, HelpCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [logs, setLogs] = useState<AutomationLog[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [config, setConfig] = useState<AutomationConfig>({
    targetUrl: '',
    submissionCount: 10,
    delayMs: 1000,
    useRandomizer: true,
    useAiGeneration: false,
    fields: [
      { id: '1', entryId: 'entry.123456', valueType: 'random_text', customValue: '' }
    ]
  });

  // Scroll to bottom of logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Generate Random Data
  const generateValue = (type: SpamField['valueType'], custom?: string) => {
    switch (type) {
      case 'fixed': return custom || '';
      case 'random_email': return `user${Math.floor(Math.random() * 99999)}@gmail.com`;
      case 'random_number': return Math.floor(Math.random() * 1000000).toString();
      case 'random_text': return Math.random().toString(36).substring(7);
      case 'random_option': return ['Option 1', 'Option 2', 'Option 3'][Math.floor(Math.random() * 3)];
      default: return 'test';
    }
  };

  // Real Execution Logic (Using Native Form Submission Hack)
  useEffect(() => {
    let interval: any;
    
    if (isRunning) {
      let currentCount = 0;
      
      // 1. Prepare URL (Convert viewform to formResponse)
      let submitUrl = config.targetUrl;
      // Handle various Google Form URL formats
      if (submitUrl.includes('viewform')) {
        submitUrl = submitUrl.replace('viewform', 'formResponse');
      } else if (submitUrl.includes('/edit')) {
        submitUrl = submitUrl.replace('/edit', '/formResponse');
      } else if (!submitUrl.endsWith('formResponse')) {
        // Simple heuristic to append if missing
        if (submitUrl.endsWith('/')) submitUrl += 'formResponse';
        else submitUrl += '/formResponse';
      }

      interval = setInterval(() => {
        currentCount++;
        
        // 2. Create a hidden form dynamically in the DOM
        // This bypasses CORS restrictions because it's a "standard" form submission
        const form = document.createElement('form');
        form.action = submitUrl;
        form.method = 'POST';
        form.target = 'hidden_frame'; // Targets the hidden iframe below
        form.style.display = 'none';

        const logDataParts: string[] = [];
        
        // 3. Add Inputs for each field
        config.fields.forEach(field => {
          const val = generateValue(field.valueType, field.customValue);
          // Ensure entry ID has prefix "entry."
          const key = field.entryId.startsWith('entry.') ? field.entryId : `entry.${field.entryId}`;
          
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = val;
          form.appendChild(input);
          
          logDataParts.push(`${key}=${val.substring(0, 8)}..`);
        });

        // Add pageHistory (Required for some multi-page forms)
        const historyInput = document.createElement('input');
        historyInput.type = 'hidden';
        historyInput.name = 'pageHistory';
        historyInput.value = '0';
        form.appendChild(historyInput);

        // 4. Append to Body, Submit, and Cleanup
        document.body.appendChild(form);
        
        try {
          form.submit(); // The magic line
          
          const newLog: AutomationLog = {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            status: 'success',
            message: `SENT: ${logDataParts.join(', ')}`
          };
          setLogs(prev => [...prev, newLog].slice(-50));
          setSentCount(prev => prev + 1);
        } catch (error) {
           const newLog: AutomationLog = {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            status: 'failed',
            message: `ERROR: Submission blocked by browser`
          };
          setLogs(prev => [...prev, newLog].slice(-50));
        }

        // Cleanup the form element to prevent memory leaks
        setTimeout(() => {
            if (document.body.contains(form)) {
                document.body.removeChild(form);
            }
        }, 1000);
        
        setProgress((currentCount / config.submissionCount) * 100);

        if (currentCount >= config.submissionCount) {
          setIsRunning(false);
          clearInterval(interval);
          setLogs(prev => [...prev, { id: Date.now(), timestamp: new Date().toLocaleTimeString(), status: 'success', message: 'BATCH COMPLETE.' }]);
        }
      }, Math.max(300, config.delayMs)); // Minimum 300ms delay to prevent browser throttling
    }
    
    return () => clearInterval(interval);
  }, [isRunning, config]);

  const toggleRun = () => {
    if (!config.targetUrl) {
      alert("Please enter a Google Form URL");
      return;
    }
    if (config.fields.length === 0) {
      alert("Please add at least one Entry ID mapping.");
      return;
    }

    if (isRunning) {
      setIsRunning(false);
    } else {
      setSentCount(0);
      setLogs([{ id: 0, timestamp: new Date().toLocaleTimeString(), status: 'pending', message: 'Initializing Iframe Injection Mode...' }]);
      setTimeout(() => {
        setIsRunning(true);
      }, 500);
    }
  };

  const addField = () => {
    setConfig({
      ...config,
      fields: [...config.fields, { id: Date.now().toString(), entryId: '', valueType: 'random_text' }]
    });
  };

  const removeField = (id: string) => {
    setConfig({
      ...config,
      fields: config.fields.filter(f => f.id !== id)
    });
  };

  const updateField = (id: string, updates: Partial<SpamField>) => {
    setConfig({
      ...config,
      fields: config.fields.map(f => f.id === id ? { ...f, ...updates } : f)
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 flex flex-col lg:flex-row font-sans">
      
      {/* Hidden Iframe to catch form submissions */}
      <iframe name="hidden_frame" id="hidden_frame" style={{ display: 'none' }} />

      {/* LEFT PANEL: Configuration */}
      <div className="w-full lg:w-[450px] bg-white border-r border-gray-200 flex flex-col h-auto lg:h-[calc(100vh-64px)] p-6 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Settings className="text-primary-600" /> Attack Config
        </h2>

        <div className="space-y-6">
          {/* Target URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Target Form URL</label>
            <input 
              type="text" 
              placeholder="https://docs.google.com/forms/d/e/.../viewform" 
              value={config.targetUrl}
              onChange={(e) => setConfig({...config, targetUrl: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg text-xs font-mono text-gray-600 focus:ring-2 focus:ring-primary-500 outline-none"
            />
            <p className="text-[10px] text-gray-400 mt-1">Paste the full public link.</p>
          </div>

          {/* Counts */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">Count</label>
              <span className="text-sm font-bold text-primary-600">{config.submissionCount}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="1000" 
              step="10"
              value={config.submissionCount}
              onChange={(e) => setConfig({...config, submissionCount: parseInt(e.target.value)})}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>
          
           {/* Delay */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
             <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">Speed / Delay</label>
              <span className="text-sm font-bold text-primary-600">{config.delayMs} ms</span>
            </div>
            <input 
              type="range" 
              min="300" 
              max="2000" 
              step="100"
              value={config.delayMs}
              onChange={(e) => setConfig({...config, delayMs: parseInt(e.target.value)})}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>

          {/* Field Mapping */}
          <div className="border-t border-gray-200 pt-4">
             <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                   <h3 className="text-sm font-bold text-gray-900">Field Mapping</h3>
                   <div className="group relative">
                      <HelpCircle size={14} className="text-gray-400 cursor-help" />
                      <div className="hidden group-hover:block absolute left-0 bottom-6 w-64 p-2 bg-gray-800 text-white text-[10px] rounded shadow-lg z-10">
                        Use "Get pre-filled link" in Google Forms to find entry IDs (e.g. entry.12345).
                      </div>
                   </div>
                </div>
                <button onClick={addField} className="text-xs flex items-center gap-1 text-primary-600 font-bold hover:text-primary-700">
                  <Plus size={14} /> Add Field
                </button>
             </div>
             
             <div className="space-y-3">
               {config.fields.map(field => (
                 <div key={field.id} className="bg-gray-50 p-3 rounded border border-gray-200">
                    <div className="flex gap-2 mb-2">
                       <input 
                          type="text" 
                          placeholder="entry.12345" 
                          value={field.entryId}
                          onChange={(e) => updateField(field.id, { entryId: e.target.value })}
                          className="flex-1 p-2 text-xs border border-gray-300 rounded font-mono"
                       />
                       <button onClick={() => removeField(field.id)} className="text-gray-400 hover:text-red-500">
                          <Trash2 size={16} />
                       </button>
                    </div>
                    <div className="flex gap-2">
                       <select 
                          value={field.valueType}
                          onChange={(e) => updateField(field.id, { valueType: e.target.value as any })}
                          className="flex-1 p-2 text-xs border border-gray-300 rounded"
                       >
                          <option value="random_text">Random Text</option>
                          <option value="random_email">Random Email</option>
                          <option value="random_number">Random Number</option>
                          <option value="fixed">Fixed Value</option>
                       </select>
                       {field.valueType === 'fixed' && (
                         <input 
                            type="text" 
                            placeholder="Value"
                            value={field.customValue}
                            onChange={(e) => updateField(field.id, { customValue: e.target.value })}
                            className="flex-1 p-2 text-xs border border-gray-300 rounded"
                         />
                       )}
                    </div>
                 </div>
               ))}
             </div>
          </div>

          <button 
            onClick={toggleRun}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
              isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-primary-600 hover:bg-primary-700'
            }`}
          >
            {isRunning ? <><Square fill="currentColor" size={18} /> STOP</> : <><Play fill="currentColor" size={18} /> START ATTACK</>}
          </button>
        </div>
      </div>

      {/* RIGHT PANEL: Terminal & Visualization */}
      <div className="flex-1 bg-gray-900 p-6 flex flex-col overflow-hidden relative">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Activity size={20} /></div>
              <span className="text-gray-400 text-sm font-medium">Status</span>
            </div>
            <div className={`text-2xl font-bold ${isRunning ? 'text-green-400' : 'text-gray-500'}`}>
              {isRunning ? 'Sending...' : 'Ready'}
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400"><Database size={20} /></div>
              <span className="text-gray-400 text-sm font-medium">Success Count</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {sentCount} / {config.submissionCount}
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
             <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Zap size={20} /></div>
              <span className="text-gray-400 text-sm font-medium">Method</span>
            </div>
            <div className="text-xs font-mono text-gray-300 mt-1">
               IFRAME INJECTION
            </div>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="flex-1 bg-black rounded-xl border border-gray-800 shadow-2xl flex flex-col overflow-hidden font-mono text-xs md:text-sm">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-gray-400" />
              <span className="text-gray-400">console@borang-net:~</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-1" ref={scrollRef}>
            {!isRunning && logs.length === 0 && (
              <div className="text-gray-500 h-full flex flex-col items-center justify-center">
                <Zap size={48} className="mb-4 opacity-20" />
                <p>1. Paste Google Form URL</p>
                <p>2. Add Entry IDs (from pre-filled link)</p>
                <p>3. Start Attack</p>
              </div>
            )}
            {logs.map((log) => (
              <div key={log.id} className="flex gap-3">
                <span className="text-gray-500">[{log.timestamp}]</span>
                <span className={`${
                  log.status === 'success' ? 'text-green-400' : 
                  log.status === 'failed' ? 'text-red-400' : 'text-blue-400'
                }`}>
                  {log.status.toUpperCase()}
                </span>
                <span className="text-gray-300 truncate">{log.message}</span>
              </div>
            ))}
            {isRunning && (
              <div className="animate-pulse text-primary-500">_</div>
            )}
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default Dashboard;
