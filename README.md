# Plantilla Restaurante de un Backend usando AWS SAM

Este es un ejemplo de un backend de una aplicación serverlesspara un restaurante usando AWS SAM.

## Tenemos los siguientes Recursos:
- Rol de IAM para la función Lambda
- Función Lambda
- API Gateway
- Tabla de DynamoDB
- Bucket de S3

## Funcionalidad de nuestro Backend: 
La API Gateway tiene dos ruta:
- **POST /pedido:** Realiza un CRUD en la tabla de DynamoDB
- **POST /path2:** Realiza un CRUD en el bucket de S3

