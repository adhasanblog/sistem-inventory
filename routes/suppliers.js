const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const {
        supplier_name,
        supplier_phone,
        supplier_email,
        supplier_address,
    } = req.body;


    const createSupplier = await prisma.supplier.create({
        data: {
            supplier_name,
            supplier_phone,
            supplier_email,
            supplier_address,
        }
    });

    res.status(200).json(
        {
            code: 200,
            success: true,
            message: 'Data berhasil ditambahkan',
            data: createSupplier
        });
});

router.get('/', async (req, res) => {
    const suppliers = await prisma.supplier.findMany();

    res.status(200).json({
        code: 200,
        success: true,
        message: 'Data berhasil ditampilkan',
        data: suppliers
    });

});


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const supplier = await prisma.supplier.findUnique({
        where: {supplier_id: parseInt(id)},
        include: {
            transaction: true
        }
    });

    if (supplier === null) {
        return res.status(404).json(
            {
                code: 404,
                success: false,
                message: 'Data tidak ditemukan',
            });

    }

    res.status(200).json({
        code: 200,
        success: true,
        message: 'Data berhasil ditampilkan',
        data: supplier
    });
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const supplier = await prisma.supplier.findUnique({
        where: {supplier_id: parseInt(id)}
    });

    if (supplier === null) {
        return res.status(404).json(
            {
                code: 404,
                success: false,
                message: 'Data tidak ditemukan',
            });

    }

    const {
        supplier_name,
        supplier_phone,
        supplier_email,
        supplier_address,
    } = req.body;

    const updateSupplier = await prisma.supplier.update({
        where: {supplier_id: parseInt(id)},
        data: {
            supplier_name,
            supplier_phone,
            supplier_email,
            supplier_address,
        }
    });

    res.status(200).json({
        code: 200,
        success: true,
        message: 'Data berhasil diubah',
        data: updateSupplier
    });
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    const supplier = await prisma.supplier.findUnique({
        where: {supplier_id: parseInt(id)}
    });

    if (supplier === null) {
        return res.status(404).json(
            {
                code: 404,
                success: false,
                message: 'Data tidak ditemukan',
            });

    }

    const deleteSupplier = await prisma.supplier.delete({
        where: {supplier_id: parseInt(id)}
    })

    res.status(200).json({
        code: 200,
        success: true,
        message: 'Data berhasil dihapus',
        data: deleteSupplier
    });
});

module.exports = router;
