let coursesArray = [
    {
        "id": "web101",
        "title": "Complete Web Development Bootcamp",
        "price": 49.99,
        "discountPrice": 10,
        "level": "Beginning",
        "rating": 4.8,
        "students": 15420,
        "category": "Web Development",
        "subtitle": "Learn HTML, CSS, JavaScript and modern frameworks to build responsive websites.",
        "thumbnail": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "sections": [
            {
                id: 1,
                title: "Introduction to MERN Stack",
                lectures: [
                    { id: 1, title: "What is MERN Stack?", duration: "15:30", type: "video" },
                    { id: 2, title: "Setting up Development Environment", duration: "22:45", type: "video" },
                    { id: 3, title: "Project Overview", duration: "10:20", type: "video" }
                ]
            },
            {
                id: 2,
                title: "MongoDB Fundamentals",
                lectures: [
                    { id: 4, title: "Introduction to NoSQL", duration: "18:15", type: "video" },
                    { id: 5, title: "MongoDB Installation & Setup", duration: "25:30", type: "video" },
                    { id: 6, title: "CRUD Operations", duration: "35:20", type: "video" },
                    { id: 7, title: "MongoDB Compass", duration: "12:45", type: "video" }
                ]
            },
            {
                id: 3,
                title: "Express.js Backend Development",
                lectures: [
                    { id: 8, title: "Express.js Fundamentals", duration: "28:10", type: "video" },
                    { id: 9, title: "Routing & Middleware", duration: "32:50", type: "video" },
                    { id: 10, title: "Building RESTful APIs", duration: "45:30", type: "video" },
                    { id: 11, title: "Authentication & JWT", duration: "38:15", type: "video" }
                ]
            },
            {
                id: 4,
                title: "React Frontend Development",
                lectures: [
                    { id: 12, title: "React Components & JSX", duration: "40:25", type: "video" },
                    { id: 13, title: "State Management with Redux", duration: "42:30", type: "video" },
                    { id: 14, title: "API Integration", duration: "35:45", type: "video" },
                    { id: 15, title: "Final Project Implementation", duration: "55:20", type: "video" }
                ]
            }
        ]
    },
    {
        "id": "py101",
        "title": "Python for Beginners",
        "price": 0,
        "discountPrice": 0,
        "level": "Beginning",
        "rating": 4.8,
        "students": 15420,
        "category": "Programming",
        "subtitle": "Start your programming journey with Python from scratch.",
        "thumbnail": "https://i0.wp.com/idsc.miami.edu/wp-content/uploads/2020/10/Python-image-with-logo-940x530-1.jpg?resize=940%2C530&ssl=1",
        "sections": [
            {
                id: 1,
                title: "Python Basics for Data Science",
                lectures: [
                    { id: 1, title: "Python Fundamentals", duration: "20:30", type: "video" },
                    { id: 2, title: "Data Types & Structures", duration: "25:15", type: "video" },
                    { id: 3, title: "Control Flow & Functions", duration: "30:45", type: "video" }
                ]
            },
            {
                id: 2,
                title: "Data Manipulation with Pandas",
                lectures: [
                    { id: 4, title: "Introduction to Pandas", duration: "18:20", type: "video" },
                    { id: 5, title: "DataFrames & Series", duration: "32:10", type: "video" },
                    { id: 6, title: "Data Cleaning Techniques", duration: "28:35", type: "video" },
                    { id: 7, title: "Hands-on Exercise", duration: "15:00", type: "exercise" }
                ]
            },
            {
                id: 3,
                title: "Machine Learning Algorithms",
                lectures: [
                    { id: 8, title: "Supervised Learning", duration: "35:20", type: "video" },
                    { id: 9, title: "Unsupervised Learning", duration: "30:15", type: "video" },
                    { id: 10, title: "Model Evaluation", duration: "25:40", type: "video" },
                    { id: 11, title: "ML Project Walkthrough", duration: "45:30", type: "project" }
                ]
            }
        ]
    },
    {
        "id": "react202",
        "title": "React JS Masterclass",
        "price": 0,
        "discountPrice": 0,
        "level": "Beginning",
        "rating": 4.8,
        "students": 15420,
        "category": "Web Development",
        "subtitle": "Build modern web applications with React and Redux.",
        "thumbnail": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "sections": [
            {
                id: 1,
                title: "React Native Setup & Basics",
                lectures: [
                    { id: 1, title: "React Native Overview", duration: "16:45", type: "video" },
                    { id: 2, title: "Development Environment Setup", duration: "24:30", type: "video" },
                    { id: 3, title: "First React Native App", duration: "19:20", type: "video" }
                ]
            },
            {
                id: 2,
                title: "UI Components & Navigation",
                lectures: [
                    { id: 4, title: "Core Components", duration: "22:15", type: "video" },
                    { id: 5, title: "Styling in React Native", duration: "18:40", type: "video" },
                    { id: 6, title: "Navigation Patterns", duration: "26:30", type: "video" },
                    { id: 7, title: "UI Exercise", duration: "20:00", type: "exercise" }
                ]
            },
            {
                id: 3,
                title: "App Deployment",
                lectures: [
                    { id: 8, title: "Building for iOS", duration: "28:50", type: "video" },
                    { id: 9, title: "Building for Android", duration: "25:15", type: "video" },
                    { id: 10, title: "App Store Deployment", duration: "32:40", type: "video" }
                ]
            }
        ]
    },
    {
        "id": "ds101",
        "title": "Data Science Fundamentals",
        "price": 79.99,
        "discountPrice": 0,
        "level": "Beginning",
        "rating": 4.8,
        "students": 15420,
        "category": "Data Science",
        "subtitle": "Learn data analysis, visualization and machine learning basics.",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "sections": [
            {
                id: 1,
                title: "AWS Fundamentals",
                lectures: [
                    { id: 1, title: "Introduction to Cloud Computing", duration: "22:30", type: "video" },
                    { id: 2, title: "AWS Account Setup", duration: "15:45", type: "video" },
                    { id: 3, title: "AWS Management Console", duration: "18:20", type: "video" }
                ]
            },
            {
                id: 2,
                title: "Core AWS Services",
                lectures: [
                    { id: 4, title: "EC2 Instances", duration: "35:15", type: "video" },
                    { id: 5, title: "S3 Storage Service", duration: "28:40", type: "video" },
                    { id: 6, title: "VPC & Networking", duration: "42:30", type: "video" },
                    { id: 7, title: "AWS Lab Exercise", duration: "30:00", type: "lab" }
                ]
            },
            {
                id: 1,
                title: "AWS Fundamentals",
                lectures: [
                    { id: 1, title: "Introduction to Cloud Computing", duration: "22:30", type: "video" },
                    { id: 2, title: "AWS Account Setup", duration: "15:45", type: "video" },
                    { id: 3, title: "AWS Management Console", duration: "18:20", type: "video" }
                ]
            },
            {
                id: 2,
                title: "Core AWS Services",
                lectures: [
                    { id: 4, title: "EC2 Instances", duration: "35:15", type: "video" },
                    { id: 5, title: "S3 Storage Service", duration: "28:40", type: "video" },
                    { id: 6, title: "VPC & Networking", duration: "42:30", type: "video" },
                    { id: 7, title: "AWS Lab Exercise", duration: "30:00", type: "lab" }
                ]
            },
            {
                id: 3,
                title: "Serverless Computing",
                lectures: [
                  { id: 8, title: "AWS Lambda Functions", duration: "38:20", type: "video" },
                  { id: 9, title: "API Gateway", duration: "32:45", type: "video" },
                  { id: 10, title: "DynamoDB", duration: "29:15", type: "video" }
                ]
              },
              {
                id: 4,
                title: "DevOps on AWS",
                lectures: [
                  { id: 11, title: "CI/CD with AWS", duration: "45:30", type: "video" },
                  { id: 12, title: "CloudFormation", duration: "38:50", type: "video" },
                  { id: 13, title: "Final Project", duration: "60:00", type: "project" }
                ]
              }
        ]
    },
    {
        "id": "mobile101",
        "title": "Flutter App Development",
        "price": 0,
        "discountPrice": 0,
        "level": "Beginning",
        "rating": 4.8,
        "students": 15420,
        "category": "Mobile Development",
        "subtitle": "Build cross-platform mobile apps with Flutter framework.",
        "thumbnail": "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
        "sections": []
    },
    {
        "id": "js201",
        "title": "Advanced JavaScript",
        "price": 39.99,
        "discountPrice": 0,
        "level": "Beginning",
        "rating": 4.8,
        "students": 15420,
        "category": "Programming",
        "subtitle": "Master advanced JavaScript concepts and modern ES6+ features.",
        "thumbnail": "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        "sections": []
    },
    {
        "id": "cyber101",
        "title": "Cybersecurity Essentials",
        "price": 89.99,
        "discountPrice": 20,
        "level": "Beginning",
        "rating": 4.8,
        "students": 15420,
        "category": "Security",
        "subtitle": "Learn the fundamentals of cybersecurity and ethical hacking.",
        "thumbnail": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "sections": []
    },
    {
        "id": "cloud101",
        "title": "AWS Cloud Practitioner",
        "price": 0,
        "discountPrice": 0,
        "level": "Beginning",
        "rating": 4.8,
        "students": 15420,
        "category": "Cloud Computing",
        "subtitle": "Get started with AWS cloud services and infrastructure.",
        "thumbnail": "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        "sections": []
    },
    {
        "id": "db101",
        "title": "SQL and Database Design",
        "price": 34.99,
        "discountPrice": 0,
        "level": "Beginning",
        "rating": 4.8,
        "students": 15420,
        "category": "Database",
        "subtitle": "Master SQL queries and learn proper database design principles.",
        "thumbnail": "https://images.unsplash.com/photo-1545078676-3ceb0cc97483?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        "sections": []
    },
    {
        "id": "docker101",
        "title": "Docker and Containers",
        "price": 44.99,
        "discountPrice": 39.99,
        "level": "Beginning",
        "rating": 4.8,
        "students": 15420,
        "category": "DevOps",
        "subtitle": "Learn containerization with Docker and deploy applications efficiently.",
        "thumbnail": "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "sections": []
    }
]

export default coursesArray;