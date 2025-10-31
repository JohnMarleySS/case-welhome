import { useEffect, useState } from "react";
import getAll from "../services/get-all";
import postProperty from "../services/post-property";
import { Modal } from "../components/create-modal";
import { EditModal } from "../components/edit-modal";
import deleteProperty from "../services/delete-property";
import { PropertyTable } from "../components/property-table";

interface Property {
  id: number;
  title: string;
  address: string;
  status: "active" | "inactive";
}

export function PropertyPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const data = await getAll(`${import.meta.env.VITE_API_URL}/properties`);
      const sortedData = (data as Property[]).sort((a, b) => b.id - a.id);
      setProperties(sortedData);
    } catch (error) {
      console.error("Error loading properties:", error);
    }
  };

  async function updateProperty(id: number, updated: Omit<Property, "id">) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/properties/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        }
      );

      if (!res.ok) throw new Error("Erro ao atualizar propriedade");

      const updatedProperty = await res.json();
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? updatedProperty : p))
      );
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  }

  async function PostProperty(property: Omit<Property, "id">) {
    setLoading(true);
    try {
      const res = await postProperty(
        `${import.meta.env.VITE_API_URL}/properties`,
        property
      );

      if (res && res.id) {
        setProperties((prev) => [res, ...prev]);
      } else {
        await loadProperties();
      }

      setOpen(false);
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteProperty(`${import.meta.env.VITE_API_URL}/properties/${id}`);
      setProperties((prev) => prev.filter((p) => p.id !== id));
      setEditOpen(false);
    } catch (error) {
      console.error("Erro ao deletar propriedade:", error);
    }
  }

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setEditOpen(true);
  };

  return (
    <div className="bg-white min-h-screen p-8 text-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Propriedades
            </h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Lista de todas as propriedades.
            </p>
          </div>

          <div className="shrink-0">
            <button
              className="cursor-pointer rounded-md bg-blue-600 py-2 px-4 text-white shadow-md hover:bg-blue-700 transition"
              type="button"
              onClick={() => setOpen(true)}
              disabled={loading}
            >
              {loading ? "Carregando..." : "Adicionar propriedade"}
            </button>
          </div>
        </div>

        <PropertyTable properties={properties} onEdit={handleEdit} />
      </div>

      <Modal open={open} setOpen={setOpen} onSubmit={PostProperty} />

      <EditModal
        open={editOpen}
        setOpen={setEditOpen}
        property={selectedProperty}
        onSubmit={updateProperty}
        onDelete={handleDelete}
      />
    </div>
  );
}
