/* ============================================================
   WEDDING INVITATION — script.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof weddingConfig === "undefined") {
        console.error("weddingConfig not found. Check config.js");
        return;
    }
    const cfg = weddingConfig;

    // ============================================================
    // 0. INTRO SCREEN & VIDEO PLAY
    // ============================================================
    const introScreen = document.getElementById("intro-screen");
    const enterBtn    = document.getElementById("enter-btn");
    const video       = document.getElementById("bg-video");
    const soundBtn    = document.getElementById("sound-btn");
    const soundIcon   = document.getElementById("sound-icon");
    const soundLbl    = document.getElementById("sound-label");

    let isMuted = false;

    // Set Initial Video source
    if (video) {
        const src = video.querySelector("source");
        if (src && cfg.videoPath) { src.src = cfg.videoPath; video.load(); }
    }

    if (introScreen && enterBtn) {
        // Update initials
        const introNamesEl = document.querySelector(".intro-names");
        if (introNamesEl && cfg.brideName && cfg.groomName) {
            const bInit = cfg.brideName.charAt(0).toUpperCase();
            const gInit = cfg.groomName.charAt(0).toUpperCase();
            introNamesEl.innerHTML = `${bInit} <span class="intro-amp">&</span> ${gInit}`;
        }

        document.body.style.overflow = "hidden"; // Prevent scrolling

        enterBtn.addEventListener("click", () => {
            introScreen.classList.add("hide");
            document.body.style.overflow = ""; // Restore scrolling

            // PLAY VIDEO WITH SOUND NOW (User interacting unlocks audio)
            if (video) {
                video.muted = false;
                video.volume = 1;
                
                if (soundBtn) {
                    soundIcon.textContent = "🔊";
                    soundLbl.textContent  = "Sound On";
                    soundBtn.classList.add("sound-on");
                }
                
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => console.log("Video play blocked:", e));
                }
            }

            setTimeout(() => introScreen.remove(), 1500);
        });
    }

    // Sound toggle event
    if (soundBtn && video) {
        soundBtn.addEventListener("click", () => {
            isMuted = !isMuted;
            if (isMuted) {
                video.muted  = true;
                video.volume = 0;
                soundIcon.textContent = "🔇";
                soundLbl.textContent  = "Sound Off";
                soundBtn.classList.remove("sound-on");
            } else {
                video.muted  = false;
                video.volume = 1;
                soundIcon.textContent = "🔊";
                soundLbl.textContent  = "Sound On";
                soundBtn.classList.add("sound-on");
            }
        });
    }

    // ============================================================
    // 1. LOAD CONFIG DATA INTO PAGE
    // ============================================================
    function setText(id, value) {
        const el = document.getElementById(id);
        if (el && value !== undefined) el.textContent = value;
    }

    // Names
    const brideEl = document.getElementById("bride-name");
    const groomEl = document.getElementById("groom-name");
    if (brideEl) { brideEl.textContent = cfg.brideName; brideEl.setAttribute("data-text", cfg.brideName); }
    if (groomEl) { groomEl.textContent = cfg.groomName; groomEl.setAttribute("data-text", cfg.groomName); }

    // Date display
    setText("display-day-name",   cfg.displayDate.dayName);
    setText("display-time",       cfg.displayDate.time);
    setText("display-day-number", cfg.displayDate.dayNumber);
    setText("display-month-name", cfg.displayDate.monthName);
    setText("display-year",       cfg.displayDate.year);

    // Location
    setText("location-address", cfg.locationAddress);
    setText("reception-text",   cfg.receptionText);
    
    const locBtn = document.getElementById("location-btn");
    if (locBtn && cfg.locationMapUrl) {
        locBtn.href = cfg.locationMapUrl;
    }

    // RSVP deadline
    if (cfg.rsvpDeadline) setText("rsvp-deadline", cfg.rsvpDeadline);

    // Flower background
    const flowerBg = document.getElementById("flower-bg");
    if (flowerBg && cfg.backgroundImagePath) {
        flowerBg.style.backgroundImage = `url('${cfg.backgroundImagePath}')`;
    }

    // ============================================================
    // 3. COUNTDOWN TIMER with flip animation
    // ============================================================
    const target = new Date(cfg.weddingDate).getTime();
    const prevVals = { days: null, hours: null, minutes: null, seconds: null };

    function setCount(id, value) {
        const el = document.getElementById(id);
        if (!el) return;
        const padded = String(value).padStart(2, "0");
        if (prevVals[id] !== padded) {
            prevVals[id] = padded;
            el.classList.remove("flip");
            void el.offsetWidth;          // force reflow to restart animation
            el.textContent = padded;
            el.classList.add("flip");
        }
    }

    function updateCountdown() {
        const diff = target - Date.now();
        if (diff <= 0) {
            ["days","hours","minutes","seconds"].forEach(id => setText(id, "00"));
            return;
        }
        setCount("days",    Math.floor(diff / 86400000));
        setCount("hours",   Math.floor((diff % 86400000) / 3600000));
        setCount("minutes", Math.floor((diff % 3600000)  / 60000));
        setCount("seconds", Math.floor((diff % 60000)    / 1000));
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ============================================================
    // 4. FALLING STARS (Rain)
    // ============================================================
    const starsContainer = document.getElementById("stars-container");

    function createStar() {
        const s = document.createElement("div");
        s.className = "star";

        // Horizontal position
        s.style.left = Math.random() * 100 + "vw";

        // Size variation for depth
        const size = 2 + Math.random() * 3;
        s.style.width  = size + "px";
        s.style.height = size + "px";

        // Speed (falling like rain but elegant)
        const dur   = 3 + Math.random() * 5;
        const delay = Math.random() * 8;
        s.style.animationDuration = dur + "s";
        s.style.animationDelay   = delay + "s";

        // Slight opacity variation
        s.style.opacity = 0.5 + Math.random() * 0.5;

        starsContainer.appendChild(s);
        s.addEventListener("animationend", () => { s.remove(); createStar(); });
    }

    if (starsContainer) {
        for (let i = 0; i < 40; i++) createStar();
    }

    // ============================================================
    // 5. SCROLL REVEAL — IntersectionObserver
    // ============================================================
    const revealEls = document.querySelectorAll(".reveal-up, .reveal-child");

    const revealObserver = new IntersectionObserver(
        (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
        { threshold: 0.12 }
    );

    revealEls.forEach(el => revealObserver.observe(el));

    // ============================================================
    // 6. PARALLAX — flower background on scroll
    // ============================================================
    window.addEventListener("scroll", () => {
        if (flowerBg) {
            const offset = window.scrollY * 0.07;
            flowerBg.style.transform = `scale(1.03) translateY(${offset}px)`;
        }
    }, { passive: true });

    // ============================================================
    // 7. RSVP FORM
    // ============================================================
    const rsvpForm    = document.getElementById("rsvp-form");
    const rsvpSuccess = document.getElementById("rsvp-success");
    const guestRow    = document.getElementById("guest-row");

    // Hide guest row when user declines
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    attendanceRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (guestRow) {
                guestRow.style.display = radio.value === "no" ? "none" : "flex";
            }
        });
    });

    if (rsvpForm) {
        rsvpForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Basic validation
            let valid = true;

            const name  = document.getElementById("rsvp-name");
            const email = document.getElementById("rsvp-email");
            const att   = document.querySelector('input[name="attendance"]:checked');

            [name, email].forEach(field => {
                if (field) {
                    field.classList.remove("invalid");
                    if (!field.value.trim()) {
                        field.classList.add("invalid");
                        valid = false;
                    }
                }
            });

            if (!att) {
                // Highlight radio group
                attendanceRadios.forEach(r => {
                    r.closest(".radio-card").style.outline = "1.5px solid #e07070";
                });
                valid = false;
            } else {
                attendanceRadios.forEach(r => {
                    r.closest(".radio-card").style.outline = "none";
                });
            }

            if (!valid) return;

            // Collect data
            const data = {
                name:       name ? name.value.trim() : "",
                email:      email ? email.value.trim() : "",
                phone:      document.getElementById("rsvp-phone")?.value.trim() || "",
                attendance: att ? att.value : "",
                guests:     document.getElementById("rsvp-guests")?.value || "1",
                meal:       document.getElementById("rsvp-meal")?.value || "",
                message:    document.getElementById("rsvp-message")?.value.trim() || "",
            };

            // Log to console (replace with your backend / email service)
            console.log("RSVP Submitted:", data);

            // Show success
            const submitBtn = document.getElementById("rsvp-submit");
            if (submitBtn) {
                submitBtn.textContent = "Sending...";
                submitBtn.disabled    = true;
            }

            setTimeout(() => {
                rsvpForm.style.display    = "none";
                rsvpSuccess.style.display = "block";
                rsvpSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 800);
        });
    }
});
