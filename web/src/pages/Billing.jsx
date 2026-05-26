import React, { useState } from 'react';
import { FiPlus, FiDollarSign, FiX, FiPrinter, FiTrash2 } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import toast from 'react-hot-toast';

const demoBills = [
  { _id: '1', invoiceNo: 'INV-00001', patientId: { name: 'Rahul Sharma', patientId: 'PAT-0001' }, items: [{ description: 'Consultation Fee', amount: 500 }, { description: 'Blood Test', amount: 800 }], totalAmount: 1300, paidAmount: 1300, paymentStatus: 'paid', paymentMethod: 'upi', createdAt: '2024-01-15' },
  { _id: '2', invoiceNo: 'INV-00002', patientId: { name: 'Priya Patel', patientId: 'PAT-0002' }, items: [{ description: 'Follow-up', amount: 300 }], totalAmount: 300, paidAmount: 300, paymentStatus: 'paid', paymentMethod: 'cash', createdAt: '2024-01-14' },
  { _id: '3', invoiceNo: 'INV-00003', patientId: { name: 'Amit Kumar', patientId: 'PAT-0003' }, items: [{ description: 'Consultation', amount: 500 }, { description: 'X-Ray', amount: 1200 }, { description: 'Medicines', amount: 450 }], totalAmount: 2150, paidAmount: 1000, paymentStatus: 'partial', paymentMethod: 'card', createdAt: '2024-01-13' },
  { _id: '4', invoiceNo: 'INV-00004', patientId: { name: 'Sneha Gupta', patientId: 'PAT-0004' }, items: [{ description: 'Dental Cleaning', amount: 2000 }], totalAmount: 2000, paidAmount: 0, paymentStatus: 'pending', paymentMethod: 'cash', createdAt: '2024-01-12' },
];

export default function Billing() {
  const [bills] = useState(demoBills);
  const [showAddModal, setShowAddModal] = useState(false);
  const [items, setItems] = useState([{ description: '', amount: '' }]);

  const statusStyles = {
    paid: 'bg-emerald-100 text-emerald-700',
    partial: 'bg-yellow-100 text-yellow-700',
    pending: 'bg-red-100 text-red-700',
  };

  const addItem = () => setItems([...items, { description: '', amount: '' }]);
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));
  const totalAmount = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
          <p className="text-gray-500 mt-1">Manage invoices and payments</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <FiPlus /> Create Invoice
        </button>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white">
          <p className="text-emerald-100 text-sm">Today's Collection</p>
          <p className="text-3xl font-bold mt-1">&#8377;4,100</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
          <p className="text-blue-100 text-sm">This Month</p>
          <p className="text-3xl font-bold mt-1">&#8377;85,000</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-5 text-white">
          <p className="text-orange-100 text-sm">Pending Amount</p>
          <p className="text-3xl font-bold mt-1">&#8377;3,150</p>
        </div>
      </div>

      {/* Bills Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Invoice</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Patient</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Items</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bills.map(bill => (
                <tr key={bill._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-gray-900">{bill.invoiceNo}</p>
                    <p className="text-xs text-gray-500">{bill.createdAt}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">{bill.patientId.name}</p>
                    <p className="text-xs text-gray-500">{bill.patientId.patientId}</p>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {bill.items.map(i => i.description).join(', ')}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-gray-900">&#8377;{bill.totalAmount.toLocaleString()}</p>
                    {bill.paymentStatus === 'partial' && (
                      <p className="text-xs text-yellow-600">Paid: &#8377;{bill.paidAmount.toLocaleString()}</p>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[bill.paymentStatus]}`}>
                      {bill.paymentStatus.charAt(0).toUpperCase() + bill.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="p-2 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100"><FiPrinter className="text-sm" /></button>
                      {bill.paymentStatus !== 'paid' && (
                        <button onClick={() => toast.success('Marked as paid!')} className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg hover:bg-emerald-100">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Create Invoice</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><FiX className="text-xl" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Invoice created!'); setShowAddModal(false); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                <select className="input-field"><option>Select patient...</option><option>Rahul Sharma</option><option>Priya Patel</option></select>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Items</label>
                  <button type="button" onClick={addItem} className="text-xs text-blue-600 font-medium">+ Add Item</button>
                </div>
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center">
                    <input className="input-field flex-1 py-2" placeholder="Description" value={item.description} onChange={(e) => { const n = [...items]; n[idx].description = e.target.value; setItems(n); }} />
                    <input className="input-field w-28 py-2" placeholder="Amount" type="number" value={item.amount} onChange={(e) => { const n = [...items]; n[idx].amount = e.target.value; setItems(n); }} />
                    {items.length > 1 && <button type="button" onClick={() => removeItem(idx)} className="p-2 text-red-500"><FiTrash2 /></button>}
                  </div>
                ))}
                <div className="text-right font-bold text-lg text-gray-900 mt-2">Total: &#8377;{totalAmount.toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select className="input-field"><option value="cash">Cash</option><option value="upi">UPI</option><option value="card">Card</option><option value="online">Online</option></select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                  <input type="number" className="input-field" placeholder="0" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">Create Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
