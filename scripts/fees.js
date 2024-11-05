document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Fee calculator functionality
    const calculateBtn = document.getElementById('calculate-btn');
    const calculationResult = document.getElementById('calculation-result');

    const tuitionFees = {
        elementary: 5000,
        middle: 6000,
        high: 7000,
        beyond: 8000
    };

    calculateBtn.addEventListener('click', () => {
        const gradeLevel = document.getElementById('grade-level').value;
        const paymentPlan = document.getElementById('payment-plan').value;
        const siblings = parseInt(document.getElementById('siblings').value);
        const earlyPayment = document.getElementById('early-payment').checked;
        const financialAid = parseFloat(document.getElementById('financial-aid').value) || 0;

        let fee = tuitionFees[gradeLevel];

        // Apply payment plan adjustments
        if (paymentPlan === 'semester') {
            fee = fee / 2;
        } else if (paymentPlan === 'monthly') {
            fee = fee / 10;
        }

        // Apply sibling discount
        if (siblings > 0) {
            fee = fee * (1 - (siblings * 0.05)); // 5% discount per sibling
        }

        // Apply early payment discount
        if (earlyPayment && paymentPlan === 'annual') {
            fee = fee * 0.95; // 5% discount for early annual payment
        }

        // Apply financial aid
        fee = Math.max(0, fee - financialAid);

        calculationResult.textContent = `Estimated ${paymentPlan} tuition: $${fee.toFixed(2)}`;
    });

    // Financial aid modal functionality
    const openModalBtn = document.getElementById('open-modal-btn');
    const modal = document.getElementById('financial-aid-modal');
    const closeBtn = modal.querySelector('.close');

    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Financial aid form submission
    const financialAidForm = document.getElementById('financial-aid-form');

    financialAidForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for submitting your financial aid application. We will contact you soon.');
        modal.style.display = 'none';
        financialAidForm.reset();
    });

    // Set up payment plan button
    const setupPaymentBtn = document.getElementById('setup-payment-btn');
    setupPaymentBtn.addEventListener('click', () => {
        alert('You will be redirected to our secure payment portal to set up your payment plan.');
    });

    // View scholarships button
    const viewScholarshipsBtn = document.getElementById('view-scholarships-btn');
    viewScholarshipsBtn.addEventListener('click', () => {
        alert('You will be redirected to our scholarship portal to view available opportunities.');
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        answer.style.display = 'none';

        question.addEventListener('click', () => {
            answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        });
    });
});