import { DataTableName } from '@/components/table/DataTable.enum';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TableStoreState {
  columnVisibility: {
    [key in DataTableName]?: Record<string, boolean>;
  };
  setColumnVisibility: (tableName: DataTableName, value: Record<string, boolean>) => void;
}

export const useTableStore = create<TableStoreState>()(
  persist(
    (set) => ({
      columnVisibility: {},
      setColumnVisibility: (tableName: DataTableName, value: Record<string, boolean>) => {
        set((state) => ({
          columnVisibility: {
            ...state.columnVisibility,
            [tableName]: value
          }
        }));
      }
    }),
    {
      name: 'table-storage',
      partialize: (state) => ({ columnVisibility: state.columnVisibility })
    }
  )
);
