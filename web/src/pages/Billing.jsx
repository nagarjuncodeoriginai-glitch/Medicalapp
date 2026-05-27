import React, { useState } from 'react';
import { FiPlus, FiX, FiPrinter, FiTrash2, FiRepeat, FiShield, FiTrendingUp, FiZap, FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const bills = [
  { id: '1', inv: 'INV-001', patient: 'Ramesh Gupta', amount: 5800, paid: 5800, status: 'paid', method: 'UPI', type: 'Retainer', date: '15 Jan' },
  { id: '2', inv: 'INV-002', patient: 'Savitri Devi', amount: 5000, paid: 5000, status: 'paid', method: 'Cash', type: 'Retainer', date: '14 Jan' },
  { id: '3', inv: 'INV-003', patient: 'Mohan Lal', amount: 3150, paid: 1500, status: 'partial', method: 'Card', type: 'Visit', date: '13 Jan' },
  { id: '4', inv: 'INV-004', patient: 'Kamla Bai', amount: 800, paid: 0, status: 'pending', method: '-', type: 'Insurance', date: '12 Jan' },
  { id: '5', inv: 'INV-005', patient: 'Padma Sharma', amount: 7000, paid: 7000, status: 'paid', method: 'Online', type: 'Retainer', date: '10 Jan' },
];

const statusConfig = {
  paid: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', label: 'Paid' },
  partial: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', label: 'Partial' },
  pending: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)', label: 'Pending' },
};

const typeConfig = {
  Retainer: { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.2)' },
  Visit: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)' },
  Insurance: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)' },
};

// Revenue chart data (last 6 months)
const chartData = [
  { month: 'Aug', revenue: 180000, target: 200000 },
  { month: 'Sep', revenue: 210000, target: 220000 },
  { month: 'Oct', revenue: 195000, target: 230000 },
  { month: 'Nov', revenue: 240000, target: 240000 },
  { month: 'Dec', revenue: 265000, target: 250000 },
  { month: 'Jan', revenue: 285000, target: 260000 },
];
const maxRevenue = 300000;

export default function Billing() {
  const [showAdd, setShowAdd] = useState(false);
  const [items, setItems] = useState([{ desc: '', amount: '' }]);
  const total = items.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Billing & Revenue</h1>
          <p className="page-subtitle">AI predicts revenue trends and optimises collection</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary"><FiPlus className="text-sm" /> Create Invoice</button>
      </div>

      {/* AI Revenue Prediction */}
      <div className="ai-glow rounded-3xl p-5 flex items-center gap-4">
        <div className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
          <FiTrendingUp className="text-emerald-400 text-lg" />
        </div>
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="ai-badge">AI Forecast</span>
          </div>
          <p className="text-sm text-white/90 font-medium">Revenue projected to hit <span className="text-emerald-400 font-bold">₹3,20,000</span> next month (+12%)</p>
          <p className="text-xs text-white/40 mt-0.5">Based on 4 new retainer sign-ups, 3 pending insurance approvals, and seasonal patient volume increase.</p>
        </div>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: FiTrendingUp, label: 'Today', value: '₹12,800', trend: '+₹3,200', up: true, color: '#10b981', glow: 'rgba(16,185,129,0.15)' },
          { icon: FiRepeat, label: 'Retainers', value: '₹1,70,000', trend: '34 active', up: true, color: '#8b5cf6', glow: 'rgba(139,92,246,0.15)' },
          { icon: FiShield, label: 'Insurance', value: '₹4,20,000', trend: '18 approved', up: true, color: '#3b82f6', glow: 'rgba(59,130,246,0.15)' },
          { icon: FiArrowDownRight, label: 'Pending', value: '₹4,950', trend: '2 overdue', up: false, color: '#f59e0b', glow: 'rgba(245,158,11,0.15)' },
        ].map((s, i) => (
          <div key={i} className="stat-card group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500" style={{ background: s.glow, boxShadow: `0 8px 25px ${s.glow}` }}>
                <s.icon style={{ color: s.color }} />
              </div>
              <span className={`flex items-center gap-0.5 text-[10px] font-bold ${s.up ? 'text-emerald-400' : 'text-amber-400'}`}>
                {s.up ? <FiArrowUpRight className="text-[9px]" /> : <FiArrowDownRight className="text-[9px]" />} {s.trend}
              </span>
            </div>
            <p className="text-xl font-bold text-white">{s.value}</p>
            <p className="text-[10px] text-white/30 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="card-flat">
        <div className="flex items-center justify-between mb-5">
          <h3 className="section-title flex items-center gap-2"><FiTrendingUp className="text-indigo-400" /> Revenue Trend</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }} /><span className="text-[10px] text-white/40">Revenue</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-white/10 border border-white/20" /><span className="text-[10px] text-white/40">Target</span></div>
          </div>
        </div>
        {/* Visual Bar Chart */}
        <div className="flex items-end gap-3 h-44">
          {chartData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="w-full flex flex-col items-center gap-1 relative" style={{ height: '100%' }}>
                {/* Target line */}
                <div className="absolute w-full border-t border-dashed border-white/10" style={{ bottom: `${(d.target / maxRevenue) * 100}%` }} />
                {/* Revenue bar */}
                <div className="w-full rounded-xl mt-auto transition-all duration-700 group-hover:opacity-100 opacity-80 relative overflow-hidden" style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}>
                  <div className="absolute inset-0 rounded-xl animate-gradient" style={{ background: 'linear-gradient(180deg, #a855f7, #6366f1, #a855f7)', backgroundSize: '100% 200%' }} />
                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: 'inset 0 0 20px rgba(139,92,246,0.3)' }} />
                </div>
              </div>
              <span className="text-[10px] text-white/30 mt-2">{d.month}</span>
              <span className="text-[9px] font-bold text-white/50 opacity-0 group-hover:opacity-100 transition-opacity">₹{(d.revenue/1000).toFixed(0)}K</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Payment Methods Breakdown */}
        <div className="card">
          <h3 className="text-sm font-semibold text-white/80 mb-4">Payment Methods</h3>
          <div className="space-y-3">
            {[
              { method: 'UPI / Online', pct: 45, color: '#6366f1' },
              { method: 'Cash', pct: 30, color: '#10b981' },
              { method: 'Card', pct: 15, color: '#f59e0b' },
              { method: 'Insurance', pct: 10, color: '#3b82f6' },
            ].map((p, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-white/60">{p.method}</span>
                  <span className="text-[10px] font-bold" style={{ color: p.color }}>{p.pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${p.pct}%`, background: p.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions - Visual */}
        <div className="card lg:col-span-2">
          <h3 className="text-sm font-semibold text-white/80 mb-4">Recent Transactions</h3>
          <div className="space-y-2">
            {bills.map(b => {
              const sc = statusConfig[b.status];
              const tc = typeConfig[b.type];
              return (
                <div key={b.id} className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all group">
                  {/* Amount visual */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: tc.bg, border: `1px solid ${tc.border}` }}>
                    <span className="text-[10px] font-bold" style={{ color: tc.color }}>₹</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white/80 truncate">{b.patient}</p>
                      <span className="badge text-[8px]" style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>{b.type}</span>
                    </div>
                    <p className="text-[10px] text-white/30 mt-0.5">{b.inv} · {b.date} · {b.method}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-white/90">₹{b.amount.toLocaleString()}</p>
                    <span className="badge text-[8px]" style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>{sc.label}</span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10"><FiPrinter className="text-white/40 text-[10px]" /></button>
                    {b.status !== 'paid' && <button onClick={() => toast.success('Marked as paid!')} className="px-2 h-7 rounded-lg text-[9px] font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20">Pay</button>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md animate-scale">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Create Invoice</h2>
              <button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10"><FiX className="text-white/40" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Invoice created! AI updating revenue forecast.'); setShowAdd(false); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Patient</label><select className="input-field"><option>Select...</option><option>Ramesh Gupta</option><option>Savitri Devi</option><option>Mohan Lal</option></select></div>
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Type</label><select className="input-field"><option>Monthly Retainer</option><option>Clinic Visit</option><option>Home Visit</option><option>Insurance Claim</option></select></div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2"><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Items</label><button type="button" onClick={() => setItems([...items, { desc: '', amount: '' }])} className="text-xs text-indigo-400 font-medium">+ Add</button></div>
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input className="input-field flex-1" placeholder="Description" value={item.desc} onChange={(e) => { const n=[...items]; n[idx].desc=e.target.value; setItems(n); }} />
                    <input className="input-field w-28" placeholder="₹ Amount" type="number" value={item.amount} onChange={(e) => { const n=[...items]; n[idx].amount=e.target.value; setItems(n); }} />
                    {items.length > 1 && <button type="button" onClick={() => setItems(items.filter((_,i)=>i!==idx))} className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400"><FiTrash2 className="text-sm" /></button>}
                  </div>
                ))}
                <div className="text-right mt-3 pt-3 border-t border-white/[0.06]">
                  <span className="text-white/30 text-xs">Total: </span>
                  <span className="text-xl font-bold text-white">₹{total.toLocaleString()}</span>
                </div>
              </div>
              <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Payment Method</label><select className="input-field"><option>Cash</option><option>UPI</option><option>Card</option><option>Online</option><option>Insurance</option></select></div>
              <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center">Cancel</button><button type="submit" className="btn-primary flex-1 justify-center">Create Invoice</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
