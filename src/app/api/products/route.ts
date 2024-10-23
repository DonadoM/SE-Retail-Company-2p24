import { NextResponse } from "next/server";
import Product from "@/models/product";
import { connectDB } from "@/libs/mongodb";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: El nombre del producto.
 *         description:
 *           type: string
 *           description: Una descripción del producto.
 *         price:
 *           type: number
 *           description: El precio del producto.
 *         stock:
 *           type: integer
 *           description: La cantidad en stock del producto.
 *       required:
 *         - name
 *         - description
 *         - price
 *         - stock
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtiene todos los productos.
 *     responses:
 *       200:
 *         description: Lista de productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Crea un nuevo producto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 * /api/products/{id}:
 *   put:
 *     summary: Actualiza un producto existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *   delete:
 *     summary: Elimina un producto existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto.
 *     responses:
 *       204:
 *         description: Producto eliminado.
 */

export const GET = async (req: Request) => {
  await connectDB();

  try {
    const products = await Product.find();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
};

export const POST = async (req: Request) => {
  await connectDB();

  try {
    const body = await req.json();
    const newProduct = new Product(body);
    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
};

export const PUT = async (req: Request) => {
  await connectDB();

  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProduct) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
};

export const DELETE = async (req: Request) => {
  await connectDB();

  try {
    const body = await req.json();
    const { id } = body;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
};