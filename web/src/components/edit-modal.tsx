import { useState, useEffect } from "react";

interface EditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onDelete: (id: number) => void;
  property: {
    id: number;
    title: string;
    address: string;
    status: "active" | "inactive";
  } | null;
  onSubmit: (
    id: number,
    updated: { title: string; address: string; status: "active" | "inactive" }
  ) => void;
}

export function EditModal({
  open,
  setOpen,
  property,
  onDelete,
  onSubmit,
}: EditModalProps) {
  const [form, setForm] = useState({
    title: "",
    address: "",
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    if (property) {
      setForm({
        title: property.title,
        address: property.address,
        status: property.status,
      });
    }
  }, [property]);

  const handleCancel = () => {
    setOpen(false);
  };

  if (!open || !property) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 transition-opacity p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCancel();
      }}
    >
      <div className="relative w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center pb-4 text-xl font-medium text-gray-900">
            Editar Propriedade
          </div>

          <form
            className="space-y-4 text-gray-900"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(property.id, form);
              setOpen(false);
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título da Propriedade
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
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
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
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
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as "active" | "inactive",
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
              <div className="w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onDelete(property.id)}
                  className="w-full sm:w-auto cursor-pointer rounded-md bg-red-600 py-2 px-4 text-sm text-white shadow-md hover:bg-red-700 transition"
                >
                  Deletar
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto cursor-pointer rounded-md border border-gray-300 py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto cursor-pointer rounded-md bg-blue-600 py-2 px-4 text-sm text-white shadow-md hover:bg-blue-700 transition"
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
