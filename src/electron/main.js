const {app, BrowserWindow} = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        
        width: 1300,
        height: 750,
    
    })

    win.loadFile('dist-react/index.html')
}

app.whenReady().then(()=>{

    createWindow()

})