/* =========================================
   METENINHO DOMAINS
   DOMAIN CATALOG
========================================= */


/* MOBILE MENU */

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


/* SEARCH */

const catalogSearch =
    document.getElementById(
        "catalogSearch"
    );


const catalogSearchButton =
    document.getElementById(
        "catalogSearchButton"
    );


const catalogResult =
    document.getElementById(
        "catalogResult"
    );


function searchCatalog(

    extension

) {


    let name =
        catalogSearch.value
            .trim()
            .toLowerCase();


    if (!name) {

        alert(
            "Önce bir domain adı yaz."
        );

        return;

    }


    name =
        name.replace(

            /\.(com|net|org|site|online)$/i,

            ""

        );


    const domain =
        name + extension;


    catalogResult.innerHTML = `

        <div class="catalog-result-card">

            <div>

                <small>
                    DOMAIN SONUCU
                </small>


                <h3>
                    ${domain}
                </h3>


                <span>
                    ✓ Kullanılabilir
                </span>

            </div>


            <button
                id="catalogAddButton">

                Domaini Ekle →

            </button>

        </div>

    `;


    document
        .getElementById(
            "catalogAddButton"
        )
        .addEventListener(

            "click",

            function () {

                addDomain(
                    domain
                );

            }

        );

}


if (catalogSearchButton) {

    catalogSearchButton.addEventListener(

        "click",

        function () {

            searchCatalog(
                ".com"
            );

        }

    );

}


/* EXTENSION CARDS */

document
    .querySelectorAll(
        ".extension-card"
    )
    .forEach(

        function (card) {


            const button =
                card.querySelector(
                    "button"
                );


            button.addEventListener(

                "click",

                function () {

                    searchCatalog(

                        card.dataset.extension

                    );

                }

            );

        }

    );


/* ADD DOMAIN */

function addDomain(

    domain

) {


    const loggedIn =
        localStorage.getItem(
            "meteninhoLoggedIn"
        );


    if (
        loggedIn !== "true"
    ) {

        alert(
            "Domain eklemek için giriş yapmalısın."
        );


        window.location.href =
            "login.html";


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

        alert(
            "Bu domain zaten eklenmiş."
        );


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


    alert(
        domain +
        " dashboard'a eklendi! 🚀"
    );


    window.location.href =
        "dashboard.html";

          }
