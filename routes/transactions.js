const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.post('/in', async (req, res) => {
    const {
        product_id,
        supplier_id,
        serial_number,
        quantity,
    } = req.body;

    const product = await prisma.product.findUnique({
        where: {product_id: parseInt(product_id)},
        include: {
            stock: true
        }

    });

    let productQuantity = parseInt(quantity);

    if (serial_number) {
        productQuantity = serial_number.split(',').length;
    }


    const addTransaction = await prisma.transaction.create({
        data: {
            product_id: parseInt(product_id),
            supplier_id: parseInt(supplier_id),
            serial_number,
            quantity: productQuantity,
            transaction_type: "IN"
        }
    });

    await prisma.product.update({
        where: {product_id: parseInt(product_id)},
        data: {
            stock: {
                update: {
                  where: {stock_id: product.stock[0].stock_id},
                    data: {
                        stock: product.stock[0].stock === null ? productQuantity : product.stock[0].stock + productQuantity,
                        serial_number: product.stock[0].serial_number === null ? serial_number : product.stock[0].serial_number.split(',').concat(serial_number).join(',')
                    }

                }
            }
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

    const product = await prisma.product.findUnique({
        where: {product_id: parseInt(product_id)},
        include: {
            stock: true,
        }
    });

    let productQuantity = parseInt(quantity);

    if (serial_number) {
        productQuantity = serial_number.split(',').length;
    }


    const addTransaction = await prisma.transaction.create({
        data: {
            product_id: parseInt(product_id),
            serial_number,
            quantity: productQuantity,
            transaction_type: "OUT"
        }
    });

    let deletedSerialNumber = product.stock[0].serial_number.split(',').filter((item) => !serial_number.split(',').includes(item)).join(',');

    if (deletedSerialNumber === '') deletedSerialNumber = null;

    console.log(deletedSerialNumber)

    await prisma.product.update({
        where: {product_id: parseInt(product_id)},
        data: {
           stock: {
               update: {
                   where: {
                          stock_id: product.stock[0].stock_id
                   },
                   data: {
                       stock: product.stock[0].stock - productQuantity,
                       serial_number: deletedSerialNumber
                   }
               }
           }
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