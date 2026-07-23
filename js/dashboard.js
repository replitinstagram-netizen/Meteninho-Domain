/* =========================================
   METENINHO DOMAINS
   DASHBOARD SYSTEM
========================================= */


/* =========================================
   LOGIN CHECK
========================================= */

const loggedIn =
    localStorage.getItem(
        "meteninhoLoggedIn"
    );


if (
    loggedIn !== "true"
) {

    window.location.href =
        "login.html";

}


/* =========================================
   USER DATA
========================================= */

const user =
    JSON.parse(

        localStorage.getItem(
            "meteninhoUser"
        )

    );


if (user) {


    const userName =
        document.getElementById(
            "userName"
        );


    const welcomeName =
        document.getElementById(
            "welcomeName"
        );


    const accountName =
        document.getElementById(
            "accountName"
        );


    const accountEmail =
        document.getElementById(
            "accountEmail"
        );


    const userAvatar =
        document.getElementById(
            "userAvatar"
        );


    if (userName) {

        userName.textContent =
            user.name;

    }


    if (welcomeName) {

        welcomeName.textContent =
            user.name;

    }


    if (accountName) {

        accountName.textContent =
            user.name;

    }


    if (accountEmail) {

        accountEmail.textContent =
            user.email;

    }


    if (userAvatar) {

        userAvatar.textContent =
            user.name
                .charAt(0)
                .toUpperCase();

    }

}


/* =========================================
   DOMAINS
========================================= */

let domains =
    user && user.domains
        ? user.domains
        : [];


const domainsList =
    document.getElementById(
        "domainsList"
    );


const emptyDomains =
    document.getElementById(
        "emptyDomains"
    );


const domainCount =
    document.getElementById(
        "domainCount"
    );


const activeDomainCount =
    document.getElementById(
        "activeDomainCount"
    );


function renderDomains() {


    if (domainCount) {

        domainCount.textContent =
            domains.length;

    }


    if (activeDomainCount) {

        activeDomainCount.textContent =
            domains.length;

    }


    if (!domains.length) {

        domainsList.innerHTML =
            "";

        emptyDomains.style.display =
            "flex";

        return;

    }


    emptyDomains.style.display =
        "none";


    domainsList.innerHTML =
        "";


    domains.forEach(

        function (domain, index) {


            const domainCard =
                document.createElement(
                    "div"
                );


            domainCard.className =
                "dashboard-domain-card";


            domainCard.innerHTML = `

                <div class="dashboard-domain-left">

                    <div class="dashboard-domain-icon">
                        🌐
                    </div>

                    <div>

                        <strong>
                            ${domain}
                        </strong>

                        <small>
                            Domain aktif
                        </small>

                    </div>

                </div>


                <div class="dashboard-domain-right">

                    <span class="domain-status">
                        ● AKTİF
                    </span>


                    <button
                        class="domain-delete"
                        data-index="${index}">

                        Sil

                    </button>

                </div>

            `;


            domainsList.appendChild(
                domainCard
            );

        }

    );


    document
        .querySelectorAll(
            ".domain-delete"
        )
        .forEach(

            function (button) {


                button.addEventListener(

                    "click",

                    function () {


                        const index =
                            Number(
                                button.dataset.index
                            );


                        domains.splice(
                            index,
                            1
                        );


                        user.domains =
                            domains;


                        localStorage.setItem(

                            "meteninhoUser",

                            JSON.stringify(
                                user
                            )

                        );


                        renderDomains();

                    }

                );

            }

        );

}


renderDomains();


/* =========================================
   LOGOUT
========================================= */

function logout() {


    localStorage.removeItem(

        "meteninhoLoggedIn"

    );


    window.location.href =
        "index.html";

}


const logoutButton =
    document.getElementById(
        "logoutButton"
    );


const mobileLogoutButton =
    document.getElementById(
        "mobileLogoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(

        "click",

        logout

    );

}


if (mobileLogoutButton) {

    mobileLogoutButton.addEventListener(

        "click",

        logout

    );

}


/* =========================================
   MOBILE MENU
========================================= */

const mobileMenuButton =
    document.getElementById(
        "mobileMenuButton"
    );


const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


if (
    mobileMenuButton &&
    mobileMenu
) {

    mobileMenuButton.addEventListener(

        "click",

        function () {

            mobileMenu.classList.toggle(
                "show"
            );

        }

    );

}
