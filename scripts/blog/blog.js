// const blogPosts = [
//     {
//         id: 1,
//         title: "The Importance of Early Education",
//         excerpt: "Discover why early education is crucial for a child's development and future success.",
//         image: "./assets/images/blog/early-education.jpg",
//         date: "2023-05-01",
//         author: "John Doe",
//         tags: ["early education", "child development", "learning"],
//     },
//     {
//         id: 2,
//         title: "Fostering Creativity in the Classroom",
//         excerpt: "Learn about innovative techniques to encourage creativity and critical thinking in students.",
//         image: "/assets/images/blog/classroom-creativity.jpg",
//         date: "2023-05-15",
//         author: "Jane Smith"
//     },
//     {
//         id: 3,
//         title: "The Role of Technology in Modern Education",
//         excerpt: "Explore how technology is shaping the future of education and enhancing learning experiences.",
//         image: "/assets/images/blog/education-technology.jpg",
//         date: "2023-06-02",
//         author: "Mike Johnson"
//     },
//     {
//         id: 4,
//         title: "Promoting Inclusivity in Schools",
//         excerpt: "Understand the importance of creating an inclusive environment for all students.",
//         image: "/assets/images/blog/inclusive-education.jpg",
//         date: "2023-06-18",
//         author: "Sarah Lee"
//     },
//     {
//         id: 5,
//         title: "The Benefits of Extracurricular Activities",
//         excerpt: "Discover how extracurricular activities contribute to a well-rounded education.",
//         image: "/assets/images/blog/extracurricular-activities.jpg",
//         date: "2023-07-05",
//         author: "David Brown"
//     },
//     {
//         id: 6,
//         title: "Effective Study Techniques for Students",
//         excerpt: "Learn about proven study methods to help students retain information and excel in exams.",
//         image: "/placeholder.svg",
//         date: "2023-07-20",
//         author: "Emily Chen"
//     },
//     {
//         id: 7,
//         title: "The Importance of Physical Education",
//         excerpt: "Explore why physical education is crucial for students' overall health and academic performance.",
//         image: "/placeholder.svg",
//         date: "2023-08-03",
//         author: "Tom Wilson"
//     },
//     {
//         id: 8,
//         title: "Addressing Mental Health in Schools",
//         excerpt: "Understand the growing importance of mental health support in educational institutions.",
//         image: "/placeholder.svg",
//         date: "2023-08-18",
//         author: "Lisa Taylor"
//     },
//     {
//         id: 9,
//         title: "The Future of Standardized Testing",
//         excerpt: "Examine the evolving landscape of standardized testing and its impact on education.",
//         image: "/placeholder.svg",
//         date: "2023-09-01",
//         author: "Robert Garcia"
//     },
//     {
//         id: 10,
//         title: "Promoting Environmental Awareness in Education",
//         excerpt: "Learn about integrating environmental education into the curriculum for a sustainable future.",
//         image: "/placeholder.svg",
//         date: "2023-09-15",
//         author: "Amanda White"
//     },
//     {
//         id: 11,
//         title: "The Benefits of Multilingual Education",
//         excerpt: "Discover the advantages of learning multiple languages in today's globalized world.",
//         image: "/placeholder.svg",
//         date: "2023-10-02",
//         author: "Carlos Rodriguez"
//     },
//     {
//         id: 12,
//         title: "Innovative Approaches to Mathematics Education",
//         excerpt: "Explore new methods for making mathematics more engaging and accessible to all students.",
//         image: "/placeholder.svg",
//         date: "2023-10-18",
//         author: "Rachel Kim"
//     },
//     {
//         id: 13,
//         title: "The Impact of Artificial Intelligence on Education",
//         excerpt: "Discover how AI is revolutionizing teaching methods and personalized learning experiences.",
//         image: "/placeholder.svg",
//         date: "2023-11-01",
//         author: "Alex Chen"
//     },
//     {
//         id: 14,
//         title: "Promoting STEM Education for Girls",
//         excerpt: "Learn about initiatives to encourage more girls to pursue careers in science, technology, engineering, and mathematics.",
//         image: "/placeholder.svg",
//         date: "2023-11-15",
//         author: "Emma Watson"
//     },
//     {
//         id: 15,
//         title: "The Importance of Arts Education",
//         excerpt: "Explore the benefits of arts education in developing creativity, critical thinking, and emotional intelligence.",
//         image: "/placeholder.svg",
//         date: "2023-12-01",
//         author: "Michael Brown"
//     },
//     {
//         id: 16,
//         title: "Addressing the Digital Divide in Education",
//         excerpt: "Understand the challenges of unequal access to technology in education and potential solutions.",
//         image: "/placeholder.svg",
//         date: "2023-12-15",
//         author: "Sophia Martinez"
//     },
//     {
//         id: 17,
//         title: "The Role of Parental Involvement in Education",
//         excerpt: "Learn about the positive impact of parental involvement on student achievement and well-being.",
//         image: "/placeholder.svg",
//         date: "2024-01-02",
//         author: "Daniel Lee"
//     },
//     {
//         id: 18,
//         title: "Innovative Classroom Design for Better Learning",
//         excerpt: "Explore how classroom layout and design can enhance student engagement and learning outcomes.",
//         image: "/placeholder.svg",
//         date: "2024-01-18",
//         author: "Olivia Taylor"
//     }
// ];

// const postsPerPage = 9;
// let currentPage = 1;
// let filteredPosts = [...blogPosts];

// function renderBlogPosts() {
//     const blogGrid = document.querySelector('.blog-grid');
//     blogGrid.innerHTML = '';

//     const startIndex = (currentPage - 1) * postsPerPage;
//     const endIndex = startIndex + postsPerPage;
//     const postsToShow = filteredPosts.slice(startIndex, endIndex);

//     postsToShow.forEach(post => {
//         const postElement = document.createElement('div');
//         postElement.classList.add('blog-card');
//         postElement.innerHTML = `
//             <img src="${post.image}" alt="${post.title}">
//             <div class="blog-card-content">
//                 <h2>${post.title}</h2>
//                 <p>${post.excerpt}</p>
//                 <a href="blog-detail.html?id=${post.id}">Read more</a>
//             </div>
//         `;
//         blogGrid.appendChild(postElement);
//     });

//     renderPagination();
// }

// function renderPagination() {
//     const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
//     const paginationElement = document.querySelector('.pagination');
//     paginationElement.innerHTML = '';

//     for (let i = 1; i <= totalPages; i++) {
//         const button = document.createElement('button');
//         button.textContent = i;
//         button.addEventListener('click', () => {
//             currentPage = i;
//             renderBlogPosts();
//         });
//         if (i === currentPage) {
//             button.classList.add('active');
//         }
//         paginationElement.appendChild(button);
//     }
// }

// function searchPosts() {
//     const searchInput = document.getElementById('search-input');
//     const searchTerm = searchInput.value.toLowerCase();

//     filteredPosts = blogPosts.filter(post => 
//         post.title.toLowerCase().includes(searchTerm) || 
//         post.excerpt.toLowerCase().includes(searchTerm) ||
//         post.author.toLowerCase().includes(searchTerm)
//     );

//     currentPage = 1;
//     renderBlogPosts();
// }

// document.addEventListener('DOMContentLoaded', () => {
//     renderBlogPosts();

//     const searchInput = document.getElementById('search-input');
//     searchInput.addEventListener('input', searchPosts);
// });

const blogPosts = [
    {
        id: 1,
        title: "The Importance of Early Education",
        excerpt: "Discover why early education is crucial for a child's development and future success.",
        image: "./assets/images/blog/early-education.jpg",
        date: "2023-05-01",
        author: "John Doe",
        tags: ["early education", "child development"]
    },
    {
        id: 2,
        title: "Fostering Creativity in the Classroom",
        excerpt: "Learn about innovative techniques to encourage creativity and critical thinking in students.",
        image: "/assets/images/blog/classroom-creativity.jpg",
        date: "2023-05-15",
        author: "Jane Smith",
        tags: ["learning", "classroom technology"]
    },
    {
        id: 3,
        title: "The Role of Technology in Modern Education",
        excerpt: "Explore how technology is shaping the future of education and enhancing learning experiences.",
        image: "/assets/images/blog/education-technology.jpg",
        date: "2023-06-02",
        author: "Mike Johnson",
        tags: ["edtech", "digital learning"]
    },
    {
        id: 4,
        title: "Promoting Inclusivity in Schools",
        excerpt: "Understand the importance of creating an inclusive environment for all students.",
        image: "/assets/images/blog/inclusive-education.jpg",
        date: "2023-06-18",
        author: "Sarah Lee",
        tags: ["inclusive education", "diversity", "special needs"]
    },
    {
        id: 5,
        title: "The Benefits of Extracurricular Activities",
        excerpt: "Discover how extracurricular activities contribute to a well-rounded education.",
        image: "/assets/images/blog/extracurricular-activities.jpg",
        date: "2023-07-05",
        author: "David Brown",
        tags: ["education", "child development", "learning"]
    },
    {
        id: 6,
        title: "Effective Study Techniques for Students",
        excerpt: "Learn about proven study methods to help students retain information and excel in exams.",
        image: "/placeholder.svg",
        date: "2023-07-20",
        author: "Emily Chen",
        tags: ["learning", "education", "classroom technology"]
    },
    {
        id: 7,
        title: "The Importance of Physical Education",
        excerpt: "Explore why physical education is crucial for students' overall health and academic performance.",
        image: "/placeholder.svg",
        date: "2023-08-03",
        author: "Tom Wilson",
        tags: ["education", "child development", "play-based learning"]
    },
    {
        id: 8,
        title: "Addressing Mental Health in Schools",
        excerpt: "Understand the growing importance of mental health support in educational institutions.",
        image: "/placeholder.svg",
        date: "2023-08-18",
        author: "Lisa Taylor",
        tags: ["education", "adolescent psychology", "teenage development"]
    },
    {
        id: 9,
        title: "The Future of Standardized Testing",
        excerpt: "Examine the evolving landscape of standardized testing and its impact on education.",
        image: "/placeholder.svg",
        date: "2023-09-01",
        author: "Robert Garcia",
        tags: ["education", "learning", "edtech"]
    },
    {
        id: 10,
        title: "Promoting Environmental Awareness in Education",
        excerpt: "Learn about integrating environmental education into the curriculum for a sustainable future.",
        image: "/placeholder.svg",
        date: "2023-09-15",
        author: "Amanda White",
        tags: ["education", "learning", "diversity"]
    },
    {
        id: 11,
        title: "The Benefits of Multilingual Education",
        excerpt: "Discover the advantages of learning multiple languages in today's globalized world.",
        image: "/placeholder.svg",
        date: "2023-10-02",
        author: "Carlos Rodriguez",
        tags: ["education", "learning", "diversity"]
    },
    {
        id: 12,
        title: "Innovative Approaches to Mathematics Education",
        excerpt: "Explore new methods for making mathematics more engaging and accessible to all students.",
        image: "/placeholder.svg",
        date: "2023-10-18",
        author: "Rachel Kim",
        tags: ["education", "learning", "classroom technology"]
    },
    {
        id: 13,
        title: "The Impact of Artificial Intelligence on Education",
        excerpt: "Discover how AI is revolutionizing teaching methods and personalized learning experiences.",
        image: "/placeholder.svg",
        date: "2023-11-01",
        author: "Alex Chen",
        tags: ["artificial intelligence", "machine learning", "edtech"]
    },
    {
        id: 14,
        title: "Promoting STEM Education for Girls",
        excerpt: "Learn about initiatives to encourage more girls to pursue careers in science, technology, engineering, and mathematics.",
        image: "/placeholder.svg",
        date: "2023-11-15",
        author: "Emma Watson",
        tags: ["education", "diversity", "learning"]
    },
    {
        id: 15,
        title: "The Importance of Arts Education",
        excerpt: "Explore the benefits of arts education in developing creativity, critical thinking, and emotional intelligence.",
        image: "/placeholder.svg",
        date: "2023-12-01",
        author: "Michael Brown",
        tags: ["education", "learning", "child development"]
    },
    {
        id: 16,
        title: "Addressing the Digital Divide in Education",
        excerpt: "Understand the challenges of unequal access to technology in education and potential solutions.",
        image: "/placeholder.svg",
        date: "2023-12-15",
        author: "Sophia Martinez",
        tags: ["digital learning", "edtech", "inclusive education"]
    },
    {
        id: 17,
        title: "The Role of Parental Involvement in Education",
        excerpt: "Learn about the positive impact of parental involvement on student achievement and well-being.",
        image: "/placeholder.svg",
        date: "2024-01-02",
        author: "Daniel Lee",
        tags: ["education", "child development", "learning"]
    },
    {
        id: 18,
        title: "Innovative Classroom Design for Better Learning",
        excerpt: "Explore how classroom layout and design can enhance student engagement and learning outcomes.",
        image: "/placeholder.svg",
        date: "2024-01-18",
        author: "Olivia Taylor",
        tags: ["classroom technology", "learning", "education"]
    }
];

const postsPerPage = 6;
let currentPage = 1;
let filteredPosts = [...blogPosts];
let activeFilters = {
    tags: [],
    year: null,
    search: ''
};

function renderBlogPosts() {
    const blogGrid = document.querySelector('.blog-grid');
    blogGrid.innerHTML = '';

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);

    postsToShow.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-card');
        postElement.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-card-content">
                <h2>${post.title}</h2>
                <p>${post.excerpt}</p>
                <p>${post.date} | ${post.author}</p>
                <div class="blog-card-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="blog-detail.html?id=${post.id}">Read more</a>
            </div>
        `;
        blogGrid.appendChild(postElement);
    });

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const paginationElement = document.querySelector('.pagination');
    paginationElement.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            renderBlogPosts();
        });
        if (i === currentPage) {
            button.classList.add('active');
        }
        paginationElement.appendChild(button);
    }
}

function renderTagFilters() {
    const tagFilters = document.getElementById('tag-filters');
    const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

    allTags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.classList.add('tag-filter');
        tagElement.textContent = tag;
        tagElement.addEventListener('click', () => toggleTagFilter(tag));
        tagFilters.appendChild(tagElement);
    });
}

function renderYearFilters() {
    const yearFilters = document.getElementById('year-filters');
    const years = [2021, 2022, 2023, 2024];

    years.forEach(year => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = year;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            toggleYearFilter(year);
        });
        li.appendChild(a);
        yearFilters.appendChild(li);
    });
}

function toggleTagFilter(tag) {
    const index = activeFilters.tags.indexOf(tag);
    if (index === -1) {
        activeFilters.tags.push(tag);
    } else {
        activeFilters.tags.splice(index, 1);
    }
    applyFilters();
}

function toggleYearFilter(year) {
    if (activeFilters.year === year) {
        activeFilters.year = null;
    } else {
        activeFilters.year = year;
    }
    applyFilters();
}

function applyFilters() {
    filteredPosts = blogPosts.filter(post => {
        const tagMatch = activeFilters.tags.length === 0 || activeFilters.tags.some(tag => post.tags.includes(tag));
        const yearMatch = !activeFilters.year || new Date(post.date).getFullYear() === activeFilters.year;
        const searchMatch = !activeFilters.search ||
            post.title.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
            post.author.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(activeFilters.search.toLowerCase()));
        return tagMatch && yearMatch && searchMatch;
    });

    currentPage = 1;
    renderBlogPosts();
    updateFilterUI();
}

function updateFilterUI() {
    const tagFilters = document.querySelectorAll('.tag-filter');
    tagFilters.forEach(filter => {
        filter.classList.toggle('active', activeFilters.tags.includes(filter.textContent));
    });

    const yearFilters = document.querySelectorAll('#year-filters a');
    yearFilters.forEach(filter => {
        filter.classList.toggle('active', parseInt(filter.textContent) === activeFilters.year);
    });

    const searchInput = document.getElementById('search-input');
    searchInput.value = activeFilters.search;
}

function searchPosts() {
    const searchInput = document.getElementById('search-input');
    activeFilters.search = searchInput.value;
    applyFilters();
}

function clearFilters() {
    activeFilters = {
        tags: [],
        year: null,
        search: ''
    };
    document.getElementById('search-input').value = '';
    applyFilters();
}

document.addEventListener('DOMContentLoaded', () => {
    renderTagFilters();
    renderYearFilters();
    renderBlogPosts();

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', searchPosts);

    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', searchPosts);

    const clearFiltersButton = document.createElement('button');
    clearFiltersButton.textContent = 'Clear Filters';
    clearFiltersButton.id = 'clear-filters';
    clearFiltersButton.addEventListener('click', clearFilters);
    document.querySelector('.filter-section').appendChild(clearFiltersButton);
});