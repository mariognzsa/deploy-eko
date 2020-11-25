# eko-webpage-frontend

# Comandos útiles:
## Git.
- Clonar el repositorio
```
git clone <url del repo>
```
- Crear una nueva rama
```
git checkout -b <nueva rama>
```
- Cambiar entre ramas
```
git checkout <rama>
```
- Ver el estado de la rama actual, aqui se listan en Verde los cambios agregados con "add" para el commit, y en Rojo los cambios que aun no son agregados.
```
git status
```
- Agregar archivos al commit
```
git add <rutas de archivos>
```
- Realizar un commit
```
git commit -m "<titulo del commit>"
```
- Actualizar los cambios en la rama remota
```
git push origin <rama local>
```
- Traer cambios de una rama remota al local
```
git pull
```
- Mezclar otra rama con la actual (Asegurate con "status" de estar en la rama a la que fusionaras los cambios)
```
git merge <rama a fusionar>
```

## Vue
- Instalar el proyecto
```
npm install
```
- Levantar el servidor de pruebas con Hot-reload
```
npm run serve
```
- Compila el codigo para produccion
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
