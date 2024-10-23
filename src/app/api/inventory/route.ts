import { NextResponse } from "next/server";
import Inventory from "@/models/inventory";
import { connectDB } from "@/libs/mongodb";
import "@/app/api/swaggerSchemas"; 
/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: API para gestionar el inventario
 */

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Obtiene todos los inventarios
 *     responses:
 *       200:
 *         description: Lista de inventarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventory'
 */
export const GET = async () => {
  await connectDB();

  try {
    const inventories = await Inventory.find({});
    return NextResponse.json(
      { success: true, data: inventories },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
};

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Crea un nuevo inventario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del inventario
 *               stock:
 *                 type: number
 *                 description: Cantidad de stock disponible
 *     responses:
 *       201:
 *         description: Inventario creado
 *       400:
 *         description: Error en la solicitud
 */
export const POST = async (req: Request) => {
  await connectDB();

  try {
    const body = await req.json(); // Extraer el cuerpo de la solicitud
    const inventory = await Inventory.create(body);
    return NextResponse.json(
      { success: true, data: inventory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
};

/**
 * @swagger
 * /api/inventory:
 *   put:
 *     summary: Actualiza un inventario existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del inventario a actualizar
 *               name:
 *                 type: string
 *                 description: Nombre del inventario
 *               stock:
 *                 type: number
 *                 description: Cantidad de stock disponible
 *     responses:
 *       200:
 *         description: Inventario actualizado
 *       404:
 *         description: Inventario no encontrado
 *       400:
 *         description: Error en la solicitud
 */
export const PUT = async (req: Request) => {
  await connectDB();

  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    const inventory = await Inventory.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!inventory) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: inventory },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
};

/**
 * @swagger
 * /api/inventory:
 *   delete:
 *     summary: Elimina un inventario existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del inventario a eliminar
 *     responses:
 *       200:
 *         description: Inventario eliminado
 *       404:
 *         description: Inventario no encontrado
 *       400:
 *         description: Error en la solicitud
 */
export const DELETE = async (req: Request) => {
  await connectDB();

  try {
    const body = await req.json();
    const { id } = body;
    const deletedInventory = await Inventory.findByIdAndDelete(id);

    if (!deletedInventory) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
};
