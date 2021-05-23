const googleTTS = require('google-tts-api');
const fs = require("fs");
const { exec } = require("child_process");

module.exports = class ReaderNotification {

    constructor() {
        this._language;
        this._slow = false;
    }

    language(language) {
        this._language = language;
        return this;
    }

    listenNewMessage(messageQueue) {
        setInterval(async () => {
            const text = messageQueue.getItemInTop();
            if (!messageQueue.isEmpty() && text) this.read(text);
        }, 10000);
    }

    async read(text) {
        const audioBase64 = await googleTTS
            .getAudioBase64(text, { lang: this._language, slow: this._slow });
        const buffer = Buffer.from(audioBase64, 'base64');
        fs.writeFileSync('audio.mp3', buffer, { encoding: 'base64' });
        exec("rhythmbox ./audio.mp3 &", async function(error, stdout, stderr) {
           
            if (error) {
                console.log(error);
            } else if (stderr) {
                console.log(stderr)
            } else {
                console.log("Play audio of message: " + text);
            }
        })
    }
}