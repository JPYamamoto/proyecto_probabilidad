# Extensión Chrome

# page action
El codigo (html, css y js) que ese ejecuta cuando abrir el popup de la extensión
se encarga de enviarle mensaje al controlador para empezar la cadena de
envio de mensajes

# bg
El codigo js que se ejecuta en el fondo mientras la extension este activa,
su unica funcion es tomar los mensaje generados por el popup, pedir que se
parsee el dom paraa obtener la informacion y luego hacer el analisis

# inject
Codigo que se ejecuta sobre la pagina principal que el usuario ve (en este caso
amazon), se encarga de coordinar el parseo de a informacion y su analisis