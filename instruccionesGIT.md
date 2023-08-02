# **GIT FLOW**

1. `git status` para ver los archivos editados
2. `git add .` para agregar todos los cambios
3. `git status` para vefiricar los cambios hechos
4. `git commit -m 'mensaje + nombre de cada uno o iniciales'`
5. `git push origin` (NOMBRE DE SU RAMA) para puchear los cambion solo a su rama
6. `git checkout` Nombre de la rama a la que quiero ir
7. `git merge` nombre de la rama de la cual quiere actualizar
8. `git push origin beta` para actualizar los cambios hechos que usted pusheo en su rama y actualizo con git merge a la rama local
   beta ahora con el git push origin beta actualiza el repo en la rama beta para luego hacer un pull request para actualizar main
9. `git pull origin beta` para actualizar cualquier rama desde la rama beta del repositorio ideal
   actualizar la rama local beta con la rama del repo beta y luego hacer un git merge desde su rama
