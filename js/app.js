/* =========================================
   METENINHO DOMAINS
   MAIN APP SYSTEM
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (mobileMenuButton && mobileMenu) {

    mobileMenuButton.addEventListener(
        "click",
        function () {

            mobileMenu.classList.toggle("show");

        }
    );

}


/* =========================================
   DOMAIN SEARCH
========================================= */

const domainSearchForm =
    document.getElementById(
        "domainSearchForm"
    );


if (domainSearchForm) {

    domainSearchForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            searchDomain();

        }
    );

}


function searchDomain() {

    const input =
        document.getElementById(
            "domainInput"
        );

    const extension =
        document.getElementById(
            "extension"
        );

    const result =
        document.getElementById(
            "searchResult"
        );


    if (!input || !extension || !result) {

        return;

    }


    let domainName =
        input.value.trim();


    if (domainName === "") {

        result.innerHTML = `
            <div class="search-error">
                ⚠️ Lütfen bir domain adı yaz.
            </div>
        `;

        return;

    }


    domainName =
        domainName
            .toLowerCase()
            .replace("https://", "")
            .replace("http://", "")
            .replace("www.", "")
            .split(".")[0]
            .replace(
                /[^a-z0-9-]/g,
                ""
            );


    if (domainName.length < 2) {

        result.innerHTML = `
            <div class="search-error">
                ⚠️ Domain adı en az 2 karakter olmalı.
            </div>
        `;

        return;

    }


    const fullDomain =
        domainName +
        extension.value;


    result.innerHTML = `

        <div class="search-loading">

            <span class="loading-spinner"></span>

            <span>
                ${fullDomain}
                kontrol ediliyor...
            </span>

        </div>

    `;


    setTimeout(
        function () {

            showDomainResult(
                fullDomain
            );

        },
        900
    );

}


/* =========================================
   DOMAIN RESULT
========================================= */

function showDomainResult(
    domain
) {

    const result =
        document.getElementById(
            "searchResult"
        );


    result.innerHTML = `

        <div class="domain-result-card">

            <div class="domain-result-info">

                <div class="domain-result-check">
                    ✓
                </div>

                <div>

                    <strong>
                        ${domain}
                    </strong>

                    <span>
                        Bu domain şu anda müsait görünüyor.
                    </span>

                </div>

            </div>


            <button
                class="domain-add-button"
                onclick="addToCart('${domain}')">

                Sepete Ekle

                <span>
                    →
                </span>

            </button>

        </div>

    `;

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(
    domain
) {


    let cart =
        JSON.parse(
            localStorage.getItem(
                "meteninhoCart"
            )
        ) || [];


    if (
        cart.includes(
            domain
        )
    ) {

        showNotification(
            "Bu domain zaten sepette.",
            "warning"
        );

        return;

    }


    cart.push(
        domain
    );


    localStorage.setItem(

        "meteninhoCart",

        JSON.stringify(
            cart
        )

    );


    showNotification(

        domain +
        " sepete eklendi! 🎉",

        "success"

    );


    /*
       Kullanıcı giriş yaptıysa
       domaini direkt hesabına ekle
    */

    saveDomainToUser(
        domain
    );

}


/* =========================================
   SAVE DOMAIN TO USER
========================================= */

function saveDomainToUser(
    domain
) {


    const loggedIn =
        localStorage.getItem(
            "meteninhoLoggedIn"
        );


    if (
        loggedIn !== "true"
    ) {

        return;

    }


    const user =
        JSON.parse(

            localStorage.getItem(
                "meteninhoUser"
            )

        );


    if (!user) {

        return;

    }


    if (!user.domains) {

        user.domains = [];

    }


    if (
        user.domains.includes(
            domain
        )
    ) {

        return;

    }


    user.domains.push(
        domain
    );


    localStorage.setItem(

        "meteninhoUser",

        JSON.stringify(
            user
        )

    );


    setTimeout(

        function () {

            showNotification(

                "Domainin dashboard'a eklendi! 🌐",

                "success"

            );

        },

        500

    );

}


/* =========================================
   NOTIFICATION
========================================= */

function showNotification(

    message,
    type

) {


    const oldNotification =
        document.querySelector(
            ".app-notification"
        );


    if (
        oldNotification
    ) {

        oldNotification.remove();

    }


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        "app-notification " +
        type;


    notification.innerHTML = `

        <span>
            ${type === "success"
                ? "✓"
                : "⚠️"}
        </span>

        <p>
            ${message}
        </p>

    `;


    document.body.appendChild(
        notification
    );


    setTimeout(
        function () {

            notification.classList.add(
                "hide"
            );


            setTimeout(
                function () {

                    notification.remove();

                },
                400
            );

        },
        2800
    );

}


/* =========================================
   POPULAR EXTENSIONS
========================================= */

const extensionButtons =
    document.querySelectorAll(
        "[data-extension]"
    );


extensionButtons.forEach(
    function (button) {


        button.addEventListener(
            "click",
            function () {


                const extension =
                    button.dataset.extension;


                const extensionSelect =
                    document.getElementById(
                        "extension"
                    );


                if (
                    extensionSelect
                ) {

                    extensionSelect.value =
                        extension;

                }

            }

        );

    }
);
