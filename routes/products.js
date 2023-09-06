const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const {
        product_code,
        product_type,
        category_id,
        brand_id,
        unit,
        purchase_price,
        selling_price,
        description
    } = req.body;


    const createProduct = await
        prisma.product.create({
            data: {
                product_code,
                product_type,
                category_id: parseInt(category_id),
                brand_id: parseInt(brand_id),
                unit,
                purchase_price: parseFloat(purchase_price),
                selling_price: parseFloat(selling_price),
                description,
                stock: {
                    create: {
                        stock: 0,
                        serial_number: null
                    }
                }
            },

        });


    res.status(200).json(
        {
            code: 200,
            success: true,
            message: 'Data berhasil ditambahkan',
            data: createProduct
        });
});

router.get('/', async (req, res) => {
    const products = await prisma.product.findMany({
        include: {
            brand: true,
            category: true,
        }
    });
    res.status(200).json({
        code: 200,
        success: true,
        message: 'Data berhasil ditampilkan',
        data: products
    });

});

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    const product = await prisma.product.findUnique({
        where: {product_id: parseInt(id)},
        include: {
            brand: true,
            category: true,
        }
    });

    if (product === null) {
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
            data: product
        }
    )
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;

    const checkProduct = await prisma.product.findUnique({
        where: {product_id: parseInt(id)},
    });

    if (checkProduct === null) {
        return res.status(404).json(
            {
                code: 404,
                success: false,
                message: 'Data tidak ditemukan',
            });
    }

    const {
        product_code,
        product_type,
        category_id,
        brand_id,
        unit,
        purchase_price,
        selling_price,
        description
    } = req.body;

    const updateCategory = await prisma.product.update({
        where: {product_id: parseInt(id)},
        data: {
            product_code,
            product_type,
            category_id: parseInt(category_id),
            brand_id: parseInt(brand_id),
            unit,
            purchase_price: parseFloat(purchase_price),
            selling_price: parseFloat(selling_price),
            description
        }
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

    const checkProduct = await prisma.product.findUnique({
        where: {product_id: parseInt(id)},
    });

    if (checkProduct === null) {
        return res.status(404).json(
            {
                code: 404,
                success: false,
                message: 'Data tidak ditemukan',
            });

    }

    const deleteProduct = await prisma.product.delete({
        where: {product_id: parseInt(id)},
    });

    res.status(200).json(
        {
            code: 200,
            success: true,
            message: 'Data berhasil dihapus',
            data: deleteProduct
        }
    )
});

module.exports = router;