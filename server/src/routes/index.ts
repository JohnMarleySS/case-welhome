import { Router } from 'express';
import { PropertyService } from '../services/property-service';

const property = new PropertyService();

const router = Router();

router.get('/properties', async (req, res) => {
    const data = await property.findAll()
    return res.status(200).json(data); // Corrigi a ordem: status primeiro, depois json
})

router.post('/properties', async (req, res) => {
    try {
        const { title, address, status } = req.body;

        const newProperty = await property.create({ title, address, status });

        return res.status(201).json(newProperty);
    } catch (error) {
        console.error("Erro ao criar propriedade:", error);
        return res.status(500).json({ error: "Erro ao criar propriedade" });
    }
});

router.put('/properties/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, address, status } = req.body;

        const updatedProperty = await property.update({
            id: parseInt(id),
            title,
            address,
            status
        });

        return res.status(200).json(updatedProperty);
    } catch (error) {
        console.error("Erro ao atualizar propriedade:", error);
        return res.status(500).json({ error: "Erro ao atualizar propriedade" });
    }
});

router.delete('/properties/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await property.delete(parseInt(id));
        return res.status(200).json(deleted);
    } catch (error) {
        console.error("Erro ao deletar propriedade:", error);
        return res.status(500).json({ error: "Erro ao deletar propriedade" });
    }
});

export default router;