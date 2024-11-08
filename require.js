import {$createRequestId, $debug, $postEvent, $targetOrigin, $version, CancelablePromise, ERR_ABORTED, shareURL} from "./@telegram-apps/sdk/dist/index.js";

(function () {
  import{
    $createRequestId,
    $debug,
    $postEvent,
    $targetOrigin,
    $version,
    CancelablePromise,
    ERR_ABORTED,
    ERR_ACCESS_DENIED,
    ERR_ALREADY_CALLED,
    ERR_CANCELED,
    ERR_CUSTOM_METHOD_ERR_RESPONSE,
    ERR_DATA_INVALID_SIZE,
    ERR_INVALID_HOSTNAME,
    ERR_INVALID_SLUG,
    ERR_INVALID_VALUE,
    ERR_METHOD_PARAMETER_UNSUPPORTED,
    ERR_METHOD_UNSUPPORTED,
    ERR_NOT_AVAILABLE,
    ERR_NOT_MOUNTED,
    ERR_NOT_SUPPORTED,
    ERR_PARSE,
    ERR_POPUP_INVALID_PARAMS,
    ERR_RETRIEVE_LP_FAILED,
    ERR_TIMED_OUT,
    ERR_UNEXPECTED_TYPE,
    ERR_UNEXPECTED_VALUE,
    ERR_UNKNOWN_ENV,
    TypedError,
    addEventListener,
    authenticateBiometry,
    backButton,
    bindMiniAppCssVars,
    bindThemeParamsCssVars,
    bindViewportCssVars,
    biometry,
    biometryMountError,
    biometryState,
    classNames,
    closeMiniApp,
    closeQrScanner,
    closingBehavior,
    cloudStorage,
    compareVersions,
    createPostEvent,
    defineEventHandlers,
    deleteCloudStorageItem,
    deleteCssVar,
    disableClosingConfirmation,
    disableVerticalSwipes,
    emitMiniAppsEvent,
    enableClosingConfirmation,
    enableVerticalSwipes,
    expandViewport,
    getCloudStorageItem,
    getCloudStorageKeys,
    hapticFeedback,
    hapticFeedbackImpactOccurred,
    hapticFeedbackNotificationOccurred,
    hapticFeedbackSelectionChanged,
    hideBackButton,
    hideSettingsButton,
    init,
    initData,
    initDataAuthDate,
    initDataCanSendAfter,
    initDataCanSendAfterDate,
    initDataChat,
    initDataChatInstance,
    initDataChatType,
    initDataHash,
    initDataQueryId,
    initDataRaw,
    initDataReceiver,
    initDataStartParam,
    initDataState,
    initDataUser,
    invoice,
    invokeCustomMethod,
    isAbortError,
    isAuthenticatingBiometry,
    isBackButtonMounted,
    isBackButtonSupported,
    isBackButtonVisible,
    isBiometryMounted,
    isBiometryMounting,
    isBiometrySupported,
    isCanceledError,
    isClosingBehaviorMounted,
    isClosingConfirmationEnabled,
    isCloudStorageSupported,
    isColorDark,
    isHapticFeedbackSupported,
    isIframe,
    isInvoiceOpened,
    isInvoiceSupported,
    isMainButtonEnabled,
    isMainButtonLoaderVisible,
    isMainButtonMounted,
    isMainButtonVisible,
    isMiniAppCssVarsBound,
    isMiniAppDark,
    isMiniAppMounted,
    isMiniAppSupported,
    isPopupOpened,
    isPopupSupported,
    isQrScannerOpened,
    isQrScannerSupported,
    isRGB,
    isRGBShort,
    isRecord,
    isRequestingBiometryAccess,
    isRequestingPhoneAccess,
    isRequestingWriteAccess,
    isSSR,
    isSecondaryButtonEnabled,
    isSecondaryButtonLoaderVisible,
    isSecondaryButtonMounted,
    isSecondaryButtonSupported,
    isSecondaryButtonVisible,
    isSettingsButtonMounted,
    isSettingsButtonSupported,
    isSettingsButtonVisible,
    isSwipeBehaviorMounted,
    isSwipeBehaviorSupported,
    isTMA,
    isThemeParamsCssVarsBound,
    isThemeParamsDark,
    isThemeParamsMounted,
    isTimeoutError,
    isVerticalSwipesEnabled,
    isViewportCssVarsBound,
    isViewportExpanded,
    isViewportMounted,
    isViewportMounting,
    isViewportStable,
    mainButton,
    mainButtonBackgroundColor,
    mainButtonHasShineEffect,
    mainButtonState,
    mainButtonText,
    mainButtonTextColor,
    mergeClassNames,
    miniApp,
    miniAppBackgroundColor,
    miniAppBottomBarColor,
    miniAppBottomBarColorRGB,
    miniAppHeaderColor,
    miniAppHeaderColorRGB,
    miniAppReady,
    miniAppState,
    mockTelegramEnv,
    mountBackButton,
    mountBiometry,
    mountClosingBehavior,
    mountMainButton,
    mountMiniApp,
    mountSecondaryButton,
    mountSettingsButton,
    mountSwipeBehavior,
    mountThemeParams,
    mountViewport,
    off,
    offBackButtonClick,
    offMainButtonClick,
    offSecondaryButtonClick,
    offSettingsButtonClick,
    on,
    onBackButtonClick,
    onMainButtonClick,
    onSecondaryButtonClick,
    onSettingsButtonClick,
    openBiometrySettings,
    openInvoice,
    openLink,
    openPopup,
    openQrScanner,
    openTelegramLink,
    parseInitData,
    parseThemeParams,
    popup,
    postEvent,
    qrScanner,
    readTextFromClipboard,
    removeEventHandlers,
    request,
    requestBiometry,
    requestBiometryAccess,
    requestContact,
    requestPhoneAccess,
    requestWriteAccess,
    restoreInitData,
    retrieveLaunchParams,
    secondaryButton,
    secondaryButtonBackgroundColor,
    secondaryButtonHasShineEffect,
    secondaryButtonPosition,
    secondaryButtonState,
    secondaryButtonText,
    secondaryButtonTextColor,
    sendData,
    serializeLaunchParams,
    serializeThemeParams,
    setCloudStorageItem,
    setCssVar,
    setMainButtonParams,
    setMiniAppBackgroundColor,
    setMiniAppBottomBarColor,
    setMiniAppHeaderColor,
    setSecondaryButtonParams,
    settingsButton,
    shareStory,
    shareURL,
    showBackButton,
    showSettingsButton,
    subscribe,
    supports,
    swipeBehavior,
    switchInlineQuery,
    themeParams,
    themeParamsAccentTextColor,
    themeParamsBackgroundColor,
    themeParamsBottomBarBgColor,
    themeParamsButtonColor,
    themeParamsButtonTextColor,
    themeParamsDestructiveTextColor,
    themeParamsHeaderBackgroundColor,
    themeParamsHintColor,
    themeParamsLinkColor,
    themeParamsSecondaryBackgroundColor,
    themeParamsSectionBackgroundColor,
    themeParamsSectionHeaderTextColor,
    themeParamsSectionSeparatorColor,
    themeParamsState,
    themeParamsSubtitleTextColor,
    themeParamsTextColor,
    toRGB,
    toRecord,
    unmountBackButton,
    unmountBiometry,
    unmountClosingBehavior,
    unmountMainButton,
    unmountMiniApp,
    unmountSecondaryButton,
    unmountSettingsButton,
    unmountSwipeBehavior,
    unmountThemeParams,
    unmountViewport,
    unsubscribe,
    updateBiometryToken,
    viewport,
    viewportHeight,
    viewportMountError,
    viewportStableHeight,
    viewportState,
    viewportWidth
  } 
  from "@telegram-apps/sdk/dist/index.js";
        
  window.telegramApps = window.telegramApps || {};
  window.telegramApps.sdk = window.telegramApps.sdk || {};
  
  window.telegramApps.sdk.shareURL = shareURL;
  
})();
