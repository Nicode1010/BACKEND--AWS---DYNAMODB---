const express = require("express");
const multer  = require('multer');
const { StatusCodes } = require("http-status-codes");

const upload = multer({ storage: multer.memoryStorage() });

// Importing the functions from the DynamoDB SDK
const {
  putDynamoDBItem,
  getDynamoDBItem,
  deleteDynamoDBItem,
} = require("../aws/dynamodb");

// Importing the functions from the S3 SDK
const {
  uploadS3File, //Importa la funcion para cargar un archivo en Amazon S3
  ListS3Files, //Importa la funcion para listar archivos en Amaazon S3
  getS3File,// Importa la función para obtener un archivo de Amazon S3
  deleteS3File,// Importa la función para eliminar un archivo de Amazon S3
} = require("../aws/s3");

const api = express.Router(); // Crea una instancia de Router de Express para manejar las rutas de la API

// Endpoint para crear una orden (POST) crear
api.post("/create-order", async (request, response) => {
  try {
    const orderData = request.body; // Obtiene los datos del cuerpo de la solicitud

    // Guardar la orden en DynamoDB
    await putDynamoDBItem(orderData);
//Respuesta del backend al "cliente"
    response
      .status(StatusCodes.OK)
      .json({ msg: "Tu orden ha sido creada", orderData });
  } catch (error) {
    console.error("Error", error);
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Server Error" });
  }
});

api.get("/get-order/:id_pedido", async (request, response) => {
  try {
    const orderId = request.params.id_pedido; // Utiliza el ID proporcionado en los parámetros de ruta

    // Obtener la orden de DynamoDB utilizando el ID proporcionado
    const order = await getDynamoDBItem({ id_pedido: orderId });

    if (order) {
      response.status(StatusCodes.OK).json({ msg: "Orden encontrada", order });
    } else {
      response.status(StatusCodes.NOT_FOUND).json({ msg: "Orden no encontrada" });
    }
  } catch (error) {
    console.error("Error", error);
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal Server Error" });
  }
});

api.delete("/delete-order/:id_pedido", async (request, response) => {
  try {
    const orderId = request.params.id_pedido; // Se utiliza el ID proporcionado en los parámetros de ruta

    // Eliminar la orden de DynamoDB utilizando el ID proporcionado
    await deleteDynamoDBItem({ id_pedido: orderId });

    response.status(StatusCodes.OK).json({ msg: "Orden eliminada correctamente" });
  } catch (error) {
    console.error("Error", error);
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal Server Error" });
  }
});

module.exports = api;
