const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const shell = require('shelljs');
const path = require('path');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para servir la página HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint para compilar y ejecutar el código Java
app.post('/compile-and-run-java', (req, res) => {
    const javaCode = req.body.code;
    const fileName = 'Main.java';
    // Guardar el código Java en un archivo
    shell.ShellString(javaCode).to(fileName);
    
    // Compilar el código Java
    const compileResult = shell.exec(`javac ${fileName}`, { silent: true });
    if (compileResult.code !== 0) {
        return res.status(400).json({ error: 'Error al compilar el código Java' });
    }

    // Ejecutar el código compilado
    const executionResult = shell.exec(`java Main`, { silent: true });
    const output = executionResult.stdout || executionResult.stderr;
    res.json({ output });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
