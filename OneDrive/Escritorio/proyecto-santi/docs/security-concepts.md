# Security Concepts – Explicación en palabras propias

## 1. Rate-Limit
El *rate-limit* es una forma de controlar cuántas veces una persona o una aplicación puede hacer peticiones a un servidor en un periodo de tiempo. Sirve para evitar abusos, ataques automatizados y que el servidor se sature.

### Ejemplo real:
Si una API permite máximo 100 peticiones por minuto por usuario, y alguien intenta hacer 500 en 10 segundos, el servidor lo detiene temporalmente para proteger el sistema.

---

## 2. CORS
CORS (Cross-Origin Resource Sharing) es una regla de seguridad que decide desde qué sitios web externos se puede acceder a un servidor. Existe porque los navegadores bloquean por defecto las solicitudes que vienen de un dominio diferente para evitar que páginas maliciosas roben información.

### Ejemplo real:
Tu backend está en `api.miproyecto.com` y tu frontend está en `miproyecto.com`. Aunque son del mismo proyecto, son dominios distintos. Para permitir que el frontend use la API, debes habilitar CORS para ese dominio.

---

## 3. JWT (JSON Web Token)
Un JWT es un token, es decir, un “boleto digital” que se entrega a un usuario cuando inicia sesión correctamente. El token tiene tres partes:
- **Header:** tipo de token y algoritmo.
- **Payload:** información como id del usuario, rol, fecha de expiración.
- **Signature:** una firma que garantiza que el token no fue alterado.

Se usa para mantener sesiones sin guardar datos en el servidor: cada petición incluye el token y el servidor verifica si es válido.

### Ejemplo real:
Cuando un usuario inicia sesión en una app, se le entrega un JWT. Cada vez que quiere ver tareas o editar algo, manda el token. Si el token es válido, la API lo deja entrar sin pedirle la contraseña otra vez.

