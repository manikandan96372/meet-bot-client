const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const createPuppeteerBrowserInstance = async () => {
    const browser = await puppeteer.launch({ headless: false, args: ['--use-fake-ui-for-media-stream'] });
    return browser;
}

const grantPermissionForAudioAndVideo = async (page) => {
    await page.evaluate(() => {
        (async () => {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            mediaStream.getTracks().forEach(track => track.stop());
        })()
    });
}

const fetchSigninClassSelector = () => {
    const classList = ["uArJ5e", "UQuaGc", "kCyAyd", "kmEk3c"];
    const signinClassSelector = classList.map(className => `.${className}`).join('');
    return signinClassSelector
}

const fetchJoinMeetClassSelector = () => {
    const classList = ["VfPpkd-LgbsSe", "VfPpkd-LgbsSe-OWXEXe-k8QpJ", "VfPpkd-LgbsSe-OWXEXe-dgl2Hf", "nCP5yc", "AjY5Oe", "DuMIQc", "LQeN7", "jEvJdc", "QJgqC"];
    const joinMeetClassSelector = classList.map(className => `.${className}`).join('');
    return joinMeetClassSelector
}

const fetchEndMeetClassSelector = () => {
    const classList = ["NHaLPe"];
    const endMeetClassSelector = classList.map(className => `.${className}`).join('');
    return endMeetClassSelector
}

const fetchChatTextBoxButtonClassSelector = () => {
    const ariaLabelValue = 'Chat with everyone';
    const chatTextBoxButtonClassSelector = `[aria-label="${ariaLabelValue}"]`;
    return chatTextBoxButtonClassSelector
}

const fetchChatTextBoxClassSelector = () => {
    const classList = ["VfPpkd-fmcmS-wGMbrd", "rfurme"];
    const chatTextBoxClassSelector = classList.map(className => `.${className}`).join('');
    return chatTextBoxClassSelector
}

const fetchChatTextBoxSendClassSelector = () => {
    const classList = ["VfPpkd-Bz112c-LgbsSe", "yHy1rc", "eT1oJ", "QDwDD", "tWDL4c", "Cs0vCd"];
    const chatTextBoxSendClassSelector = classList.map(className => `.${className}`).join('');
    return chatTextBoxSendClassSelector
}

const fetchChangeLayoutButtonSelector = () => {
    const classList = ["VfPpkd-Bz112c-LgbsSe", "yHy1rc", "eT1oJ", "tWDL4c", "uaILN"];
    const changeLayoutButtonSelector = classList.map(className => `.${className}`).join('');
    return changeLayoutButtonSelector
}

const fetchCloseChatTextBoxClassSelector = () => {
    const classList = ["VfPpkd-Bz112c-LgbsSe", "yHy1rc", "eT1oJ", "IWtuld"];
    const closeChatTextBoxClassSelector = classList.map(className => `.${className}`).join('');
    return closeChatTextBoxClassSelector;
}

const fetchMoreOptionsClassSelector = () => {
    const ariaLabelValue = 'More options';
    const moreOptionsClassSelector = `[aria-label="${ariaLabelValue}"]`;
    return moreOptionsClassSelector
}

const fetchChangeLayoutClassSelector = () => {
    const classList = ["V4jiNc", "VfPpkd-StrnGf-rymPhb-ibnC6b"];
    const changeLayoutClassSelector = classList.map(className => `.${className}`).join('');
    return changeLayoutClassSelector;
}

const fetchShowParticipantsClassSelector = () => {
    const ariaLabelValue = 'Show everyone';
    const showParticipantsClassSelector = `[aria-label="${ariaLabelValue}"]`;
    return showParticipantsClassSelector;
}

const fetchMeetingHostClassSelector = () => {
    const classList = ["d93U2d", "qrLqp"];
    const meetingHostClassSelector = classList.map(className => `.${className}`).join('');
    return meetingHostClassSelector;
}

module.exports = {
    createPuppeteerBrowserInstance,
    grantPermissionForAudioAndVideo,
    fetchSigninClassSelector,
    fetchJoinMeetClassSelector,
    fetchEndMeetClassSelector,
    fetchChatTextBoxButtonClassSelector,
    fetchChatTextBoxClassSelector,
    fetchChatTextBoxSendClassSelector,
    fetchChangeLayoutButtonSelector,
    fetchCloseChatTextBoxClassSelector,
    fetchMoreOptionsClassSelector,
    fetchChangeLayoutClassSelector,
    fetchShowParticipantsClassSelector,
    fetchMeetingHostClassSelector
}