async function loadPortfolio() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();

        // 1. Hero Render
        renderHero(data);

        // 2. Journey Render
        renderJourney(data);

        // 3. Skills Render
        renderSkills(data);

        // 4. Recommendations Render
        renderRecommendations(data);

        // 5. Footer Render
        renderFooter(data);


    } catch (error) {
        console.error("Error:", error);
    }
}


function renderHero(data) {
    document.getElementById('hero-container').innerHTML = `
            <h1 class="brand-name">${data.hero.name}</h1>
            <p class="brand-subtitle">${data.hero.role}</p>
            <div class="typing-container">
                <p class="hero-title">Code with <span class="highlight">${data.hero.slogan.split(' ').pop()}</span></p>
            </div>
            <p class="text-secondary fs-5 mt-3 mb-5 max-w-2xl mx-auto">${data.hero.description}</p>
            <div class="info-bar">
                <div class="label-tag">CURRENT ROLE</div>
                <div class="info-content flex-grow-1 text-start fw-600">
                    ${data.hero.currentRole.title} <a href="${data.hero.currentRole.link}" target="_blank" class="company-link"><strong>${data.hero.currentRole.company}</strong></a>
                </div>
                <a href="${data.socials.linkedin}" target="_blank" class="btn-orange">LinkedIn Profile</a>
            </div>
            <div class="mt-5 d-flex flex-column flex-sm-row justify-content-center flex-wrap gap-5 text-muted small fw-bold">
                ${data.hero.highlights.map(h => `<span><i class="${h.icon} highlight me-1"></i> ${h.text}</span>`).join('')}
            </div>
        `;
}

function renderJourney(data) {
    document.getElementById('journey-timeline').innerHTML = data.journey.map(j => `
            <div class="timeline-item">
                <div class="timeline-date">${j.date}</div>
                <h3 class="fw-bold fs-5">${j.role}</h3>
                <p class="timeline-company text-muted fw-600">${j.company}</p>
            </div>
        `).join('');
}

function renderRecommendations(data) {
    const wrapper = document.getElementById('recommendations-wrapper');

    wrapper.innerHTML = data.recommendations.map(r => `
        <div class="col-lg-4 col-md-6 col-12">
            <article class="testimonial-card">
                <p class="recommendation-text">"${r.text}"</p>
                <div class="recommendation-author mt-auto text-center">
                    <h6 class="fw-bold mb-0">${r.author}</h6>
                    <p class="highlight fw-bold small mb-0">${r.position}</p>
                </div>
            </article>
        </div>
    `).join('');
}

function renderFooter(data) {
    document.getElementById('footer-container').innerHTML = `
            <div class="footer-socials d-flex flex-wrap justify-content-center align-items-center gap-4">
                <div class="d-flex gap-4 align-items-center">
                    <a href="${data.socials.github}" target="_blank" class="social-link"><i class="fab fa-github"></i></a>
                    <a href="${data.socials.linkedin}" target="_blank" class="social-link"><i class="fab fa-linkedin"></i></a>
                    <a href="${data.socials.telegram}" target="_blank" class="social-link"><i class="fab fa-telegram"></i></a>
                </div>
                <!--<div class="vr d-none d-md-block" style="height: 30px; opacity: 0.1;"></div>
                <a href="${data.socials.cvLink}" target="_blank" class="btn-cv">
                    <i class="fas fa-file-download me-2"></i> Download CV
                </a>-->
            </div>
            <p class="small text-muted mt-3">Connecting ideas through code.</p>
        `;
}

function renderSkills(data) {
    document.getElementById('skills-container').innerHTML = data.skills.map(s => `<span class="skill-badge">${s}</span>`).join('');
}


// Start Loading
document.addEventListener('DOMContentLoaded', loadPortfolio);