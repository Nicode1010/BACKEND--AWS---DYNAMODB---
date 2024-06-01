const express = require("express");
const multer = require('multer');
const { StatusCodes } = require("http-status-codes");

const upload = multer({ storage: multer.memoryStorage() });

// Importando las funciones desde el SDK de DynamoDB
const {
  putDynamoDBItem,
  getDynamoDBItem,
  deleteDynamoDBItem,
  getAllDynamoDBItems, // Agregamos la función para obtener todos los pedidos
} = require("../aws/dynamodb");

// Importando las funciones desde el SDK de S3
const {
  uploadS3File, 
  ListS3Files, 
  getS3File,
  deleteS3File,
} = require("../aws/s3");

const api = express.Router(); // Creando una instancia de Router de Express para manejar las rutas de la API

// Endpoint para crear una orden (POST)
api.post("/create-order", async (request, response) => {
  try {
    const orderData = request.body; // Obteniendo los datos del cuerpo de la solicitud

    // Guardando la orden en DynamoDB
    await putDynamoDBItem(orderData);

    // Respondiendo al cliente con un mensaje de éxito
    response
      .status(StatusCodes.OK)
      .json({ msg: "Tu orden ha sido creada", orderData });
  } catch (error) {
    console.error("Error:", error);
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Server Error" });
  }
});

// Endpoint para obtener una orden por su ID (GET)
api.get("/get-order/:id_pedido", async (request, response) => {
  try {
    const orderId = request.params.id_pedido; // Utilizando el ID proporcionado en los parámetros de ruta

    // Obteniendo la orden de DynamoDB utilizando el ID proporcionado
    const order = await getDynamoDBItem({ id_pedido: orderId });

    if (order) {
      response.status(StatusCodes.OK).json({ msg: "Orden encontrada", order });
    } else {
      response.status(StatusCodes.NOT_FOUND).json({ msg: "Orden no encontrada" });
    }
  } catch (error) {
    console.error("Error:", error);
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal Server Error" });
  }
});

// Endpoint para eliminar una orden por su ID (DELETE)
api.delete("/delete-order/:id_pedido", async (request, response) => {
  try {
    const orderId = request.params.id_pedido; // Utilizando el ID proporcionado en los parámetros de ruta

    // Eliminando la orden de DynamoDB utilizando el ID proporcionado
    await deleteDynamoDBItem({ id_pedido: orderId });

    // Respondiendo al cliente con un mensaje de éxito
    response.status(StatusCodes.OK).json({ msg: "Orden eliminada correctamente" });
  } catch (error) {
    console.error("Error:", error);
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal Server Error" });
  }
});

// Endpoint para obtener todos los pedidos (GET)
api.get("/get-orders", async (request, response) => {
  try {
    // Obteniendo todos los pedidos de DynamoDB
    const orders = await getAllDynamoDBItems();

    if (orders.length > 0) {
      response.status(StatusCodes.OK).json({ msg: "Pedidos encontrados", orders });
    } else {
      response.status(StatusCodes.NOT_FOUND).json({ msg: "No se encontraron pedidos" });
    }
  } catch (error) {
    console.error("Error:", error);
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal Server Error" });
  }
});

module.exports = api;