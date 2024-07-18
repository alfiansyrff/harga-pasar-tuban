import { ColumnDef } from "@tanstack/react-table";
import { Item } from "../types";

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "name",
    header: "Nama Bahan Pokok"
  },
  {
    accessorKey: "satuan",
    header: "Satuan"
  },
  {
    accessorKey: "yesterdayPrice",
    header: "Harga Kemarin (Rp)"
  },
  {
    accessorKey: "currentPrice",
    header: "Harga Sekarang (Rp)"
  },
  {
    accessorKey: "perubahanRp",
    header: "Perubahan (Rp)"
  },
  {
    accessorKey: "persentasePerubahan",
    header: "Perubahan (%)"
  },

];