const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { createPuppeteerBrowserInstance, grantPermissionForAudioAndVideo, fetchSigninClassSelector, fetchJoinMeetClassSelector, fetchEndMeetClassSelector, fetchChatTextBoxClassSelector, fetchChatTextBoxSendClassSelector, fetchChatTextBoxButtonClassSelector, fetchChangeLayoutButtonSelector, fetchCloseChatTextBoxClassSelector, fetchMoreOptionsClassSelector, fetchChangeLayoutClassSelector, fetchShowParticipantsClassSelector, fetchMeetingHostClassSelector } = require('../services/google-meet');
puppeteer.use(StealthPlugin());
const axios = require("axios");

let browser, page, intervalId;

const startMeeting = async (req, res) => {
    const { meetingLink } = req?.body;

    if (!meetingLink) {
        res.status(400).send({ message: 'Bad request - Meeting link cannot be empty' })
    }
    browser = await createPuppeteerBrowserInstance();
    page = await browser.newPage();
    await grantPermissionForAudioAndVideo(page);
    await page.setExtraHTTPHeaders({
        'accept-language': 'en-US,en;q=0.9,hy;q=0.8'
    });

    await page.goto(`${meetingLink}?authuser=0&pli=1`);

    await page.waitForTimeout(5000);

    const signinClassSelector = fetchSigninClassSelector();

    await page.waitForSelector(signinClassSelector, { visible: true, clickable: true });


    await page.click(signinClassSelector);

    await page.waitForSelector('input[type="email"]')
    await page.type('input[type="email"]', process.env.GOOGLE_USERNAME);
    await Promise.all([
        page.waitForNavigation(),
        await page.keyboard.press('Enter')
    ]);
    await page.waitForSelector('input[type="password"]', { visible: true });
    await page.type('input[type="password"]', process.env.GOOGLE_PASSWORD);

    await Promise.all([
        page.waitForNavigation(),
        await page.keyboard.press('Enter')
    ]);

    await page.waitForTimeout(10000);

    await page.keyboard.down('Control');

    await page.keyboard.press('D');

    await page.keyboard.up('Control');

    await page.keyboard.down('Control');

    await page.keyboard.press('E');

    await page.keyboard.up('Control');

    const joinMeetClassSelector = fetchJoinMeetClassSelector()
    await page.waitForSelector(joinMeetClassSelector, { visible: true, clickable: true });

    await page.click(joinMeetClassSelector);

    await page.waitForTimeout(2000);

    intervalId = setInterval(checkForParticipantsAndHost, 120000);

    res.status(200).send({ message: 'Successfully joined meeting' })
}

const checkForParticipantsAndHost = async () => {
    const showParticipantsClassSelector = fetchShowParticipantsClassSelector()
    await page.waitForSelector(showParticipantsClassSelector, { visible: true, clickable: true });
    await page.click(showParticipantsClassSelector);
    await page.waitForTimeout(2000);

    const participantsClassName = 'zWGUib';
    const participants = await page.evaluate(className => {
        const spanElements = document.querySelectorAll('.' + className);
        console.log(spanElements)
        return Array.from(spanElements, element => element.textContent);
    }, participantsClassName);

    const meetingHostClassSelector = fetchMeetingHostClassSelector();
    await page.waitForSelector(meetingHostClassSelector);

    const meetingHost = await page.evaluate((className) => {
        const elements = document.querySelectorAll(className);

        const nonEmptyElements = Array.from(elements).filter(element => element.textContent.trim() !== '');

        return nonEmptyElements.map(element => element.textContent.trim());
    }, meetingHostClassSelector);

    await axios.post(
        `${process.env.MEET_BOT_SERVER_BASE_URL}/google-meet/participant-and-host-details`,
        {
            participants,
            hasHostJoined: meetingHost?.length ? "Yes" : "No"
        }
    );
}

const endMeeting = async (req, res) => {
    const { meetingLink } = req?.body;

    if (!meetingLink) {
        res.status(400).send({ message: 'Bad request - Meeting link cannot be empty' })
    }

    const endMeetClassSelector = fetchEndMeetClassSelector();
    await page.waitForSelector(endMeetClassSelector, { visible: true, clickable: true });


    await page.click(endMeetClassSelector);

    clearInterval(intervalId);

}

const sendMessageToParticipants = async (req, res) => {
    try {
        const { message } = req?.body;

        if (!message) {
            res.status(400).send({ message: 'Bad request - Message cannot be empty' })
        }

        const chatTextBoxButtonClassSelector = fetchChatTextBoxButtonClassSelector();
        await page.waitForSelector(chatTextBoxButtonClassSelector, { visible: true, clickable: true });
        await page.click(chatTextBoxButtonClassSelector);

        await page.waitForTimeout(2000);

        const chatTextBoxClassSelector = fetchChatTextBoxClassSelector();
        await page.waitForSelector(chatTextBoxClassSelector);


        await page.type(chatTextBoxClassSelector, message);

        await page.waitForTimeout(2000);


        const chatTextBoxSendClassSelector = fetchChatTextBoxSendClassSelector();

        await page.waitForSelector(chatTextBoxSendClassSelector, { visible: true, clickable: true });


        await page.click(chatTextBoxSendClassSelector);

        await page.waitForTimeout(2000);

        const closeChatTextBoxClassSelector = fetchCloseChatTextBoxClassSelector();

        await page.waitForSelector(closeChatTextBoxClassSelector, { visible: true, clickable: true });


        await page.click(closeChatTextBoxClassSelector);


        res.status(200).send({ message: 'Successfully sent message to participants in the meeting' })
    }
    catch (err) {
        res.status(500).send({
            message: 'Error occurred while sending message to participants'
        })
    }
}

const muteUnmuteMicrophone = async (req, res) => {
    try {
        await page.keyboard.down('Control');

        await page.keyboard.press('D');

        await page.keyboard.up('Control');

        res.status(200).send({ message: 'Successfully muted or unmuted microphone' })
    }
    catch (err) {
        res.status(500).send({ message: 'Error occurred while muting unmuting microphone' })
    }
}

const changeLayout = async (req, res) => {
    try {
        const moreOptionsClassSelector = fetchMoreOptionsClassSelector();
        await page.waitForSelector(moreOptionsClassSelector, { visible: true, clickable: true });


        await page.click(moreOptionsClassSelector);

        await page.waitForTimeout(2000);

        const changeLayoutClassSelector = fetchChangeLayoutClassSelector();

        await page.waitForSelector(changeLayoutClassSelector, { visible: true, clickable: true });


        await page.click(changeLayoutClassSelector);
        res.status(200).send({ message: 'Successfully changed layout' })
    }
    catch (err) {
        res.status(500).send({ message: 'Error occurred while changing layout' })
    }
}

module.exports = {
    startMeeting,
    endMeeting,
    sendMessageToParticipants,
    muteUnmuteMicrophone,
    changeLayout
}