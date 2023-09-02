const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const {product_name, category_id, brand_id, product_type, serial_number, unit, purchase_price, selling_price, stock, description} = req.body;

    console.log(serial_number)
    let finalStock = parseInt(stock);

    if(serial_number){
        finalStock = serial_number.split(',').length
    }


    const addProduct = await prisma.product.create({
        data: {
            product_name,
            category_id: parseInt(category_id),
            brand_id: parseInt(brand_id),
            type: product_type,
            serial_number,
            unit,
            purchase_price: parseFloat(purchase_price),
            selling_price:parseFloat(selling_price),
            stock: finalStock,
            description
        }
    })

    res.status(200).json(
        {
            code: 200,
            success: true,
            message: 'Data berhasil ditambahkan',
            data: addProduct
        });
});

module.exports = router;