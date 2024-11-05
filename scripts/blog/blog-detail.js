document.addEventListener('DOMContentLoaded', function() {
    const postId = getPostIdFromUrl();
    const post = fetchBlogPost(postId);
    if (post) {
        populateBlogPost(post);
        setupLikeButton(post.id);
        loadComments(post.id);
        setupCommentForm(post.id);  // Make sure this line is present and correct
        setupShareDropdown();
    } else {
        document.querySelector('main').innerHTML = '<h1>Post not found</h1>';
    }
});

function getPostIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

const authors = [
    {
        id: 1,
        name: "John Doe",
        image: "/assets/avatars/img-05.jpg?height=80&width=80",
        bio: "John Doe is an experienced educator with over 15 years of experience in early childhood education. He is passionate about promoting the importance of early learning and its impact on children's future success.",
        socials: {
            twitter: "https://twitter.com/johndoe",
            linkedin: "https://linkedin.com/in/johndoe",
            facebook: "https://facebook.com/johndoe"
        }
    },
    {
        id: 2,
        name: "Jane Smith",
        image: "/assets/avatars/img-06.jpg?height=80&width=80",
        bio: "Jane Smith is a renowned educational psychologist specializing in adolescent development. With numerous publications and speaking engagements, she brings valuable insights to modern educational practices.",
        socials: {
            twitter: "https://twitter.com/janesmith",
            linkedin: "https://linkedin.com/in/janesmith",
            instagram: "https://instagram.com/janesmith"
        }
    },
    {
        id: 3,
        name: "Alex Johnson",
        image: "/assets/avatars/img-07.jpg?height=80&width=80",
        bio: "Alex Johnson is a tech-savvy educator focusing on integrating cutting-edge technology into classrooms. His innovative approaches have transformed learning experiences in schools across the country.",
        socials: {
            twitter: "https://twitter.com/alexjohnson",
            github: "https://github.com/alexjohnson",
            medium: "https://medium.com/@alexjohnson"
        }
    },
    {
        id: 4,
        name: "Sarah Lee",
        image: "/placeholder.svg?height=80&width=80",
        bio: "Sarah Lee is an advocate for inclusive education, working to create supportive learning environments for all students.",
        socials: {
            twitter: "https://twitter.com/sarahlee",
            linkedin: "https://linkedin.com/in/sarahlee"
        }
    },
    {
        id: 5,
        name: "David Brown",
        image: "/placeholder.svg?height=80&width=80",
        bio: "David Brown is an expert in extracurricular activities and their impact on student development and academic performance.",
        socials: {
            facebook: "https://facebook.com/davidbrown",
            instagram: "https://instagram.com/davidbrown"
        }
    },
    {
        id: 6,
        name: "Emily Chen",
        image: "/placeholder.svg?height=80&width=80",
        bio: "Emily Chen specializes in effective study techniques and helps students optimize their learning strategies.",
        socials: {
            twitter: "https://twitter.com/emilychen",
            linkedin: "https://linkedin.com/in/emilychen"
        }
    },
    {
        id: 7,
        name: "Tom Wilson",
        image: "/placeholder.svg?height=80&width=80",
        bio: "Tom Wilson is a physical education expert, promoting the importance of physical activity in overall student well-being.",
        socials: {
            twitter: "https://twitter.com/tomwilson",
            instagram: "https://instagram.com/tomwilson"
        }
    },
    {
        id: 8,
        name: "Lisa Taylor",
        image: "/placeholder.svg?height=80&width=80",
        bio: "Lisa Taylor is a mental health advocate in education, working to improve support systems for students and educators.",
        socials: {
            linkedin: "https://linkedin.com/in/lisataylor",
            facebook: "https://facebook.com/lisataylor"
        }
    },
    {
        id: 9,
        name: "Robert Garcia",
        image: "/placeholder.svg?height=80&width=80",
        bio: "Robert Garcia is an expert in educational assessment and the evolving landscape of standardized testing.",
        socials: {
            twitter: "https://twitter.com/robertgarcia",
            linkedin: "https://linkedin.com/in/robertgarcia"
        }
    },
    {
        id: 10,
        name: "Amanda White",
        image: "/placeholder.svg?height=80&width=80",
        bio: "Amanda White is passionate about environmental education and its integration into school curricula.",
        socials: {
            twitter: "https://twitter.com/amandawhite",
            instagram: "https://instagram.com/amandawhite"
        }
    },
    {
        id: 11,
        name: "Carlos Rodriguez",
        image: "/placeholder.svg?height=80&width=80",
        bio: "Carlos Rodriguez is an advocate for multilingual education and its benefits in a globalized world.",
        socials: {
            linkedin: "https://linkedin.com/in/carlosrodriguez",
            facebook: "https://facebook.com/carlosrodriguez"
        }
    },
    {
        id: 12,
        name: "Rachel Kim",
        image: "/placeholder.svg?height=80&width=80",
        bio: "Rachel Kim is an innovative mathematics educator, developing new approaches to make math more engaging and accessible.",
        socials: {
            twitter: "https://twitter.com/rachelkim",
            github: "https://github.com/rachelkim"
        }
    },
    {
        id: 13,
        name: "Alex Chen",
        image: "/placeholder.svg?height=80&width=80",
        bio: "Alex Chen is at the forefront of AI integration in education, exploring how machine learning can personalize learning experiences.",
        socials: {
            twitter: "https://twitter.com/alexchen",
            github: "https://github.com/alexchen",
            linkedin: "https://linkedin.com/in/alexchen"
        }
    },
    {
        id: 14,
        name: "Emma Watson",
        image: "/placeholder.svg?height=80&width=80",
        bio: "Emma Watson is dedicated to promoting STEM education for girls and increasing diversity in scientific fields.",
        socials: {
            twitter: "https://twitter.com/emmawatson",
            instagram: "https://instagram.com/emmawatson"
        }
    },
    {
        id: 15,
        name: "Michael Brown",
        image: "/placeholder.svg?height=80&width=80",
        bio: "Michael Brown is an arts education specialist, advocating for the importance of creativity in overall student development.",
        socials: {
            facebook: "https://facebook.com/michaelbrown",
            linkedin: "https://linkedin.com/in/michaelbrown"
        }
    },
    {
        id: 16,
        name: "Sophia Martinez",
        image: "/placeholder.svg?height=80&width=80",
        bio: "Sophia Martinez works on addressing the digital divide in education, ensuring equal access to technology for all students.",
        socials: {
            twitter: "https://twitter.com/sophiamartinez",
            linkedin: "https://linkedin.com/in/sophiamartinez"
        }
    },
    {
        id: 17,
        name: "Daniel Lee",
        image: "/placeholder.svg?height=80&width=80",
        bio: "Daniel Lee researches the impact of parental involvement on student achievement and overall educational outcomes.",
        socials: {
            linkedin: "https://linkedin.com/in/daniellee",
            facebook: "https://facebook.com/daniellee"
        }
    },
    {
        id: 18,
        name: "Olivia Taylor",
        image: "/placeholder.svg?height=80&width=80",
        bio: "Olivia Taylor specializes in innovative classroom design, creating spaces that enhance student engagement and learning.",
        socials: {
            twitter: "https://twitter.com/oliviataylor",
            instagram: "https://instagram.com/oliviataylor"
        }
    }
];

const allPosts = {
    "1": {
        id: "1",
        title: "The Importance of Early Education",
        category: "Education",
        tags: ["early education", "child development", "learning"],
        content: `<p>Early education plays a crucial role in a child's development and future success. It lays the foundation for lifelong learning and helps children develop essential skills that will benefit them throughout their lives.</p>
                  <p>In this article, we'll explore the many benefits of early education and why it's so important for children to have access to quality educational experiences from a young age.</p>
                  <h2>Key Benefits of Early Education</h2>
                  <ul>
                    <li>Cognitive development</li>
                    <li>Social and emotional growth</li>
                    <li>Language acquisition</li>
                    <li>Problem-solving skills</li>
                  </ul>
                  <p>Early education programs provide a structured environment where children can learn through play, exploration, and interaction with peers and adults. These experiences help shape their understanding of the world and prepare them for future academic challenges.</p>`,
        heroImage: "/placeholder.svg?height=400&width=1200",
        date: "May 1, 2023",
        authorId: 1,
        likes: 42
    },
    "2": {
        id: "2",
        title: "The Impact of Technology on Modern Education",
        category: "Education Technology",
        tags: ["edtech", "digital learning", "classroom technology"],
        content: `<p>Technology has revolutionized the way we teach and learn. From interactive whiteboards to online learning platforms, the integration of technology in education has opened up new possibilities for both educators and students.</p>
                  <p>This article explores the various ways technology is shaping modern education and its impact on learning outcomes.</p>
                  <h2>Key Areas of Impact</h2>
                  <ul>
                    <li>Personalized learning experiences</li>
                    <li>Improved student engagement</li>
                    <li>Access to global resources</li>
                    <li>Enhanced collaboration opportunities</li>
                  </ul>
                  <p>As we continue to embrace technology in education, it's important to consider both its benefits and potential challenges to ensure we're using it effectively to support student learning and growth.</p>`,
        heroImage: "/placeholder.svg?height=400&width=1200",
        date: "June 15, 2023",
        authorId: 3,
        likes: 38
    },
    "3": {
        id: "3",
        title: "Understanding Adolescent Psychology in Education",
        category: "Educational Psychology",
        tags: ["adolescent psychology", "teenage development", "education"],
        content: `<p>Adolescence is a critical period of development that significantly impacts educational experiences and outcomes. Understanding the psychological changes that occur during this time is crucial for educators and parents alike.</p>
                  <p>This article delves into the key aspects of adolescent psychology and how they relate to education.</p>
                  <h2>Key Topics in Adolescent Psychology</h2>
                  <ul>
                    <li>Identity formation</li>
                    <li>Cognitive development</li>
                    <li>Emotional regulation</li>
                    <li>Peer relationships and social dynamics</li>
                  </ul>
                  <p>By gaining insights into adolescent psychology, educators can create more effective learning environments and support systems for teenage students, promoting their academic success and personal growth.</p>`,
        heroImage: "/placeholder.svg?height=400&width=1200",
        date: "July 22, 2023",
        authorId: 2,
        likes: 55
    },
    "4": {
        id: "4",
        title: "The Role of Play in Early Childhood Education",
        category: "Early Childhood Education",
        tags: ["early education", "play-based learning", "child development"],
        content: `<p>Play is not just a fun activity for children; it's a crucial component of their learning and development. In early childhood education, play-based learning has gained recognition as an effective approach to fostering various skills and knowledge.</p>
                  <p>This article explores the importance of play in early childhood education and how it contributes to a child's overall development.</p>
                  <h2>Benefits of Play-Based Learning</h2>
                  <ul>
                    <li>Enhances creativity and imagination</li>
                    <li>Develops social and emotional skills</li>
                    <li>Improves problem-solving abilities</li>
                    <li>Promotes physical development</li>
                  </ul>
                  <p>By incorporating play into early childhood education programs, we can create engaging and effective learning experiences that set the foundation for lifelong learning and success.</p>`,
        heroImage: "/placeholder.svg?height=400&width=1200",
        date: "August 5, 2023",
        authorId: 1,
        likes: 47
    },
    "5": {
        id: "5",
        title: "Inclusive Education: Strategies for Diverse Classrooms",
        category: "Inclusive Education",
        tags: ["inclusive education", "diversity", "special needs"],
        content: `<p>Inclusive education is about creating learning environments that cater to the needs of all students, regardless of their abilities, backgrounds, or learning styles. It's a crucial approach in today's diverse classrooms.</p>
                  <p>This article discusses strategies for implementing inclusive education and creating a supportive learning environment for all students.</p>
                  <h2>Key Strategies for Inclusive Education</h2>
                  <ul>
                    <li>Differentiated instruction</li>
                    <li>Universal Design for Learning (UDL)</li>
                    <li>Collaborative teaching models</li>
                    <li>Positive behavior support</li>
                  </ul>
                  <p>By adopting inclusive education practices, we can ensure that every student has the opportunity to learn, grow, and succeed in our educational systems.</p>`,
        heroImage: "/placeholder.svg?height=400&width=1200",
        date: "September 12, 2023",
        authorId: 2,
        likes: 61
    },
    "6": {
        id: "6",
        title: "The Future of Education: AI and Machine Learning",
        category: "Education Technology",
        tags: ["artificial intelligence", "machine learning", "edtech"],
        content: `<p>Artificial Intelligence (AI) and Machine Learning (ML) are rapidly transforming various industries, and education is no exception. These technologies have the potential to revolutionize how we teach and learn.</p>
                  <p>This article explores the current and potential future applications of AI and ML in education.</p>
                  <h2>Applications of AI and ML in Education</h2>
                  <ul>
                    <li>Personalized learning paths</li>
                    <li>Intelligent tutoring systems</li>
                    <li>Automated grading and feedback</li>
                    <li>Predictive analytics for student success</li>
                  </ul>
                  <p>As AI and ML continue to evolve, it's crucial for educators and policymakers to understand their potential and ensure they are used ethically and effectively to enhance educational experiences and outcomes.</p>`,
        heroImage: "/placeholder.svg?height=400&width=1200",
        date: "October 3, 2023",
        authorId: 3,
        likes: 53
    }
};

function fetchBlogPost(postId) {
    return allPosts[postId];
}

function populateBlogPost(post) {
    document.title = `${post.title} - Everest Integrated Academy`;
    document.getElementById('hero-image').src = post.heroImage;
    document.getElementById('post-category').textContent = post.category;
    document.getElementById('post-title').textContent = post.title;
    document.querySelector('#post-date span').textContent = post.date;
    document.getElementById('post-content').innerHTML = post.content;
    document.getElementById('like-count').textContent = post.likes;

    const estimatedReadTime = calculateReadTime(post.content);
    document.getElementById('estimated-read-time').textContent = `${estimatedReadTime} min read`;

    const author = authors.find(a => a.id === post.authorId);
    if (author) {
        document.getElementById('post-author').textContent = author.name;
        document.getElementById('author-image').src = author.image;
        document.getElementById('author-bio-image').src = author.image;
        document.getElementById('author-name').textContent = author.name;
        document.getElementById('author-bio').textContent = author.bio;
        
        const authorSocials = document.getElementById('author-socials');
        authorSocials.innerHTML = '';
        for (const [platform, url] of Object.entries(author.socials)) {
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.innerHTML = `<i class="fa-brands fa-${platform}"></i>`;
            authorSocials.appendChild(link);
        }
    }

    const relatedPosts = getRandomRelatedPosts(post, 3);
    const relatedPostsContainer = document.getElementById('related-posts');
    relatedPostsContainer.innerHTML = '';
    relatedPosts.forEach(relatedPost => {
        const postCard = createRelatedPostCard(relatedPost);
        relatedPostsContainer.appendChild(postCard);
    });
}

function calculateReadTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

function getRandomRelatedPosts(currentPost, count) {
    const relatedPosts = Object.values(allPosts).filter(post => 
        post.id !== currentPost.id && 
        post.tags.some(tag => currentPost.tags.includes(tag))
    );
    
    // If there are fewer than 2 related posts, add random posts to make up the difference
    if (relatedPosts.length < 2) {
        const randomPosts = Object.values(allPosts).filter(post => 
            post.id !== currentPost.id && !relatedPosts.includes(post)
        );
        while (relatedPosts.length < 2 && randomPosts.length > 0) {
            const randomIndex = Math.floor(Math.random() * randomPosts.length);
            relatedPosts.push(randomPosts.splice(randomIndex, 1)[0]);
        }
    }
    
    // Shuffle the related posts
    for (let i = relatedPosts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [relatedPosts[i], relatedPosts[j]] = [relatedPosts[j], relatedPosts[i]];
    }
    
    return relatedPosts.slice(0, count);
}

function createRelatedPostCard(post) {
    const card = document.createElement('a');
    card.className = 'related-post-card';
    card.href = `blog-detail.html?id=${post.id}`;
    card.innerHTML = `
        <img src="${post.heroImage}" alt="${post.title}">
        <div class="related-post-card-content">
            <h3>${post.title}</h3>
            <p>${post.category}</p>
        </div>
    `;
    return card;
}

function setupLikeButton(postId) {
    const likeButton = document.getElementById('like-button');
    const likeCount = document.getElementById('like-count');
    let isLiked = localStorage.getItem(`post_${postId}_liked`) === 'true';
    let likes = parseInt(localStorage.getItem(`post_${postId}_likes`)) || parseInt(likeCount.textContent);

    updateLikeButton();

    likeButton.addEventListener('click', () => {
        isLiked = !isLiked;
        likes += isLiked ? 1 : -1;
        updateLikeButton();
        saveLikeState();
    });

    // function updateLikeButton() {
    //     likeCount.textContent = likes;
    //     likeButton.classList.toggle('liked', isLiked);
    //     likeButton.querySelector('i').classList.toggle('fas', isLiked);
    //     likeButton.querySelector('i').classList.toggle('far', !isLiked);
    // }

    function updateLikeButton() {
        likeCount.textContent = likes;
        likeButton.classList.toggle('liked', isLiked);
        const icon = likeButton.querySelector('i');
        icon.className = isLiked ? 'fas fa-heart' : 'far fa-heart';
        likeButton.style.color = isLiked ? 'red' : '';
    }

    function saveLikeState() {
        localStorage.setItem(`post_${postId}_liked`, isLiked);
        localStorage.setItem(`post_${postId}_likes`, likes);
    }
}

function setupShareDropdown() {
    const shareButton = document.getElementById('shareButton');
    const shareDropdown = document.getElementById('shareDropdown');

    shareButton.addEventListener('click', (event) => {
        event.stopPropagation();
        shareDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (event) => {
        if (!shareDropdown.contains(event.target) && !shareButton.contains(event.target)) {
            shareDropdown.classList.remove('show');
        }
    });

    const shareItems = document.querySelectorAll('.share-item');
    shareItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const platform = event.currentTarget.dataset.platform;
            sharePost(platform);
        });
    });
}

function sharePost(platform) {
    const postUrl = window.location.href;
    const postTitle = document.getElementById('post-title').textContent;
    let shareUrl;

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(postTitle + ' ' + postUrl)}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${encodeURIComponent(postTitle)}&body=${encodeURIComponent('Check out this article: ' + postUrl)}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank');
    }
}

function loadComments(postId) {
    const comments = JSON.parse(localStorage.getItem(`post_${postId}_comments`)) || [];
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';

    comments.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentsList.appendChild(commentElement);
    });
}

// function createCommentElement(comment) {
//     const commentDiv = document.createElement('div');
//     commentDiv.className = 'comment';
//     commentDiv.dataset.id = comment.id;
//     commentDiv.innerHTML = `
//         <div class="comment-author">${comment.author}</div>
//         <div class="comment-date">${new Date(comment.date).toLocaleString()}</div>
//         <div class="comment-content">${comment.content}</div>
//         <div class="comment-actions">
//             <button class="reply-button"><i class="fa-solid fa-reply"></i> Reply</button>
//             <button class="delete-comment"><i class="fa-solid fa-trash"></i> Delete</button>
//         </div>
//         <div class="reply-form">
//             <input type="text" class="reply-author" placeholder="Your name" required>
//             <textarea placeholder="Write your reply here... (250 characters max)" maxlength="250" required></textarea>
//             <button class="submit-reply">Submit Reply</button>
//         </div>
//         <div class="replies"></div>
//         <button class="toggle-replies" style="display: none;">Show Replies <i class="fa-solid fa-chevron-down"></i></button>
//     `;

//     const deleteButton = commentDiv.querySelector('.delete-comment');
//     deleteButton.addEventListener('click', () => deleteComment(comment.id));

//     const replyButton = commentDiv.querySelector('.reply-button');
//     const replyForm = commentDiv.querySelector('.reply-form');
//     replyButton.addEventListener('click', () => {
//         replyForm.classList.toggle('active');
//     });

//     const submitReplyButton = commentDiv.querySelector('.submit-reply');
//     submitReplyButton.addEventListener('click', () => {
//         const replyAuthor = replyForm.querySelector('.reply-author').value;
//         const replyContent = replyForm.querySelector('textarea').value;
//         if (replyAuthor && replyContent) {
//             addReply(comment.id, replyAuthor, replyContent);
//             replyForm.querySelector('.reply-author').value = '';
//             replyForm.querySelector('textarea').value = '';
//             replyForm.classList.remove('active');
//         }
//     });

//     if (comment.replies && comment.replies.length > 0) {
//         const repliesContainer = commentDiv.querySelector('.replies');
//         comment.replies.forEach(reply => {
//             const replyElement = createReplyElement(reply);
//             repliesContainer.appendChild(replyElement);
//         });

//         const toggleRepliesButton = commentDiv.querySelector('.toggle-replies');
//         toggleRepliesButton.style.display = 'block';
//         toggleRepliesButton.addEventListener('click', () => {
//             repliesContainer.style.display = repliesContainer.style.display === 'none' ? 'block' : 'none';
//             toggleRepliesButton.innerHTML = repliesContainer.style.display === 'none' ? 'Show Replies <i class="fa-solid fa-chevron-down"></i>' : 'Hide Replies <i class="fa-solid fa-chevron-up"></i>';
//         });
//     }

//     return commentDiv;
// }

// function createReplyElement(reply) {
//     const replyDiv = document.createElement('div');
//     replyDiv.className = 'reply';
//     replyDiv.innerHTML = `
//         <div class="comment-author">${reply.author}</div>
//         <div class="comment-date">${new Date(reply.date).toLocaleString()}</div>
//         <div class="comment-content">${reply.content}</div>
//     `;
//     return replyDiv;
// }

// function addReply(commentId, author, content) {
//     const postId = getPostIdFromUrl();
//     let comments = JSON.parse(localStorage.getItem(`post_${postId}_comments`)) || [];
//     const commentIndex = comments.findIndex(comment => comment.id === commentId);

//     if (commentIndex !== -1) {
//         if (!comments[commentIndex].replies) {
//             comments[commentIndex].replies = [];
//         }

//         const newReply = {
//             id: Date.now().toString(),
//             content: content,
//             author: author,
//             date: new Date().toISOString()
//         };

//         comments[commentIndex].replies.push(newReply);
//         localStorage.setItem(`post_${postId}_comments`, JSON.stringify(comments));

//         const commentElement = document.querySelector(`.comment[data-id="${commentId}"]`);
//         const repliesContainer = commentElement.querySelector('.replies');
//         const replyElement = createReplyElement(newReply);
//         repliesContainer.appendChild(replyElement);

//         const toggleRepliesButton = commentElement.querySelector('.toggle-replies');
//         toggleRepliesButton.style.display = 'block';
//         toggleRepliesButton.innerHTML = 'Hide Replies <i class="fa-solid fa-chevron-up"></i>';
//         repliesContainer.style.display = 'block';
//     }
// }

function deleteComment(commentId) {
    const postId = getPostIdFromUrl();
    let comments = JSON.parse(localStorage.getItem(`post_${postId}_comments`)) || [];
    comments = comments.filter(comment => comment.id !== commentId);
    localStorage.setItem(`post_${postId}_comments`, JSON.stringify(comments));

    const commentElement = document.querySelector(`.comment[data-id="${commentId}"]`);
    if (commentElement) {
        commentElement.remove();
    }
}

function setupCommentForm(postId) {
    const commentForm = document.getElementById('comment-form');
    const commentContent = document.getElementById('comment-content');
    const charCount = document.getElementById('char-count');
    const termsCheckbox = document.getElementById('terms-checkbox');
    const submitButton = commentForm.querySelector('button[type="submit"]');

    commentContent.addEventListener('input', updateCharCount);
    termsCheckbox.addEventListener('change', updateSubmitButton);

    function updateCharCount() {
        const remainingChars = 250 - commentContent.value.length;
        charCount.textContent = `${remainingChars} characters remaining`;
    }

    function updateSubmitButton() {
        submitButton.disabled = !termsCheckbox.checked;
    }

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const content = commentContent.value;
        const author = document.getElementById('comment-author').value;
        const email = document.getElementById('comment-email').value;

        if (content && author && email && termsCheckbox.checked) {
            const newComment = {
                id: Date.now().toString(),
                content,
                author,
                email,
                date: new Date().toISOString()
            };

            const comments = JSON.parse(localStorage.getItem(`post_${postId}_comments`)) || [];
            comments.push(newComment);
            localStorage.setItem(`post_${postId}_comments`, JSON.stringify(comments));

            const commentElement = createCommentElement(newComment);
            document.getElementById('comments-list').appendChild(commentElement);

            // Clear the form
            commentContent.value = '';
            document.getElementById('comment-author').value = '';
            document.getElementById('comment-email').value = '';
            termsCheckbox.checked = false;
            updateCharCount();
            updateSubmitButton();

            // Reload comments to ensure proper ordering
            loadComments(postId);
        }
    });

    // Initial call to set up the submit button state
    updateSubmitButton();
}

function createCommentElement(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.dataset.id = comment.id;
    commentDiv.innerHTML = `
        <div class="comment-header">
            <div class="comment-author">${comment.author}</div>
            <div class="comment-date">${new Date(comment.date).toLocaleString()}</div>
            <button class="delete-button" aria-label="Delete comment"><i class="icon icon-x"></i></button>
        </div>
        <div class="comment-content">${comment.content}</div>
        <div class="comment-actions">
            <button class="reply-button"><i class="fa-solid fa-reply"></i> Reply</button>
        </div>
        <div class="reply-form">
            <input type="text" class="reply-author" placeholder="Your name" required>
            <textarea placeholder="Write your reply here... (250 characters max)" maxlength="250" required></textarea>
            <button class="submit-reply">Submit Reply</button>
        </div>
        <div class="replies"></div>
        <button class="toggle-replies" style="display: none;">Show Replies <i class="fa-solid fa-chevron-down"></i></button>
    `;

    const deleteButton = commentDiv.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => deleteComment(comment.id));

    const replyButton = commentDiv.querySelector('.reply-button');
    const replyForm = commentDiv.querySelector('.reply-form');
    replyButton.addEventListener('click', () => {
        replyForm.classList.toggle('active');
    });

    const submitReplyButton = commentDiv.querySelector('.submit-reply');
    submitReplyButton.addEventListener('click', () => {
        const replyAuthor = replyForm.querySelector('.reply-author').value;
        const replyContent = replyForm.querySelector('textarea').value;
        if (replyAuthor && replyContent) {
            addReply(comment.id, replyAuthor, replyContent);
            replyForm.querySelector('.reply-author').value = '';
            replyForm.querySelector('textarea').value = '';
            replyForm.classList.remove('active');
        }
    });

    if (comment.replies && comment.replies.length > 0) {
        const repliesContainer = commentDiv.querySelector('.replies');
        comment.replies.forEach(reply => {
            const replyElement = createReplyElement(reply, comment.id);
            repliesContainer.appendChild(replyElement);
        });

        const toggleRepliesButton = commentDiv.querySelector('.toggle-replies');
        toggleRepliesButton.style.display = 'block';
        toggleRepliesButton.addEventListener('click', () => {
            repliesContainer.style.display = repliesContainer.style.display === 'none' ? 'block' : 'none';
            toggleRepliesButton.innerHTML = repliesContainer.style.display === 'none' ? 'Show Replies <i class="fa-solid fa-chevron-down"></i>' : 'Hide Replies <i class="fa-solid fa-chevron-up"></i>';
        });
    }

    return commentDiv;
}

function createReplyElement(reply, commentId) {
    const replyDiv = document.createElement('div');
    replyDiv.className = 'reply';
    replyDiv.dataset.id = reply.id;
    replyDiv.innerHTML = `
        <div class="reply-header">
            <div class="comment-author">${reply.author}</div>
            <div class="comment-date">${new Date(reply.date).toLocaleString()}</div>
            <button class="delete-button" aria-label="Delete reply"><i class="icon icon-x"></i></button>
        </div>
        <div class="comment-content">${reply.content}</div>
    `;

    const deleteButton = replyDiv.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => deleteReply(commentId, reply.id));

    return replyDiv;
}

function addReply(commentId, author, content) {
    const postId = getPostIdFromUrl();
    let comments = JSON.parse(localStorage.getItem(`post_${postId}_comments`)) || [];
    const commentIndex = comments.findIndex(comment => comment.id === commentId);

    if (commentIndex !== -1) {
        if (!comments[commentIndex].replies) {
            comments[commentIndex].replies = [];
        }

        const newReply = {
            id: Date.now().toString(),
            content: content,
            author: author,
            date: new Date().toISOString()
        };

        comments[commentIndex].replies.push(newReply);
        localStorage.setItem(`post_${postId}_comments`, JSON.stringify(comments));

        const commentElement = document.querySelector(`.comment[data-id="${commentId}"]`);
        const repliesContainer = commentElement.querySelector('.replies');
        const replyElement = createReplyElement(newReply, commentId);
        repliesContainer.appendChild(replyElement);

        const toggleRepliesButton = commentElement.querySelector('.toggle-replies');
        toggleRepliesButton.style.display = 'block';
        toggleRepliesButton.innerHTML = 'Hide Replies <i class="fa-solid fa-chevron-up"></i>';
        repliesContainer.style.display = 'block';
    }
}

function deleteReply(commentId, replyId) {
    const postId = getPostIdFromUrl();
    let comments = JSON.parse(localStorage.getItem(`post_${postId}_comments`)) || [];
    const commentIndex = comments.findIndex(comment => comment.id === commentId);

    if (commentIndex !== -1) {
        comments[commentIndex].replies = comments[commentIndex].replies.filter(reply => reply.id !== replyId);
        localStorage.setItem(`post_${postId}_comments`, JSON.stringify(comments));

        const replyElement = document.querySelector(`.reply[data-id="${replyId}"]`);
        if (replyElement) {
            replyElement.remove();
        }

        // Hide "Show Replies" button if there are no more replies
        if (comments[commentIndex].replies.length === 0) {
            const commentElement = document.querySelector(`.comment[data-id="${commentId}"]`);
            const toggleRepliesButton = commentElement.querySelector('.toggle-replies');
            toggleRepliesButton.style.display = 'none';
        }
    }
}