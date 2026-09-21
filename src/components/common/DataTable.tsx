/**
 * CIVORA DataTable Component
 * High-density, institutional-grade table with column definitions, search, and pagination.
 */

import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Filter } from 'lucide-react';

export interface ColumnDef<T> {
  key: string;
  header: string;
  width?: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  id?: string;
  columns: ColumnDef<T>[];
  data: T[];
  searchKey?: string;
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  itemsPerPage?: number;
  emptyTitle?: string;
  emptySubtitle?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  id,
  columns,
  data,
  searchKey,
  searchPlaceholder = 'Search records...',
  onRowClick,
  itemsPerPage = 10,
  emptyTitle = 'No records found',
  emptySubtitle = 'Try adjusting your search query or filter criteria.',
  className = '',
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();
    return data.filter((item) => {
      if (searchKey && item[searchKey]) {
        return String(item[searchKey]).toLowerCase().includes(term);
      }
      // Otherwise search all string values
      return Object.values(item).some(
        (val) => typeof val === 'string' && val.toLowerCase().includes(term)
      );
    });
  }, [data, searchTerm, searchKey]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA === valB) return 0;
      if (valA == null) return 1;
      if (valB == null) return -1;
      const compare = valA > valB ? 1 : -1;
      return sortOrder === 'asc' ? compare : -compare;
    });
  }, [filteredData, sortKey, sortOrder]);

  // Paginate
  const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div
      id={id}
      className={`bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden ${className}`}
    >
      {/* Table Toolbar */}
      <div className="p-4 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 transition"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{paginatedData.length}</strong> of{' '}
            <strong className="text-slate-800">{filteredData.length}</strong> entries
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold tracking-wider uppercase text-[11px]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className="px-4 py-3 select-none"
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className="inline-flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
                    >
                      {col.header}
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-slate-500"
                >
                  <p className="font-semibold text-slate-700">{emptyTitle}</p>
                  <p className="text-xs text-slate-400 mt-1">{emptySubtitle}</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-slate-700">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 border-t border-slate-200/80 flex items-center justify-between text-xs bg-slate-50/40">
        <span className="text-slate-500">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="p-1.5 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="p-1.5 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
