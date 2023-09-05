const express = require('express');
const {PrismaClient} = require('@prisma/client');
const {response} = require("express");
const router = express.Router();
const prisma = new PrismaClient();


router.post('/', async (req, res) => {

    const {brand_name} = req.body;

    const checkAvailableBrandName = await prisma.brand.findFirst({
        where: {
            brand_name
        }
    });

    if (checkAvailableBrandName) {
        return res.status(400).json(
            {
                code: 400,
                success: false,
                message: 'Nama brand sudah digunakan',
            });
    }

    const addBrand = await prisma.brand.create({
        data: {
            brand_name,
        },
    })
    res.status(200).json(
        {
            code: 200,
            success: true,
            message: 'Data berhasil ditambahkan',
            data: addBrand
        });
});

router.get('/', async (req, res) => {
    const brands = await prisma.brand.findMany();
    res.status(200).json({
        code: 200,
        success: true,
        message: 'Data berhasil ditampilkan',
        datas: brands
    });
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    const brand = await prisma.brand.findUnique({
        where: {brand_id: parseInt(id)},
        include: {
            Product: true
        }
    });

    if (brand === null) {
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
            data: brand
        }
    )
});


router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {brand_name} = req.body;

    const checkBrand = await prisma.brand.findUnique({
        where: {brand_id: parseInt(id)},
    });

    if (checkBrand === null) {
        return res.status(404).json(
            {
                code: 404,
                success: false,
                message: 'Data tidak ditemukan',
            });
    }

    const checkAvailableBrandName = await prisma.brand.findFirst({
        where: {
            brand_name
        }
    });

    if (checkAvailableBrandName) {
        return res.status(400).json(
            {
                code: 400,
                success: false,
                message: 'Nama brand sudah digunakan',
            });
    }


    const updateBrand = await prisma.brand.update({
        where: {brand_id: parseInt(id)},
        data: {brand_name}
    });

    res.status(200).json(
        {
            code: 200,
            success: true,
            message: 'Data berhasil ditampilkan',
            data: updateBrand
        }
    )
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    const checkBrand = await prisma.brand.findUnique({
        where: {brand_id: parseInt(id)},
    });

    if (checkBrand === null) {
        return res.status(404).json(
            {
                code: 404,
                success: false,
                message: 'Data tidak ditemukan',
            });

    }

    const {brand_name} = req.body;

    const deleteBrand = await prisma.brand.delete({
        where: {brand_id: parseInt(id)},
    });

    res.status(200).json(
        {
            code: 200,
            success: true,
            message: 'Data berhasil dihapus',
            data: deleteBrand
        }
    )
});


module.exports = router;