function bindNav(buttonId, targetId) {
    const button = document.getElementById(buttonId);
    const target = document.getElementById(targetId);

    if (!button || !target) {
        console.warn("Navigation missing:", buttonId, targetId);
        return;
    }

    button.addEventListener("click", function () {
        showPage(target);
    });
}

function bindBack(buttonId, targetId) {
    const button = document.getElementById(buttonId);
    const target = document.getElementById(targetId);

    if (!button || !target) {
        console.warn("Back navigation missing:", buttonId, targetId);
        return;
    }

    button.addEventListener("click", function () {
        showPage(target);
    });
}


/* =========================================
   SDG-E WEBSITE — FINAL SCRIPT
========================================= */

const $ = (id) => document.getElementById(id);
const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

const pageOne = $("pageOne");
const pageTwo = $("pageTwo");

function showPage(page) {

    const allPages = qsa(".page");

    // Restore anything hidden by a previously opened detail page.
    qsa('[data-page-nav-hidden="true"]').forEach(child => {

        child.style.removeProperty("display");
        child.removeAttribute("data-page-nav-hidden");

    });

    // Hide every page.
    allPages.forEach(p => {
        p.classList.remove("active");
    });

    if (!page) {
        return;
    }

    /*
        IMPORTANT:
        The detail pages are currently nested inside #pageTwo.

        Example:

        pageTwo
          ├── dashboard
          ├── partsPage
          ├── areaInfoPage
          ├── codingPage
          └── ...

        If we activate partsPage while pageTwo is hidden,
        partsPage also becomes invisible.

        So we keep pageTwo active and temporarily hide
        its dashboard children.
    */

    const hostPage = page.parentElement
        ? page.parentElement.closest(".page")
        : null;

    if (hostPage && hostPage !== page) {

        // Keep the parent page visible.
        hostPage.classList.add("active");

        // Hide everything inside the parent except
        // the detail page we want.
        [...hostPage.children].forEach(child => {

            if (child !== page) {

                child.style.setProperty(
                    "display",
                    "none",
                    "important"
                );

                child.setAttribute(
                    "data-page-nav-hidden",
                    "true"
                );

            }

        });

        // Show the selected detail page.
        page.classList.add("active");

    } else {

        // Normal top-level page.
        page.classList.add("active");

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* =========================================
   PAGE NAVIGATION
========================================= */

bindNav("continueButton", "pageTwo");
bindBack("backButton", "pageOne");

bindNav("partsBox", "partsPage");
bindBack("partsBackButton", "pageTwo");
bindBack("partsBottomBack", "pageTwo");

bindNav("areaInfoBox", "areaInfoPage");
bindBack("areaInfoBackButton", "pageTwo");
bindBack("areaInfoBottomBack", "pageTwo");

bindNav("partnershipBox", "partnershipPage");
bindBack("partnershipBackButton", "pageTwo");
bindBack("partnershipBottomBack", "pageTwo");

bindNav("silMentorBox", "silMentorPage");
bindBack("silMentorBackButton", "pageTwo");
bindBack("silMentorBottomBack", "pageTwo");

bindNav("codingBox", "codingPage");
bindBack("codingBackButton", "pageTwo");
bindBack("codingBottomBack", "pageTwo");

bindNav("resultsBox", "resultsPage");
bindBack("resultsBackButton", "pageTwo");
bindBack("resultsBottomBack", "pageTwo");

/* =========================================
   EXPLAINING BOT
========================================= */

const explainingBotPage = $("explainingBotPage");
const explainingBotBox = $("explainingBotBox");
const explainingBotBackButton = $("explainingBotBackButton");
const explainingBotChat = $("explainingBotChat");
const explainingBotInput = $("explainingBotInput");
const explainingBotSendButton = $("explainingBotSendButton");

bindNav("explainingBotBox", "explainingBotPage");
bindBack("explainingBotBackButton", "pageTwo");

function cleanBotText(text) {
    return text.replace(/\s+/g, " ").trim();
}

function getBotCardData(selector) {
    return qsa(selector).map(card => {
        const title = cleanBotText(qs("h2", card)?.textContent || "");
        const subtitle = cleanBotText(qs("h3", card)?.textContent || "");

        const details = qsa("p, li", card)
            .map(item => cleanBotText(item.textContent))
            .filter(Boolean)
            .join(" ");

        return [title, subtitle, details]
            .filter(Boolean)
            .join(" — ");
    });
}

function getBotAreaData() {
    return qsa(".area-info-card").map(card => {
        return cleanBotText(qs("h2", card)?.textContent || "") +
            ": " +
            cleanBotText(qs("p", card)?.textContent || "");
    });
}

/* =========================================
   REAL PROJECT SUMMARY
========================================= */

function getBotExplanation() {

    return [
        "🤖 SDG-E PROJECT SUMMARY",
        "",
        "Our project is a robot system designed around soil moisture monitoring and robot functions. It uses three Micro:bits, an Avishkaar Microcontroller, sensors, metal construction parts, strong DC motors and power switches.",
        "",
        "🌱 SOIL MOISTURE SYSTEM",
        "The first Micro:bit reads the soil moisture sensor. When the soil is detected as WET, that reading can be sent through the system. The third Micro:bit receives the WET reading and lights its LED to show that the soil has sufficient moisture.",
        "",
        "⚙️ ROBOT FUNCTIONS",
        "The second Micro:bit handles extra functions including the battery system, animations, speaker and radio broadcasting. The Avishkaar Microcontroller controls the robot's hatch. Strong DC motors drive the two wheels, and power switches control the motor system.",
        "",
        "👥 TEAM",
        "Eshaan Kannan handles mechanical work and technical support, including wiring fixes and ideas. Sidharth Sukumar works on mechanics, coding, ideas and model/mechanical creations, and helps lead the parts and project work.",
        "",
        "📍 PROJECT INFORMATION",
        "Country: India | State: Kerala | City: Kasaragod | School: TGES — The Guardian English School.",
        "",
        "🆔 SIL INFORMATION",
        "SIL Unique ID: SIL2265157 | Mentor: Ms. Seema.",
        "",
        "💻 CODING",
        "The project uses MakeCode for three Micro:bits and Avishkaar coding for the Avishkaar Micro Controller.",
        "",
        "🧪 TESTING",
        "Final test results have not been added yet. They will be added after testing."
    ].join("\n");

}

function answerExplainingBot(question) {

    const q =
        question.toLowerCase().trim();

    if (!q) {
        return "Type a question about the SDG-E project.";
    }

    if (
        q === "hi" ||
        q === "hello" ||
        q === "hey"
    ) {
        return "Hey! Ask me about Parts, Area Info, Partnership, the SIL ID and mentor, Robots Coding, Results, or type explain.";
    }

    if (
        /explain|full project|whole project|summary|overview/.test(q)
    ) {
        return getBotExplanation();
    }

    if (
        /part|component|hardware|motor|sensor/.test(q)
    ) {
        return "PARTS: " +
            getBotCardData(
                "#partsPage .part-card"
            ).join(" | ");
    }

    if (
        /area|where|country|state|city|school|location/.test(q)
    ) {
        return "AREA INFO: " +
            getBotAreaData().join(" | ");
    }

    if (
        /partner|team|eshaan|sidharth|dut/.test(q)
    ) {
        return "PARTNERSHIP AND DUTIES: " +
            getBotCardData(
                "#partnershipPage .partner-card"
            ).join(" | ");
    }

    if (
        /mentor|sil|unique id|seema/.test(q)
    ) {
        return "SIL UNIQUE ID AND MENTOR: " +
            getBotCardData(
                "#silMentorPage .sil-info-card"
            ).join(" | ");
    }

    if (
        /coding|code|micro:bit|microbit|makecode|avishkaar/.test(q)
    ) {
        return "ROBOTS CODING: " +
            getBotCardData(
                "#codingPage .coding-card"
            ).join(" | ");
    }

    if (
        /result|test|testing|observation/.test(q)
    ) {
        return "RESULTS AFTER TEST: " +
            getBotCardData(
                "#resultsPage .results-coming-soon"
            ).join(" | ");
    }

    return "I only know the information in the six SDG-E sections. Try asking about parts, area, partners, mentor, coding, results, or type explain.";
}

/* =========================================
   DATE + TIME
========================================= */

function getBotTimestamp() {

    const now =
        new Date();

    const date =
        now.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

    const time =
        now.toLocaleTimeString(
            "en-IN",
            {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            }
        );

    return date +
        " • " +
        time;
}

/* =========================================
   COPY
========================================= */

function fallbackCopyBotText(
    text,
    button
) {

    const textarea =
        document.createElement(
            "textarea"
        );

    textarea.value =
        text;

    textarea.style.position =
        "fixed";

    textarea.style.opacity =
        "0";

    document.body.appendChild(
        textarea
    );

    textarea.select();

    try {

        document.execCommand(
            "copy"
        );

        button.textContent =
            "✅ COPIED";

        setTimeout(
            () => button.textContent = "📋 COPY",
            1200
        );

    } catch (error) {

        console.error(
            "Copy failed:",
            error
        );

    }

    textarea.remove();
}

function copyBotText(
    text,
    button
) {

    if (
        navigator.clipboard?.writeText
    ) {

        navigator.clipboard
            .writeText(text)
            .then(
                () => {

                    button.textContent =
                        "✅ COPIED";

                    setTimeout(
                        () => button.textContent = "📋 COPY",
                        1200
                    );

                }
            )
            .catch(
                () =>
                    fallbackCopyBotText(
                        text,
                        button
                    )
            );

    } else {

        fallbackCopyBotText(
            text,
            button
        );

    }
}

/* =========================================
   SPEAK
========================================= */

function speakBotText(
    text,
    button
) {

    if (
        !("speechSynthesis" in window)
    ) {

        button.textContent =
            "❌ NOT SUPPORTED";

        return;
    }

    if (
        speechSynthesis.speaking
    ) {

        speechSynthesis.cancel();

        button.textContent =
            "🔊 SPEAK";

        return;
    }

    const speech =
        new SpeechSynthesisUtterance(
            text
        );

    speech.rate =
        1;

    speech.pitch =
        1;

    speech.volume =
        1;

    button.textContent =
        "⏹ STOP";

    speech.onend =
        () => button.textContent = "🔊 SPEAK";

    speech.onerror =
        () => button.textContent = "🔊 SPEAK";

    speechSynthesis.speak(
        speech
    );
}

/* =========================================
   FUTURISTIC BOT CONTROLS
   FINAL VERSION
========================================= */

(function injectBotHUDStyle() {

    if (document.getElementById("sdgeBotHUDStyle")) {
        return;
    }

    const style =
        document.createElement("style");

    style.id =
        "sdgeBotHUDStyle";

    style.textContent = `
        /* ================================
           BOT ACTION BAR
        ================================= */

        .bot-message-actions {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            margin-top: 10px !important;
            flex-wrap: wrap !important;
        }

        /* ================================
           COPY / SPEAK
        ================================= */

        .bot-message-actions button {
            appearance: none !important;

            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;

            width: auto !important;
            min-width: 96px !important;
            height: 34px !important;

            padding: 0 13px !important;
            margin: 0 !important;

            border: 1px solid var(--theme-border) !important;
            border-radius: 6px !important;

            background:
                linear-gradient(
                    135deg,
                    rgba(255,255,255,.075),
                    rgba(255,255,255,.018)
                ) !important;

            color: var(--theme-text) !important;

            font-family: inherit !important;
            font-size: 9px !important;
            font-weight: 800 !important;
            letter-spacing: 1.1px !important;

            line-height: 1 !important;

            cursor: pointer !important;

            opacity: .78 !important;

            box-shadow:
                inset 0 0 0 1px rgba(255,255,255,.018),
                0 4px 14px rgba(0,0,0,.12) !important;

            transition:
                transform .18s ease,
                opacity .18s ease,
                border-color .18s ease,
                background .18s ease,
                box-shadow .18s ease !important;
        }

        .bot-message-actions button::before {
            content: "" !important;
            width: 3px !important;
            height: 3px !important;
            margin-right: 7px !important;
            background: currentColor !important;
            box-shadow:
                6px 0 currentColor,
                0 6px currentColor,
                6px 6px currentColor !important;
            opacity: .55 !important;
        }

        .bot-message-actions button:hover {
            opacity: 1 !important;
            transform: translateY(-2px) !important;

            border-color:
                var(--theme-text) !important;

            background:
                linear-gradient(
                    135deg,
                    rgba(255,255,255,.13),
                    rgba(255,255,255,.035)
                ) !important;

            box-shadow:
                inset 0 0 0 1px rgba(255,255,255,.04),
                0 7px 20px rgba(0,0,0,.2),
                0 0 14px rgba(255,255,255,.07) !important;
        }

        .bot-message-actions button:active {
            transform:
                translateY(0) scale(.97) !important;
        }

        /* ================================
           SUGGESTION
        ================================= */

        .bot-suggestion {
            appearance: none !important;

            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;

            width: min(250px, 100%) !important;
            min-width: 180px !important;
            height: 38px !important;

            margin-top: 10px !important;
            padding: 0 12px 0 15px !important;

            border: 1px solid var(--theme-border) !important;
            border-radius: 6px !important;

            background:
                linear-gradient(
                    100deg,
                    rgba(255,255,255,.075),
                    rgba(255,255,255,.018)
                ) !important;

            color: var(--theme-text) !important;

            font-family: inherit !important;
            font-size: 9px !important;
            font-weight: 800 !important;
            letter-spacing: 1px !important;

            line-height: 1 !important;

            cursor: pointer !important;

            opacity: .82 !important;

            box-shadow:
                inset 0 0 0 1px rgba(255,255,255,.015),
                0 5px 16px rgba(0,0,0,.12) !important;

            transition:
                transform .2s ease,
                opacity .2s ease,
                border-color .2s ease,
                background .2s ease,
                box-shadow .2s ease !important;
        }

        .bot-suggestion::after {
            content: "↗" !important;

            font-size: 14px !important;
            font-weight: 400 !important;

            opacity: .55 !important;

            transition:
                transform .2s ease,
                opacity .2s ease !important;
        }

        .bot-suggestion:hover {
            opacity: 1 !important;

            transform:
                translateX(5px) !important;

            border-color:
                var(--theme-text) !important;

            background:
                linear-gradient(
                    100deg,
                    rgba(255,255,255,.12),
                    rgba(255,255,255,.035)
                ) !important;

            box-shadow:
                inset 0 0 0 1px rgba(255,255,255,.035),
                0 7px 20px rgba(0,0,0,.18),
                0 0 15px rgba(255,255,255,.06) !important;
        }

        .bot-suggestion:hover::after {
            opacity: 1 !important;
            transform:
                translate(2px,-2px) !important;
        }

        .bot-suggestion:active {
            transform:
                translateX(2px) scale(.98) !important;
        }
    `;

    document.head.appendChild(style);

})();


/* =========================================
   ADD BOT MESSAGE
========================================= */

function addExplainingBotMessage(
    text,
    type
) {

    const message =
        document.createElement(
            "div"
        );

    message.className =
        "bot-message " +
        (
            type === "user"
                ? "bot-message-user"
                : "bot-message-bot"
        );


    /* =====================================
       MESSAGE TEXT
    ===================================== */

    const messageText =
        document.createElement(
            "div"
        );

    messageText.className =
        "bot-message-text";

    messageText.textContent =
        text;

    message.appendChild(
        messageText
    );


    /* =====================================
       TIMESTAMP
    ===================================== */

    const timestamp =
        document.createElement(
            "div"
        );

    timestamp.className =
        "bot-message-time";

    timestamp.textContent =
        getBotTimestamp();

    message.appendChild(
        timestamp
    );


    /* =====================================
       BOT ACTIONS
    ===================================== */

    if (
        type !== "user"
    ) {

        const actions =
            document.createElement(
                "div"
            );

        actions.className =
            "bot-message-actions";


        /* ================================
           COPY
        ================================= */

        const copyButton =
            document.createElement(
                "button"
            );

        copyButton.type =
            "button";

        copyButton.innerHTML =
            "COPY";

        copyButton.setAttribute(
            "aria-label",
            "Copy bot message"
        );

        copyButton.addEventListener(
            "click",
            () => {

                copyBotText(
                    text,
                    copyButton
                );

            }
        );


        /* ================================
           SPEAK
        ================================= */

        const speakButton =
            document.createElement(
                "button"
            );

        speakButton.type =
            "button";

        speakButton.innerHTML =
            "SPEAK";

        speakButton.setAttribute(
            "aria-label",
            "Speak bot message"
        );

        speakButton.addEventListener(
            "click",
            () => {

                speakBotText(
                    text,
                    speakButton
                );

            }
        );


        /* ================================
           ADD BUTTONS
        ================================= */

        actions.append(
            copyButton,
            speakButton
        );

        message.appendChild(
            actions
        );
    }


    /* =====================================
       ADD MESSAGE
    ===================================== */

    explainingBotChat.appendChild(
        message
    );


    explainingBotChat.scrollTop =
        explainingBotChat.scrollHeight;


    return message;
}


/* =========================================
   ADD BOT SUGGESTION
========================================= */

function addBotSuggestion(
    label
) {

    const suggestion =
        document.createElement(
            "button"
        );

    suggestion.type =
        "button";

    suggestion.className =
        "bot-suggestion";


    /* =====================================
       LABEL
    ===================================== */

    suggestion.textContent =
        "→ " + label;


    suggestion.setAttribute(
        "aria-label",
        "Suggested question: " + label
    );


    /* =====================================
       CLICK
    ===================================== */

    suggestion.addEventListener(
        "click",
        () => {

            const question =
                suggestionToQuestion(
                    label
                );

            suggestion.remove();

            sendExplainingBotMessage(
                question
            );

        }
    );


    /* =====================================
       ADD TO CHAT
    ===================================== */

    explainingBotChat.appendChild(
        suggestion
    );


    explainingBotChat.scrollTop =
        explainingBotChat.scrollHeight;
}
/* =========================================
   HELP
========================================= */

function getBotHelp() {

    return [
        "🤖 HERE'S WHAT I CAN DO:",
        "",
        "• Ask about Parts",
        "• Ask about Area Info",
        "• Ask about Partnership",
        "• Ask about the SIL ID and mentor",
        "• Ask about Robots Coding",
        "• Ask about Results",
        "• Type \"explain\" for the full project",
        "• Type \"surprise\" for a random fact"
    ].join("\n");
}

/* =========================================
   SURPRISE ME
========================================= */

function getRandomBotFact() {

    const facts = [

        "🤖 FACT: We use MakeCode for 3 Micro:bits.",

        "🔧 FACT: Eshaan Kannan works on mechanics and technical support.",

        "💻 FACT: Sidharth Sukumar works on mechanics, coding and part leadership.",

        "🏫 FACT: The project is connected to TGES — The Guardian English School.",

        "📍 FACT: The project area information is India → Kerala → Kasaragod.",

        "🆔 FACT: The SIL Unique ID is SIL2265157.",

        "👩‍🏫 FACT: The mentor listed for the project is Ms. Seema.",

        "⚙️ FACT: The project uses an Avishkaar Microcontroller."

    ];

    return facts[
        Math.floor(
            Math.random() *
            facts.length
        )
    ];
}

/* =========================================
   BOT UTILITY BUTTONS
========================================= */

function addBotUtilityButtons() {

    const quickActions =
        qs(
            "#explainingBotPage .explaining-bot-quick-actions"
        );

    if (
        !quickActions ||
        $("botHelpButton")
    ) {
        return;
    }

    const helpButton =
        document.createElement(
            "button"
        );

    helpButton.type =
        "button";

    helpButton.id =
        "botHelpButton";

    helpButton.textContent =
        "❓ HELP";

    helpButton.addEventListener(
        "click",
        () =>
            addExplainingBotMessage(
                getBotHelp(),
                "bot"
            )
    );

    const surpriseButton =
        document.createElement(
            "button"
        );

    surpriseButton.type =
        "button";

    surpriseButton.textContent =
        "🎲 SURPRISE ME";

    surpriseButton.addEventListener(
        "click",
        () =>
            addExplainingBotMessage(
                getRandomBotFact(),
                "bot"
            )
    );

    const clearButton =
        document.createElement(
            "button"
        );

    clearButton.type =
        "button";

    clearButton.textContent =
        "🧹 CLEAR CHAT";

    clearButton.addEventListener(
        "click",
        () => {

            window.speechSynthesis?.cancel?.();

            explainingBotChat.innerHTML =
                "";

            addExplainingBotMessage(
                "Hey! Ask me about the SDG-E project. Type explain for the full project summary.",
                "bot"
            );

            explainingBotInput.value =
                "";

            explainingBotInput.focus();
        }
    );

    quickActions.append(
        helpButton,
        surpriseButton,
        clearButton
    );
}

/* =========================================
   SMART SUGGESTIONS
========================================= */

function getSmartSuggestion(
    question
) {

    const q =
        question.toLowerCase();

    if (
        q.includes("part")
    ) {

        return "👥 PARTNERS";

    }

    if (
        q.includes("partner") ||
        q.includes("eshaan") ||
        q.includes("sidharth")
    ) {

        return "👩‍🏫 MENTOR";

    }

    if (
        q.includes("mentor") ||
        q.includes("seema") ||
        q.includes("sil")
    ) {

        return "💻 CODING";

    }

    if (
        q.includes("coding") ||
        q.includes("code") ||
        q.includes("makecode")
    ) {

        return "🔧 PARTS";

    }

    if (
        q.includes("result") ||
        q.includes("test")
    ) {

        return "📋 FULL PROJECT";

    }

    return "💻 CODING";
}

function suggestionToQuestion(
    label
) {

    if (
        label.includes("PARTNERS")
    ) {

        return "Who are the partners?";

    }

    if (
        label.includes("MENTOR")
    ) {

        return "Who is the mentor?";

    }

    if (
        label.includes("CODING")
    ) {

        return "What coding do you use?";

    }

    if (
        label.includes("PARTS")
    ) {

        return "What parts did you use?";

    }

    if (
        label.includes("FULL PROJECT")
    ) {

        return "Explain the full project.";

    }

    return label;
}

function addBotSuggestion(
    label
) {

    const suggestion =
        document.createElement(
            "button"
        );

    suggestion.type =
        "button";

    suggestion.className =
        "bot-suggestion";

    suggestion.textContent =
        "→ " + label;

    suggestion.addEventListener(
        "click",
        () => {

            const question =
                suggestionToQuestion(
                    label
                );

            suggestion.remove();

            sendExplainingBotMessage(
                question
            );
        }
    );

    explainingBotChat.appendChild(
        suggestion
    );

    explainingBotChat.scrollTop =
        explainingBotChat.scrollHeight;
}

/* =========================================
   SEND BOT MESSAGE
========================================= */

async function sendExplainingBotMessage(
    questionOverride
) {

    const question =
        typeof questionOverride === "string"
            ? questionOverride.trim()
            : explainingBotInput.value.trim();

    if (!question) {
        return;
    }

    const lowerQuestion =
        question.toLowerCase();

    addExplainingBotMessage(
        question,
        "user"
    );

    explainingBotInput.value =
        "";

    explainingBotSendButton.disabled =
        true;

    explainingBotInput.disabled =
        true;

    const typingMessage =
        document.createElement(
            "div"
        );

    typingMessage.className =
        "bot-message bot-message-bot";

    typingMessage.textContent =
        "Typing...";

    explainingBotChat.appendChild(
        typingMessage
    );

    explainingBotChat.scrollTop =
        explainingBotChat.scrollHeight;

    await new Promise(
        resolve =>
            setTimeout(
                resolve,
                1500
            )
    );

    typingMessage.remove();

    let answer;

    if (
        lowerQuestion === "help"
    ) {

        answer =
            getBotHelp();

    }

    else if (
        lowerQuestion === "surprise" ||
        lowerQuestion === "surprise me"
    ) {

        answer =
            getRandomBotFact();

    }

    else {

        answer =
            answerExplainingBot(
                question
            );
    }

    addExplainingBotMessage(
        answer,
        "bot"
    );

    if (
        !/^(help|surprise|surprise me)$/.test(
            lowerQuestion
        )
    ) {

        addBotSuggestion(
            getSmartSuggestion(
                question
            )
        );
    }

    explainingBotSendButton.disabled =
        false;

    explainingBotInput.disabled =
        false;

    explainingBotInput.focus();
}

if (
    explainingBotSendButton
) {

    explainingBotSendButton.addEventListener(
        "click",
        () =>
            sendExplainingBotMessage()
    );
}

if (
    explainingBotInput
) {

    explainingBotInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                sendExplainingBotMessage();
            }
        }
    );
}

qsa(
    "[data-bot-question]"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () =>
                sendExplainingBotMessage(
                    button.dataset.botQuestion
                )
        );
    }
);

addBotUtilityButtons();

/* =========================================
   FULL SCREEN
========================================= */

const fullscreenButton =
    $("fullscreenButton");

if (
    fullscreenButton
) {

    fullscreenButton.addEventListener(
        "click",
        async () => {

            try {

                if (
                    !document.fullscreenElement
                ) {

                    await document
                        .documentElement
                        .requestFullscreen();

                }

                else {

                    await document
                        .exitFullscreen();
                }

            }

            catch (error) {

                console.error(
                    "Fullscreen error:",
                    error
                );
            }
        }
    );

    document.addEventListener(
        "fullscreenchange",
        () => {

            fullscreenButton.textContent =
                document.fullscreenElement
                    ? "✕ Exit Full Screen"
                    : "⛶ Full Screen";
        }
    );
}

/* =========================================
   SECRET PAGE
========================================= */

const secretPassword =
    $("secretPassword");

const secretPage =
    $("secretPage");

const secretBackButton =
    $("secretBackButton");

if (
    secretPassword &&
    secretPage
) {

    secretPassword.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Enter"
            ) {

                return;
            }

            if (
                secretPassword.value ===
                "DA_BOYS"
            ) {

                showPage(
                    secretPage
                );

                secretPassword.value =
                    "";

            }

            else {

                secretPassword.value =
                    "";

                secretPassword.placeholder =
                    "Wrong password";

                setTimeout(
                    () =>
                        secretPassword.placeholder =
                            "Password",
                    1500
                );
            }
        }
    );
}

if (
    secretBackButton
) {

    secretBackButton.addEventListener(
        "click",
        () =>
            showPage(
                pageOne
            )
    );
}

/* =========================================
   SUPABASE
========================================= */

const SUPABASE_URL =
    "https://mwfpceardepjbwbualyp.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_FM6sWhxUus2Ou6oNKEU5uw_9VTiX-jp";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

/* =========================================
   ROBLOX FRIENDS
========================================= */

const fullNameInput =
    $("fullNameInput");

const robloxUsernameInput =
    $("robloxUsernameInput");

const addRobloxFriend =
    $("addRobloxFriend");

const robloxMessage =
    $("robloxMessage");

const robloxFriendList =
    $("robloxFriendList");

async function loadRobloxFriends() {

    if (
        !robloxFriendList
    ) {

        return;
    }

    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "roblox_friends"
            )
            .select(
                "full_name, roblox_username"
            )
            .order(
                "created_at",
                {
                    ascending: true
                }
            );

    if (
        error
    ) {

        console.error(
            error
        );

        robloxFriendList.textContent =
            "Could not load the friend list.";

        return;
    }

    robloxFriendList.innerHTML =
        "";

    if (
        !data.length
    ) {

        robloxFriendList.innerHTML =
            "<p style='opacity:.5;'>No friends added yet.</p>";

        return;
    }

    data.forEach(
        (friend, index) => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "roblox-friend";

            const number =
                document.createElement(
                    "div"
                );

            number.className =
                "roblox-friend-number";

            number.textContent =
                String(
                    index + 1
                ).padStart(
                    2,
                    "0"
                );

            const info =
                document.createElement(
                    "div"
                );

            info.className =
                "roblox-friend-info";

            const name =
                document.createElement(
                    "div"
                );

            name.className =
                "roblox-friend-name";

            name.textContent =
                friend.full_name;

            const username =
                document.createElement(
                    "div"
                );

            username.className =
                "roblox-friend-username";

            username.textContent =
                "@" +
                friend.roblox_username;

            info.append(
                name,
                username
            );

            card.append(
                number,
                info
            );

            robloxFriendList.appendChild(
                card
            );
        }
    );
}

if (
    addRobloxFriend
) {

    addRobloxFriend.addEventListener(
        "click",
        async () => {

            const fullName =
                fullNameInput?.value.trim() ||
                "";

            const robloxUsername =
                robloxUsernameInput?.value.trim() ||
                "";

            if (
                !fullName ||
                !robloxUsername
            ) {

                if (
                    robloxMessage
                ) {

                    robloxMessage.textContent =
                        "Fill in both boxes.";
                }

                return;
            }

            addRobloxFriend.disabled =
                true;

            if (
                robloxMessage
            ) {

                robloxMessage.textContent =
                    "Adding...";
            }

            const {
                error
            } =
                await supabaseClient
                    .from(
                        "roblox_friends"
                    )
                    .insert({
                        full_name:
                            fullName,

                        roblox_username:
                            robloxUsername
                    });

            if (
                error
            ) {

                console.error(
                    error
                );

                if (
                    robloxMessage
                ) {

                    robloxMessage.textContent =
                        "Something went wrong.";
                }

                addRobloxFriend.disabled =
                    false;

                return;
            }

            if (
                fullNameInput
            ) {

                fullNameInput.value =
                    "";
            }

            if (
                robloxUsernameInput
            ) {

                robloxUsernameInput.value =
                    "";
            }

            if (
                robloxMessage
            ) {

                robloxMessage.textContent =
                    "Added! 🔥";
            }

            addRobloxFriend.disabled =
                false;

            await loadRobloxFriends();
        }
    );
}

/* =========================================
   ADMIN
========================================= */

let adminToken =
    null;

const adminPasswordInput =
    $("adminPasswordInput");

const adminLoginButton =
    $("adminLoginButton");

const adminMessage =
    $("adminMessage");

const adminPanel =
    $("adminPanel");

const adminFriendList =
    $("adminFriendList");

function showFriendRemoval(
    friend
) {

    return new Promise(
        resolve => {

            const overlay =
                document.createElement(
                    "div"
                );

            overlay.className =
                "friend-remove-overlay";

            const dialog =
                document.createElement(
                    "div"
                );

            dialog.className =
                "friend-remove-dialog";

            const warning =
                document.createElement(
                    "div"
                );

            warning.className =
                "friend-remove-warning";

            warning.textContent =
                "⚠";

            const title =
                document.createElement(
                    "div"
                );

            title.className =
                "friend-remove-title";

            title.textContent =
                "REMOVE FRIEND?";

            const subtitle =
                document.createElement(
                    "div"
                );

            subtitle.className =
                "friend-remove-subtitle";

            subtitle.textContent =
                "You are about to remove:";

            const targetName =
                document.createElement(
                    "div"
                );

            targetName.className =
                "friend-remove-name";

            targetName.textContent =
                friend.full_name;

            const targetUsername =
                document.createElement(
                    "div"
                );

            targetUsername.className =
                "friend-remove-username";

            targetUsername.textContent =
                "@" +
                friend.roblox_username;

            const danger =
                document.createElement(
                    "div"
                );

            danger.className =
                "friend-remove-danger";

            danger.textContent =
                "THIS WILL PERMANENTLY REMOVE THIS FRIEND FROM THE LIST.";

            const actions =
                document.createElement(
                    "div"
                );

            actions.className =
                "friend-remove-actions";

            const cancelButton =
                document.createElement(
                    "button"
                );

            cancelButton.className =
                "friend-remove-cancel";

            cancelButton.textContent =
                "KEEP FRIEND";

            const confirmButton =
                document.createElement(
                    "button"
                );

            confirmButton.className =
                "friend-remove-confirm";

            confirmButton.textContent =
                "REMOVE FRIEND";

            actions.append(
                cancelButton,
                confirmButton
            );

            dialog.append(
                warning,
                title,
                subtitle,
                targetName,
                targetUsername,
                danger,
                actions
            );

            overlay.appendChild(
                dialog
            );

            document.body.appendChild(
                overlay
            );

            requestAnimationFrame(
                () =>
                    overlay.classList.add(
                        "open"
                    )
            );

            const finish =
                result => {

                    overlay.classList.remove(
                        "open"
                    );

                    setTimeout(
                        () =>
                            overlay.remove(),
                        250
                    );

                    resolve(
                        result
                    );
                };

            cancelButton.addEventListener(
                "click",
                () =>
                    finish(
                        false
                    )
            );

            confirmButton.addEventListener(
                "click",
                () =>
                    finish(
                        true
                    )
            );

            overlay.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        overlay
                    ) {

                        finish(
                            false
                        );
                    }
                }
            );
        }
    );
}

async function loadAdminFriends() {

    if (
        !adminFriendList
    ) {

        return;
    }

    adminFriendList.textContent =
        "Loading...";

    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "roblox_friends"
            )
            .select(
                "id, full_name, roblox_username"
            )
            .order(
                "created_at",
                {
                    ascending: true
                }
            );

    if (
        error
    ) {

        console.error(
            error
        );

        adminFriendList.textContent =
            "Could not load friends.";

        return;
    }

    adminFriendList.innerHTML =
        "";

    if (
        !data.length
    ) {

        adminFriendList.innerHTML =
            "<p class='admin-empty'>No friends added yet.</p>";

        return;
    }

    data.forEach(
        (friend, index) => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "admin-friend";

            const number =
                document.createElement(
                    "div"
                );

            number.className =
                "admin-friend-number";

            number.textContent =
                String(
                    index + 1
                ).padStart(
                    2,
                    "0"
                );

            const info =
                document.createElement(
                    "div"
                );

            info.className =
                "admin-friend-info";

            const name =
                document.createElement(
                    "div"
                );

            name.className =
                "admin-friend-name";

            name.textContent =
                friend.full_name;

            const username =
                document.createElement(
                    "div"
                );

            username.className =
                "admin-friend-username";

            username.textContent =
                "@" +
                friend.roblox_username;

            const deleteButton =
                document.createElement(
                    "button"
                );

            deleteButton.className =
                "admin-delete-button";

            deleteButton.textContent =
                "⚠ REMOVE";

            deleteButton.addEventListener(
                "click",
                async () => {

                    const confirmed =
                        await showFriendRemoval(
                            friend
                        );

                    if (
                        !confirmed
                    ) {

                        return;
                    }

                    deleteButton.disabled =
                        true;

                    deleteButton.textContent =
                        "REMOVING...";

                    const {
                        data:
                            result,
                        error:
                            deleteError
                    } =
                        await supabaseClient
                            .functions
                            .invoke(
                                "delete-roblox-friend",
                                {
                                    body: {
                                        id:
                                            friend.id,

                                        adminToken:
                                            adminToken
                                    }
                                }
                            );

                    if (
                        deleteError ||
                        !result?.success
                    ) {

                        console.error(
                            deleteError ||
                            result
                        );

                        deleteButton.disabled =
                            false;

                        deleteButton.textContent =
                            "⚠ REMOVE";

                        alert(
                            result?.error ||
                            "Could not remove friend."
                        );

                        return;
                    }

                    await loadAdminFriends();
                    await loadRobloxFriends();
                }
            );

            info.append(
                name,
                username
            );

            card.append(
                number,
                info,
                deleteButton
            );

            adminFriendList.appendChild(
                card
            );
        }
    );
}

if (
    adminLoginButton
) {

    adminLoginButton.addEventListener(
        "click",
        async () => {

            const password =
                adminPasswordInput?.value.trim() ||
                "";

            if (
                !password
            ) {

                if (
                    adminMessage
                ) {

                    adminMessage.textContent =
                        "Enter the admin password.";
                }

                return;
            }

            adminLoginButton.disabled =
                true;

            if (
                adminMessage
            ) {

                adminMessage.textContent =
                    "Checking...";
            }

            const {
                data,
                error
            } =
                await supabaseClient
                    .functions
                    .invoke(
                        "admin-login",
                        {
                            body: {
                                password
                            }
                        }
                    );

            if (
                error ||
                !data?.success
            ) {

                console.error(
                    error ||
                    data
                );

                if (
                    adminMessage
                ) {

                    adminMessage.textContent =
                        data?.error ||
                        "Login failed.";
                }

                adminLoginButton.disabled =
                    false;

                return;
            }

            adminToken =
                data.adminToken;

            if (
                adminPasswordInput
            ) {

                adminPasswordInput.value =
                    "";
            }

            if (
                adminMessage
            ) {

                adminMessage.textContent =
                    "ADMIN ACCESS GRANTED.";
            }

            if (
                adminPanel
            ) {

                adminPanel.style.display =
                    "block";
            }

            adminLoginButton.disabled =
                false;

            await loadAdminFriends();
        }
    );
}

/* =========================================
   SETTINGS
========================================= */

const settingsButton =
    $("settingsButton");

const settingsMenu =
    $("settingsMenu");

const exitSettingsButton =
    $("exitSettingsButton");

const settingsThemeButton =
    $("settingsThemeButton");

const settingsFullscreenButton =
    $("settingsFullscreenButton") ||
    $("fullscreenButton");

const settingsRefreshButton =
    $("settingsRefreshButton") ||
    $("refreshButton");

if (
    settingsButton &&
    settingsMenu
) {

    settingsButton.addEventListener(
        "click",
        () =>
            settingsMenu.classList.toggle(
                "open"
            )
    );
}

if (
    exitSettingsButton &&
    settingsMenu
) {

    exitSettingsButton.addEventListener(
        "click",
        () =>
            settingsMenu.classList.remove(
                "open"
            )
    );
}

if (
    settingsFullscreenButton
) {

    settingsFullscreenButton.addEventListener(
        "click",
        async () => {

            try {

                if (
                    !document.fullscreenElement
                ) {

                    await document
                        .documentElement
                        .requestFullscreen();

                } else {

                    await document
                        .exitFullscreen();
                }

            } catch (
                error
            ) {

                console.error(
                    "Fullscreen error:",
                    error
                );
            }
        }
    );
}

if (
    settingsRefreshButton
) {

    settingsRefreshButton.addEventListener(
        "click",
        () =>
            window.location.reload()
    );
}

/* =========================================
   THEMES
========================================= */

const THEME_PRESETS = {

    white: {

        label:
            "WHITE",

        background:
            "#ffffff",

        text:
            "#000000",

        card:
            "#f5f5f5",

        border:
            "rgba(0,0,0,0.12)",

        shadow:
            "0 15px 40px rgba(0,0,0,0.08)",

        textGradient:
            "linear-gradient(90deg,#ff3cac,#784ba0,#2b86c5,#00f5a0,#ffd166)",

        colorfulBackground:
            false,

        colorfulText:
            false,

        preview:
            "#ffffff"
    },

    black: {

        label:
            "BLACK",

        background:
            "#070707",

        text:
            "#ffffff",

        card:
            "#111111",

        border:
            "rgba(255,255,255,0.12)",

        shadow:
            "0 15px 40px rgba(0,0,0,0.35)",

        textGradient:
            "linear-gradient(90deg,#ff3cac,#784ba0,#2b86c5,#00f5a0,#ffd166)",

        colorfulBackground:
            false,

        colorfulText:
            false,

        preview:
            "#070707"
    },

    colorfulWhite: {

        label:
            "COLOR BG / WHITE TEXT",

        background:
            "linear-gradient(135deg,#ff3cac,#784ba0,#2b86c5,#00f5a0)",

        text:
            "#ffffff",

        card:
            "rgba(255,255,255,0.08)",

        border:
            "rgba(255,255,255,0.18)",

        shadow:
            "0 15px 50px rgba(0,0,0,0.25)",

        textGradient:
            "linear-gradient(90deg,#ff3cac,#ffd166,#00f5a0,#2b86c5)",

        colorfulBackground:
            true,

        colorfulText:
            false,

        preview:
            "linear-gradient(135deg,#ff3cac,#784ba0,#2b86c5,#00f5a0)"
    },

    colorfulBlack: {

        label:
            "COLOR BG / BLACK TEXT",

        background:
            "linear-gradient(135deg,#ff3cac,#784ba0,#2b86c5,#00f5a0)",

        text:
            "#050505",

        card:
            "rgba(255,255,255,0.18)",

        border:
            "rgba(0,0,0,0.18)",

        shadow:
            "0 15px 50px rgba(0,0,0,0.22)",

        textGradient:
            "linear-gradient(90deg,#ff006e,#7b2cff,#0099ff,#00c853,#ff9f1c)",

        colorfulBackground:
            true,

        colorfulText:
            false,

        preview:
            "linear-gradient(135deg,#ff3cac,#784ba0,#2b86c5,#00f5a0)"
    },

    textBlack: {

        label:
            "COLOR TEXT / BLACK BG",

        background:
            "#070707",

        text:
            "#ffffff",

        card:
            "#111111",

        border:
            "rgba(255,255,255,0.12)",

        shadow:
            "0 15px 40px rgba(0,0,0,0.35)",

        textGradient:
            "linear-gradient(90deg,#ff3cac,#784ba0,#2b86c5,#00f5a0,#ffd166)",

        colorfulBackground:
            false,

        colorfulText:
            true,

        preview:
            "#070707"
    },

    textWhite: {

        label:
            "COLOR TEXT / WHITE BG",

        background:
            "#ffffff",

        text:
            "#000000",

        card:
            "#f5f5f5",

        border:
            "rgba(0,0,0,0.12)",

        shadow:
            "0 15px 40px rgba(0,0,0,0.08)",

        textGradient:
            "linear-gradient(90deg,#ff006e,#7b2cff,#0099ff,#00c853,#ff9f1c)",

        colorfulBackground:
            false,

        colorfulText:
            true,

        preview:
            "#ffffff"
    },

    fullColor: {

        label:
            "FULL COLOR",

        background:
            "linear-gradient(135deg,#ff006e,#7b2cff,#0099ff,#00c853,#ffd000)",

        text:
            "#ffffff",

        card:
            "rgba(255,255,255,0.07)",

        border:
            "rgba(255,255,255,0.2)",

        shadow:
            "0 15px 60px rgba(0,0,0,0.3)",

        textGradient:
            "linear-gradient(90deg,#ffea00,#ff3cac,#00f5ff,#00ff88,#ffffff)",

        colorfulBackground:
            true,

        colorfulText:
            true,

        preview:
            "linear-gradient(135deg,#ff006e,#7b2cff,#0099ff,#00c853,#ffd000)"
    }
};

/* =========================================
   APPLY THEME
========================================= */

function applyTheme(
    themeKey
) {

    const theme =
        THEME_PRESETS[
            themeKey
        ];

    if (
        !theme
    ) {

        return;
    }

    document.body.classList.remove(
        "light",
        "colorful",
        "theme-system",
        "theme-colorful-background",
        "theme-colorful-text"
    );

    document.body.classList.add(
        "theme-system"
    );

    if (
        themeKey === "white" ||
        themeKey === "textWhite"
    ) {

        document.body.classList.add(
            "light"
        );
    }

    if (
        theme.colorfulBackground
    ) {

        document.body.classList.add(
            "theme-colorful-background"
        );
    }

    if (
        theme.colorfulText
    ) {

        document.body.classList.add(
            "theme-colorful-text"
        );
    }

    const root =
        document.documentElement.style;

    root.setProperty(
        "--theme-background",
        theme.background
    );

    root.setProperty(
        "--theme-text",
        theme.text
    );

    root.setProperty(
        "--theme-card",
        theme.card
    );

    root.setProperty(
        "--theme-border",
        theme.border
    );

    root.setProperty(
        "--theme-shadow",
        theme.shadow
    );

    root.setProperty(
        "--theme-text-gradient",
        theme.textGradient
    );

    const themeToggle =
        $("themeToggle");

    if (
        themeToggle
    ) {

        themeToggle.checked =
            themeKey === "white";
    }

    qsa(
        ".theme-option"
    ).forEach(
        option => {

            option.classList.toggle(
                "selected",
                option.dataset.theme ===
                    themeKey
            );
        }
    );

    const currentTheme =
        $("themeCurrentName");

    if (
        currentTheme
    ) {

        currentTheme.textContent =
            theme.label;
    }
}

if (
    settingsThemeButton &&
    settingsMenu
) {

    settingsThemeButton.addEventListener(
        "click",
        () => {

            const picker =
                settingsMenu.querySelector(
                    ".theme-picker"
                );

            if (
                !picker
            ) {

                return;
            }

            picker.classList.toggle(
                "open"
            );

            settingsMenu.classList.toggle(
                "theme-picker-open"
            );
        }
    );
}

if (
    settingsMenu
) {

    const themePicker =
        document.createElement(
            "div"
        );

    themePicker.className =
        "theme-picker";

    themePicker.innerHTML = `
        <div class="theme-picker-header">
            <span>THEME MODES</span>
            <span id="themeCurrentName">BLACK</span>
        </div>
        <div class="theme-grid"></div>
    `;

    settingsMenu.appendChild(
        themePicker
    );

    const themeGrid =
        qs(
            ".theme-grid",
            themePicker
        );

    Object.entries(
        THEME_PRESETS
    ).forEach(
        (
            [key, theme]
        ) => {

            const option =
                document.createElement(
                    "button"
                );

            option.className =
                "theme-option";

            option.dataset.theme =
                key;

            const swatch =
                document.createElement(
                    "span"
                );

            swatch.className =
                "theme-swatch";

            swatch.style.background =
                theme.preview;

            const swatchText =
                document.createElement(
                    "span"
                );

            swatchText.textContent =
                "Aa";

            if (
                theme.colorfulText
            ) {

                swatchText.style.setProperty(
                    "color",
                    "transparent",
                    "important"
                );

                swatchText.style.setProperty(
                    "background",
                    theme.textGradient,
                    "important"
                );

                swatchText.style.setProperty(
                    "-webkit-background-clip",
                    "text",
                    "important"
                );

                swatchText.style.setProperty(
                    "background-clip",
                    "text",
                    "important"
                );

            } else {

                swatchText.style.setProperty(
                    "color",
                    theme.text,
                    "important"
                );
            }

            swatch.appendChild(
                swatchText
            );

            const label =
                document.createElement(
                    "span"
                );

            label.className =
                "theme-option-label";

            label.textContent =
                theme.label;

            option.append(
                swatch,
                label
            );

            option.addEventListener(
                "click",
                () => {

                    applyTheme(
                        key
                    );

                    themePicker.classList.remove(
                        "open"
                    );

                    settingsMenu.classList.remove(
                        "theme-picker-open"
                    );
                }
            );

            themeGrid.appendChild(
                option
            );
        }
    );
}

const themeToggle =
    $("themeToggle");

if (
    themeToggle
) {

    themeToggle.addEventListener(
        "change",
        () => {

            applyTheme(
                themeToggle.checked
                    ? "white"
                    : "black"
            );
        }
    );
}

applyTheme(
    "black"
);

loadRobloxFriends();

/* =========================================
   SOIL SENSOR LAB
========================================= */

const sensorLabPage =
    document.getElementById("sensorLabPage");

const sensorLabBox =
    document.getElementById("sensorLabBox");

const sensorLabBackButton =
    document.getElementById("sensorLabBackButton");

const drySoil =
    document.getElementById("drySoil");

const wetSoil =
    document.getElementById("wetSoil");

const sensorDropZone =
    document.getElementById("sensorDropZone");

const soilOnSensor =
    document.getElementById("soilOnSensor");

const sensorReading =
    document.getElementById("sensorReading");

const sensorStatus =
    document.getElementById("sensorStatus");

const sensorButtonA =
    document.getElementById("sensorButtonA");

const virtualButtonA =
    document.getElementById("virtualButtonA");

const sensorResetButton =
    document.getElementById("sensorResetButton");

const microbitLedGrid =
    document.getElementById("microbitLedGrid");


/* =========================================
   OPEN / CLOSE SENSOR LAB
========================================= */

if (
    sensorLabBox &&
    sensorLabPage
) {

    sensorLabBox.addEventListener(
        "click",
        function () {

            if (typeof showPage === "function") {

                showPage(
                    sensorLabPage
                );

            } else {

                document
                    .querySelectorAll(".page")
                    .forEach(function(page) {

                        page.classList.remove(
                            "active"
                        );

                    });

                sensorLabPage.classList.add(
                    "active"
                );

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        }
    );

}


if (
    sensorLabBackButton
) {

    sensorLabBackButton.addEventListener(
        "click",
        function () {

            if (typeof showPage === "function") {

                showPage(
                    document.getElementById(
                        "pageTwo"
                    )
                );

            } else {

                sensorLabPage.classList.remove(
                    "active"
                );

                document
                    .getElementById("pageTwo")
                    .classList.add(
                        "active"
                    );

            }

        }
    );

}


/* =========================================
   MICROBIT LED MATRIX
========================================= */

if (
    microbitLedGrid
) {

    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const led =
            document.createElement(
                "div"
            );

        led.className =
            "microbit-led";

        microbitLedGrid.appendChild(
            led
        );

    }

}

function showMicrobitPattern(
    pattern
) {

    if (
        !microbitLedGrid
    ) {

        return;
    }

    const leds =
        [
            ...microbitLedGrid.children
        ];

    leds.forEach(
        function(led, index) {

            led.classList.toggle(
                "on",
                pattern.includes(index)
            );

        }
    );

}


const ledPatterns = {

    ready: [
        0, 4,
        6, 8,
        12,
        16, 18,
        20, 24
    ],

    dry: [
        0, 1, 2, 3, 4,
        6, 8,
        10, 12, 14,
        16,
        18,
        20, 21, 22, 23, 24
    ],

    wet: [
        0, 4,
        5, 9,
        10, 14,
        15, 19,
        20, 24
    ],

    error: [
        0, 2, 4,
        6, 8,
        10, 11, 12, 13, 14,
        16, 18,
        20, 22, 24
    ]

};


showMicrobitPattern(
    ledPatterns.ready
);


/* =========================================
   SOIL STATE
========================================= */

let soilState = {

    dry: false,

    wet: false

};


function renderSoilOnSensor() {

    if (
        !soilOnSensor
    ) {

        return;
    }

    soilOnSensor.innerHTML =
        "";

    if (
        soilState.dry
    ) {

        const dryPiece =
            document.createElement(
                "div"
            );

        dryPiece.className =
            "placed-soil placed-dry";

        dryPiece.title =
            "Dry soil";

        soilOnSensor.appendChild(
            dryPiece
        );

    }


    if (
        soilState.wet
    ) {

        const wetPiece =
            document.createElement(
                "div"
            );

        wetPiece.className =
            "placed-soil placed-wet";

        wetPiece.title =
            "Wet soil";

        soilOnSensor.appendChild(
            wetPiece
        );

    }


    if (
        !soilState.dry &&
        !soilState.wet
    ) {

        const message =
            document.createElement(
                "div"
            );

        message.className =
            "drop-message";

        message.textContent =
            "DROP SOIL HERE";

        soilOnSensor.appendChild(
            message
        );

    }

}


/* =========================================
   DRAG SOIL
========================================= */

function setupSoilDrag(
    element,
    soilType
) {

    if (
        !element
    ) {

        return;
    }


    element.addEventListener(
        "dragstart",
        function(event) {

            event.dataTransfer.setData(
                "text/plain",
                soilType
            );

        }
    );


    element.addEventListener(
        "click",
        function() {

            placeSoil(
                soilType
            );

        }
    );

}


setupSoilDrag(
    drySoil,
    "dry"
);


setupSoilDrag(
    wetSoil,
    "wet"
);


/* =========================================
   DROP ZONE
========================================= */

if (
    sensorDropZone
) {

    sensorDropZone.addEventListener(
        "dragover",
        function(event) {

            event.preventDefault();

            sensorDropZone.classList.add(
                "drag-over"
            );

        }
    );


    sensorDropZone.addEventListener(
        "dragleave",
        function() {

            sensorDropZone.classList.remove(
                "drag-over"
            );

        }
    );


    sensorDropZone.addEventListener(
        "drop",
        function(event) {

            event.preventDefault();

            sensorDropZone.classList.remove(
                "drag-over"
            );

            const soilType =
                event.dataTransfer.getData(
                    "text/plain"
                );

            placeSoil(
                soilType
            );

        }
    );

}


/* =========================================
   PLACE SOIL
========================================= */

function placeSoil(
    soilType
) {

    if (
        soilType !== "dry" &&
        soilType !== "wet"
    ) {

        return;
    }


    soilState[
        soilType
    ] = true;


    renderSoilOnSensor();


    sensorReading.textContent =
        "READY";


    sensorReading.classList.remove(
        "sensor-error"
    );


    sensorStatus.textContent =
        "Soil placed. Press A.";


    showMicrobitPattern(
        ledPatterns.ready
    );

}


/* =========================================
   SENSOR READING
========================================= */

function readSensor() {

    const hasDry =
        soilState.dry;

    const hasWet =
        soilState.wet;


    sensorReading.classList.remove(
        "sensor-error"
    );


    if (
        hasDry &&
        hasWet
    ) {

        sensorReading.textContent =
            "ERROR";

        sensorReading.classList.add(
            "sensor-error"
        );

        sensorStatus.textContent =
            "Multiple soil types detected.";

        showMicrobitPattern(
            ledPatterns.error
        );

        return;
    }


    if (
        hasWet
    ) {

        sensorReading.textContent =
            "WET";

        sensorStatus.textContent =
            "High moisture detected.";

        showMicrobitPattern(
            ledPatterns.wet
        );

        return;
    }


    if (
        hasDry
    ) {

        sensorReading.textContent =
            "DRY";

        sensorStatus.textContent =
            "Low moisture detected.";

        showMicrobitPattern(
            ledPatterns.dry
        );

        return;
    }


    sensorReading.textContent =
        "ERROR";

    sensorReading.classList.add(
        "sensor-error"
    );

    sensorStatus.textContent =
        "No soil detected.";

    showMicrobitPattern(
        ledPatterns.error
    );

}


/* =========================================
   A BUTTON
========================================= */

function pressVirtualA() {

    if (
        !sensorReading
    ) {

        return;
    }


    sensorReading.animate(
        [
            {
                transform:
                    "scale(1)"
            },
            {
                transform:
                    "scale(1.05)"
            },
            {
                transform:
                    "scale(1)"
            }
        ],
        {
            duration:
                220
        }
    );


    readSensor();

}


if (
    sensorButtonA
) {

    sensorButtonA.addEventListener(
        "click",
        pressVirtualA
    );

}


if (
    virtualButtonA
) {

    virtualButtonA.addEventListener(
        "click",
        pressVirtualA
    );

}


/* REAL KEYBOARD A */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key.toLowerCase() === "a" &&
            sensorLabPage?.classList.contains(
                "active"
            )
        ) {

            pressVirtualA();

        }

    }
);


/* =========================================
   RESET
========================================= */

function resetSensorLab() {

    soilState.dry =
        false;

    soilState.wet =
        false;


    renderSoilOnSensor();


    sensorReading.textContent =
        "READY";


    sensorReading.classList.remove(
        "sensor-error"
    );


    sensorStatus.textContent =
        "Waiting for soil...";


    showMicrobitPattern(
        ledPatterns.ready
    );

}


if (
    sensorResetButton
) {

    sensorResetButton.addEventListener(
        "click",
        resetSensorLab
    );

}


renderSoilOnSensor();

/* =========================================
   AUTO THEME — SYNCED TO SCREEN SHINE
========================================= */

const settingsAutoThemeButton =
    document.getElementById("settingsAutoThemeButton");

const autoThemePage =
    document.getElementById("pageOne");

const AUTO_THEME_SEQUENCE = [
    "black",
    "white",
    "colorfulWhite",
    "colorfulBlack",
    "textBlack",
    "textWhite",
    "fullColor"
];

let autoThemeEnabled = false;
let autoThemeRaf = null;
let autoThemeCrossedThisCycle = false;
let autoThemeIndex = 0;


/* =========================================
   BUTTON
========================================= */

function updateAutoThemeButton() {

    if (!settingsAutoThemeButton) {
        return;
    }

    const label =
        settingsAutoThemeButton.querySelector(
            "span:last-child"
        );

    if (autoThemeEnabled) {

        settingsAutoThemeButton.classList.add(
            "auto-theme-active"
        );

        if (label) {
            label.textContent =
                "Auto Theme: ON";
        }

    } else {

        settingsAutoThemeButton.classList.remove(
            "auto-theme-active"
        );

        if (label) {
            label.textContent =
                "Auto Theme: OFF";
        }
    }
}


/* =========================================
   GET CURRENT THEME
========================================= */

function getCurrentAutoThemeIndex() {

    const selectedTheme =
        document.querySelector(
            ".theme-option.selected"
        );

    if (
        selectedTheme &&
        selectedTheme.dataset.theme
    ) {

        const foundIndex =
            AUTO_THEME_SEQUENCE.indexOf(
                selectedTheme.dataset.theme
            );

        if (foundIndex >= 0) {

            return foundIndex;
        }
    }

    return 0;
}


/* =========================================
   CHANGE TO NEXT THEME
========================================= */

function applyNextAutoTheme() {

    autoThemeIndex =
        (
            autoThemeIndex + 1
        ) %
        AUTO_THEME_SEQUENCE.length;

    applyTheme(
        AUTO_THEME_SEQUENCE[
            autoThemeIndex
        ]
    );
}


/* =========================================
   WATCH THE ACTUAL SHINE
========================================= */

function autoThemeTick() {

    if (
        !autoThemeEnabled ||
        !autoThemePage ||
        !autoThemePage.classList.contains(
            "active"
        )
    ) {

        autoThemeRaf = null;

        return;
    }


    const shine =
        getComputedStyle(
            autoThemePage,
            "::after"
        );


    const shineLeft =
        parseFloat(
            shine.left
        );


    const pageWidth =
        autoThemePage.getBoundingClientRect()
            .width;


    /*
       The bright center of the shine
       crosses the screen center when
       the pseudo-element's LEFT position
       reaches 22.5% of the page width.

       Shine width = 55%
       Center of shine = 27.5%
       Screen center = 50%

       50% - 27.5% = 22.5%
    */

    const crossingPoint =
        pageWidth * 0.225;


    /*
       Shine has looped back to the left.
       Prepare for the next crossing.
    */

    if (
        shineLeft <
        crossingPoint
    ) {

        autoThemeCrossedThisCycle =
            false;
    }


    /*
       SHINE JUST CROSSED THE CENTER
    */

    if (
        shineLeft >= crossingPoint &&
        !autoThemeCrossedThisCycle
    ) {

        autoThemeCrossedThisCycle =
            true;

        applyNextAutoTheme();
    }


    autoThemeRaf =
        requestAnimationFrame(
            autoThemeTick
        );
}


/* =========================================
   START AUTO THEME
========================================= */

function startAutoTheme() {

    if (
        !autoThemePage
    ) {
        return;
    }

    autoThemeEnabled =
        true;

    autoThemeIndex =
        getCurrentAutoThemeIndex();

    autoThemeCrossedThisCycle =
        false;

    updateAutoThemeButton();


    if (
        autoThemeRaf === null &&
        autoThemePage.classList.contains(
            "active"
        )
    ) {

        autoThemeRaf =
            requestAnimationFrame(
                autoThemeTick
            );
    }
}


/* =========================================
   STOP AUTO THEME
========================================= */

function stopAutoTheme() {

    autoThemeEnabled =
        false;

    autoThemeCrossedThisCycle =
        false;

    updateAutoThemeButton();


    if (
        autoThemeRaf !== null
    ) {

        cancelAnimationFrame(
            autoThemeRaf
        );

        autoThemeRaf =
            null;
    }
}


/* =========================================
   BUTTON CLICK
========================================= */

if (
    settingsAutoThemeButton
) {

    settingsAutoThemeButton.addEventListener(
        "click",
        function () {

            if (
                autoThemeEnabled
            ) {

                stopAutoTheme();

            } else {

                startAutoTheme();
            }
        }
    );
}


/* =========================================
   STOP AUTO THEME WHEN USER
   CHOOSES A MANUAL THEME
========================================= */

document
    .querySelectorAll(
        ".theme-option"
    )
    .forEach(
        option => {

            option.addEventListener(
                "click",
                function () {

                    if (
                        autoThemeEnabled
                    ) {

                        stopAutoTheme();
                    }
                }
            );
        }
    );


/* =========================================
   STOP AUTO THEME WHEN TOGGLE IS USED
========================================= */

const autoThemeToggle =
    document.getElementById(
        "themeToggle"
    );

if (
    autoThemeToggle
) {

    autoThemeToggle.addEventListener(
        "change",
        function () {

            if (
                autoThemeEnabled
            ) {

                stopAutoTheme();
            }
        }
    );
}


/* =========================================
   WATCH PAGE 1
   SO IT RESTARTS WHEN YOU RETURN
========================================= */

if (
    autoThemePage
) {

    const autoThemeObserver =
        new MutationObserver(
            function () {

                if (
                    !autoThemeEnabled
                ) {
                    return;
                }


                if (
                    autoThemePage.classList.contains(
                        "active"
                    )
                ) {

                    if (
                        autoThemeRaf === null
                    ) {

                        autoThemeRaf =
                            requestAnimationFrame(
                                autoThemeTick
                            );
                    }

                } else {

                    if (
                        autoThemeRaf !== null
                    ) {

                        cancelAnimationFrame(
                            autoThemeRaf
                        );

                        autoThemeRaf =
                            null;
                    }
                }
            }
        );


    autoThemeObserver.observe(
        autoThemePage,
        {
            attributes: true,
            attributeFilter: [
                "class"
            ]
        }
    );
}


updateAutoThemeButton();

/* =========================================================
   SDG-E — VISIBILITY REPAIR ONLY
   Does NOT change navigation or page structure.
========================================================= */

(function restoreSectionVisibility() {

    function repairVisibility() {

        /* Restore information inside the main boxes */
        document.querySelectorAll(".info-box").forEach(box => {

            box.style.setProperty(
                "opacity",
                "1",
                "important"
            );

            box.style.setProperty(
                "visibility",
                "visible",
                "important"
            );

            box.querySelectorAll("*").forEach(el => {

                el.style.setProperty(
                    "opacity",
                    "1",
                    "important"
                );

                el.style.setProperty(
                    "visibility",
                    "visible",
                    "important"
                );

                el.style.setProperty(
                    "color",
                    "var(--theme-text, #ffffff)",
                    "important"
                );

                el.style.setProperty(
                    "-webkit-text-fill-color",
                    "var(--theme-text, #ffffff)",
                    "important"
                );

                el.style.setProperty(
                    "background-image",
                    "none",
                    "important"
                );

                el.style.setProperty(
                    "background-clip",
                    "initial",
                    "important"
                );

                el.style.setProperty(
                    "-webkit-background-clip",
                    "initial",
                    "important"
                );

            });

        });


        /* Restore information inside opened section pages */
        document.querySelectorAll(
            ".part-card, .area-info-card, .partner-card, " +
            ".sil-info-card, .coding-card, .results-coming-soon"
        ).forEach(card => {

            card.style.setProperty(
                "opacity",
                "1",
                "important"
            );

            card.style.setProperty(
                "visibility",
                "visible",
                "important"
            );

            card.querySelectorAll("*").forEach(el => {

                el.style.setProperty(
                    "opacity",
                    "1",
                    "important"
                );

                el.style.setProperty(
                    "visibility",
                    "visible",
                    "important"
                );

                el.style.setProperty(
                    "color",
                    "var(--theme-text, #ffffff)",
                    "important"
                );

                el.style.setProperty(
                    "-webkit-text-fill-color",
                    "var(--theme-text, #ffffff)",
                    "important"
                );

                el.style.setProperty(
                    "background-image",
                    "none",
                    "important"
                );

                el.style.setProperty(
                    "background-clip",
                    "initial",
                    "important"
                );

                el.style.setProperty(
                    "-webkit-background-clip",
                    "initial",
                    "important"
                );

            });

        });


        /* Restore EVERY existing Back button */
        document.querySelectorAll(".back-button, .bottom-back")
            .forEach(button => {

                button.style.setProperty(
                    "display",
                    "block",
                    "important"
                );

                button.style.setProperty(
                    "visibility",
                    "visible",
                    "important"
                );

                button.style.setProperty(
                    "opacity",
                    "1",
                    "important"
                );

                button.style.setProperty(
                    "pointer-events",
                    "auto",
                    "important"
                );

                button.style.setProperty(
                    "z-index",
                    "999999",
                    "important"
                );

                button.style.setProperty(
                    "color",
                    "var(--theme-text, #ffffff)",
                    "important"
                );

                button.style.setProperty(
                    "-webkit-text-fill-color",
                    "var(--theme-text, #ffffff)",
                    "important"
                );

                button.style.setProperty(
                    "background-image",
                    "none",
                    "important"
                );

            });

    }

    /* Initial repair */
    repairVisibility();

    /* Repair again whenever the page changes */
    document.querySelectorAll(".page").forEach(page => {

        new MutationObserver(repairVisibility).observe(page, {
            attributes: true,
            attributeFilter: ["class", "style"]
        });

    });

    /* Repair when the theme changes */
    new MutationObserver(repairVisibility).observe(
        document.body,
        {
            attributes: true,
            attributeFilter: ["class", "style"]
        }
    );

})();

/* =========================================
   FINAL NAVIGATION FIX
   DO NOT REMOVE EXISTING CODE ABOVE
========================================= */

(function () {

    const pageTwo = document.getElementById("pageTwo");

    if (!pageTwo) return;

    const routes = {

        continueButton: "pageTwo",

        partsBox: "partsPage",
        areaInfoBox: "areaInfoPage",
        partnershipBox: "partnershipPage",
        silMentorBox: "silMentorPage",
        codingBox: "codingPage",
        resultsBox: "resultsPage",
        explainingBotBox: "explainingBotPage"

    };

    const backRoutes = {

        backButton: "pageOne",

        partsBackButton: "pageTwo",
        partsBottomBack: "pageTwo",

        areaInfoBackButton: "pageTwo",
        areaInfoBottomBack: "pageTwo",

        partnershipBackButton: "pageTwo",
        partnershipBottomBack: "pageTwo",

        silMentorBackButton: "pageTwo",
        silMentorBottomBack: "pageTwo",

        codingBackButton: "pageTwo",
        codingBottomBack: "pageTwo",

        resultsBackButton: "pageTwo",
        resultsBottomBack: "pageTwo",

        explainingBotBackButton: "pageTwo"
    };


    function hideEverything() {

        document.querySelectorAll(".page").forEach(function (page) {

            page.classList.remove("active");

            page.style.removeProperty("display");

        });

    }


    function openPage(targetId) {

        const target = document.getElementById(targetId);

        if (!target) return;


        hideEverything();


        /*
           PAGE 2 contains the other pages.

           Therefore, when opening a detail page,
           PAGE 2 itself must stay active.
        */

        if (target !== pageTwo && pageTwo.contains(target)) {

            pageTwo.classList.add("active");

            /*
               Hide PAGE 2's normal dashboard content.
            */

            Array.from(pageTwo.children).forEach(function (child) {

                if (child !== target) {

                    child.style.setProperty(
                        "display",
                        "none",
                        "important"
                    );

                }

            });


            /*
               Show the requested detail page.
            */

            target.classList.add("active");

            target.style.setProperty(
                "display",
                "flex",
                "important"
            );

        } else {

            /*
               Normal top-level page.
            */

            target.classList.add("active");

            target.style.setProperty(
                "display",
                "flex",
                "important"
            );

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    function openDashboard() {

        hideEverything();

        pageTwo.classList.add("active");

        /*
           Restore every direct child of PAGE 2.
        */

        Array.from(pageTwo.children).forEach(function (child) {

            child.style.removeProperty("display");

        });

        pageTwo.style.removeProperty("display");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /*
       CLICK CONTROLLER

       Using ONE document listener means the old
       navigation code cannot prevent this controller
       from repairing the page afterwards.
    */

    document.addEventListener("click", function (event) {

        const element = event.target.closest(
            "[id]"
        );

        if (!element) return;


        const id = element.id;


        /*
           BACK BUTTONS
        */

        if (backRoutes[id]) {

            event.preventDefault();
            event.stopImmediatePropagation();

            if (backRoutes[id] === "pageTwo") {

                openDashboard();

            } else {

                openPage(backRoutes[id]);

            }

            return;
        }


        /*
           OPEN BUTTONS / BOXES
        */

        if (routes[id]) {

            event.preventDefault();
            event.stopImmediatePropagation();

            if (routes[id] === "pageTwo") {

                openDashboard();

            } else {

                openPage(routes[id]);

            }

        }

    }, true);


    /*
       Make sure the initial dashboard is visible.
    */

    window.addEventListener("load", function () {

        const activePage =
            document.querySelector(".page.active");

        if (!activePage) {

            pageTwo.classList.add("active");

        }

    });

})();


/* =====================================================
   ROBOTS CODING — IMAGE VIEWER
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".coding-card");
    const viewer = document.getElementById("codeImageViewer");
    const image = document.getElementById("codeViewerImage");
    const close = document.getElementById("codeViewerExit");

    if (!viewer || !image || !close) return;

    const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

    function closeViewer() {
        viewer.classList.remove("active");
        image.src = "";
    }

    cards.forEach((card, index) => {
        card.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            image.src = images[index];
            viewer.classList.add("active");
        });
    });

    close.onclick = function(event) {
        event.preventDefault();
        event.stopPropagation();
        closeViewer();
    };

    viewer.onclick = function(event) {
        if (event.target === viewer) {
            closeViewer();
        }
    };

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeViewer();
        }
    });

});

document.addEventListener("DOMContentLoaded", function () {

    const viewer = document.getElementById("codeImageViewer");
    const image = document.getElementById("codeViewerImage");
    const exit = document.getElementById("codeViewerExit");

    if (!viewer || !image || !exit) return;

    function closeViewer() {
        viewer.classList.remove("active");
        image.src = "";
        document.body.style.overflow = "";
    }

    exit.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeViewer();
    };

    exit.addEventListener("pointerdown", function (e) {
        e.preventDefault();
        e.stopPropagation();
    }, true);

    viewer.addEventListener("click", function (e) {
        if (e.target === viewer) {
            closeViewer();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeViewer();
        }
    });

});

/* =====================================================
   ROBOTS CODING — FINAL IMAGE VIEWER
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const viewer = document.getElementById("codeImageViewer");
    const viewerImage = document.getElementById("codeViewerImage");
    const exitButton = document.getElementById("codeViewerExit");
    const cards = document.querySelectorAll(".code-image-card");

    if (!viewer || !viewerImage || !exitButton) {
        console.error("Coding viewer elements not found.");
        return;
    }

    function closeViewer() {
        viewer.classList.remove("active");
        viewerImage.src = "";
        document.body.style.overflow = "";
    }

    cards.forEach(function (card) {

        card.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const image = card.getAttribute("data-code-image");

            if (!image) return;

            viewerImage.src = image;
            viewer.classList.add("active");
            document.body.style.overflow = "hidden";
        });

    });

    /* X BUTTON */
    exitButton.onclick = function (event) {

        event.preventDefault();
        event.stopPropagation();

        closeViewer();
    };

    /* CLICK OUTSIDE */
    viewer.onclick = function (event) {

        if (event.target === viewer) {
            closeViewer();
        }

    };

    /* ESC */
    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            viewer.classList.contains("active")
        ) {
            closeViewer();
        }

    });

});
