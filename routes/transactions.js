const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prism = new PrismaClient();

router.post('/in', async (req, res) => {
    const {
        product_id,
        serial_number,
        quantity,
    } = req.body;

    const product = await prism.product.findUnique({
        where: {product_id: parseInt(product_id)},
    });

    let productQuantity = parseInt(quantity);

    if (serial_number) {
        productQuantity = serial_number.split(',').length;
    }


    const addTransaction = await prism.transaction.create({
        data: {
            product_id: parseInt(product_id),
            serial_number,
            quantity: productQuantity,
            transaction_type: "IN"
        }
    });
    console.log(productQuantity)
    await prism.product.update({
        where: {product_id: parseInt(product_id)},
        data: {
            stock: product.stock === null ? productQuantity : product.stock + productQuantity,
            serial_number: product.serial_number === null  ? serial_number : product.serial_number.split(',').concat(serial_number).join(',')
        }
    })

    res.status(200).json(
        {
            code: 200,
            success: true,
            message: 'Data berhasil ditampilkan',
            data: addTransaction
        }
    )
})

router.post('/out', async (req, res) => {
    const {
        product_id,
        serial_number,
        quantity,
    } = req.body;

    const product = await prism.product.findUnique({
        where: {product_id: parseInt(product_id)},
    });

    let productQuantity = parseInt(quantity);

    if (serial_number) {
        productQuantity = serial_number.split(',').length;
    }


    const addTransaction = await prism.transaction.create({
        data: {
            product_id: parseInt(product_id),
            serial_number,
            quantity: productQuantity,
            transaction_type: "OUT"
        }
    });

    let deletedSerialNumber = product.serial_number.split(',').filter((item) => !serial_number.split(',').includes(item)).join(',');

    if(deletedSerialNumber === '') deletedSerialNumber = null;

    console.log(deletedSerialNumber)

    await prism.product.update({
        where: {product_id: parseInt(product_id)},
        data: {
            stock: product.stock - productQuantity,
            serial_number: deletedSerialNumber
        }
    })

    res.status(200).json(
        {
            code: 200,
            success: true,
            message: 'Data berhasil ditampilkan',
            data: addTransaction
        }
    )
})

module.exports = router;