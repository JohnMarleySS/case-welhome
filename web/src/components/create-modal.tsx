import { useState } from "react";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (property: {
    title: string;
    address: string;
    status: "active" | "inactive";
  }) => void;
}

export function Modal({ open, setOpen, onSubmit }: ModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    status: "active" as "active" | "inactive",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.address) {
      onSubmit(formData);
      setFormData({ title: "", address: "", status: "active" });
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", address: "", status: "active" });
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid h-screen w-screen place-items-center bg-black/20 transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCancel();
      }}
    >
      <div className="relative m-4 p-6 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-lg">
        <div className="flex items-center pb-4 text-xl font-medium text-gray-900">
          Adicionar Nova Propriedade
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-900">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título da Propriedade
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Casa Azul"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Endereço
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Rua das Flores, 123"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "active" | "inactive",
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="cursor-pointer rounded-md border border-gray-300 py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-blue-600 py-2 px-4 text-sm text-white shadow-md hover:bg-blue-700 transition"
            >
              Adicionar Propriedade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
