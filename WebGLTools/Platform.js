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
    retrieveLaunchParams(){
        return  {
            botInline: true,
            initData:  {
                authDate: this.m_telegram.WebApp.initDataUnsafe.auth_date,
                chatInstance: this.m_telegram.WebApp.initDataUnsafe.chat_instance,
                chatType: this.m_telegram.WebApp.initDataUnsafe.chat_type,
                hash: this.m_telegram.WebApp.initDataUnsafe.hash,
                user:{
                    allowsWriteToPm: this.m_telegram.WebApp.initDataUnsafe.user.allows_write_to_pm,
                    firstName: this.m_telegram.WebApp.initDataUnsafe.user.first_name,
                    id: this.m_telegram.WebApp.initDataUnsafe.user.id,
                    languageCode: this.m_telegram.WebApp.initDataUnsafe.user.language_code,
                    lastName: this.m_telegram.WebApp.initDataUnsafe.user.last_name,
                    photoUrl: this.m_telegram.WebApp.initDataUnsafe.user.photo_url,
                    username: this.m_telegram.WebApp.initDataUnsafe.user.username,
                }
            },
            initDataRaw: this.m_telegram.WebApp.initData,
            platform: this.m_telegram.WebApp.platform,
            themeParams: this.m_telegram.WebApp.themeParams,
            version: this.m_telegram.WebApp.version
        };
    }
    addToHomeScreen()
    {
        this.m_telegram.WebApp.addToHomeScreen();
    }
    checkHomeScreenStatus(tgEventName)
    {
        this.m_telegram.WebApp.checkHomeScreenStatus((status) => {
            var eventType= tgEventName;
            var eventJson= JSON.stringify({"status": status});
            var eventData = { eventType, eventJson };
            unityInstanceRef.SendMessage("SDKCallbackMono", "TelegramEvents", JSON.stringify(eventData));
        });
    }
}

var platform = new Platform();
