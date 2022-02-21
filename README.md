# Desafío Fintual
##### ✔️ El desafío se plantea de la siguiente manera

Construct a simple Portfolio class that has a collection of Stocks and a "Profit" method that receives 2 dates and returns the profit of the Portfolio between those dates. Assume each Stock has a "Price" method that receives a date and returns its price.
Bonus Track: make the Profit method return the "annualized return" of the portfolio between the given dates.

## 🎨 Front-End
El Front está desarrollado en Angular con Angular Material, para levantarlo es necesario tener instalado el CLI de Angular y correr los comandos:
```sh
npm install
ng serve
```
Si todo marcha bien, tendrás un mensaje en la consola.

pd: A pesar de verse bien en un navegador, recomendaría cambiar a la vista móvil para evitar los espacios en blanco del widget
## 🤖 Back-End
El back está desarrollado en NodeJS con Express, para ser utilizado como API, para levantarla es necesario tener instalado Node 16.13.2 y correr los comandos:
```sh
npm install
node .
```
Si todo marcha bien, deberías tener levantada la API en localhost:3000 (aparece en la ventana de comandos).

## 💬 Postman
En la carpeta de postman encontraremos el archivo de importación para usarlo con ambas llamadas GET del BACK

 Llamada para obtener el profit/loss según fechas
```sh
http://localhost:3000/stock/NFLX/2015-12/2020-2
```
`Info: puedes cambiar NFLX por el símbolo de cualquier otro stock y las fechas son preferiblemente en formato YYYY-MM`

Llamada para obtener el profit/loss según año 
```sh
http://localhost:3000/stock/year/NFLX/2021
```
`Info: puedes cambiar NFLX por el símbolo de cualquier otro stock y cambiar el año 2021 por cualquier otra`

### 🍪 Diseño

Se utilizaron los recursos disponibles en https://fintual.notion.site/Logos-y-uso-de-marca-a51c852bb14440229c1f58d359705d6e y para los colores, al no tener manual de marca, se opto por photoshop y sus herramientas para saber los colores exactos de la marca.

### 🧑‍🚀 Servicios
Utilizaremos la API gratuita de https://www.alphavantage.co/ donde luego del registro nos proporciona una API KEY para hacer consultas más específicas.

> API KEY = F8FQHP6JAVCTY6OI

## 💪POR MEJORAR
### FRONT
- Validaciones de inputs- Mejorar la asignación de valores a los flags que controlan los ngIf de las cards
- Mejorar la transición entre las cards
- Buscar en el manual de marca el tipo de letra exacto de Fintual
- En los resultados podría salir el logo de la acción que estamos calculando
- Al "Calcular de nuevo" dependería del valor que le de al cliente si borrar los datos de la última consulta o no
- Se podría mejorar la visualización de la selección de los DATES para que sólo se mostrarán los meses (ya que son los que realmente estamos procesando), pero esto dependerá de lo que se vaya a considerar como fuera la "versión final"

### BACK
- Manejo de errores en ambas llamadas de la API
- Hace un api docs para compartir
- Podemos cambiar la url de la API como variable de entorno para evitar los datos en duro
- Con una lista de stocks, podriamos hacer mas modulares las selecciones y las opciones (stocks) que tenemos disponibles 
- Podriamos hacer mas Standard los console logs que nos muestra la API cuando hacemos una consulta

#### 🌟GENERAL Y CONSIDERACIONES
- Como estamos trabajando con una API pública que nos brinda los datos, se decidió solo la llamada para tener la rentabilidad por mes.
- Podríamos crear un método que tome los datos anuales, mensuales y diarios para que con un cron se ejecute y guarden los datos en una Base de Datos y así poder hacer consultas más específicas.
- Con los dos puntos anteriores se podría hacer consultas donde evaluemos y procesamos la rentabilidad vista desde días en vez de meses


######  🌐 Página web http://leonelveliz.com/

