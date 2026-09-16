import React from 'react';
import { Copy } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';

export const FeeTable = () => {
  const { feeRecords, copyToClipboard } = useApp();

  return (
    <div id="dashboard-fee-section" className="space-y-3">
      <h3 className="text-lg font-bold tracking-normal">
        Fee
      </h3>

      <div className="border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left  border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-4 px-2 text-sm font-normal">
                  Month
                </th>
                <th className="py-4 px-2 text-sm font-normal">
                  Amount
                </th>
                <th className="py-4 px-2 text-sm font-normal">
                  Type
                </th>
                <th className="py-4 px-2 text-sm font-normal">
                  Due date
                </th>
                <th className="py-4 px-2 text-sm font-normal">
                  Voucher ID
                </th>
                <th className="py-4 px-2 text-sm font-normal">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {feeRecords.slice(0, 1).map((record) => (
                <tr
                  key={record.id}
                  className="transition-colors"
                >
                  <td className="py-4 px-2 text-sm font-semibold whitespace-nowrap">
                    {record.month}
                  </td>
                  <td className="py-4 px-2 text-sm font-semibold whitespace-nowrap">
                    {record.amount}
                  </td>
                  <td className="py-4 px-2 text-sm font-semibold whitespace-nowrap">
                    {record.type}
                  </td>
                  <td className="py-4 px-2 text-sm font-semibold whitespace-nowrap">
                    {record.dueDate}
                  </td>
                  <td className="py-4 px-2 text-sm font-semibold whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>{record.voucherId}</span>
                      <button
                        id="copy-voucher-btn"
                        onClick={() => copyToClipboard(record.voucherId, 'Voucher ID')}
                        className="p-1 rounded-md border transition-colors"
                        title="Copy Voucher ID"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-2 whitespace-nowrap">
                    <StatusBadge status={record.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
