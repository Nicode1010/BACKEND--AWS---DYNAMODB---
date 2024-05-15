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
  uploadS3File,
  ListS3Files,
  getS3File,
  deleteS3File,
} = require("../aws/s3");

const api = express.Router();

// Endpoint para crear una orden (POST)
api.post("/create-order", async (request, response) => {
  try {
    const orderData = request.body; // Utiliza los datos del cuerpo de la solicitud

    // Guardar la orden en DynamoDB
    await putDynamoDBItem(orderData);

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

// Endpoint para obtener una orden por su ID (GET)
api.get("/get-order/id_pedido", async (request, response) => {
  try {
    const orderId = request.params.id; // Utiliza el ID proporcionado en los parámetros de ruta

    // Obtener la orden de DynamoDB utilizando el ID proporcionado
    const order = await getDynamoDBItem({ id: orderId });

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

// Endpoint para eliminar una orden por su ID (DELETE)
api.delete("/delete-order/:id", async (request, response) => {
  try {
    const orderId = request.params.id; // Se utiliza el ID proporcionado en los parámetros de ruta

    // Eliminar la orden de DynamoDB utilizando el ID proporcionado
    await deleteDynamoDBItem({ id: orderId });

    response.status(StatusCodes.OK).json({ msg: "Orden eliminada correctamente" });
  } catch (error) {
    console.error("Error", error);
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal Server Error" });
  }
});
/*
api.post("/path2", upload.single("file"), async (request, response) => {
  try {
    console.info("BODY", request.file);

    const fileInfo = request.file;
    console.info("FILE INFO", fileInfo);

    const { originalname, buffer, mimetype } = fileInfo;

    // Upload a file to S3
    await uploadS3File({ key: originalname, buffer, mimetype });

    // List all files from S3
    const s3Files = await ListS3Files();
    console.info("S3 Files", s3Files);

    // Get the file from S3
    const s3File = await getS3File(originalname);
    console.info(`S3 File With Name ${originalname}`, s3File);

    // Delete the file from S3
    await deleteS3File(originalname);

    response.writeHead(StatusCodes.OK, {
      "content-disposition": `attachment; filename=${originalname}`,
      "Content-Type": mimetype,
    });
    response.end(buffer);
  } catch (error) {
    console.error("Error", error);
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Server Error" });
  }
});
*/
module.exports = api;
