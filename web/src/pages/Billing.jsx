import React, { useState } from 'react';
import { FiPlus, FiX, FiPrinter, FiTrash2, FiRepeat, FiShield, FiTrendingUp } from 'react-icons/fi';
import toast from 'react-hot-toast';

const demoBills = [
  { _id: '1', invoiceNo: 'INV-00001', patientId: { name: 'Ramesh Gupta', patientId: 'PAT-0001' }, items: [{ description: 'Monthly Retainer - Jan', amount: 5000 }, { description: 'Blood Test', amount: 800 }], totalAmount: 5800, paidAmount: 5800, paymentStatus: 'paid', paymentMethod: 'upi', type: 'retainer', createdAt: '2024-01-15' },
  { _id: '2', invoiceNo: 'INV-00002', patientId: { name: 'Savitri Devi', patientId: 'PAT-0002' }, items: [{ description: 'Monthly Retainer - Jan', amount: 5000 }], totalAmount: 5000, paidAmount: 5000, paymentStatus: 'paid', paymentMethod: 'cash', type: 'retainer', createdAt: '2024-01-14' },
  { _id: '3', invoiceNo: 'INV-00003', patientId: { name: 'Mohan Lal', patientId: 'PAT-0003' }, items: [{ description: 'Home Visit', amount: 1500 }, { description: 'ECG', amount: 1200 }, { description: 'Medicines', amount: 450 }], totalAmount: 3150, paidAmount: 1500, paymentStatus: 'partial', paymentMethod: 'card', type: 'visit', createdAt: '2024-01-13' },
  { _id: '4', invoiceNo: 'INV-00004', patientId: { name: 'Kamla Bai', patientId: 'PAT-0004' }, items: [{ description: 'Insurance Consultation', amount: 500 }, { description: 'Reports Preparation', amount: 300 }], totalAmount: 800, paidAmount: 0, paymentStatus: 'pending', paymentMethod: '-', type: 'insurance', createdAt: '2024-01-12' },
  { _id: '5', invoiceNo: 'INV-00005', patientId: { name: 'Padma Sharma', patientId: 'PAT-0006' }, items: [{ description: 'Monthly Retainer - Jan', amount: 5000 }, { description: 'Physiotherapy x4', amount: 2000 }], totalAmount: 7000, paidAmount: 7000, paymentStatus: 'paid', paymentMethod: 'online', type: 'retainer', createdAt: '2024-01-10' },
];

export default function Billing() {
  const [bills] = useState(demoBills);
  const [showAddModal, setShowAddModal] = useState(false);
  const [items, setItems] = useState([{ description: '', amount: '' }]);

  const statusStyles = {
    paid: 'bg-emerald-500/20 text-emerald-400',
    partial: 'bg-amber-500/20 text-amber-400',
    pending: 'bg-rose-500/20 text-rose-400',
  };

  const typeStyles = {
    retainer: 'bg-violet-500/20 text-violet-400 border-violet-500/20',
    visit: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
    insurance: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20',
  };

  const addItem = () => setItems([...items, { description: '', amount: '' }]);
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));
  const totalAmount = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  return (
    <div className="animate-fade-in-up space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Billing & Retainers</h1>
          <p className="text-white/50 mt-1 text-sm">Invoices, retainer plans & insurance claims</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2 text-sm py-2.5">
          <FiPlus /> Create Invoice
        </button>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border-emerald-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/30 flex items-center justify-center">
              <FiTrendingUp className="text-emerald-400" />
            </div>
            <p className="text-xs text-white/40">Today</p>
          </div>
          <p className="text-2xl font-bold text-white">₹12,800</p>
        </div>
        <div className="glass-card rounded-2xl p-5 border-blue-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center">
              <FiRepeat className="text-blue-400" />
            </div>
            <p className="text-xs text-white/40">Monthly Retainers</p>
          </div>
          <p className="text-2xl font-bold text-white">₹1,70,000</p>
        </div>
        <div className="glass-card rounded-2xl p-5 border-violet-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/30 to-indigo-500/30 flex items-center justify-center">
              <FiShield className="text-violet-400" />
            </div>
            <p className="text-xs text-white/40">Insurance Claims</p>
          </div>
          <p className="text-2xl font-bold text-white">₹4,20,000</p>
        </div>
        <div className="glass-card rounded-2xl p-5 border-amber-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center">
              <FiTrendingUp className="text-amber-400" />
            </div>
            <p className="text-xs text-white/40">Pending</p>
          </div>
          <p className="text-2xl font-bold text-amber-400">₹4,950</p>
        </div>
      </div>

      {/* Bills Table */}
      <div className="glass-card rounded-2xl p-5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-4 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Invoice</th>
                <th className="text-left py-3 px-4 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Patient</th>
                <th className="text-left py-3 px-4 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-4 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 px-4 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bills.map(bill => (
                <tr key={bill._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-white text-sm">{bill.invoiceNo}</p>
                    <p className="text-[10px] text-white/30">{bill.createdAt}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-white text-sm">{bill.patientId.name}</p>
                    <p className="text-[10px] text-white/30">{bill.patientId.patientId}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] px-2 py-1 rounded-lg border font-medium ${typeStyles[bill.type]}`}>
                      {bill.type.charAt(0).toUpperCase() + bill.type.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-white text-sm">₹{bill.totalAmount.toLocaleString()}</p>
                    {bill.paymentStatus === 'partial' && (
                      <p className="text-[10px] text-amber-400">Paid: ₹{bill.paidAmount.toLocaleString()}</p>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-medium ${statusStyles[bill.paymentStatus]}`}>
                      {bill.paymentStatus.charAt(0).toUpperCase() + bill.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1.5">
                      <button className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"><FiPrinter className="text-xs" /></button>
                      {bill.paymentStatus !== 'paid' && (
                        <button onClick={() => toast.success('Marked as paid!')} className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-1.5 rounded-lg hover:bg-emerald-500/30 transition-colors font-medium">
                          Mark Paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl w-full max-w-lg p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Create Invoice</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/10 rounded-lg text-white/60"><FiX className="text-xl" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Invoice created!'); setShowAddModal(false); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Patient</label>
                  <select className="input-field py-3"><option className="bg-[#1a1744]">Select patient...</option><option className="bg-[#1a1744]">Ramesh Gupta</option><option className="bg-[#1a1744]">Savitri Devi</option></select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Type</label>
                  <select className="input-field py-3">
                    <option className="bg-[#1a1744]" value="retainer">Monthly Retainer</option>
                    <option className="bg-[#1a1744]" value="visit">Clinic/Home Visit</option>
                    <option className="bg-[#1a1744]" value="insurance">Insurance Claim</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Items</label>
                  <button type="button" onClick={addItem} className="text-xs text-violet-400 font-medium">+ Add Item</button>
                </div>
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center">
                    <input className="input-field flex-1 py-2.5" placeholder="Description" value={item.description} onChange={(e) => { const n = [...items]; n[idx].description = e.target.value; setItems(n); }} />
                    <input className="input-field w-28 py-2.5" placeholder="₹ Amount" type="number" value={item.amount} onChange={(e) => { const n = [...items]; n[idx].amount = e.target.value; setItems(n); }} />
                    {items.length > 1 && <button type="button" onClick={() => removeItem(idx)} className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg"><FiTrash2 className="text-sm" /></button>}
                  </div>
                ))}
                <div className="text-right mt-3 pt-3 border-t border-white/10">
                  <span className="text-white/40 text-sm">Total: </span>
                  <span className="text-xl font-bold text-white">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Payment Method</label>
                  <select className="input-field py-3"><option className="bg-[#1a1744]">Cash</option><option className="bg-[#1a1744]">UPI</option><option className="bg-[#1a1744]">Card</option><option className="bg-[#1a1744]">Online</option><option className="bg-[#1a1744]">Insurance</option></select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Discount</label>
                  <input type="number" className="input-field py-3" placeholder="₹ 0" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-glass flex-1 text-sm">Cancel</button>
                <button type="submit" className="btn-primary flex-1 text-sm">Create Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
