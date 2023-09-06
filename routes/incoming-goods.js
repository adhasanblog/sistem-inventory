const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const {
        supplier_id,
        product_id,
        serial_number,
        quantity,
    } = req.body;

    const product = await prisma.product.findUnique({
        where: {product_id: parseInt(product_id)},
        include: {
            stock: true
        }

    });

    const supplier = await prisma.supplier.create({
        data: {
            supplier_name,
            supplier_phone,
            supplier_email,
            supplier_address,
            transaction: {
                create: {
                    product_id: parseInt(product_id),
                    serial_number,
                    quantity: parseInt(quantity),
                    transaction_type: "IN"
                }
            }
        }
    })
})