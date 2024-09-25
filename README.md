# BACKEND RESTAURANTE - JavaScript - AWS - DYNAMODB - EXPRESS - SERVICES REST 

Aquí se ha creado una API utilizando Express para interactuar con una base de datos DynamoDB y realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre órdenes de un restaurante.

## En el proyecto tenemos Recursos de AWS como: 
- Rol de IAM para la función Lambda
- Función Lambda
- API Gateway
- Tabla de DynamoDB
- Bucket de S3

## 1 ENTREGA: 
En la primera entrega del proyecto, se ha logrado lo siguiente:

- Se ha definido el endpoint /create-order para crear una nueva orden a través de una solicitud POST. Se capturan los datos de la orden del cuerpo de la solicitud, se almacenan en DynamoDB utilizando la función putDynamoDBItem y se devuelve una respuesta con el código de estado OK junto con un mensaje que indica que la orden ha sido creada exitosamente.

- Se ha establecido el endpoint /get-order/:id_pedido para obtener una orden existente mediante una solicitud GET. El ID de la orden se obtiene de los parámetros de la ruta, luego se busca la orden en DynamoDB utilizando la función getDynamoDBItem. En caso de encontrar la orden, se devuelve una respuesta con el código de estado OK y la orden; de lo contrario, se devuelve un mensaje indicando que la orden no fue encontrada.

- Se ha configurado el endpoint /delete-order/:id_pedido para eliminar una orden existente mediante una solicitud DELETE. El ID de la orden se extrae de los parámetros de la ruta, luego se elimina la orden de DynamoDB utilizando la función deleteDynamoDBItem. Posteriormente, se envía una respuesta con el código de estado OK y un mensaje que confirma que la orden ha sido eliminada correctamente. En caso de producirse algún error durante el proceso, se devuelve un mensaje de error adecuado.

Estos endpoints permiten realizar operaciones básicas de creación, recuperación y eliminación de órdenes en el sistema, lo que constituye un avance significativo en el desarrollo del proyecto.

## 2 ENTREGA: 
En la segunda entrega del proyecto, se ha logrado lo siguiente:

- En la segunda entrega del proyecto, se ha desarrollado el frontend para consumir el backend de manera más intuitiva y eficiente. La interfaz de usuario se ha diseñado utilizando el concepto de tarjetas (cards), lo que proporciona una experiencia visual agradable y fácil de entender para los usuarios.

Además, se ha implementado un nuevo endpoint para generar un escaneo completo de la base de datos DynamoDB, con el fin de recuperar todos los datos almacenados en ella. Este endpoint permite obtener una visión completa de la información presente en la base de datos, lo que resulta útil para diversos fines, como análisis de datos o generación de informes.
