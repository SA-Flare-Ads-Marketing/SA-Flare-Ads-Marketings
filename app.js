// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceID: "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
  templateID: "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
  publicKey: "YOUR_PUBLIC_KEY", // Replace with your EmailJS public key
}

// Declare emailjs variable
let emailjs

// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS
  if (typeof window.emailjs !== "undefined") {
    emailjs = window.emailjs
    emailjs.init(EMAILJS_CONFIG.publicKey)
  }

  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }),
  )

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Order Form Handling with EmailJS
  const orderForm = document.querySelector(".order-form")
  if (orderForm) {
    orderForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(orderForm)
      const formObject = {}

      // Convert FormData to object
      for (const [key, value] of formData.entries()) {
        if (formObject[key]) {
          // Handle multiple values (like checkboxes)
          if (Array.isArray(formObject[key])) {
            formObject[key].push(value)
          } else {
            formObject[key] = [formObject[key], value]
          }
        } else {
          formObject[key] = value
        }
      }

      // Create email body
      let emailBody = "New Order Request:\n\n"
      for (const [key, value] of Object.entries(formObject)) {
        emailBody += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${Array.isArray(value) ? value.join(", ") : value}\n`
      }

      // Create mailto link
      const subject = encodeURIComponent("New Order Request - SA Flare")
      const body = encodeURIComponent(emailBody)
      const mailtoLink = `mailto:saflareadsmarketing138@gmail.com?subject=${subject}&body=${body}`

      // Open email client
      window.location.href = mailtoLink

      // Show success message
      alert(
        "Thank you for your order! Your email client should open now. If it doesn't, please email us directly at saflareadsmarketing138@gmail.com",
      )
    })
  }

  // Add loading animation to buttons
  document.querySelectorAll(".btn-primary, .btn-secondary, .btn-gold").forEach((button) => {
    button.addEventListener("click", function () {
      if (this.type === "submit" || this.href) {
        this.classList.add("loading")
        setTimeout(() => {
          this.classList.remove("loading")
        }, 2000)
      }
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".service-card, .stat, .feature, .testimonial-card, .team-member").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Counter animation for stats
  function animateCounter(element, target, duration = 2000) {
    let start = 0
    const increment = target / (duration / 16)

    function updateCounter() {
      start += increment
      if (start < target) {
        element.textContent = Math.floor(start).toLocaleString()
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target.toLocaleString()
      }
    }

    updateCounter()
  }

  // Animate counters when they come into view
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector("h3")
        const text = statNumber.textContent
        const number = Number.parseInt(text.replace(/[^\d]/g, ""))

        if (number && !entry.target.classList.contains("animated")) {
          entry.target.classList.add("animated")
          animateCounter(statNumber, number)
        }
      }
    })
  }, observerOptions)

  document.querySelectorAll(".stat, .stat-item").forEach((stat) => {
    statObserver.observe(stat)
  })

  // Add hover effects to cards
  document.querySelectorAll(".service-card, .payment-card, .contact-item, .testimonial-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
      navbar.style.backdropFilter = "blur(20px)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.backdropFilter = "blur(15px)"
    }
  })

  // Add click tracking for analytics (placeholder)
  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("click", function () {
      // Placeholder for analytics tracking
      console.log("Click tracked:", this.textContent || this.getAttribute("aria-label"))
    })
  })

  // Initialize scroll animations
  initScrollAnimations()

  // Initialize lazy loading for images
  initLazyLoading()

  // Initialize particle effects
  initParticleEffects()

  // Ensure navigation links work properly
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      // Remove active class from all links
      document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"))
      // Add active class to clicked link
      this.classList.add("active")

      // Close mobile menu if open
      const hamburger = document.querySelector(".hamburger")
      const navMenu = document.querySelector(".nav-menu")
      if (hamburger && navMenu && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }
    })
  })

  // Fix social media links
  document.querySelectorAll(".social-icons a, .social-links a").forEach((link) => {
    link.addEventListener("click", function (e) {
      // Ensure the link opens in a new tab
      if (!this.target) {
        this.target = "_blank"
        this.rel = "noopener"
      }
    })
  })
})

// Enhanced notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  document.querySelectorAll(".notification").forEach((n) => n.remove())

  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`

  const icons = {
    success: "check-circle",
    error: "exclamation-circle",
    info: "info-circle",
    warning: "exclamation-triangle",
  }

  const colors = {
    success: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    error: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    info: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    warning: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  }

  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${icons[type]}"></i>
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `

  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${colors[type]};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    z-index: 10000;
    max-width: 400px;
    animation: slideInBounce 0.5s ease-out;
    backdrop-filter: blur(10px);
  `

  // Add enhanced animation keyframes
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style")
    style.id = "notification-styles"
    style.textContent = `
      @keyframes slideInBounce {
        0% { 
          transform: translateX(100%) scale(0.8); 
          opacity: 0; 
        }
        60% { 
          transform: translateX(-10px) scale(1.05); 
          opacity: 1; 
        }
        100% { 
          transform: translateX(0) scale(1); 
          opacity: 1; 
        }
      }
      .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.3s;
      }
      .notification-close:hover {
        opacity: 1;
        transform: scale(1.1);
      }
    `
    document.head.appendChild(style)
  }

  document.body.appendChild(notification)

  // Close button functionality
  notification.querySelector(".notification-close").addEventListener("click", () => {
    notification.style.animation = "slideOut 0.3s ease-in forwards"
    setTimeout(() => notification.remove(), 300)
  })

  // Auto remove after 6 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOut 0.3s ease-in forwards"
      setTimeout(() => notification.remove(), 300)
    }
  }, 6000)
}

// Enhanced scroll animations with different effects
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for multiple elements
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0) scale(1)"

          // Add different animation classes based on element type
          if (entry.target.classList.contains("service-card")) {
            entry.target.classList.add("animate-bounce-in")
          } else if (entry.target.classList.contains("team-member")) {
            entry.target.classList.add("animate-slide-in-left")
          } else if (entry.target.classList.contains("testimonial-card")) {
            entry.target.classList.add("animate-slide-in-right")
          } else {
            entry.target.classList.add("animate-fade-in-up")
          }
        }, index * 100) // Staggered animation
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document
    .querySelectorAll(
      ".service-card, .testimonial-card, .team-member, .feature, .stat, .contact-item, .payment-card, .benefit",
    )
    .forEach((el, index) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(50px) scale(0.9)"
      el.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      el.style.transitionDelay = `${index * 0.1}s`
      observer.observe(el)
    })
}

// Enhanced mobile menu functionality
function toggleMobileMenu() {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")

    // Enhanced hamburger animation
    const spans = hamburger.querySelectorAll("span")
    if (hamburger.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
      spans[0].style.background = "linear-gradient(45deg, #ff6b6b, #ffd700)"
      spans[1].style.opacity = "0"
      spans[1].style.transform = "scale(0)"
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      spans[2].style.background = "linear-gradient(45deg, #ff6b6b, #ffd700)"
    } else {
      spans.forEach((span) => {
        span.style.transform = "none"
        span.style.opacity = "1"
        span.style.background = "linear-gradient(45deg, #ffd700, #ff6b6b)"
      })
    }
  }
}

// Close mobile menu when clicking outside
document.addEventListener("click", (event) => {
  const navbar = document.querySelector(".navbar")
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (navbar && hamburger && navMenu) {
    if (!navbar.contains(event.target) && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")

      // Reset hamburger animation
      const spans = hamburger.querySelectorAll("span")
      spans.forEach((span) => {
        span.style.transform = "none"
        span.style.opacity = "1"
        span.style.background = "linear-gradient(45deg, #ffd700, #ff6b6b)"
      })
    }
  }
})

// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        img.classList.add("loaded")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    img.classList.add("lazy")
    imageObserver.observe(img)
  })
}

// Particle effects for enhanced visual appeal
function initParticleEffects() {
  // Create floating particles
  const particleContainer = document.createElement("div")
  particleContainer.className = "particle-container"
  particleContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  `

  // Create particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 6 + 2}px;
      height: ${Math.random() * 6 + 2}px;
      background: linear-gradient(45deg, #d4af37, #ff6b6b, #4ecdc4);
      border-radius: 50%;
      opacity: ${Math.random() * 0.5 + 0.2};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 10 + 10}s linear infinite;
    `
    particleContainer.appendChild(particle)
  }

  document.body.appendChild(particleContainer)

  // Add particle animation CSS
  if (!document.querySelector("#particle-styles")) {
    const style = document.createElement("style")
    style.id = "particle-styles"
    style.textContent = `
      @keyframes float {
        0% {
          transform: translateY(100vh) rotate(0deg);
        }
        100% {
          transform: translateY(-100px) rotate(360deg);
        }
      }
    `
    document.head.appendChild(style)
  }
}
