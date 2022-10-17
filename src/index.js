const {app, BrowserWindow} = require('electron');
const path = require('path');

// Fonction qui va être appelée quand l'application sera prête
// Elle va créer une fenêtre d'une certaine taille et
// injecter un fichier HTML dedans
function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 1200,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // __dirname permet de renvoyer le chemin absolu du projet
    // pratique une fois en prod pour ne jamais avoir de soucis
    win.loadFile(path.join(__dirname, 'views', 'home', 'home.html'));
}

app.whenReady()
    .then(() => {
        createWindow()
        // Stuff Mac
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        })
    })
    .catch((error) => {
        console.log("Error in whenReady : ", error);
    });

// Stuff Windows & Linux
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})