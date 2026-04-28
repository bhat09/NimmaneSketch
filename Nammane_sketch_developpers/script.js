const page = window.location.pathname.split('/').pop();

if (page === '' || page === 'index.html') {
  setupHeroRotation();
}

if (page === 'projects.html') {
  setupProjectSlider();
}

function setupHeroRotation() {
  const heroVideo = document.getElementById('heroVideo');
  const heroTitle = document.getElementById('heroTitle');
  const heroTagline = document.getElementById('heroTagline');

  if (!heroVideo || !heroTitle || !heroTagline) {
    return;
  }

  const slides = [
    {
      src: 'https://cdn.coverr.co/videos/coverr-construction-workers-working-on-a-building-site-1579/1080p.mp4',
      title: 'Nimmane Sketch Developers',
      tagline: 'Strong foundations. Elegant design. Homes built to last.'
    },
    {
      src: 'https://cdn.coverr.co/videos/coverr-city-construction-crane-1577/1080p.mp4',
      title: 'Engineering Every Detail',
      tagline: 'From blueprint to handover, we deliver quality at every stage.'
    },
    {
      src: 'https://cdn.coverr.co/videos/coverr-building-structure-under-construction-9715/1080p.mp4',
      title: 'Projects That Define Skylines',
      tagline: 'Trusted construction partner for residential and commercial growth.'
    }
  ];

  let current = 0;

  const showSlide = (index) => {
    const item = slides[index];
    heroVideo.src = item.src;
    heroTitle.textContent = item.title;
    heroTagline.textContent = item.tagline;
    heroVideo.play().catch(() => {
      // Ignore autoplay restrictions.
    });
  };

  heroVideo.addEventListener('ended', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  showSlide(current);
}

function setupProjectSlider() {
  const stage = document.getElementById('projectStage');
  const details = document.getElementById('projectDetails');
  const feedback = document.getElementById('feedbackDetails');
  const prevBtn = document.getElementById('prevProject');
  const nextBtn = document.getElementById('nextProject');

  if (!stage || !details || !feedback || !prevBtn || !nextBtn) {
    return;
  }

  const projects = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
      title: 'Skyline Heights',
      description: 'A premium high-rise residential project with earthquake-resistant frame and energy-smart systems.',
      feedback: {
        type: 'text',
        content: '"Professional team and timely delivery. The build quality exceeded our expectations." - Resident Family'
      }
    },
    {
      type: 'video',
      src: 'https://cdn.coverr.co/videos/coverr-construction-site-time-lapse-9084/1080p.mp4',
      title: 'Grand Avenue Mall',
      description: 'Commercial complex built with advanced ventilation, parking automation, and modern retail layouts.',
      feedback: {
        type: 'video',
        src: 'https://cdn.coverr.co/videos/coverr-aerial-view-of-city-street-1576/1080p.mp4'
      }
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80',
      title: 'Green Valley Villas',
      description: 'Luxury villa community with landscaped streets, clubhouse, and rainwater harvesting infrastructure.',
      feedback: {
        type: 'text',
        content: '"Excellent planning and transparent communication from start to possession." - Villa Owner'
      }
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
      title: 'Silver Oak Residency',
      description: 'Mid-rise apartment campus with family-friendly open spaces, security systems, and premium amenities.',
      feedback: {
        type: 'text',
        content: '"The design and finishing are outstanding. We strongly recommend Nimmane Sketch Developers." - Buyer Group'
      }
    }
  ];

  let index = 0;

  const renderProject = () => {
    const item = projects[index];
    stage.innerHTML = '';

    if (item.type === 'video') {
      const video = document.createElement('video');
      video.src = item.src;
      video.controls = true;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      stage.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.title;
      stage.appendChild(img);
    }

    details.innerHTML = `
      <h2>${item.title}</h2>
      <p class="lead">${item.description}</p>
    `;

    if (item.feedback.type === 'video') {
      feedback.innerHTML = `
        <h3>Customer Feedback (Video)</h3>
        <video class="feedback-media" src="${item.feedback.src}" controls muted></video>
      `;
    } else {
      feedback.innerHTML = `
        <h3>Customer Feedback</h3>
        <p class="lead">${item.feedback.content}</p>
      `;
    }
  };

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + projects.length) % projects.length;
    renderProject();
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % projects.length;
    renderProject();
  });

  renderProject();
}