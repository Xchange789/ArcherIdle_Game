(function () {
    class Platform {
        reload() {
            window.location.reload();
        }
        init() {
            this.m_telegram = window['Telegram'];
            this.m_telegram.WebApp.enableClosingConfirmation();
        }
        openLink(url) {
            this.m_telegram.WebApp.openLink(url);
        }
        openTelegramLink(url) {
            this.m_telegram.WebApp.openTelegramLink(url);
        }
        openInvoice(url) {
            return new Promise((resolve, reject) => {
                this.m_telegram.WebApp.openInvoice(url, (status) => {
                    console.log("payment status==>" + status);
                    if (status == "paid") {
                        resolve();
                    }
                });
            });
        }
        enableClosingConfirmation() {
            this.m_telegram.WebApp.enableClosingConfirmation();
        }
        disableClosingConfirmation() {
            this.m_telegram.WebApp.disableClosingConfirmation();
        }
        closeApp() {
            this.m_telegram.WebApp.close();
        }
        clipboard(text) {
            return new Promise((resolve, reject) => {
                if (!text) {
                    reject();
                    return;
                }
                this.writeText(text).then(() => {
                    resolve();
                }).catch(() => {
                    this.execCopy(text).then(() => {
                        resolve();
                    }).catch(() => {
                        reject();
                    });
                });
            });
        }
        writeText(text) {
            return new Promise((resolve, reject) => {
                if (!navigator || !navigator.clipboard) {
                    reject();
                    return;
                }
                navigator.clipboard.writeText(text).then(() => {
                    resolve();
                }).catch(() => {
                    console.log('writeText error');
                    reject();
                });
            });
        }
        execCopy(text) {
            return new Promise((resolve, reject) => {
                let textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "absolute";
                textArea.style.opacity = "0";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                let success = document.execCommand('copy');
                textArea.remove();
                if (success) {
                    resolve();
                }
                else {
                    reject();
                }
            });
        }
    }
    const platform = new Platform();
}());
