export const projectsData = [
  {
    id: 1,
    slug: "barbaeq",
    altSlugs: ["project-one", "barbaeq"],
    title: "BarbaeQ",
    tagline: "Real-time salon and barber queue management platform.",
    type: "Personal project",
    year: "2026",
    accentColor: "#2563EB",
    gradient: "linear-gradient(188.62deg, #1F2937 49.9%, #2563EB 81.7%, #3B82F6 93.88%, #93C5FD 113.5%)",
    textColor: "text-blue-300",
    shadowColor: "#2563EB",
    image: "/thumbnails/barbaeq_thumbnail.png",
    description: "A full-stack SaaS platform for salon bookings, live queue tracking, barber management, and real-time operations.",
    liveUrl: "https://barbaeq.onrender.com",
    githubUrl: "https://github.com/shubhamxdhapola/BarbaeQ",
    bullets: [
      "Real-time queue tracking with live ETA updates",
      "Role-based dashboards for Customers, Barbers, Owners, and Admins",
      "Online booking and walk-in queue management",
      "Dynamic delay buffers for accurate wait times",
      "Salon staff, services, and booking management",
      "Business analytics and platform moderation"
    ],
    technologies: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Redux Toolkit",
      "Cloudinary"
    ],
    techBadges: [
      {
        name: "NodeJS",
        color: "#3C873A",
        logo: "https://cdn.simpleicons.org/nodedotjs"
      },
      {
        name: "Tailwind",
        color: "#06B6D4",
        logo: "https://cdn.simpleicons.org/tailwindcss"
      },
      {
        name: "MongoDB",
        color: "#47A248",
        logo: "https://cdn.simpleicons.org/mongodb"
      },
      {
        name: "React",
        color: "#61DAFB",
        logo: "https://cdn.simpleicons.org/react"
      }
    ],
    caseStudy: {
      subtitle: "Your Queue, Simplified. A modern multi-tenant, real-time barber & salon appointment SaaS platform with live queue tracking, chair assignment, delay buffers, walk-in management, and multi-role operations.",
      role: "Full Stack Developer",
      duration: "Aug - Sep 2026",
      team: "Solo project",
      year: "2026",
      problem: "Customers lacked visibility into salon queues, while staff needed a better way to manage bookings, walk-ins, and service delays.",
      solution: "Built a real-time platform for bookings, live queue tracking, barber operations, walk-ins, and salon management.",
      impact: "Improved queue visibility for customers and centralized daily salon operations into one platform.",
      process: [
        "Designed role-based workflows for customers, barbers, owners, and admins",
        "Built booking, queue, and barber management features",
        "Implemented real-time updates using Socket.io",
        "Added dynamic ETA and delay management",
        "Developed analytics and salon administration dashboards"
      ],
      keyFeatures: [
        "Live queue position and ETA tracking",
        "Online booking and barber availability",
        "Walk-in customer management",
        "Real-time queue delay updates",
        "Role-based dashboards",
        "Salon analytics and management"
      ],
      challenges: [
        "Keeping queue positions and ETAs synchronized in real-time",
        "Managing multiple roles and permissions",
        "Handling online bookings and walk-ins together"
      ],
      learnings: [
        "Building reliable real-time applications",
        "Designing role-based multi-user systems",
        "Managing dynamic queue and ETA calculations"
      ]
    }
  },
  {
    id: 2,
    slug: "sai-petrol-pump",
    altSlugs: ["project-two", "petrol-pump"],
    title: "Sai Petrol Pump",
    tagline: "AI-powered petrol pump management with automated operations, analytics, and reporting.",
    type: "Client project",
    year: "2026",
    accentColor: "#DB2777",
    gradient: "linear-gradient(188.62deg, #6B0D33 49.9%, #DB2777 81.7%, #F472B6 93.88%, #F9D793 113.5%)",
    textColor: "text-pink-300",
    shadowColor: "#DB2777",
    image: "/thumbnails/ppms_thumbnail.png",
    description: "A full-stack petrol pump management system for handling employees, fuel sales, tank inventory, pricing, shifts, and AI-powered business queries.",
    liveUrl: "https://sai-petrol-pump.onrender.com",
    githubUrl: "https://github.com/shubhamxdhapola/Sai-Petrol-Pump",
    bullets: [
      "Role-based dashboards for Admin and Employees",
      "Fuel sales, tank inventory, and price management",
      "Automated shift and nozzle reading calculations",
      "Tank refill and stock monitoring",
      "Excel report generation for sales and audits",
      "AI assistant for natural-language business queries"
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Gemini"
    ],
    techBadges: [
      {
        name: "React",
        color: "#61DAFB",
        logo: "https://cdn.simpleicons.org/react"
      },
      {
        name: "NodeJS",
        color: "#3C873A",
        logo: "https://cdn.simpleicons.org/nodedotjs"
      },
      {
        name: "MongoDB",
        color: "#47A248",
        logo: "https://cdn.simpleicons.org/mongodb"
      },
      {
        name: "Tailwind",
        color: "#06B6D4",
        logo: "https://cdn.simpleicons.org/tailwindcss"
      }
    ],
    caseStudy: {
      subtitle: "An AI-powered, full-stack MERN application for managing petrol pump operations efficiently. The system automates daily operations such as employee shifts, fuel sales, tank inventory, fuel pricing, and reporting. It also includes an AI-powered assistant that allows admins to query business data using natural language.",
      role: "Full Stack Developer",
      duration: "Jun - Jul 2026",
      team: "Client project",
      year: "2026",
      problem: "Petrol pump operations involve multiple manual tasks including shift tracking, fuel readings, inventory monitoring, and sales reporting.",
      solution: "Built a centralized management system that automates daily operations and provides admins with real-time analytics and AI-powered data queries.",
      impact: "Reduced manual operational work by automating calculations, inventory updates, reporting, and business data access.",
      process: [
        "Designed role-based workflows for Admin and Employees",
        "Built modules for tanks, machines, nozzles, shifts, and fuel prices",
        "Automated fuel sales and inventory calculations",
        "Implemented Excel-based reporting and analytics",
        "Integrated Gemini AI for natural-language business queries"
      ],
      keyFeatures: [
        "Admin and employee dashboards",
        "Fuel sales and inventory management",
        "Automated shift calculations",
        "Tank refill and low-stock monitoring",
        "Excel report generation",
        "Gemini-powered AI assistant"
      ],
      challenges: [
        "Automating accurate fuel sales and inventory calculations",
        "Designing secure role-based access control",
        "Connecting AI queries with application business data"
      ],
      learnings: [
        "Building business-focused full-stack applications",
        "Integrating AI with structured application data",
        "Designing reliable automated workflows"
      ]
    }
  },
  {
    id: 3,
    slug: "bitlinks",
    altSlugs: ["project-three", "bitlinks"],
    title: "BitLinks",
    tagline: "Fast and secure URL shortener with custom links and seamless redirection.",
    type: "Personal project",
    year: "2025",
    accentColor: "#2932CB",
    gradient: "linear-gradient(188.62deg, #070E57 49.9%, #2932CB 81.7%, #7980FF 93.88%, #F9D793 113.5%)",
    textColor: "text-blue-300",
    shadowColor: "#2932CB",
    image: "/thumbnails/bitlinks_thumbnail.png",
    description: "A minimal URL shortener built with Next.js and MongoDB for creating short, custom, and reliable links.",
    liveUrl: "https://bit-links-swart.vercel.app/",
    githubUrl: "https://github.com/shubhamxdhapola/BitLinks",
    bullets: [
      "Shorten long URLs with a single click",
      "Custom short links with automatic redirection",
      "MongoDB-backed URL persistence",
      "Duplicate URL prevention",
      "Input validation and error handling",
      "Clean responsive interface with Tailwind CSS"
    ],
    technologies: [
      "Next.js",
      "MongoDB",
      "Tailwind CSS",
      "DaisyUI"
    ],
    techBadges: [
      {
        name: "NextJS",
        color: "#ffffff",
        logo: "https://cdn.simpleicons.org/nextdotjs/white"
      },
      {
        name: "MongoDB",
        color: "#47A248",
        logo: "https://cdn.simpleicons.org/mongodb"
      },
      {
        name: "Tailwind",
        color: "#06B6D4",
        logo: "https://cdn.simpleicons.org/tailwindcss"
      },
      {
        name: "DaisyUI",
        color: "#880000",
        logo: "https://cdn.simpleicons.org/daisyui"
      }
    ],
    caseStudy: {
      subtitle: "BitLinks is a minimal, fast, and secure URL shortener built with Next.js (App Router), MongoDB, and Tailwind CSS. Users can shorten long URLs, get custom short links, and track redirections seamlessly.",
      role: "Full Stack Developer",
      duration: "Jul 2025",
      team: "Solo project",
      year: "2025",
      problem: "Long URLs are difficult to share and manage, especially when links need to remain short and easy to remember.",
      solution: "Built a simple URL shortening service that generates unique short links and automatically redirects users to the original URL.",
      impact: "Created a lightweight and reliable link management experience with minimal steps from URL submission to redirection.",
      process: [
        "Designed a minimal URL shortening interface",
        "Built API endpoints for URL generation and redirection",
        "Integrated MongoDB for persistent URL storage",
        "Added duplicate prevention and input validation",
        "Optimized the interface for a fast and simple user experience"
      ],
      keyFeatures: [
        "One-click URL shortening",
        "Custom short URLs",
        "Automatic URL redirection",
        "Duplicate prevention",
        "MongoDB persistence",
        "Responsive UI"
      ],
      challenges: [
        "Generating unique short URLs reliably",
        "Handling invalid and duplicate URLs",
        "Keeping the application lightweight and fast"
      ],
      learnings: [
        "Building REST API workflows with Next.js",
        "Working with MongoDB and Mongoose",
        "Designing simple and efficient user experiences"
      ]
    }
  },
  {
    id: 4,
    slug: "the-dogs-garage",
    altSlugs: ["project-four", "the-dogs-garage", "tdg"],
    title: "The Dogs Garage",
    tagline: "Pet adoption and e-commerce platform with secure payments and OTP based authentication.",
    type: "Client Project",
    year: "Aug - Sep 2026",
    accentColor: "#203A43",
    gradient: "linear-gradient(180deg, #0F2027 0%, #203A43 50%, #2C5364 100%)",
    textColor: "text-cyan-300",
    shadowColor: "#203A43",
    image: "/thumbnails/dogsgarage_thumbnail.png",
    description: "A full-stack MERN platform combining certified puppy adoption, pet accessories, secure payments, and OTP authentication.",
    liveUrl: "https://thedogsgarage.in",
    githubUrl: "https://github.com/shubhamxdhapola/TheDogsGarage",
    bullets: [
      "Live puppy adoption marketplace",
      "Pet accessories store with cart and checkout",
      "Razorpay payment integration",
      "OTP-based authentication",
      "Order tracking and updates",
      "Dedicated admin dashboard"
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Redux Toolkit",
      "Razorpay"
    ],
    techBadges: [
      {
        name: "React",
        color: "#61DAFB",
        logo: "https://cdn.simpleicons.org/react"
      },
      {
        name: "NodeJS",
        color: "#3C873A",
        logo: "https://cdn.simpleicons.org/nodedotjs"
      },
      {
        name: "MongoDB",
        color: "#47A248",
        logo: "https://cdn.simpleicons.org/mongodb"
      },
      {
        name: "Tailwind",
        color: "#06B6D4",
        logo: "https://cdn.simpleicons.org/tailwindcss"
      }
    ],
    caseStudy: {
      subtitle: "Modern pet adoption and e-commerce platform with secure payments and live order management.",
      role: "Full Stack Developer",
      duration: "15 Days",
      team: "Full Stack Project",
      year: "2026",
      problem: "Pet adoption and pet product shopping were often handled through disconnected platforms with limited trust, tracking, and management tools.",
      solution: "Built a unified platform for certified puppy listings, pet products, secure checkout, order tracking, and centralized administration.",
      impact: "Created a complete digital experience connecting pet discovery, adoption inquiries, shopping, payments, and order management.",
      process: [
        "Designed customer and admin workflows",
        "Built pet adoption and product catalog modules",
        "Implemented authentication, cart, and checkout flows",
        "Integrated Razorpay payments and Cloudinary media storage",
        "Developed order tracking and admin management"
      ],
      keyFeatures: [
        "Certified puppy adoption marketplace",
        "Pet accessories e-commerce store",
        "Razorpay UPI, card, and NetBanking checkout",
        "OTP-based authentication",
        "Admin dashboard with inventory management"
      ],
      challenges: [
        "Managing adoption and e-commerce workflows in one platform",
        "Implementing secure payment verification",
        "Handling multiple user roles and protected admin operations"
      ],
      learnings: [
        "Building complete MERN e-commerce workflows",
        "Integrating secure payment systems",
        "Designing scalable role-based applications"
      ]
    }
  },
  {
    id: 5,
    slug: "drippy",
    altSlugs: ["project-five", "drippy"],
    title: "Drippy",
    tagline: "Full-stack eCommerce platform with secure payments and role-based management.",
    type: "Personal project",
    year: "2025",
    accentColor: "#16A34A",
    gradient: "linear-gradient(188.62deg, #052E16 49.9%, #16A34A 81.7%, #4ADE80 93.88%, #BBF7D0 113.5%)",
    textColor: "text-green-300",
    shadowColor: "#16A34A",
    image: "/thumbnails/drippy_thumbnail.png",
    description: "A full-stack MERN eCommerce platform with product discovery, cart management, PayPal checkout, Google authentication, and admin controls.",
    liveUrl: "https://drippy-kkzk.onrender.com/",
    githubUrl: "https://github.com/shubhamxdhapola/Drippy",
    bullets: [
      "Product search, filtering, and pagination",
      "Cart and secure PayPal checkout",
      "JWT authentication with Google OAuth",
      "Order history and delivery tracking",
      "Admin dashboard for users, products, and orders",
      "Sales and revenue analytics"
    ],
    technologies: [
      "React",
      "Redux",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase"
    ],
    techBadges: [
      {
        name: "React",
        color: "#61DAFB",
        logo: "https://cdn.simpleicons.org/react"
      },
      {
        name: "NodeJS",
        color: "#3C873A",
        logo: "https://cdn.simpleicons.org/nodedotjs"
      },
      {
        name: "MongoDB",
        color: "#47A248",
        logo: "https://cdn.simpleicons.org/mongodb"
      },
      {
        name: "Redux",
        color: "#764ABC",
        logo: "https://cdn.simpleicons.org/redux"
      }
    ],
    caseStudy: {
      subtitle: "Drippy is a full-featured eCommerce platform built with the MERN stack. Users can browse products, search and filter, add to cart, and complete secure purchases through PayPal or sign in using Google. Admins can manage users, products, and orders through a dedicated admin panel.",
      role: "Full Stack Developer",
      duration: "May - Jun 2025",
      team: "Solo project",
      year: "2025",
      problem: "Online stores need a smooth shopping experience while giving administrators efficient control over products, users, and orders.",
      solution: "Built a complete eCommerce platform with product discovery, state-managed cart, PayPal checkout, authentication, and role-based administration.",
      impact: "Created an end-to-end shopping experience covering product browsing, checkout, order management, and store administration.",
      process: [
        "Designed the customer shopping and checkout flow",
        "Built product search, filtering, and pagination",
        "Implemented Redux-based cart and application state",
        "Integrated PayPal payments and Google authentication",
        "Developed admin tools for products, users, and orders"
      ],
      keyFeatures: [
        "Product search, filtering, and pagination",
        "Redux-powered shopping cart",
        "PayPal payment integration",
        "JWT and Google authentication",
        "Order history and status tracking",
        "Admin dashboard and sales analytics"
      ],
      challenges: [
        "Managing complex cart and order state",
        "Integrating secure payment and authentication flows",
        "Building separate customer and admin experiences"
      ],
      learnings: [
        "Building complete MERN eCommerce workflows",
        "Managing global application state with Redux",
        "Integrating third-party authentication and payments"
      ]
    }
  },
  {
    id: 6,
    slug: "quickchat",
    altSlugs: ["project-six", "quickchat"],
    title: "QuickChat",
    tagline: "Real-time messaging platform with file sharing, user presence, and profile management.",
    type: "Personal project",
    year: "2025",
    accentColor: "#475569",
    gradient: "linear-gradient(180deg, #0F172A 0%, #334155 50%, #64748B 100%)",
    textColor: "text-slate-300",
    shadowColor: "#475569",
    image: "/thumbnails/quickchat_thumbnail.png",
    description: "A full-stack real-time chat application for seamless messaging, file sharing, user presence, and profile management.",
    liveUrl: "https://quickchatapp-3zbz.onrender.com/",
    githubUrl: "https://github.com/shubhamxdhapola/QuickChat",
    bullets: [
      "Real-time messaging with Socket.io",
      "Active and inactive user presence",
      "File sharing between users",
      "Profile updates and user management",
      "Secure chat and user data storage",
      "Responsive chat interface"
    ],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Zustand"
    ],
    techBadges: [
      {
        name: "React",
        color: "#61DAFB",
        logo: "https://cdn.simpleicons.org/react"
      },
      {
        name: "NodeJS",
        color: "#3C873A",
        logo: "https://cdn.simpleicons.org/nodedotjs"
      },
      {
        name: "MongoDB",
        color: "#47A248",
        logo: "https://cdn.simpleicons.org/mongodb"
      },
      {
        name: "Socket.io",
        color: "#ffffff",
        logo: "https://cdn.simpleicons.org/socketdotio/white"
      }
    ],
    caseStudy: {
      subtitle: "QuickChat is a real-time chat web application designed to enable seamless communication between users. It offers an interactive, user-friendly interface with features like real-time messaging, user status, file sharing, and profile updates.",
      role: "Full Stack Developer",
      duration: "Apr - May 2025",
      team: "Solo project",
      year: "2025",
      problem: "Users need fast and reliable communication with real-time updates, while also being able to share files and manage their profiles.",
      solution: "Built a real-time chat platform using Socket.io with persistent messaging, user presence, file sharing, and profile management.",
      impact: "Created a responsive communication experience with instant message delivery and live user status updates.",
      process: [
        "Designed the chat interface and user experience",
        "Built authentication and user management",
        "Implemented real-time messaging with Socket.io",
        "Added online/offline presence tracking",
        "Integrated file sharing and profile management"
      ],
      keyFeatures: [
        "Real-time one-to-one messaging",
        "Online and offline user status",
        "File sharing",
        "Profile management",
        "Persistent chat history",
        "Responsive UI"
      ],
      challenges: [
        "Keeping messages synchronized in real-time",
        "Managing user presence reliably",
        "Handling file uploads alongside chat messages"
      ],
      learnings: [
        "Building real-time applications with Socket.io",
        "Managing client state with Zustand",
        "Designing responsive communication interfaces"
      ]
    }
  }
];
