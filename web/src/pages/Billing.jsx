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

export default function Billing() {
  const [showAdd, setShowAdd] = useState(false);
  const [items, setItems] = useState([{ desc: '', amount: '' }]);
  const total = items.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);
  const statusBadge = { paid: 'badge-green', partial: 'badge-amber', pending: 'badge-red' };
  const typeBadge = { Retainer: 'badge-purple', Visit: 'badge-blue', Insurance: 'badge-green' };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h1 className="page-title">Billing & Revenue</h1><p className="page-subtitle">AI predicts revenue and optimises collection</p></div>
        <button onClick={() => setShowAdd(true)} className="btn-primary"><FiPlus className="text-sm" /> Create Invoice</button>
      </div>

      {/* AI */}
      <div className="ai-glow p-4 flex items-center gap-3">
        <FiZap className="text-indigo-600 flex-shrink-0" />
        <p className="text-sm text-gray-700"><span className="font-semibold">AI Forecast:</span> Revenue projected <span className="text-emerald-600 font-bold">₹3,20,000</span> next month (+12% growth)</p>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: FiTrendingUp, label: 'Today', value: '₹12,800', color: '#059669', bg: '#ecfdf5' },
          { icon: FiRepeat, label: 'Retainers', value: '₹1,70,000', color: '#7c3aed', bg: '#f5f3ff' },
          { icon: FiShield, label: 'Insurance', value: '₹4,20,000', color: '#2563eb', bg: '#eff6ff' },
          { icon: FiTrendingUp, label: 'Pending', value: '₹4,950', color: '#d97706', bg: '#fffbeb' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: s.bg }}><s.icon style={{ color: s.color }} className="text-sm" /></div>
              <span className="text-[10px] text-gray-400">{s.label}</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card-flat overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr><th className="table-header">Invoice</th><th className="table-header">Patient</th><th className="table-header">Type</th><th className="table-header">Amount</th><th className="table-header">Status</th><th className="table-header">Action</th></tr>
          </thead>
          <tbody>
            {bills.map(b => (
              <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="table-cell"><p className="text-sm font-medium text-gray-800">{b.inv}</p><p className="text-[10px] text-gray-400">{b.date}</p></td>
                <td className="table-cell text-sm text-gray-700">{b.patient}</td>
                <td className="table-cell"><span className={`badge ${typeBadge[b.type]}`}>{b.type}</span></td>
                <td className="table-cell text-sm font-bold text-gray-800">₹{b.amount.toLocaleString()}</td>
                <td className="table-cell"><span className={`badge ${statusBadge[b.status]}`}>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</span></td>
                <td className="table-cell"><div className="flex gap-1.5">
                  <button className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100"><FiPrinter className="text-xs" /></button>
                  {b.status !== 'paid' && <button onClick={() => toast.success('Marked paid!')} className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg hover:bg-emerald-100">Pay</button>}
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-scale border border-gray-100">
            <div className="flex items-center justify-between mb-5"><h2 className="text-lg font-bold text-gray-900">Create Invoice</h2><button onClick={() => setShowAdd(false)} className="p-2 hover:bg-gray-100 rounded-lg"><FiX className="text-gray-400" /></button></div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Invoice created!'); setShowAdd(false); }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-gray-600 mb-1 block">Patient</label><select className="input-field"><option>Select...</option><option>Ramesh Gupta</option><option>Savitri Devi</option></select></div>
                <div><label className="text-xs font-medium text-gray-600 mb-1 block">Type</label><select className="input-field"><option>Monthly Retainer</option><option>Clinic Visit</option><option>Home Visit</option><option>Insurance</option></select></div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2"><label className="text-xs font-semibold text-gray-700">Items</label><button type="button" onClick={() => setItems([...items, { desc: '', amount: '' }])} className="text-xs text-indigo-600 font-medium">+ Add</button></div>
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2"><input className="input-field flex-1" placeholder="Description" value={item.desc} onChange={(e) => { const n=[...items]; n[idx].desc=e.target.value; setItems(n); }} /><input className="input-field w-24" placeholder="₹ Amt" type="number" value={item.amount} onChange={(e) => { const n=[...items]; n[idx].amount=e.target.value; setItems(n); }} />{items.length > 1 && <button type="button" onClick={() => setItems(items.filter((_,i)=>i!==idx))} className="p-1.5 text-red-500"><FiTrash2 className="text-sm" /></button>}</div>
                ))}
                <p className="text-right text-sm font-bold text-gray-800 mt-2">Total: ₹{total.toLocaleString()}</p>
              </div>
              <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center">Cancel</button><button type="submit" className="btn-primary flex-1 justify-center">Create</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
