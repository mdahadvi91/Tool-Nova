import React, { useState, useEffect } from 'react';
import { CheckSquare, Grid, Edit3, Plus, Trash2, Download, Copy, Check, Sparkles } from 'lucide-react';
import { safeStorage } from '../../utils/storage';
import { useTranslation } from '../../i18n/I18nContext';

interface ProductivityStudioProps {
  initialTab?: 'scratchpad' | 'matrix' | 'checklist';
}

interface MatrixTask {
  id: string;
  text: string;
  quadrant: 'do' | 'schedule' | 'delegate' | 'eliminate';
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export const ProductivityStudio: React.FC<ProductivityStudioProps> = ({ initialTab = 'scratchpad' }) => {
  const [activeTab, setActiveTab] = useState<'scratchpad' | 'matrix' | 'checklist'>(initialTab);
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  // --- 1. Scratchpad State ---
  const [scratchpadNote, setScratchpadNote] = useState<string>(() => {
    return safeStorage.getItem('toolnova_scratchpad') || '### Project Quick Notes\n- All notes are auto-saved directly to your local browser storage.\n- No data is ever transmitted to remote servers.';
  });

  useEffect(() => {
    safeStorage.setItem('toolnova_scratchpad', scratchpadNote);
  }, [scratchpadNote]);

  const wordCount = scratchpadNote.trim() ? scratchpadNote.trim().split(/\s+/).length : 0;
  const charCount = scratchpadNote.length;

  const downloadNote = () => {
    const blob = new Blob([scratchpadNote], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `toolnova-notes-${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // --- 2. Eisenhower Matrix State ---
  const [matrixTasks, setMatrixTasks] = useState<MatrixTask[]>(() => {
    return safeStorage.getJSON<MatrixTask[]>('toolnova_matrix_tasks', [
      { id: '1', text: 'Prepare weekly executive summary', quadrant: 'do' },
      { id: '2', text: 'Plan quarterly roadmap priorities', quadrant: 'schedule' },
      { id: '3', text: 'Respond to generic vendor inquiries', quadrant: 'delegate' },
      { id: '4', text: 'Audit deprecated slack channels', quadrant: 'eliminate' },
    ]);
  });

  const [newTaskText, setNewTaskText] = useState('');
  const [targetQuadrant, setTargetQuadrant] = useState<'do' | 'schedule' | 'delegate' | 'eliminate'>('do');

  const addMatrixTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const updated = [...matrixTasks, { id: String(Date.now()), text: newTaskText.trim(), quadrant: targetQuadrant }];
    setMatrixTasks(updated);
    safeStorage.setJSON('toolnova_matrix_tasks', updated);
    setNewTaskText('');
  };

  const removeMatrixTask = (id: string) => {
    const updated = matrixTasks.filter(t => t.id !== id);
    setMatrixTasks(updated);
    safeStorage.setJSON('toolnova_matrix_tasks', updated);
  };

  // --- 3. Quick Checklist State ---
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(() => {
    return safeStorage.getJSON<ChecklistItem[]>('toolnova_checklist', [
      { id: '1', text: 'Verify document canonical tags and metadata', completed: true },
      { id: '2', text: 'Inspect client-side performance and latency', completed: false },
      { id: '3', text: 'Export production build verification report', completed: false },
    ]);
  });

  const [newChecklistText, setNewChecklistText] = useState('');

  const addChecklistItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistText.trim()) return;
    const updated = [...checklistItems, { id: String(Date.now()), text: newChecklistText.trim(), completed: false }];
    setChecklistItems(updated);
    safeStorage.setJSON('toolnova_checklist', updated);
    setNewChecklistText('');
  };

  const toggleChecklist = (id: string) => {
    const updated = checklistItems.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
    setChecklistItems(updated);
    safeStorage.setJSON('toolnova_checklist', updated);
  };

  const removeChecklistItem = (id: string) => {
    const updated = checklistItems.filter(item => item.id !== id);
    setChecklistItems(updated);
    safeStorage.setJSON('toolnova_checklist', updated);
  };

  const completedCount = checklistItems.filter(i => i.completed).length;
  const progressPercent = checklistItems.length > 0 ? Math.round((completedCount / checklistItems.length) * 100) : 0;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('scratchpad')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'scratchpad'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Private Local Scratchpad
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'matrix'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Eisenhower Decision Matrix
        </button>
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'checklist'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Interactive Daily Checklist
        </button>
      </div>

      {/* 1. Scratchpad */}
      {activeTab === 'scratchpad' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Auto-saving in local browser storage</span>
            <span>{wordCount} words | {charCount} characters</span>
          </div>

          <textarea
            rows={12}
            value={scratchpadNote}
            onChange={(e) => setScratchpadNote(e.target.value)}
            placeholder="Type your private thoughts, code snippets, or notes..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 leading-relaxed shadow-inner"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText(scratchpadNote);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t('copied') : t('copy')}</span>
            </button>
            <button
              onClick={downloadNote}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export as Markdown</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Eisenhower Matrix */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <form onSubmit={addMatrixTask} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <select
              value={targetQuadrant}
              onChange={(e) => setTargetQuadrant(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="do">Do First (Urgent & Important)</option>
              <option value="schedule">Schedule (Not Urgent, Important)</option>
              <option value="delegate">Delegate (Urgent, Not Important)</option>
              <option value="eliminate">Eliminate (Not Urgent, Not Important)</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </form>

          {/* 4 Quadrants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quadrant 1 */}
            <div className="bg-slate-950/60 border border-red-500/30 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider">1. Do First</h4>
                <span className="text-[10px] text-slate-500">Urgent & Important</span>
              </div>
              <ul className="space-y-2">
                {matrixTasks.filter(t => t.quadrant === 'do').map(task => (
                  <li key={task.id} className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-xl text-xs text-slate-200">
                    <span>{task.text}</span>
                    <button onClick={() => removeMatrixTask(task.id)} className="text-slate-500 hover:text-red-400 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quadrant 2 */}
            <div className="bg-slate-950/60 border border-blue-500/30 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">2. Schedule</h4>
                <span className="text-[10px] text-slate-500">Not Urgent, Important</span>
              </div>
              <ul className="space-y-2">
                {matrixTasks.filter(t => t.quadrant === 'schedule').map(task => (
                  <li key={task.id} className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-xl text-xs text-slate-200">
                    <span>{task.text}</span>
                    <button onClick={() => removeMatrixTask(task.id)} className="text-slate-500 hover:text-red-400 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quadrant 3 */}
            <div className="bg-slate-950/60 border border-amber-500/30 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">3. Delegate</h4>
                <span className="text-[10px] text-slate-500">Urgent, Not Important</span>
              </div>
              <ul className="space-y-2">
                {matrixTasks.filter(t => t.quadrant === 'delegate').map(task => (
                  <li key={task.id} className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-xl text-xs text-slate-200">
                    <span>{task.text}</span>
                    <button onClick={() => removeMatrixTask(task.id)} className="text-slate-500 hover:text-red-400 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quadrant 4 */}
            <div className="bg-slate-950/60 border border-slate-700/60 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">4. Eliminate</h4>
                <span className="text-[10px] text-slate-500">Not Urgent & Not Important</span>
              </div>
              <ul className="space-y-2">
                {matrixTasks.filter(t => t.quadrant === 'eliminate').map(task => (
                  <li key={task.id} className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-xl text-xs text-slate-200">
                    <span className="line-through text-slate-500">{task.text}</span>
                    <button onClick={() => removeMatrixTask(task.id)} className="text-slate-500 hover:text-red-400 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 3. Daily Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Overall Progress</span>
              <span className="font-semibold text-cyan-400">{completedCount} of {checklistItems.length} ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <form onSubmit={addChecklistItem} className="flex gap-2">
            <input
              type="text"
              value={newChecklistText}
              onChange={(e) => setNewChecklistText(e.target.value)}
              placeholder="Add checklist item..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </form>

          <ul className="space-y-2">
            {checklistItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl transition-all hover:border-slate-700"
              >
                <div
                  onClick={() => toggleChecklist(item.id)}
                  className="flex items-center gap-3 flex-1 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => {}}
                    className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                  />
                  <span className={`text-xs ${item.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {item.text}
                  </span>
                </div>
                <button
                  onClick={() => removeChecklistItem(item.id)}
                  className="text-slate-500 hover:text-red-400 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
