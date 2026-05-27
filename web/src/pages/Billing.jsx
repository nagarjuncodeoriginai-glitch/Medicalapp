import React, { useState } from 'react';
import { FiPlus, FiX, FiPrinter, FiTrash2, FiRepeat, FiShield, FiTrendingUp, FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';

const bills = [
  { id: '1', inv: 'INV-001', patient: 'Ramesh Gupta', amount: 5800, status: 'paid', type: 'Retainer', date: '15 Jan' },
  { id: '2', inv: 'INV-002', patient: 'Savitri Devi', amount: 5000, status: 'paid', type: 'Retainer', date: '14 Jan' },
  { id: '3', inv: 'INV-003', patient: 'Mohan Lal', amount: 3150, status: 'partial', type: 'Visit', date: '13 Jan' },
  { id: '4', inv: 'INV-004', patient: 'Kamla Bai', amount: 800, status: 'pending', type: 'Insurance', date: '12 Jan' },
  { id: '5', inv: 'INV-005', patient: 'Padma Sharma', amount: 7000, status: 'paid', type: 'Retainer', date: '10 Jan' },
];

const statusBadge = { paid: 'badge-green', partial: 'badge-amber', pending: 'badge-red' };
const typeBadge = { Retainer: 'badge-purple', Visit: 'badge-blue', Insurance: 'badge-green' };

export default function Billing() {
  const [showAdd, setShowAdd] = useState(false);
  const [items, setItems] = useState([{ desc: '', amount: '' }]);
  const total = items.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h1 className="page-title">Billing & Revenue</h1><p className="page-subtitle">AI Revenue Optimization + Payment Prediction</p></div>
        <button onClick={() => setShowAdd(true)} className="btn-primary text-xs py-2"><FiPlus className="text-xs" /> Create Invoice</button>
      </div>

      {/* AI Forecast */}
      <div className="ai-glow flex items-center gap-3">
        <FiZap className="relative z-10 text-purple-400" />
        <p className="relative z-10 text-sm text-gray-300"><span className="font-semibold text-white">AI Forecast:</span> Revenue projected <span className="text-emerald-400 font-bold">₹3.2L</span> next month (+12%) based on 4 new retainers + pending insurance</p>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger">
        {[
          { icon: FiTrendingUp, label: 'Today', value: '₹12,800', color: '#10b981' },
          { icon: FiRepeat, label: 'Retainers/mo', value: '₹1,70,000', color: '#6d28d9' },
          { icon: FiShield, label: 'Insurance', value: '₹4,20,000', color: '#3b82f6' },
          { icon: FiTrendingUp, label: 'Pending', value: '₹4,950', color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}12` }}>
                <s.icon style={{ color: s.color }} className="text-sm" />
              </div>
              <span className="text-[10px] text-gray-500">{s.label}</span>
            </div>
            <p className="text-lg font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="card-flat">
        <h3 className="section-title flex items-center gap-2 mb-4"><FiTrendingUp className="text-purple-400" /> 6-Month Revenue Trend</h3>
        <div className="flex items-end gap-2 h-32">
          {[{ m: 'Aug', v: 180 }, { m: 'Sep', v: 210 }, { m: 'Oct', v: 195 }, { m: 'Nov', v: 240 }, { m: 'Dec', v: 265 }, { m: 'Jan', v: 285 }].map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="w-full rounded-lg transition-all duration-500 group-hover:opacity-100 opacity-70 relative overflow-hidden" style={{ height: `${(d.v / 300) * 100}%` }}>
                <div className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(180deg, #6d28d9, #4f46e5)' }} />
              </div>
              <span className="text-[9px] text-gray-500">{d.m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className="card-flat overflow-hidden p-0">
        <div className="px-5 py-3 border-b border-white/[0.04]">
          <h3 className="section-title">Recent Transactions</h3>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {bills.map(b => (
            <div key={b.id} className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.02] transition-colors">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-purple-500/10 border border-purple-500/10 flex-shrink-0">
                <span className="text-[10px] font-bold text-purple-400">₹</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/80">{b.patient}</p>
                <p className="text-[10px] text-gray-500">{b.inv} · {b.date}</p>
              </div>
              <span className={`badge ${typeBadge[b.type]} text-[8px]`}>{b.type}</span>
              <p className="text-sm font-bold text-white/85 w-20 text-right">₹{b.amount.toLocaleString()}</p>
              <span className={`badge ${statusBadge[b.status]} text-[8px]`}>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</span>
              <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:bg-white/10"><FiPrinter className="text-[10px]" /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="rounded-2xl w-full max-w-md p-6 animate-scale" style={{ background: '#12101f', border: '1px solid rgba(109,40,217,0.12)' }}>
            <div className="flex items-center justify-between mb-5"><h2 className="text-base font-bold text-white">Create Invoice</h2><button onClick={() => setShowAdd(false)} className="p-2 rounded-lg hover:bg-white/5 text-gray-500"><FiX /></button></div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Invoice created! AI updating forecast.'); setShowAdd(false); }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Patient</label><select className="input-field"><option>Select...</option><option>Ramesh Gupta</option><option>Savitri Devi</option></select></div>
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Type</label><select className="input-field"><option>Monthly Retainer</option><option>Clinic Visit</option><option>Home Visit</option><option>Insurance</option></select></div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5"><label className="text-[10px] font-semibold text-gray-300">Items</label><button type="button" onClick={() => setItems([...items, { desc: '', amount: '' }])} className="text-[10px] text-purple-400 font-medium">+ Add</button></div>
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input className="input-field flex-1" placeholder="Description" value={item.desc} onChange={(e) => { const n=[...items]; n[idx].desc=e.target.value; setItems(n); }} />
                    <input className="input-field w-24" placeholder="₹ Amt" type="number" value={item.amount} onChange={(e) => { const n=[...items]; n[idx].amount=e.target.value; setItems(n); }} />
                    {items.length > 1 && <button type="button" onClick={() => setItems(items.filter((_,i)=>i!==idx))} className="w-9 h-9 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400"><FiTrash2 className="text-xs" /></button>}
                  </div>
                ))}
                <p className="text-right text-sm font-bold text-white mt-2">Total: ₹{total.toLocaleString()}</p>
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center text-xs">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center text-xs">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
