/* =========================================
   GET PAGES
========================================= */

const pageOne =
    document.getElementById("pageOne");

const pageTwo =
    document.getElementById("pageTwo");

const partsPage =
    document.getElementById("partsPage");


/* =========================================
   GET BUTTONS
========================================= */

const continueButton =
    document.getElementById("continueButton");

const backButton =
    document.getElementById("backButton");

const partsBox =
    document.getElementById("partsBox");

const partsBackButton =
    document.getElementById("partsBackButton");

const partsBottomBack =
    document.getElementById("partsBottomBack");


/* =========================================
   THEME SWITCH
========================================= */

const themeToggle =
    document.getElementById("themeToggle");


themeToggle.addEventListener(
    "change",
    function () {

        document.body.classList.toggle(
            "light",
            themeToggle.checked
        );

    }
);


/* =========================================
   PAGE 1 → PAGE 2
========================================= */

continueButton.addEventListener(
    "click",
    function () {

        pageOne.classList.remove("active");

        pageTwo.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================
   PAGE 2 → PAGE 1
========================================= */

backButton.addEventListener(
    "click",
    function () {

        pageTwo.classList.remove("active");

        pageOne.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================
   PARTS BOX → PARTS PAGE
========================================= */

partsBox.addEventListener(
    "click",
    function () {

        pageTwo.classList.remove("active");

        partsPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================
   PARTS PAGE → PAGE 2
========================================= */

function returnToPageTwo() {

    partsPage.classList.remove("active");

    pageTwo.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


partsBackButton.addEventListener(
    "click",
    returnToPageTwo
);


partsBottomBack.addEventListener(
    "click",
    returnToPageTwo
);


/* =========================================
   AREA INFO
========================================= */

const areaInfoPage =
    document.getElementById("areaInfoPage");

const areaInfoBox =
    document.getElementById("areaInfoBox");

const areaInfoBackButton =
    document.getElementById("areaInfoBackButton");

const areaInfoBottomBack =
    document.getElementById("areaInfoBottomBack");


areaInfoBox.addEventListener(
    "click",
    function () {

        pageTwo.classList.remove("active");

        areaInfoPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


function returnFromAreaInfo() {

    areaInfoPage.classList.remove("active");

    pageTwo.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


areaInfoBackButton.addEventListener(
    "click",
    returnFromAreaInfo
);


areaInfoBottomBack.addEventListener(
    "click",
    returnFromAreaInfo
);


/* =========================================
   PARTNERSHIP → PAGE
========================================= */

const partnershipPage =
    document.getElementById("partnershipPage");

const partnershipBox =
    document.getElementById("partnershipBox");

const partnershipBackButton =
    document.getElementById("partnershipBackButton");

const partnershipBottomBack =
    document.getElementById("partnershipBottomBack");


partnershipBox.addEventListener(
    "click",
    function () {

        pageTwo.classList.remove("active");

        partnershipPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================
   PARTNERSHIP → PAGE 2
========================================= */

function returnFromPartnership() {

    partnershipPage.classList.remove("active");

    pageTwo.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


partnershipBackButton.addEventListener(
    "click",
    returnFromPartnership
);


partnershipBottomBack.addEventListener(
    "click",
    returnFromPartnership
);


/* =========================================
   SIL UNIQUE ID & MENTOR → PAGE
========================================= */

const silMentorPage =
    document.getElementById("silMentorPage");

const silMentorBox =
    document.getElementById("silMentorBox");

const silMentorBackButton =
    document.getElementById("silMentorBackButton");

const silMentorBottomBack =
    document.getElementById("silMentorBottomBack");


silMentorBox.addEventListener(
    "click",
    function () {

        pageTwo.classList.remove("active");

        silMentorPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================
   SIL PAGE → PAGE 2
========================================= */

function returnFromSilMentor() {

    silMentorPage.classList.remove("active");

    pageTwo.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


silMentorBackButton.addEventListener(
    "click",
    returnFromSilMentor
);


silMentorBottomBack.addEventListener(
    "click",
    returnFromSilMentor
);


/* =========================================
   ROBOTS CODING → PAGE
========================================= */

const codingPage =
    document.getElementById("codingPage");

const codingBox =
    document.getElementById("codingBox");

const codingBackButton =
    document.getElementById("codingBackButton");

const codingBottomBack =
    document.getElementById("codingBottomBack");


codingBox.addEventListener(
    "click",
    function () {

        pageTwo.classList.remove("active");

        codingPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================
   CODING PAGE → PAGE 2
========================================= */

function returnFromCoding() {

    codingPage.classList.remove("active");

    pageTwo.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


codingBackButton.addEventListener(
    "click",
    returnFromCoding
);


codingBottomBack.addEventListener(
    "click",
    returnFromCoding
);


/* =========================================
   RESULTS → PAGE
========================================= */

const resultsPage =
    document.getElementById("resultsPage");

const resultsBox =
    document.getElementById("resultsBox");

const resultsBackButton =
    document.getElementById("resultsBackButton");

const resultsBottomBack =
    document.getElementById("resultsBottomBack");


resultsBox.addEventListener(
    "click",
    function () {

        pageTwo.classList.remove("active");

        resultsPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================
   RESULTS PAGE → PAGE 2
========================================= */

function returnFromResults() {

    resultsPage.classList.remove("active");

    pageTwo.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


resultsBackButton.addEventListener(
    "click",
    returnFromResults
);


resultsBottomBack.addEventListener(
    "click",
    returnFromResults
);

// =========================================
// FULL SCREEN
// =========================================

const fullscreenButton =
    document.getElementById("fullscreenButton");


fullscreenButton.addEventListener(
    "click",
    function () {

        if (!document.fullscreenElement) {

            document.documentElement.requestFullscreen();

        } else {

            document.exitFullscreen();

        }

    }
);


// Change button text when fullscreen changes

document.addEventListener(
    "fullscreenchange",
    function () {

        if (document.fullscreenElement) {

            fullscreenButton.textContent =
                "✕ Exit Full Screen";

        } else {

            fullscreenButton.textContent =
                "⛶ Full Screen";

        }

    }
);