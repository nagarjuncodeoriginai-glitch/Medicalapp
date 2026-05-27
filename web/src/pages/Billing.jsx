import React, { useState } from 'react';
import { FiPlus, FiX, FiPrinter, FiTrash2, FiRepeat, FiShield, FiTrendingUp } from 'react-icons/fi';
import toast from 'react-hot-toast';

const bills = [
  { _id: '1', invoice: 'INV-00001', patient: 'Ramesh Gupta', items: 'Monthly Retainer + Blood Test', amount: 5800, paid: 5800, status: 'paid', method: 'UPI', type: 'Retainer', date: '15 Jan 2024' },
  { _id: '2', invoice: 'INV-00002', patient: 'Savitri Devi', items: 'Monthly Retainer - January', amount: 5000, paid: 5000, status: 'paid', method: 'Cash', type: 'Retainer', date: '14 Jan 2024' },
  { _id: '3', invoice: 'INV-00003', patient: 'Mohan Lal', items: 'Home Visit + ECG + Medicines', amount: 3150, paid: 1500, status: 'partial', method: 'Card', type: 'Visit', date: '13 Jan 2024' },
  { _id: '4', invoice: 'INV-00004', patient: 'Kamla Bai', items: 'Insurance Consultation + Reports', amount: 800, paid: 0, status: 'pending', method: '-', type: 'Insurance', date: '12 Jan 2024' },
  { _id: '5', invoice: 'INV-00005', patient: 'Padma Sharma', items: 'Monthly Retainer + Physiotherapy x4', amount: 7000, paid: 7000, status: 'paid', method: 'Online', type: 'Retainer', date: '10 Jan 2024' },
];

export default function Billing() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [items, setItems] = useState([{ desc: '', amount: '' }]);
  const total = items.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);

  const statusBadge = { paid: 'badge-green', partial: 'badge-amber', pending: 'badge-red' };
  const typeBadge = { Retainer: 'badge-purple', Visit: 'badge-blue', Insurance: 'badge-green' };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h1 className="page-title">Billing & Retainers</h1><p className="page-subtitle">Invoices, retainer plans, and insurance claims</p></div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-1.5"><FiPlus className="text-sm" /> Create Invoice</button>
      </div>

      {/* Revenue */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card"><div className="flex items-center gap-2 mb-1"><FiTrendingUp className="text-emerald-500" /><span className="text-xs text-slate-500">Today</span></div><p className="text-xl font-bold text-slate-900">₹12,800</p></div>
        <div className="stat-card"><div className="flex items-center gap-2 mb-1"><FiRepeat className="text-indigo-500" /><span className="text-xs text-slate-500">Monthly Retainers</span></div><p className="text-xl font-bold text-slate-900">₹1,70,000</p></div>
        <div className="stat-card"><div className="flex items-center gap-2 mb-1"><FiShield className="text-emerald-500" /><span className="text-xs text-slate-500">Insurance Claims</span></div><p className="text-xl font-bold text-slate-900">₹4,20,000</p></div>
        <div className="stat-card"><div className="flex items-center gap-2 mb-1"><FiTrendingUp className="text-amber-500" /><span className="text-xs text-slate-500">Pending</span></div><p className="text-xl font-bold text-amber-600">₹4,950</p></div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr><th className="table-header">Invoice</th><th className="table-header">Patient</th><th className="table-header">Type</th><th className="table-header">Amount</th><th className="table-header">Status</th><th className="table-header">Action</th></tr>
          </thead>
          <tbody>
            {bills.map(b => (
              <tr key={b._id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="table-cell"><p className="text-sm font-medium text-slate-800">{b.invoice}</p><p className="text-[10px] text-slate-400">{b.date}</p></td>
                <td className="table-cell text-sm text-slate-700">{b.patient}</td>
                <td className="table-cell"><span className={`badge ${typeBadge[b.type]}`}>{b.type}</span></td>
                <td className="table-cell"><p className="text-sm font-semibold text-slate-800">₹{b.amount.toLocaleString()}</p>{b.status === 'partial' && <p className="text-[10px] text-amber-600">Paid: ₹{b.paid.toLocaleString()}</p>}</td>
                <td className="table-cell"><span className={`badge ${statusBadge[b.status]}`}>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</span></td>
                <td className="table-cell"><div className="flex gap-1.5">
                  <button className="p-1.5 rounded bg-slate-50 text-slate-600 hover:bg-slate-100"><FiPrinter className="text-xs" /></button>
                  {b.status !== 'paid' && <button onClick={() => toast.success('Marked paid!')} className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-medium hover:bg-emerald-100">Mark Paid</button>}
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl animate-in">
            <div className="flex items-center justify-between mb-5"><h2 className="text-lg font-semibold text-slate-900">Create Invoice</h2><button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-slate-100 rounded-lg"><FiX className="text-lg text-slate-500" /></button></div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Invoice created!'); setShowAddModal(false); }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Patient</label><select className="input-field"><option>Select...</option><option>Ramesh Gupta</option><option>Savitri Devi</option></select></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Type</label><select className="input-field"><option>Monthly Retainer</option><option>Clinic Visit</option><option>Home Visit</option><option>Insurance Claim</option></select></div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5"><label className="text-xs font-semibold text-slate-700">Items</label><button type="button" onClick={() => setItems([...items, { desc: '', amount: '' }])} className="text-xs text-indigo-600 font-medium">+ Add</button></div>
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-1.5">
                    <input className="input-field flex-1" placeholder="Description" value={item.desc} onChange={(e) => { const n = [...items]; n[idx].desc = e.target.value; setItems(n); }} />
                    <input className="input-field w-24" placeholder="₹ Amount" type="number" value={item.amount} onChange={(e) => { const n = [...items]; n[idx].amount = e.target.value; setItems(n); }} />
                    {items.length > 1 && <button type="button" onClick={() => setItems(items.filter((_, i) => i !== idx))} className="p-1.5 text-red-500"><FiTrash2 className="text-sm" /></button>}
                  </div>
                ))}
                <p className="text-right text-sm font-bold text-slate-800 mt-2">Total: ₹{total.toLocaleString()}</p>
              </div>
              <div><label className="text-xs font-medium text-slate-600 mb-1 block">Payment Method</label><select className="input-field"><option>Cash</option><option>UPI</option><option>Card</option><option>Online</option><option>Insurance</option></select></div>
              <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary flex-1">Cancel</button><button type="submit" className="btn-primary flex-1">Create Invoice</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
