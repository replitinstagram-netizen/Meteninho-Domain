/* =========================================
   METENINHO DOMAINS
   AUTH SYSTEM
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
   REGISTER SYSTEM
========================================= */

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("registerName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("registerPassword")
                    .value;


            if (password.length < 6) {

                showAuthMessage(
                    "Şifre en az 6 karakter olmalı.",
                    "error"
                );

                return;

            }


            const user = {

                name: name,

                email: email,

                password: password,

                domains: []

            };


            localStorage.setItem(

                "meteninhoUser",

                JSON.stringify(user)

            );


            showAuthMessage(

                "Hesabın başarıyla oluşturuldu! 🎉",

                "success"

            );


            setTimeout(

                function () {

                    window.location.href =
                        "login.html";

                },

                1200

            );

        }

    );

}


/* =========================================
   LOGIN SYSTEM
========================================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            const savedUser =
                JSON.parse(

                    localStorage.getItem(
                        "meteninhoUser"
                    )

                );


            if (!savedUser) {

                showAuthMessage(

                    "Henüz kayıtlı bir hesap yok.",

                    "error"

                );

                return;

            }


            if (

                savedUser.email !== email ||

                savedUser.password !== password

            ) {

                showAuthMessage(

                    "E-posta veya şifre hatalı.",

                    "error"

                );

                return;

            }


            localStorage.setItem(

                "meteninhoLoggedIn",

                "true"

            );


            showAuthMessage(

                "Giriş başarılı! 🚀",

                "success"

            );


            setTimeout(

                function () {

                    window.location.href =
                        "dashboard.html";

                },

                900

            );

        }

    );

}


/* =========================================
   AUTH MESSAGE
========================================= */

function showAuthMessage(

    message,

    type

) {

    const messageBox =

        document.getElementById(
            "registerMessage"
        ) ||

        document.getElementById(
            "loginMessage"
        );


    if (!messageBox) {

        return;

    }


    messageBox.textContent =
        message;


    messageBox.className =
        "auth-message " + type;

              }
