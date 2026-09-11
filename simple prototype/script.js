/* ====================================
   FARMCONNECT - SCRIPT.JS
==================================== */

/* ====================================
   FARMER REGISTRATION
==================================== */

const farmerForm = document.getElementById("farmerForm");

if (farmerForm) {
    farmerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert(
            "🎉 Farmer Registration Successful!\n\nWelcome to FarmConnect."
        );

        farmerForm.reset();
    });
}

/* ====================================
   CUSTOMER LOGIN
==================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert(
            "✅ Login Successful!"
        );

        loginForm.reset();
    });
}

/* ====================================
   COMMUNITY POST SECTION
==================================== */

const postBtn = document.getElementById("postBtn");

if (postBtn) {

    postBtn.addEventListener("click", function () {

        const input =
            document.getElementById("postInput");

        const text = input.value.trim();

        if (text === "") {
            alert("Please write something first.");
            return;
        }

        const container =
            document.querySelector(".community-container");

        const post =
            document.createElement("div");

        post.classList.add("post");

        post.innerHTML = `
            <h3>👨‍🌾 Farmer User</h3>
            <p>${text}</p>

            <button class="like-btn">
                👍 Like
            </button>

            <button class="comment-btn">
                💬 Comment
            </button>
        `;

        container.prepend(post);

        input.value = "";

        attachLikeEvents();

        alert("Post Published Successfully!");
    });
}

/* ====================================
   LIKE BUTTONS
==================================== */

function attachLikeEvents() {

    const likeButtons =
        document.querySelectorAll(".like-btn");

    likeButtons.forEach(button => {

        button.onclick = function () {

            let likes =
                parseInt(
                    button.dataset.likes || 0
                );

            likes++;

            button.dataset.likes = likes;

            button.innerHTML =
                `👍 Like (${likes})`;
        };
    });
}

attachLikeEvents();

/* ====================================
   PRODUCT ADD TO CART
==================================== */

const cartButtons =
    document.querySelectorAll(
        ".product-card button"
    );

let cartCount = 0;

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        cartCount++;

        alert(
            `🛒 Product Added To Cart!\n\nItems in Cart: ${cartCount}`
        );
    });
});

/* ====================================
   WEATHER DATA SIMULATION
==================================== */

const temperatures =
    ["30°C", "31°C", "32°C", "33°C", "34°C"];

const humidityValues =
    ["65%", "68%", "70%", "72%", "75%"];

const windValues =
    ["10 km/h", "12 km/h", "15 km/h", "18 km/h"];

const conditions =
    [
        "Sunny",
        "Cloudy",
        "Partly Cloudy",
        "Rainy"
    ];

function updateWeather() {

    const temp =
        document.getElementById("temp");

    const humidity =
        document.getElementById("humidity");

    const wind =
        document.getElementById("wind");

    const condition =
        document.getElementById("condition");

    if (
        temp &&
        humidity &&
        wind &&
        condition
    ) {

        temp.textContent =
            temperatures[
                Math.floor(
                    Math.random() *
                    temperatures.length
                )
            ];

        humidity.textContent =
            humidityValues[
                Math.floor(
                    Math.random() *
                    humidityValues.length
                )
            ];

        wind.textContent =
            windValues[
                Math.floor(
                    Math.random() *
                    windValues.length
                )
            ];

        condition.textContent =
            conditions[
                Math.floor(
                    Math.random() *
                    conditions.length
                )
            ];
    }
}

updateWeather();

/* refresh every 10 seconds */
setInterval(updateWeather, 10000);

/* ====================================
   MARKET PRICE UPDATES
==================================== */

const marketPrices = [
    {
        tomato: 40,
        potato: 30,
        wheat: 55
    },
    {
        tomato: 42,
        potato: 31,
        wheat: 57
    },
    {
        tomato: 39,
        potato: 29,
        wheat: 54
    },
    {
        tomato: 45,
        potato: 33,
        wheat: 58
    }
];

function updatePrices() {

    const rows =
        document.querySelectorAll("table tr");

    if (rows.length < 4) return;

    const random =
        marketPrices[
            Math.floor(
                Math.random() *
                marketPrices.length
            )
        ];

    rows[1].cells[2].innerHTML =
        `₹${random.tomato}/kg`;

    rows[2].cells[2].innerHTML =
        `₹${random.potato}/kg`;

    rows[3].cells[2].innerHTML =
        `₹${random.wheat}/kg`;
}

setInterval(updatePrices, 15000);

/* ====================================
   ORDER STATUS UPDATES
==================================== */

const statusList = [
    "Pending",
    "Packed",
    "Shipped",
    "Delivered"
];

function updateOrderStatus() {

    const statuses =
        document.querySelectorAll(
            ".pending,.shipped,.delivered"
        );

    statuses.forEach(status => {

        const randomStatus =
            statusList[
                Math.floor(
                    Math.random() *
                    statusList.length
                )
            ];

        status.textContent =
            randomStatus;

        status.className = "";

        if (randomStatus === "Pending") {
            status.classList.add("pending");
        }

        if (randomStatus === "Shipped") {
            status.classList.add("shipped");
        }

        if (randomStatus === "Delivered") {
            status.classList.add("delivered");
        }
    });
}

setInterval(updateOrderStatus, 20000);

/* ====================================
   FARMER RATINGS
==================================== */

const farmerCards =
    document.querySelectorAll(
        ".farmer-rating-card h4"
    );

function updateRatings() {

    farmerCards.forEach(card => {

        let rating =
            (
                4 +
                Math.random()
            ).toFixed(1);

        card.innerHTML =
            `⭐⭐⭐⭐⭐ ${rating}/5`;
    });
}

setInterval(updateRatings, 12000);

/* ====================================
   CONTACT FORM
==================================== */

const contactForm =
    document.querySelector(
        ".contact-form"
    );

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            alert(
                "📨 Message Sent Successfully!"
            );

            contactForm.reset();
        }
    );
}

/* ====================================
   DASHBOARD COUNTERS
==================================== */

function animateCounter(
    element,
    start,
    end,
    duration
) {

    let startTime = null;

    function update(currentTime) {

        if (!startTime)
            startTime = currentTime;

        const progress =
            Math.min(
                (
                    currentTime -
                    startTime
                ) / duration,
                1
            );

        const value =
            Math.floor(
                progress *
                (end - start) +
                start
            );

        element.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

window.addEventListener(
    "load",
    () => {

        const cards =
            document.querySelectorAll(
                ".dashboard-card p"
            );

        if (cards.length >= 4) {

            animateCounter(
                cards[0],
                0,
                125,
                2000
            );

            animateCounter(
                cards[1],
                0,
                125000,
                2500
            );

            animateCounter(
                cards[2],
                0,
                35,
                1800
            );

            animateCounter(
                cards[3],
                0,
                210,
                2200
            );
        }
    }
);

/* ====================================
   SCROLL TO TOP BUTTON
==================================== */

const topButton =
    document.createElement("button");

topButton.innerHTML = "⬆";

topButton.id = "topBtn";

document.body.appendChild(topButton);

topButton.style.position = "fixed";
topButton.style.bottom = "20px";
topButton.style.right = "20px";
topButton.style.padding = "12px 16px";
topButton.style.border = "none";
topButton.style.borderRadius = "50%";
topButton.style.background = "#2e7d32";
topButton.style.color = "white";
topButton.style.fontSize = "18px";
topButton.style.cursor = "pointer";
topButton.style.display = "none";
topButton.style.zIndex = "9999";

window.addEventListener("scroll", () => {

    if (
        document.documentElement.scrollTop > 300
    ) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
});

topButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* ====================================
   NAVBAR ACTIVE LINK
==================================== */

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});

/* ====================================
   WELCOME MESSAGE
==================================== */

setTimeout(() => {

    console.log(
        "🌾 Welcome to FarmConnect Marketplace"
    );

}, 1000);

/* ====================================
   END OF FILE
==================================== */