const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();


router.post('/', async (req, res) => {

    const {category_name} = req.body;

    const checkAvailableCategoryName = await prisma.category.findFirst({
        where: {
            category_name
        }
    });

    if (checkAvailableCategoryName) {
        return res.status(400).json(
            {
                code: 400,
                success: false,
                message: 'Nama kategori sudah digunakan',
            });
    }

    const addCategory = await prisma.category.create({
        data: {
            category_name,
        },
    })
    res.status(200).json(
        {
            code: 200,
            success: true,
            message: 'Data berhasil ditambahkan',
            data: addCategory
        });
});

router.get('/', async (req, res) => {
    const categories = await prisma.category.findMany();
    res.status(200).json({
        code: 200,
        success: true,
        message: 'Data berhasil ditampilkan',
        data: categories
    });
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    const category = await prisma.category.findUnique({
        where: {category_id: parseInt(id)},
    });

    if (category === null) {
        return res.status(404).json(
            {
                code: 404,
                success: false,
                message: 'Data tidak ditemukan',
            });

    }
    res.status(200).json(
        {
            code: 200,
            success: true,
            message: 'Data berhasil ditampilkan',
            data: category
        }
    )
});


router.put('/:id', async (req, res) => {
    const {id} = req.params;

    const checkCategory = await prisma.category.findUnique({
        where: {category_id: parseInt(id)},
    });

    if (checkCategory === null) {
        return res.status(404).json(
            {
                code: 404,
                success: false,
                message: 'Data tidak ditemukan',
            });
    }

    const {category_name} = req.body;

    const checkAvailableCategoryName = await prisma.category.findFirst({
        where: {
            category_name
        }
    });

    if (checkAvailableCategoryName) {
        return res.status(400).json(
            {
                code: 400,
                success: false,
                message: 'Nama kategori sudah digunakan',
            });
    }

    const updateCategory = await prisma.category.update({
        where: {category_id: parseInt(id)},
        data: {category_name}
    });

    res.status(200).json(
        {
            code: 200,
            success: true,
            message: 'Data berhasil ditampilkan',
            data: updateCategory
        }
    )
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    const checkCategory = await prisma.category.findUnique({
        where: {category_id: parseInt(id)},
    });

    if (checkCategory === null) {
        return res.status(404).json(
            {
                code: 404,
                success: false,
                message: 'Data tidak ditemukan',
            });

    }

    const deleteCategory = await prisma.category.delete({
        where: {category_id: parseInt(id)},
    });

    res.status(200).json(
        {
            code: 200,
            success: true,
            message: 'Data berhasil dihapus',
            data: deleteCategory
        }
    )
});


module.exports = router;