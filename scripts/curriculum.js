document.addEventListener('DOMContentLoaded', function () {
    const convertButton = document.getElementById('convertButton');
    const faqCategories = document.querySelectorAll('.faq-category');
    const faqContainer = document.querySelector('.faq-container');
    const schoolSearchButton = document.getElementById('schoolSearchButton');
    const downloadPDFButton = document.getElementById('downloadPDF');
    const convertTranscriptButton = document.getElementById('convertTranscript');
    const transcriptUpload = document.getElementById('transcriptUpload');
    const fromSystemSelect = document.getElementById('fromSystem');
    const toSystemSelect = document.getElementById('toSystem');

    // Configure PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

    // Grade Conversion Calculator
    const gradeScales = {
        peak: [
            { min: 97, max: 100, grade: 'A*', gpa: 4.0 },
            { min: 93, max: 96.9, grade: 'A', gpa: 4.0 },
            { min: 90, max: 92.9, grade: 'A-', gpa: 3.7 },
            { min: 80, max: 89.9, grade: 'B', gpa: 3.0 },
            { min: 70, max: 79.9, grade: 'C', gpa: 2.0 },
            { min: 60, max: 69.9, grade: 'D', gpa: 1.0 },
            { min: 50, max: 59.9, grade: 'E', gpa: 0.5 },
            { min: 0, max: 49.9, grade: 'F', gpa: 0.0 }
        ],
        peakAlternative: [
            { grade: '8', min: 97, max: 100, gpa: 4.0, equivalent: 'A*' },
            { grade: '7', min: 93, max: 96.9, gpa: 4.0, equivalent: 'A' },
            { grade: '6', min: 90, max: 92.9, gpa: 3.7, equivalent: 'A-' },
            { grade: '5', min: 80, max: 89.9, gpa: 3.0, equivalent: 'B' },
            { grade: '4', min: 70, max: 79.9, gpa: 2.0, equivalent: 'C' },
            { grade: '3', min: 60, max: 69.9, gpa: 1.0, equivalent: 'D' },
            { grade: '2', min: 50, max: 59.9, gpa: 0.5, equivalent: 'E' },
            { grade: '1', min: 0, max: 49.9, gpa: 0.0, equivalent: 'F' }
        ],
        us: [
            { grade: 'A+', gpa: 4.0, min: 97, max: 100 },
            { grade: 'A', gpa: 4.0, min: 93, max: 96.9 },
            { grade: 'A-', gpa: 3.7, min: 90, max: 92.9 },
            { grade: 'B+', gpa: 3.3, min: 87, max: 89.9 },
            { grade: 'B', gpa: 3.0, min: 83, max: 86.9 },
            { grade: 'B-', gpa: 2.7, min: 80, max: 82.9 },
            { grade: 'C+', gpa: 2.3, min: 77, max: 79.9 },
            { grade: 'C', gpa: 2.0, min: 73, max: 76.9 },
            { grade: 'C-', gpa: 1.7, min: 70, max: 72.9 },
            { grade: 'D+', gpa: 1.3, min: 67, max: 69.9 },
            { grade: 'D', gpa: 1.0, min: 63, max: 66.9 },
            { grade: 'D-', gpa: 0.7, min: 60, max: 62.9 },
            { grade: 'F', gpa: 0.0, min: 0, max: 59.9 }
        ],
        uk: [
            { grade: 'A*', min: 90, max: 100, gpa: 4.0 },
            { grade: 'A', min: 80, max: 89.9, gpa: 4.0 },
            { grade: 'B', min: 70, max: 79.9, gpa: 3.0 },
            { grade: 'C', min: 60, max: 69.9, gpa: 2.0 },
            { grade: 'D', min: 50, max: 59.9, gpa: 1.0 },
            { grade: 'E', min: 40, max: 49.9, gpa: 0.0 },
            { grade: 'F', min: 0, max: 39.9, gpa: 0.0 }
        ],
        ib: [
            { grade: '7', min: 80, max: 100, gpa: 4.0, equivalent: 'A*' },
            { grade: '6', min: 70, max: 79.9, gpa: 3.8, equivalent: 'A' },
            { grade: '5', min: 60, max: 69.9, gpa: 3.3, equivalent: 'B' },
            { grade: '4', min: 50, max: 59.9, gpa: 2.8, equivalent: 'C' },
            { grade: '3', min: 40, max: 49.9, gpa: 2.3, equivalent: 'D' },
            { grade: '2', min: 30, max: 39.9, gpa: 1.8, equivalent: 'E' },
            { grade: '1', min: 0, max: 29.9, gpa: 0.0, equivalent: 'F' }
        ],
        cambridgeIGCSE: [
            { grade: 'A*', min: 90, max: 100, gpa: 4.0 },
            { grade: 'A', min: 80, max: 89.9, gpa: 4.0 },
            { grade: 'B', min: 70, max: 79.9, gpa: 3.0 },
            { grade: 'C', min: 60, max: 69.9, gpa: 2.0 },
            { grade: 'D', min: 50, max: 59.9, gpa: 1.0 },
            { grade: 'E', min: 40, max: 49.9, gpa: 0.0 },
            { grade: 'F', min: 30, max: 39.9, gpa: 0.0 },
            { grade: 'G', min: 20, max: 29.9, gpa: 0.0 },
            { grade: 'U', min: 0, max: 19.9, gpa: 0.0 }
        ],
        cambridgeGCSE: [
            { grade: '9', min: 90, max: 100, gpa: 4.0, equivalent: 'A*' },
            { grade: '8', min: 85, max: 89.9, gpa: 4.0, equivalent: 'A*' },
            { grade: '7', min: 80, max: 84.9, gpa: 4.0, equivalent: 'A' },
            { grade: '6', min: 70, max: 79.9, gpa: 3.7, equivalent: 'B' },
            { grade: '5', min: 60, max: 69.9, gpa: 3.3, equivalent: 'C' },
            { grade: '4', min: 50, max: 59.9, gpa: 3.0, equivalent: 'C' },
            { grade: '3', min: 40, max: 49.9, gpa: 2.0, equivalent: 'D' },
            { grade: '2', min: 30, max: 39.9, gpa: 1.0, equivalent: 'E' },
            { grade: '1', min: 0, max: 29.9, gpa: 0.0, equivalent: 'F/G' },
            { grade: 'U', min: 0, max: 19.9, gpa: 0.0, equivalent: 'U' }
        ],
        ace: [
            { grade: 'A*', min: 98, max: 100, gpa: 4.0 },
            { grade: 'A', min: 96, max: 97.9, gpa: 4.0 },
            { grade: 'B', min: 92, max: 95.9, gpa: 3.0 },
            { grade: 'C', min: 88, max: 91.9, gpa: 2.0 },
            { grade: 'D', min: 85, max: 87.9, gpa: 1.0 },
            { grade: 'E', min: 80, max: 84.9, gpa: 0.0 }
        ]
    };

    function convertGrade(grade, fromSystem) {
        let result = {};
        let numGrade;
        let gradeInfo;
    
        // Check if the input is a string representation of a single-digit integer
        if (/^[1-9]$/.test(grade) && ['peakAlternative', 'ib', 'cambridgeGCSE'].includes(fromSystem)) {
            numGrade = parseInt(grade);
            gradeInfo = gradeScales[fromSystem].find(g => g.grade === grade);
        } else if (!isNaN(grade)) {
            numGrade = parseFloat(grade);
            gradeInfo = gradeScales[fromSystem].find(g => numGrade >= g.min && numGrade <= g.max);
        } else {
            gradeInfo = gradeScales[fromSystem].find(g =>
                g.grade.toLowerCase() === grade.toLowerCase() ||
                (g.equivalent && g.equivalent.toLowerCase() === grade.toLowerCase())
            );
        }
    
        if (gradeInfo) {
            numGrade = (gradeInfo.min + gradeInfo.max) / 2;
    
            // Convert to all other systems
            const systems = ['peak', 'peakAlternative', 'us', 'uk', 'ib', 'cambridgeIGCSE', 'cambridgeGCSE', 'ace'];
            systems.forEach(system => {
                const convertedGrade = convertBetweenSystems(numGrade, fromSystem, system);
                const percentageEquivalent = calculatePercentageEquivalent(numGrade, fromSystem, system);
                result[system] = `${convertedGrade} (${percentageEquivalent.toFixed(1)}%)`;
            });
            result.gpa = gradeInfo.gpa;
        } else {
            return {};
        }
    
        return result;
    }

    function calculatePercentageEquivalent(numGrade, fromSystem, toSystem) {
        const fromScale = gradeScales[fromSystem];
        const toScale = gradeScales[toSystem];
    
        // Normalize the grade to a 0-1 scale
        const fromMin = fromScale[fromScale.length - 1].min;
        const fromMax = fromScale[0].max;
        const normalizedGrade = (numGrade - fromMin) / (fromMax - fromMin);
    
        // Convert the normalized grade to the target system
        const toMin = toScale[toScale.length - 1].min;
        const toMax = toScale[0].max;
        return normalizedGrade * (toMax - toMin) + toMin;
    }

    function convertBetweenSystems(numGrade, fromSystem, toSystem) {
        const fromScale = gradeScales[fromSystem];
        const toScale = gradeScales[toSystem];

        // Normalize the grade to a 0-1 scale
        const fromMin = fromScale[fromScale.length - 1].min;
        const fromMax = fromScale[0].max;
        const normalizedGrade = (numGrade - fromMin) / (fromMax - fromMin);

        // Convert the normalized grade to the target system
        const toMin = toScale[toScale.length - 1].min;
        const toMax = toScale[0].max;
        const convertedGrade = normalizedGrade * (toMax - toMin) + toMin;

        // Find the corresponding grade in the target system
        const targetGrade = toScale.find(g => convertedGrade >= g.min && convertedGrade <= g.max);

        if (targetGrade) {
            return targetGrade.grade;
        } else {
            // If no direct match is found, find the closest grade
            const closestGrade = toScale.reduce((prev, curr) => {
                return (Math.abs(curr.min - convertedGrade) < Math.abs(prev.min - convertedGrade) ? curr : prev);
            });
            return closestGrade.grade;
        }
    }

    // Event listener for the convert button
    convertButton.addEventListener('click', () => {
        const grade = document.getElementById('gradeInput').value;
        const system = document.getElementById('systemSelect').value;
        const result = convertGrade(grade, system);
    
        if (Object.keys(result).length > 0) {
            const conversionResult = `
                PEAK: ${result.peak}
                PEAK Alternative: ${result.peakAlternative}
                US: ${result.us}
                UK: ${result.uk}
                IB: ${result.ib}
                Cambridge IGCSE: ${result.cambridgeIGCSE}
                Cambridge GCSE: ${result.cambridgeGCSE}
                A.C.E: ${result.ace}
                GPA: ${result.gpa.toFixed(2)}
            `;
    
            document.getElementById('conversionResult').innerHTML = conversionResult.replace(/\n/g, '<br>');
    
            updateCollegeAdmissionChances(result.gpa);
            document.querySelector('.chart-container').style.display = 'flex';
            updateGradeConversionChart(result);
            updateCollegeAdmissionChart(result.gpa);
    
            // Store the result
            const storedResult = {
                fromGrade: grade,
                fromSystem: system,
                toGrade: conversionResult.trim(),
                toSystem: 'All Systems'
            };
            storeResult(storedResult);
        } else {
            document.getElementById('conversionResult').textContent = 'Invalid grade or system. Please try again.';
            document.querySelector('.chart-container').style.display = 'none';
        }
    });

    document.getElementById('gradeInput').addEventListener('input', () => {
        const grade = document.getElementById('gradeInput').value.trim();

        if (grade === '') {
            // Hide conversion results and charts when input is cleared
            document.getElementById('conversionResult').textContent = '';
            document.querySelector('.chart-container').style.display = 'none';
        }
    });

    downloadPDFButton.addEventListener('click', downloadPDF);
    convertTranscriptButton.addEventListener('click', convertTranscript);

    // Chart.js setup
    function updateGradeConversionChart(result) {
        const ctx = document.getElementById('gradeConversionChart').getContext('2d');
        const systems = ['peak', 'peakAlternative', 'us', 'uk', 'ib', 'cambridgeIGCSE', 'cambridgeGCSE', 'ace'];
        const data = {
            labels: ['PEAK', 'PEAK Alt', 'US', 'UK', 'IB', 'IGCSE', 'GCSE', 'A.C.E', 'GPA'],
            datasets: [{
                label: 'Grade Conversion',
                data: systems.map(system => {
                    const scale = gradeScales[system];
                    const grade = result[system];
                    const gradeInfo = scale.find(g => g.grade === grade);
                    if (gradeInfo) {
                        return ((gradeInfo.min + gradeInfo.max) / 2 - scale[scale.length - 1].min) / (scale[0].max - scale[scale.length - 1].min) * 100;
                    }
                    return 0;
                }).concat([result.gpa * 25]), // Add GPA to the end, scaled to 0-100
                backgroundColor: 'rgba(88, 135, 255, 0.2)',
                borderColor: 'rgba(88, 135, 255, 1)',
                borderWidth: 1
            }]
        };

        if (window.gradeConversionChart instanceof Chart) {
            window.gradeConversionChart.destroy();
        }

        window.gradeConversionChart = new Chart(ctx, {
            type: 'radar',
            data: data,
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: false
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }

    function updateCollegeAdmissionChances(gpa) {
        const collegeCategories = {
            'Ivy League': calculateAdmissionChance(gpa, 3.9),
            'Top 20 Universities': calculateAdmissionChance(gpa, 3.8),
            'Top 50 Universities': calculateAdmissionChance(gpa, 3.6),
            'Top 100 Universities': calculateAdmissionChance(gpa, 3.4),
            'Other Universities': calculateAdmissionChance(gpa, 3.0)
        };

        updateCollegeAdmissionChart(gpa);
    }

    function calculateAdmissionChance(studentGPA, requiredGPA) {
        const maxGPA = 4.0;
        const range = maxGPA - requiredGPA;
        return (Math.max(0, studentGPA - requiredGPA) / range) * 100;
    }

    function updateCollegeAdmissionChart(gpa) {
        const ctx = document.getElementById('collegeAdmissionChart').getContext('2d');
        const data = {
            labels: ['Ivy League', 'Top 20', 'Top 50', 'Top 100', 'Other'],
            datasets: [{
                label: 'Admission Chances',
                data: [
                    calculateAdmissionChance(gpa, 3.9),
                    calculateAdmissionChance(gpa, 3.8),
                    calculateAdmissionChance(gpa, 3.6),
                    calculateAdmissionChance(gpa, 3.4),
                    calculateAdmissionChance(gpa, 3.0)
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        };

        if (window.collegeAdmissionChart instanceof Chart) {
            window.collegeAdmissionChart.destroy();
        }

        window.collegeAdmissionChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    function populateConversionTable() {
        const tableBody = document.querySelector('#conversionTable tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        const systems = ['peak', 'peakAlternative', 'us', 'uk', 'ib', 'cambridgeIGCSE', 'cambridgeGCSE', 'ace'];
        const maxRows = Math.max(...systems.map(sys => gradeScales[sys].length));

        for (let i = 0; i < maxRows; i++) {
            const row = document.createElement('tr');
            systems.forEach(system => {
                const cell = document.createElement('td');
                if (i < gradeScales[system].length) {
                    cell.textContent = gradeScales[system][i].grade;
                } else {
                    cell.textContent = '-';
                }
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        }
    }

    populateConversionTable();

    const downloadCSVBtn = document.getElementById('downloadCSVBtn');
    const downloadXLSXBtn = document.getElementById('downloadXLSXBtn');

    downloadCSVBtn.addEventListener('click', () => downloadConversionTable('csv'));
    downloadXLSXBtn.addEventListener('click', () => downloadConversionTable('xlsx'));

    function downloadConversionTable(format) {
        const table = document.getElementById('conversionTable');
        const data = [];

        // Get table headers
        const headers = [];
        for (const cell of table.rows[0].cells) {
            headers.push(cell.textContent);
        }
        data.push(headers);

        // Get table data
        for (let i = 1; i < table.rows.length; i++) {
            const row = table.rows[i];
            const rowData = [];
            for (const cell of row.cells) {
                rowData.push(cell.textContent);
            }
            data.push(rowData);
        }

        if (format === 'csv') {
            downloadCSV(data);
        } else if (format === 'xlsx') {
            downloadXLSX(data);
        }
    }

    function downloadCSV(data) {
        const csvContent = data.map(row => row.join(',')).join('\n');
        const htmlContent = `
            <html>
            <head>
                <style>
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        font-family: Arial, sans-serif;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                        font-weight: bold;
                    }
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                </style>
            </head>
            <body>
                <table>
                    ${data.map((row, index) => `
                        <tr>
                            ${row.map(cell => `<${index === 0 ? 'th' : 'td'}>${cell}</${index === 0 ? 'th' : 'td'}>`).join('')}
                        </tr>
                    `).join('')}
                </table>
            </body>
            </html>
        `;
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'grade_conversion_table.html');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    function downloadXLSX(data) {
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Grade Conversion Table");

        // Apply styles
        ws['!cols'] = [{ wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];

        const headerStyle = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "4472C4" } },
            alignment: { horizontal: "center" }
        };

        const cellStyle = {
            alignment: { horizontal: "center" },
            border: {
                top: { style: "thin" },
                bottom: { style: "thin" },
                left: { style: "thin" },
                right: { style: "thin" }
            }
        };

        // Apply header style
        for (let i = 0; i < data[0].length; i++) {
            const cellRef = XLSX.utils.encode_cell({ r: 0, c: i });
            ws[cellRef].s = headerStyle;
        }

        // Apply cell styles and alternate row colors
        for (let i = 1; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                const cellRef = XLSX.utils.encode_cell({ r: i, c: j });
                ws[cellRef].s = {
                    ...cellStyle,
                    fill: { fgColor: { rgb: i % 2 === 0 ? "E9EFF7" : "FFFFFF" } }
                };
            }
        }

        XLSX.writeFile(wb, 'grade_conversion_table.xlsx');
    }

    // PEAK Journey Map tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Metrics counter animation
    const metrics = document.querySelectorAll('.metric h3');

    const animateValue = (obj, start, end, duration, format, ratioValue) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let value = Math.floor(progress * (end - start) + start);

            switch (format) {
                case 'ratio':
                    obj.innerHTML = `${value}:${ratioValue}`;
                    break;
                case 'percentage':
                    obj.innerHTML = `${value}%`;
                    break;
                default:
                    obj.innerHTML = value;
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                switch (format) {
                    case 'ratio':
                        obj.innerHTML = `${end}:${ratioValue}`;
                        break;
                    case 'percentage':
                        obj.innerHTML = `${end}%`;
                        break;
                    default:
                        obj.innerHTML = end;
                }
            }
        };
        window.requestAnimationFrame(step);
    };

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target.getAttribute('data-target');
                const format = entry.target.getAttribute('data-format') || 'number';
                const ratioValue = entry.target.getAttribute('data-ratio-value') || '1';
                const start = 0;
                const end = parseInt(target);
                const duration = 2000; // Animation duration in milliseconds

                animateValue(entry.target, start, end, duration, format, ratioValue);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    metrics.forEach(metric => {
        observer.observe(metric);
    });

    // School Search API
    schoolSearchButton.addEventListener('click', () => {
        const searchQuery = document.getElementById('schoolSearchInput').value;
        // Implement actual API call here
        fetch(`https://api.example.com/schools?query=${searchQuery}`)
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while searching for schools. Please try again.');
            });
    });

    function displaySearchResults(results) {
        const resultsContainer = document.getElementById('schoolSearchResults');
        resultsContainer.innerHTML = '';
        results.forEach(school => {
            const schoolElement = document.createElement('div');
            schoolElement.classList.add('school-result');
            schoolElement.innerHTML = `
                <h3>${school.name}</h3>
                <p>${school.location}</p>
                <p>PEAK Curriculum: ${school.hasPEAK ? 'Yes' : 'No'}</p>
            `;
            resultsContainer.appendChild(schoolElement);
        });
    }

    // FAQ Interaction
    const faqData = {
        general: [
            {
                question: "What makes the PEAK curriculum unique?",
                answer: "The PEAK curriculum stands out for its holistic approach to education, combining rigorous academics with character development and real-world application. It integrates cutting-edge technology, project-based learning, and a global perspective to prepare students for the challenges of the 21st century."
            },
            {
                question: "How does PEAK incorporate Christian values into the curriculum?",
                answer: "PEAK seamlessly integrates Christian values throughout all subjects, not just in religious studies. For example, science classes discuss the harmony between scientific discoveries and creation, while literature explores themes of morality and ethics from a Christian perspective."
            },
            {
                question: "What age groups does the PEAK curriculum cater to?",
                answer: "PEAK caters to students from elementary through high school (Grades 1-13), with each stage tailored to the developmental needs of the age group. The curriculum also includes a BEYOND program for exceptional post-graduate students."
            },
            {
                question: "How does PEAK support students with different learning styles?",
                answer: "PEAK employs a variety of teaching methods to accommodate different learning styles, including visual, auditory, and kinesthetic approaches. The curriculum also incorporates adaptive learning technologies to personalize education for each student."
            },
            {
                question: "What resources are provided to schools implementing the PEAK curriculum?",
                answer: "Schools implementing PEAK receive comprehensive support, including teacher training, curriculum materials, assessment tools, and access to a network of PEAK schools for collaboration and best practice sharing."
            },
            {
                question: "How often is the PEAK curriculum updated?",
                answer: "The PEAK curriculum undergoes annual reviews and updates to ensure it remains current with the latest educational research, technological advancements, and global trends. Major revisions occur every five years."
            },
            {
                question: "Can PEAK be adapted for homeschooling or online learning environments?",
                answer: "Yes, PEAK offers adaptable versions for homeschooling and online learning environments, maintaining the core principles and academic rigor while providing flexibility in delivery methods."
            }
        ],
        academics: [
            {
                question: "How does PEAK prepare students for standardized tests and college admissions?",
                answer: "PEAK integrates test preparation strategies into regular coursework and offers specialized test prep courses. The curriculum's emphasis on critical thinking and independent research also gives students a strong foundation for college-level work."
            },
            {
                question: "What advanced placement or honors options are available in the PEAK curriculum?",
                answer: "PEAK offers a wide range of AP courses, honors classes, and a unique BEYOND program for exceptional students, which includes university-level courses and advanced research opportunities."
            },
            {
                question: "How does PEAK approach STEM education?",
                answer: "PEAK emphasizes STEM throughout the curriculum, integrating these subjects with real-world applications. The curriculum includes coding from elementary levels, advanced science and math courses, and opportunities for research and innovation projects."
            },
            {
                question: "What foreign language options does PEAK offer?",
                answer: "PEAK typically offers multiple foreign language options, including but not limited to Spanish, French, Mandarin, and German. The exact offerings may vary by school, and some PEAK schools also offer less common languages based on student interest and community needs."
            },
            {
                question: "How does PEAK incorporate arts education into the curriculum?",
                answer: "Arts education is an integral part of PEAK, with courses in visual arts, music, drama, and dance. The curriculum also emphasizes the integration of arts with other subjects to foster creativity and holistic thinking."
            },
            {
                question: "What approach does PEAK take to teaching writing and communication skills?",
                answer: "PEAK emphasizes writing and communication skills across all subjects. Students engage in regular writing assignments, presentations, and debates. The curriculum also includes specific courses on rhetoric, public speaking, and digital communication."
            },
            {
                question: "How does PEAK assess student progress and achievement?",
                answer: "PEAK uses a combination of traditional assessments, project-based evaluations, and portfolio reviews. The curriculum also incorporates regular formative assessments and personalized feedback to guide student learning and growth."
            }
        ],
        admissions: [
            {
                question: "What is the admissions process for schools implementing the PEAK curriculum?",
                answer: "The admissions process typically involves an application form, review of academic records, standardized test scores (if available), a written essay, letters of recommendation, an interview, and a shadow day at the school."
            },
            {
                question: "Are there scholarships available for students in PEAK curriculum schools?",
                answer: "Yes, PEAK schools offer various scholarships, including merit-based, need-based, legacy, diversity, STEM, and Christian leadership scholarships. Some partner universities also offer scholarships to PEAK graduates."
            },
            {
                question: "What are the typical class sizes in PEAK schools?",
                answer: "PEAK recommends a low student-to-teacher ratio to ensure personalized attention. Typical class sizes range from 15-20 students, though this may vary slightly depending on the specific school and subject."
            },
            {
                question: "Is there a waiting list for PEAK schools, and how is it managed?",
                answer: "Many PEAK schools have waiting lists due to high demand. These are typically managed on a first-come, first-served basis, with consideration given to siblings of current students and other factors determined by individual schools."
            },
            {
                question: "How does PEAK accommodate transfer students?",
                answer: "PEAK schools have protocols for assessing transfer students to ensure proper placement. This may include placement tests, review of previous academic records, and a transition period to help students adjust to the PEAK curriculum."
            },
            {
                question: "Are there any prerequisites or minimum requirements for admission to a PEAK school?",
                answer: "While specific requirements may vary by school, generally, PEAK schools look for students who demonstrate academic potential, a willingness to learn, and alignment with the school's values. Some schools may require minimum grades or test scores."
            },
            {
                question: "How does PEAK support international students?",
                answer: "PEAK schools often have dedicated support for international students, including English language support, cultural integration programs, and assistance with visa processes. Some schools also offer international student housing options."
            }
        ],
        faith: [
            {
                question: "How does PEAK balance academic rigor with spiritual growth?",
                answer: "PEAK views academic excellence and spiritual growth as complementary. The curriculum integrates faith-based perspectives into all subjects, while maintaining high academic standards. Regular chapel services, biblical worldview discussions, and character development activities support spiritual growth."
            },
            {
                question: "What opportunities are there for students to explore and deepen their faith within the PEAK curriculum?",
                answer: "PEAK offers numerous faith exploration opportunities, including daily devotionals, weekly chapel services, Bible study classes, faith-based community service projects, spiritual retreats, and Christian apologetics courses."
            },
            {
                question: "How does PEAK approach teaching science from a Christian perspective?",
                answer: "PEAK teaches science with academic rigor while acknowledging God as the Creator. The curriculum explores how scientific discoveries align with biblical truths, encouraging students to think critically about the relationship between faith and science."
            },
            {
                question: "Are students required to profess a Christian faith to attend a PEAK school?",
                answer: "While PEAK schools are founded on Christian principles, many welcome students from diverse faith backgrounds. The specific policies may vary by school, but all students are expected to respect and engage with the Christian worldview presented in the curriculum."
            },
            {
                question: "How does PEAK handle discussions about other religions and worldviews?",
                answer: "PEAK encourages respectful exploration of different religions and worldviews, teaching students to understand and engage with diverse perspectives while grounding discussions in a Christian worldview."
            },
            {
                question: "What role do parents play in the faith aspect of PEAK education?",
                answer: "PEAK views parents as partners in their children's spiritual formation. Schools often offer resources and workshops to help parents reinforce faith teachings at home and engage in meaningful spiritual discussions with their children."
            },
            {
                question: "How does PEAK integrate biblical principles into subjects like literature and history?",
                answer: "In literature, PEAK encourages analysis of texts through a Christian lens, exploring themes of morality, redemption, and human nature. History is taught with an understanding of God's sovereignty, examining how faith has shaped historical events and cultures."
            }
        ],
        extracurricular: [
            {
                question: "What types of extracurricular activities are offered in PEAK schools?",
                answer: "PEAK schools offer a wide range of extracurriculars, including sports teams, fine arts programs, academic clubs, service-oriented activities, student government, environmental initiatives, cultural clubs, STEM-focused groups, literary magazines, entrepreneurship clubs, and outdoor education programs."
            },
            {
                question: "How does PEAK integrate extracurricular activities with academic learning?",
                answer: "PEAK views extracurriculars as extensions of the classroom. Activities are often linked to academic subjects, providing real-world application of classroom concepts. For example, the robotics club might collaborate with physics classes on projects."
            },
            {
                question: "Are there opportunities for students to create their own clubs or activities?",
                answer: "Yes, PEAK encourages student initiative. Many schools have processes for students to propose and lead new clubs or activities, fostering leadership skills and allowing students to pursue their unique interests."
            },
            {
                question: "How does PEAK ensure a balance between academics and extracurricular activities?",
                answer: "PEAK emphasizes the importance of a well-rounded education. Schools typically have policies to help students manage their time effectively, ensuring that extracurricular involvement enhances rather than detracts from academic performance."
            },
            {
                question: "Are there opportunities for inter-school competitions or collaborations within the PEAK network?",
                answer: "Yes, PEAK organizes various inter-school events, including academic competitions, sports tournaments, arts festivals, and collaborative projects. These events foster a sense of community among PEAK schools and provide students with broader exposure."
            },
            {
                question: "How does PEAK approach community service and volunteerism?",
                answer: "Community service is a key component of PEAK education. Schools typically have service requirements, offer regular volunteering opportunities, and may organize service-learning trips. These activities are designed to develop empathy, social responsibility, and leadership skills."
            },
            {
                question: "What kind of support is provided for students pursuing high-level extracurricular achievements (e.g., national competitions, elite sports)?",
                answer: "PEAK schools often provide specialized coaching, flexible scheduling, and resources to support students pursuing high-level achievements. This may include partnerships with external organizations, mentorship programs, and assistance with balancing rigorous training or practice schedules with academic responsibilities."
            }
        ],
        technology: [
            {
                question: "How does PEAK incorporate technology into the learning process?",
                answer: "PEAK integrates technology throughout the curriculum, using 1:1 device programs, learning management systems, digital textbooks, coding classes, VR/AR technologies, online collaboration tools, adaptive learning software, and maker spaces with 3D printers and robotics kits."
            },
            {
                question: "What measures does PEAK take to ensure responsible and safe use of technology?",
                answer: "PEAK implements a comprehensive approach including a digital citizenship curriculum, acceptable use policies, content filtering, monitoring software, regular training for students and staff, strong cybersecurity measures, and education on responsible social media use."
            },
            {
                question: "How does PEAK prepare students for emerging technologies and future tech careers?",
                answer: "PEAK stays current with technological trends, offering courses in areas like artificial intelligence, blockchain, and data science. The curriculum also focuses on developing adaptable tech skills and computational thinking to prepare students for future innovations."
            },
            {
                question: "What kind of tech support is available for students and teachers in PEAK schools?",
                answer: "PEAK schools typically have dedicated IT support teams, help desks for immediate assistance, and regular tech training sessions for both students and teachers. Some schools also have student tech teams that provide peer support."
            },
            {
                question: "How does PEAK balance screen time with other forms of learning?",
                answer: "While embracing technology, PEAK also recognizes the importance of balance. The curriculum includes tech-free activities, outdoor education, and hands-on projects. Schools often have guidelines for appropriate screen time and encourage digital wellness."
            },
            {
                question: "What coding languages and computer science concepts are taught in PEAK schools?",
                answer: "PEAK introduces age-appropriate coding from elementary levels, typically starting with block-based languages like Scratch and progressing to text-based languages such as Python, Java, and JavaScript. Advanced courses may cover topics like algorithms, data structures, and software engineering principles."
            },
            {
                question: "How does PEAK address the digital divide and ensure equal access to technology?",
                answer: "PEAK is committed to digital equity. Schools often provide devices to students who need them, ensure internet access for remote learning, and offer additional support for students less familiar with technology. The curriculum also teaches students to be aware of and address digital divide issues in society."
            }
        ],
    };

    function populateFAQ(category) {
        faqContainer.innerHTML = '';
        faqData[category].forEach((item, index) => {
            const faqItem = document.createElement('div');
            faqItem.classList.add('faq-item');
            faqItem.innerHTML = `
                <h3>${item.question}</h3>
                <p>${item.answer}</p>
            `;
            faqContainer.appendChild(faqItem);
        });

        // Add click event to new FAQ items
        document.querySelectorAll('.faq-item h3').forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isOpen = answer.style.display === 'block';

                // Close all other answers
                document.querySelectorAll('.faq-item p').forEach(p => {
                    p.style.display = 'none';
                });
                document.querySelectorAll('.faq-item h3').forEach(h => {
                    h.classList.remove('active');
                });

                // Open the clicked answer if it was closed
                if (!isOpen) {
                    answer.style.display = 'block';
                    question.classList.add('active');
                }
            });
        });
    }

    faqCategories.forEach(category => {
        category.addEventListener('click', () => {
            faqCategories.forEach(c => c.classList.remove('active'));
            category.classList.add('active');
            populateFAQ(category.dataset.category);
        });
    });

    // Initialize with general FAQs
    populateFAQ('general');

    // Animate elements on scroll
    function animateOnScroll(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }

    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1
    });

    document.querySelectorAll('.pillar, .metric, .course-category').forEach(el => {
        scrollObserver.observe(el);
    });

    // Social sharing functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function () {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Check out the PEAK Curriculum at Everest Integrated Academy!');
            let shareUrl;

            switch (this.classList[1]) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=PEAK Curriculum&body=${text}%0A%0A${url}`;
                    break;
            }

            window.open(shareUrl, '_blank');
        });
    });

    async function downloadStoredResultPDF(index) {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Define currentDate at the beginning of the function
            const currentDate = new Date().toLocaleDateString();

            // Load custom fonts
            await doc.addFont('fonts/Outfit/Outfit-Regular.ttf', 'Outfit', 'normal');
            await doc.addFont('fonts/Outfit/Outfit-Bold.ttf', 'Outfit', 'bold');
            await doc.addFont('fonts/Outfit/Outfit-Medium.ttf', 'Outfit', 'medium');

            // Set default font
            doc.setFont('Outfit', 'normal');

            // Set page background color
            const bgColor = [224, 201, 166]; // #E0C9A6
            doc.setFillColor(...bgColor);
            doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

            // Add page border
            doc.setDrawColor(0);
            doc.setLineWidth(1.5);
            doc.rect(10, 10, 190, 277); // Outer border
            doc.setLineWidth(0.5);
            doc.rect(12, 12, 186, 273); // Inner border

            // Add header with date
            doc.setFont('Outfit', 'medium');
            doc.setFontSize(8);
            doc.text(currentDate, 195, 20, { align: 'right' });

            // Add logo at center
            const logoWidth = 40; // Adjust width as needed
            const logoHeight = 30; // Adjust height as needed
            const logoX = (doc.internal.pageSize.width - logoWidth) / 2; // Center horizontally
            const logoY = 30; // Y position for logo

            try {
                const logoImg = await loadImage('../assets/images/logo.png');
                doc.addImage(logoImg, 'PNG', logoX, logoY, logoWidth, logoHeight);
            } catch (error) {
                console.error('Error loading logo:', error);
                doc.text('LOGO', logoX, logoY + logoHeight); // Adjust position if logo loading fails
            }

            // Add three line spacing before the website name
            const websiteNameSpacing = 20; // Y position for website name (adjust for line spacing)
            doc.setFont('Outfit', 'bold');
            doc.setFontSize(26);
            const websiteName = 'Everest Integrated Academy';
            const nameWidth = doc.getStringUnitWidth(websiteName) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            doc.text(websiteName, (doc.internal.pageSize.width - nameWidth) / 2, logoY + logoHeight + websiteNameSpacing); // Center the website name below the logo

            // Add space before content
            doc.setFont('Outfit', 'medium');
            doc.setFontSize(12);
            const resultTitleY = logoY + logoHeight + websiteNameSpacing + 20; // Adjusted for space
            doc.text('Stored Conversion Result', 15, resultTitleY); // Spacing after the website name

            // Fetch the specific result to download
            const storedResults = JSON.parse(localStorage.getItem('storedResults')) || [];
            const result = storedResults[index];

            // Ensure the result exists
            if (!result) {
                throw new Error('No stored result found at the specified index.');
            }

            // Add conversion result table
            doc.autoTable({
                startY: resultTitleY + 5, // Start table 5 units below the title
                head: [['From Grade', 'From System', 'To Grade']],
                body: [
                    [
                        formatGrade(result.fromGrade, result.fromSystem),
                        getOfficialSystemName(result.fromSystem),
                        // Format the To Grade to be a vertical list with extra space between lines
                        result.toGrade.split('\n').map(line => {
                            const [system, grade] = line.split(':');
                            return `${getOfficialSystemName(system.trim())}: ${grade.trim()}`;
                        }).join('\n\n') // Join with new lines for vertical display and extra spacing
                    ]
                ],
                styles: { font: 'Outfit', fontSize: 10 },
                headStyles: { fillColor: [31, 31, 56], textColor: [255, 255, 255] },
                alternateRowStyles: { fillColor: [240, 240, 240] },
                margin: { top: 40, right: 15, bottom: 40, left: 15 }
            });

            // // Add QR code (reduced size, moved down)
            await addQRCodeToPDF(doc, window.location.href, 24, 225);

            function addFooter(doc) {
                const totalPages = doc.internal.getNumberOfPages(); // Get total number of pages
                const currentDate = new Date().toLocaleDateString(); // Current date in a readable format

                for (let i = 1; i <= totalPages; i++) {
                    doc.setPage(i); // Set the page to the current page
                    doc.setFont('Outfit', 'medium');
                    doc.setFontSize(8);

                    // Add footer text
                    doc.text(`Grade conversions provided by PEAK Curriculum's Grade Converter. © ${currentDate} Everest Integrated Academy.`, 15, 280);

                    // Add page number
                    doc.text(`Page ${i} of ${totalPages}`, 195, 280, { align: 'right' });
                }
            }

            // Add footer
            addFooter(doc);

            // Save the PDF
            doc.save('stored_grade_conversion_result.pdf');
        } catch (error) {
            console.error('Error generating PDF for stored result:', error);
            alert('An error occurred while generating the stored result PDF. Please try again.');
        }
    }

    // Helper function to load images
    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }


    // Function to store results
    function storeResult(result) {
        let storedResults = JSON.parse(localStorage.getItem('storedResults')) || [];
        storedResults.push(result);
        localStorage.setItem('storedResults', JSON.stringify(storedResults));
        updateStoredResultsList();
    }

    // Function to get official system name
    function getOfficialSystemName(system) {
        const systemNames = {
            'peak': 'PEAK',
            'peakAlternative': 'PEAK Alternative',
            'us': 'US',
            'uk': 'UK',
            'ib': 'IB',
            'cambridgeIGCSE': 'Cambridge IGCSE',
            'cambridgeGCSE': 'Cambridge GCSE',
            'ace': 'A.C.E'
        };
        return systemNames[system] || system;
    }

    // Function to format the 'from grade'
    function formatGrade(grade, system) {
        // Check if the grade is a number and determine the system
        if (!isNaN(grade)) {
            const numericGrade = parseFloat(grade);

            // Handle the specific systems without the percentage for single digits
            if ((system === 'IB' || system === 'PEAK Alternative' || system === 'Cambridge GCSE') && numericGrade < 10) {
                return grade; // Return grade as-is for these systems if it's a single digit
            }

            // For all other cases, add '%' if it's not a single digit number
            if (numericGrade >= 10 || grade.includes('.') || grade.length > 1) {
                return `${grade}%`;
            }
        }

        return grade; // Return grade as-is if it's not a number or doesn't meet conditions
    }


    // Function to update stored results list
    function updateStoredResultsList() {
        const storedResults = JSON.parse(localStorage.getItem('storedResults')) || [];
        const list = document.getElementById('storedResultsList');
        list.innerHTML = '';

        // Create table
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '20px';

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['From Grade', 'From System', 'To Grade', 'Actions'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            th.style.backgroundColor = '#f2f2f2';
            th.style.padding = '10px';
            th.style.border = '1px solid #ddd';
            th.style.textAlign = 'left';
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        storedResults.forEach((result, index) => {
            const row = document.createElement('tr');

            // From Grade
            const fromGradeCell = document.createElement('td');
            // fromGradeCell.textContent = result.fromGrade;
            fromGradeCell.textContent = formatGrade(result.fromGrade);
            fromGradeCell.style.padding = '10px';
            fromGradeCell.style.border = '1px solid #ddd';
            row.appendChild(fromGradeCell);

            // From System
            const fromSystemCell = document.createElement('td');
            fromSystemCell.textContent = getOfficialSystemName(result.fromSystem);
            fromSystemCell.style.padding = '10px';
            fromSystemCell.style.border = '1px solid #ddd';
            row.appendChild(fromSystemCell);

            // To Grade (All Systems)
            const toGradeCell = document.createElement('td');
            const toGradeLines = result.toGrade.split('\n');
            toGradeLines.forEach(line => {
                const [system, grade] = line.split(':');
                if (system && grade) {
                    const p = document.createElement('p');
                    p.style.margin = '0';
                    p.textContent = `${getOfficialSystemName(system.trim())}: ${grade.trim()}`;
                    toGradeCell.appendChild(p);
                }
            });
            toGradeCell.style.padding = '10px';
            toGradeCell.style.border = '1px solid #ddd';
            row.appendChild(toGradeCell);

            // Action buttons
            const actionCell = document.createElement('td');
            actionCell.style.padding = '5px';
            actionCell.style.border = '1px solid #ddd';

            // Edit button
            const downloadBtn = createActionButton('Download', '#1f1f38', () => downloadStoredResultPDF(index));
            downloadBtn.style.marginLeft = '10px'; // Add left margin for the first button
            actionCell.appendChild(downloadBtn);

            // Edit button
            const editBtn = createActionButton('Edit', '#3498db', () => editStoredResult(index));
            actionCell.appendChild(editBtn);

            // Share button
            const shareBtn = createActionButton('Share', '#2ecc71', () => shareStoredResult(result));
            actionCell.appendChild(shareBtn);

            // Delete button
            const deleteBtn = createActionButton('Delete', '#e74c3c', () => deleteStoredResult(index));
            actionCell.appendChild(deleteBtn);

            row.appendChild(actionCell);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        list.appendChild(table);
    }

    // Helper function to create action buttons
    function createActionButton(text, color, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.backgroundColor = color;
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.padding = '5px 10px';
        button.style.cursor = 'pointer';
        button.style.fontFamily = 'Outfit, sans-serif';
        button.style.fontSize = '14px';
        button.style.transition = 'background-color 0.3s';
        button.style.marginRight = '5px';

        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = adjustColor(color, -20);
        });

        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = color;
        });

        button.onclick = onClick;
        return button;
    }

    // Helper function to adjust color brightness
    function adjustColor(color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    }

    // Function to edit stored result
    function editStoredResult(index) {
        let storedResults = JSON.parse(localStorage.getItem('storedResults')) || [];
        const result = storedResults[index];

        document.getElementById('gradeInput').value = result.fromGrade;
        document.getElementById('systemSelect').value = result.fromSystem;

        // Remove the result being edited
        storedResults.splice(index, 1);
        localStorage.setItem('storedResults', JSON.stringify(storedResults));
        updateStoredResultsList();

        // Scroll to the conversion form
        document.querySelector('.calculator-container').scrollIntoView({ behavior: 'smooth' });
    }

    // Function to share stored result
    function shareStoredResult(result) {
        const shareText = `Check out this grade conversion:\n\nFrom: ${result.fromGrade} (${getOfficialSystemName(result.fromSystem)})\n\n${result.toGrade}\n\nConverted using the PEAK Curriculum Grade Converter`;
        const shareUrl = encodeURIComponent(window.location.href);

        // Create a modal for sharing options
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';

        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = '#fff';
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = '5px';
        modalContent.style.maxWidth = '400px';
        modalContent.style.width = '100%';

        const shareTitle = document.createElement('h3');
        shareTitle.textContent = 'Share Result';
        shareTitle.style.marginTop = '0';
        shareTitle.style.marginBottom = '20px';
        shareTitle.style.textAlign = 'center';

        const shareOptions = document.createElement('div');
        shareOptions.style.display = 'flex';
        shareOptions.style.justifyContent = 'center';
        shareOptions.style.gap = '15px';
        shareOptions.style.marginBottom = '20px';

        const createShareButton = (platform, icon, url, color) => {
            const button = document.createElement('button');
            button.innerHTML = `<i class="fab fa-${icon}"></i>`;
            button.style.padding = '10px';
            button.style.border = 'none';
            button.style.borderRadius = '50%';
            button.style.cursor = 'pointer';
            button.style.backgroundColor = color;
            button.style.color = '#fff';
            button.style.fontSize = '18px';
            button.style.width = '40px';
            button.style.height = '40px';
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
            button.style.transition = 'background-color 0.3s, transform 0.1s';

            button.addEventListener('mouseover', () => {
                button.style.backgroundColor = adjustColor(color, -20);
                button.style.transform = 'scale(1.1)';
            });

            button.addEventListener('mouseout', () => {
                button.style.backgroundColor = color;
                button.style.transform = 'scale(1)';
            });

            button.onclick = () => window.open(url, '_blank');
            return button;
        };

        // Add Facebook, Twitter, LinkedIn, and additional share buttons
        const facebookBtn = createShareButton('Facebook', 'facebook-f', `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '#3b5998');
        const twitterBtn = createShareButton('Twitter', 'twitter', `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`, '#1da1f2');
        const linkedinBtn = createShareButton('LinkedIn', 'linkedin-in', `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent('PEAK Curriculum Grade Conversion')}&summary=${encodeURIComponent(shareText)}`, '#0077b5');
        const whatsappBtn = createShareButton('WhatsApp', 'whatsapp', `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}%20${shareUrl}`, '#25d366');
        const emailBtn = createShareButton('Email', 'at', `mailto:?subject=${encodeURIComponent('PEAK Curriculum Grade Conversion')}&body=${encodeURIComponent(shareText)}%20${shareUrl}`, '#c71610');

        shareOptions.appendChild(facebookBtn);
        shareOptions.appendChild(twitterBtn);
        shareOptions.appendChild(linkedinBtn);
        shareOptions.appendChild(whatsappBtn);
        shareOptions.appendChild(emailBtn);

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.padding = '5px 10px';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '4px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.backgroundColor = '#e74c3c';
        closeButton.style.color = '#fff';
        closeButton.style.fontSize = '14px';
        closeButton.style.fontFamily = 'Outfit, sans-serif';
        closeButton.style.transition = 'background-color 0.3s';

        closeButton.addEventListener('mouseover', () => {
            closeButton.style.backgroundColor = '#c0392b';
        });

        closeButton.addEventListener('mouseout', () => {
            closeButton.style.backgroundColor = '#e74c3c';
        });

        closeButton.onclick = () => document.body.removeChild(modal);

        modalContent.appendChild(shareTitle);
        modalContent.appendChild(shareOptions);
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);
    }

    function deleteStoredResult(index) {
        let storedResults = JSON.parse(localStorage.getItem('storedResults')) || [];
        storedResults.splice(index, 1);
        localStorage.setItem('storedResults', JSON.stringify(storedResults));
        updateStoredResultsList();
    }

    // New function to download PDF
    async function downloadPDF() {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Define currentDate at the beginning of the function
            const currentDate = new Date().toLocaleDateString();

            // Load custom fonts
            await doc.addFont('fonts/Outfit/Outfit-Regular.ttf', 'Outfit', 'normal');
            await doc.addFont('fonts/Outfit/Outfit-Bold.ttf', 'Outfit', 'bold');
            await doc.addFont('fonts/Outfit/Outfit-Medium.ttf', 'Outfit', 'medium');

            // Set default font
            doc.setFont('Outfit', 'normal');

            // Set page background color
            const bgColor = [224, 201, 166]; // #E0C9A6
            doc.setFillColor(...bgColor);
            doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

            // Add page border
            doc.setDrawColor(0);
            doc.setLineWidth(1.5);
            doc.rect(10, 10, 190, 277);
            doc.setLineWidth(0.5);
            doc.rect(12, 12, 186, 273);

            // Add header with date (moved up for 2 line spacing)
            doc.setFont('Outfit', 'medium');
            doc.setFontSize(8);
            doc.text(currentDate, 195, 20, { align: 'right' });

            // Add logo (moved down and right)
            try {
                const logoImg = await loadImage('../assets/images/logo.png');
                // doc.addImage(logoImg, 'PNG', 22, 30, 20, 15);
                doc.addImage(logoImg, 'PNG', 22, 28, 22, 17);
            } catch (error) {
                console.error('Error loading logo:', error);
                doc.text('LOGO', 22, 37);
            }

            // Add website name (moved down and right)
            doc.setFont('Outfit', 'bold');
            doc.setFontSize(14);
            doc.text('Everest Integrated Academy', 48, 37);

            // Add conversion system information (moved down and right)
            doc.setFont('Outfit', 'medium');
            doc.setFontSize(14);
            const systemName = document.getElementById('systemSelect').value;


            // Define a list of acronyms and special terms
            const acronyms = ['PEAK', 'US', 'UK', 'IB', 'GCSE', 'IGCSE'];

            const capitalizedSystemName = systemName
                // Add spaces between words where a lowercase letter is followed by an uppercase letter
                .replace(/([a-z])([A-Z])/g, '$1 $2')
                // Split the string into words
                .split(/\s+/)
                // Capitalize each word, keeping acronyms in full capitals and handling A.C.E specifically
                .map(word => {
                    const upperWord = word.toUpperCase();
                    if (acronyms.includes(upperWord)) {
                        return upperWord;
                    } else if (upperWord === 'ACE' || upperWord === 'A.C.E') {
                        return 'A.C.E';
                    } else {
                        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                    }
                })
                // Join the words back together
                .join(' ');

            doc.text(`Converted to: ${capitalizedSystemName}`, 190, 37, { align: 'right' });

            // Add grade information (moved down and right)
            doc.setFont('Outfit', 'medium');
            doc.setFontSize(12);
            doc.text(`Grade: ${document.getElementById('gradeInput').value}`, 190, 45, { align: 'right' });

            // Add conversion result table (moved down)
            doc.autoTable({
                startY: 55,
                head: [['System', 'Grade']],
                body: [
                    ['PEAK', document.getElementById('conversionResult').innerText.match(/PEAK: (.*)/)[1]],
                    ['PEAK Alternative', document.getElementById('conversionResult').innerText.match(/PEAK Alternative: (.*)/)[1]],
                    ['US', document.getElementById('conversionResult').innerText.match(/US: (.*)/)[1]],
                    ['UK', document.getElementById('conversionResult').innerText.match(/UK: (.*)/)[1]],
                    ['IB', document.getElementById('conversionResult').innerText.match(/IB: (.*)/)[1]],
                    ['Cambridge IGCSE', document.getElementById('conversionResult').innerText.match(/Cambridge IGCSE: (.*)/)[1]],
                    ['Cambridge GCSE', document.getElementById('conversionResult').innerText.match(/Cambridge GCSE: (.*)/)[1]],
                    ['A.C.E', document.getElementById('conversionResult').innerText.match(/A.C.E: (.*)/)[1]],
                    ['GPA', document.getElementById('conversionResult').innerText.match(/GPA: (.*)/)[1]]
                ],
                styles: { font: 'Outfit', fontSize: 10 },
                headStyles: { fillColor: [31, 31, 56], textColor: [255, 255, 255] },
                alternateRowStyles: { fillColor: [240, 240, 240] },
                margin: { top: 40, right: 15, bottom: 40, left: 15 }
            });

            // Add charts (reduced size)
            await addChartToPDF(doc, 'gradeConversionChart', 15, 140, 85, 65, bgColor);
            await addChartToPDF(doc, 'collegeAdmissionChart', 105, 140, 85, 65, bgColor);

            // Add QR code (reduced size, moved down)
            await addQRCodeToPDF(doc, window.location.href, 24, 225);

            // Function to add footer
            function addFooter(doc) {
                const totalPages = doc.internal.getNumberOfPages(); // Get total number of pages
                const currentDate = new Date().toLocaleDateString(); // Current date in a readable format

                for (let i = 1; i <= totalPages; i++) {
                    doc.setPage(i); // Set the page to the current page
                    doc.setFont('Outfit', 'medium');
                    doc.setFontSize(8);

                    // Add footer text
                    doc.text(`Grade conversions provided by PEAK Curriculum's Grade Converter. © ${currentDate} Everest Integrated Academy.`, 15, 280);

                    // Add page number
                    doc.text(`Page ${i} of ${totalPages}`, 195, 280, { align: 'right' });
                }
            }

            // Add second page with explanation
            doc.addPage();
            doc.setFillColor(...bgColor);
            doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
            doc.setDrawColor(0);
            doc.setLineWidth(1.5);
            doc.rect(10, 10, 190, 277);
            doc.setLineWidth(0.5);
            doc.rect(12, 12, 186, 273);

            doc.setFont('Outfit', 'bold');
            doc.setFontSize(14);
            doc.text('How the PEAK Grade Converter Works', 15, 30);

            doc.setFont('Outfit', 'normal');
            doc.setFontSize(10);
            const explanation = `
The PEAK Grade Converter uses a sophisticated algorithm to translate grades between different educational systems. Here's how it works:

1. Input Processing: The converter accepts grades in various formats (percentages, letter grades, or numeric scales) and identifies the source grading system.

2. Normalization: Grades are normalized to a common scale, typically a percentage or a 0-4 GPA scale, depending on the input system.

3. System-Specific Mapping: The normalized grade is then mapped to equivalent grades in other systems using predefined conversion tables. These tables are based on extensive research and alignment studies between different grading systems.

4. Context Consideration: The converter takes into account the specific context of each grading system, including factors like grade distribution, passing thresholds, and the meaning of top grades in different systems.

5. GPA Calculation: For systems using GPA, the converter calculates the equivalent GPA based on the normalized grade and the specific GPA scale used by the target system.

6. Rounding and Adjustments: The final converted grades are rounded and adjusted according to the conventions of each target grading system.

7. Quality Assurance: Regular updates and reviews ensure the accuracy and relevance of the conversion algorithms, taking into account any changes in global education systems.

It's important to note that while this converter provides a standardized way to compare grades across different systems, it should be used as a guide. Official grade conversions for academic or professional purposes may require additional considerations and should be conducted by qualified educational institutions or credential evaluation services.
        `;
            doc.text(explanation, 15, 40, { maxWidth: 180 });

            addFooter(doc);

            doc.save('grade_conversion_result.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('An error occurred while generating the PDF. Please try again.');
        }
    }

    // Helper function to load images
    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    // Helper function to add chart to PDF
    async function addChartToPDF(doc, chartId, x, y, width, height, bgColor) {
        try {
            const chart = document.getElementById(chartId);
            const canvas = await html2canvas(chart, {
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true,
                backgroundColor: `rgb(${bgColor.join(',')})`,
            });
            const imgData = canvas.toDataURL('image/png');
            doc.addImage(imgData, 'PNG', x, y, width, height);
        } catch (error) {
            console.error(`Error adding chart ${chartId} to PDF:`, error);
            doc.text(`Chart: ${chartId}`, x, y + 10);
        }
    }

    // // Helper function to add QR code to PDF
    // async function addQRCodeToPDF(doc, text, x, y, width, height) {
    //     try {
    //         const qrCodeContainer = document.createElement('div');
    //         qrCodeContainer.style.width = '25px'; // Container width scaled down
    //         qrCodeContainer.style.height = '25px'; // Container height scaled down
    //         // qrCodeContainer.style.padding = '2.5px';
    //         qrCodeContainer.style.overflow = 'hidden';  // Ensures content outside the container is hidden
    //         qrCodeContainer.style.background = 'white';
    //         // qrCodeContainer.style.borderRadius = '5px';
    //         // qrCodeContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    //         document.body.appendChild(qrCodeContainer);

    //         new QRCode(qrCodeContainer, {
    //             text: text,
    //             width: width / 1.2,
    //             height: height / 1.2,
    //             colorDark: "#000000",
    //             colorLight: "#ffffff",
    //             correctLevel: QRCode.CorrectLevel.H
    //         });

    //         const qrCanvas = await html2canvas(qrCodeContainer, {
    //             scale: 1,
    //             logging: false,
    //             useCORS: true,
    //             allowTaint: true
    //         });

    //         document.body.removeChild(qrCodeContainer);

    //         const imgData = qrCanvas.toDataURL('image/png');
    //         doc.addImage(imgData, 'PNG', x, y, width, height);

    //         // Add a stylish border around the QR code
    //         doc.setDrawColor(31, 31, 56); // Dark blue color
    //         doc.setLineWidth(0.5);
    //         doc.roundedRect(x - 2, y - 2, width + 4, height + 4, 2, 2);
    //     } catch (error) {
    //         console.error('Error adding QR code to PDF:', error);
    //         doc.text('QR Code', x, y + 10);
    //     }
    // }

    async function addQRCodeToPDF(doc, text, x, y) {
        try {
            const qrCodeContainer = document.createElement('div');
            qrCodeContainer.style.width = '36px';
            qrCodeContainer.style.height = '36px';
            qrCodeContainer.style.position = 'absolute';
            qrCodeContainer.style.left = '-9999px';
            qrCodeContainer.style.background = 'white';
            document.body.appendChild(qrCodeContainer);
    
            const qrCode = new QRCode(qrCodeContainer, {
                text: text,
                width: 36,
                height: 36,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.L,
                margin: 0
            });
    
            // Wait for the QR code to be generated
            await new Promise(resolve => setTimeout(resolve, 100));
    
            const qrCodeImage = qrCodeContainer.querySelector('img');
            const canvas = document.createElement('canvas');
            canvas.width = 36;
            canvas.height = 36;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(qrCodeImage, 0, 0, 36, 36);
    
            const imgData = canvas.toDataURL('image/png');
            doc.addImage(imgData, 'PNG', x, y, 36, 36);
    
            // Add a thin border around the QR code
            doc.setDrawColor(31, 31, 56); // Dark blue color
            doc.setLineWidth(0.1);
            doc.rect(x, y, 36, 36);
    
            document.body.removeChild(qrCodeContainer);
        } catch (error) {
            console.error('Error adding QR code to PDF:', error);
            doc.setFontSize(8);
            doc.text('QR', x + 10, y + 20);
        }
    }

    const dropzone = document.getElementById('dropzone');
    const fileInfo = document.getElementById('fileInfo');
    const fileSizeLimit = 25 * 1024 * 1024; // 25 MB in bytes
    let uploadedFile = null; // Track uploaded file

    // Allow dropzone to accept files
    dropzone.addEventListener('click', () => transcriptUpload.click());
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault(); // Prevent default behavior to allow drop
        dropzone.classList.add('dragover'); // Add class for visual feedback
    });
    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover'); // Remove class when not dragging
    });
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault(); // Prevent default behavior
        dropzone.classList.remove('dragover'); // Remove dragover class
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFileUpload(files[0]); // Process the first dropped file
        }
    });

    // File input change event
    transcriptUpload.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length) {
            handleFileUpload(files[0]); // Process the first selected file
        }
    });

    // Handle file upload
    function handleFileUpload(file) {
        if (file.size > fileSizeLimit) {
            alert('File size exceeds 25 MB. Please upload a smaller file.');
            return;
        }

        uploadedFile = file; // Store the uploaded file

        const fileTypeIcon = getFileTypeIcon(file.type);
        fileInfo.innerHTML = `
            <div class="file-uploaded" style="display: flex; align-items: center; gap: 10px;">
                <div class="file-type-icon">${fileTypeIcon}</div>
                <div class="file-name">${file.name}</div>
                <button id="deleteFileButton" class="delete-button">Delete</button>
                <div class="progress-bar">
                    <div class="progress" style="width: 100%;">Uploaded</div>
                </div>
            </div>
        `;
        fileInfo.style.display = 'block';

        // Add delete button functionality
        document.getElementById('deleteFileButton').addEventListener('click', () => {
            deleteFile();
        });
    }

    // Function to delete the uploaded file
    function deleteFile() {
        uploadedFile = null; // Clear the uploaded file
        fileInfo.innerHTML = ''; // Clear the file info display
        transcriptUpload.value = ''; // Reset the file input
        fileInfo.style.display = 'none'; // Hide the file info
        alert('File has been removed. You can upload a new file.');
    }

    // Get file type icon based on MIME type
    function getFileTypeIcon(fileType) {
        switch (fileType) {
            case 'application/pdf':
                return '<i class="fas fa-file-pdf"></i>';
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return '<i class="fas fa-file-excel"></i>';
            case 'text/csv':
                return '<i class="fas fa-file-csv"></i>';
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return '<i class="fas fa-file-word"></i>';
            default:
                return '<i class="fas fa-file"></i>';
        }
    }

    // Convert academic transcript
    document.getElementById('convertTranscript').addEventListener('click', function () {
        if (uploadedFile) { // Check if a file has been uploaded
            convertTranscript(uploadedFile); // Use the stored uploaded file
        } else {
            alert('Please upload a file before converting.');
        }
    });

    // Convert Transcript and process data
    function convertTranscript(file) {
        const fromSystem = document.getElementById('fromSystem').value;
        const toSystem = document.getElementById('toSystem').value;

        const reader = new FileReader();

        reader.onload = function (e) {
            if (file.type === 'application/pdf') {
                const typedarray = new Uint8Array(e.target.result);
                pdfjsLib.getDocument(typedarray).promise
                    .then(function (pdf) {
                        extractTextFromPDF(pdf, fromSystem, toSystem);
                    })
                    .catch(function (error) {
                        console.error('Error reading PDF:', error);
                        handleUnreadablePDF(file, fromSystem, toSystem);
                    });
            } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.type === 'text/csv') {
                const workbook = XLSX.read(e.target.result, { type: 'binary' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const data = XLSX.utils.sheet_to_json(worksheet);
                processTranscriptData(data, fromSystem, toSystem);
            } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                // Using Mammoth to read .docx files
                mammoth.convertToHtml({ arrayBuffer: e.target.result })
                    .then(function (result) {
                        const textContent = result.value; // The generated HTML
                        processTranscriptData(textContent, fromSystem, toSystem);
                    })
                    .catch(function (err) {
                        console.error('Error reading DOCX:', err);
                        alert('Could not read the DOCX file.');
                    });
            }
        };

        // Use readAsArrayBuffer for all types of files
        if (file.type === 'application/pdf') {
            reader.readAsArrayBuffer(file);
        } else {
            reader.readAsArrayBuffer(file); // Always use readAsArrayBuffer
        }
    }

    // Extract text from PDF
    function extractTextFromPDF(pdf, fromSystem, toSystem) {
        let textContent = '';
        const numPages = pdf.numPages;
        let currentPage = 1;

        function extractPageText() {
            pdf.getPage(currentPage).then(function (page) {
                page.getTextContent().then(function (content) {
                    textContent += content.items.map(item => item.str).join(' ') + '\n';
                    currentPage++;
                    if (currentPage <= numPages) {
                        extractPageText(); // Recursive call for next page
                    } else {
                        // Process the accumulated text content
                        processTranscriptData(textContent, fromSystem, toSystem);
                    }
                });
            });
        }

        extractPageText(); // Start extracting text
    }

    // Handle unreadable PDF
    function handleUnreadablePDF(file, fromSystem, toSystem) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('apikey', 'K82042709288957'); // Replace with your actual API key
        formData.append('language', 'eng');
        formData.append('isOverlayRequired', 'false');

        fetch('https://api.ocr.space/parse/image', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if (result.ParsedResults && result.ParsedResults.length > 0) {
                    const textContent = result.ParsedResults[0].ParsedText;
                    processTranscriptData(textContent, fromSystem, toSystem);
                } else {
                    alert('Unable to extract text from the PDF.');
                }
            })
            .catch(error => {
                console.error('Error during OCR:', error);
            });
    }

    // Process transcript data
    function processTranscriptData(data, fromSystem, toSystem) {
        let results;

        // Check if the data is a string (HTML from .docx)
        if (typeof data === 'string') {
            // Remove HTML tags
            const plainText = data.replace(/<[^>]*>/g, '').trim();
            const lines = plainText.split('\n');

            results = lines.map(line => {
                const [subject, grade, mark] = extractGradeInfo(line);
                if (subject && mark) {
                    const convertedGrades = convertGrade(grade, fromSystem);
                    return {
                        subject: subject,
                        originalGrade: grade,
                        originalMark: mark,
                        convertedGrade: convertedGrades[toSystem]
                    };
                }
            }).filter(Boolean);
        } else {
            results = data.map(row => {
                const subject = row.Subject;
                const grade = row.Grade;
                const mark = row.Mark || '';
                const convertedGrades = convertGrade(grade, fromSystem);
                return {
                    subject: subject,
                    originalGrade: grade,
                    originalMark: mark,
                    convertedGrade: convertedGrades[toSystem]
                };
            });
        }

        displayTranscriptResults(results);
    }

    // Extract grade information
    function extractGradeInfo(line) {
        const regex = /(\w+)\s+([\w\*\+]+)\s+(\d{1,3}%)/;
        const match = line.match(regex);
        if (match) {
            return [match[1], match[2], match[3]]; // [subject, grade, mark]
        }
        return [null, null, null];
    }

    // Display transcript results
    function displayTranscriptResults(results) {
        const resultsDiv = document.getElementById('transcriptResults');
        resultsDiv.innerHTML = '';
        const table = document.createElement('table');
        table.className = 'transcript-table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Original Grade</th>
                    <th>Original Mark</th>
                    <th>Converted Grade</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        const tbody = table.querySelector('tbody');
        results.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${result.subject}</td>
                <td>${result.originalGrade}</td>
                <td>${result.originalMark}</td>
                <td>${result.convertedGrade}</td>
            `;
            tbody.appendChild(row);
        });
        resultsDiv.appendChild(table);

        // Add download button for the transcript results
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download Transcript PDF';
        downloadButton.onclick = () => downloadTranscriptPDF(results);
        resultsDiv.appendChild(downloadButton);
    }

    // Function to download PDF of transcript results
    async function downloadTranscriptPDF(results) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFont('Outfit', 'bold');
        doc.setFontSize(14);
        doc.text('Transcript Conversion Results', 105, 30, { align: 'center' });

        const tableData = results.map(result => [
            result.subject,
            result.originalGrade,
            result.originalMark,
            result.convertedGrade
        ]);

        doc.autoTable({
            startY: 40,
            head: [['Subject', 'Original Grade', 'Original Mark', 'Converted Grade']],
            body: tableData,
            styles: { font: 'Outfit', fontSize: 10 },
            headStyles: { fillColor: [31, 31, 56], textColor: [255, 255, 255] },
        });

        doc.save('transcript_conversion_results.pdf');
    }

    // Conversion logic (using the existing grade scales)
    function convertGrade(grade, fromSystem) {
        let result = {};
        let numGrade;
        let gradeInfo;

        // Using existing grade scales
        const gradeScales = {
            peak: [
                { min: 97, max: 100, grade: 'A*', gpa: 4.0 },
                { min: 93, max: 96.9, grade: 'A', gpa: 4.0 },
                { min: 90, max: 92.9, grade: 'A-', gpa: 3.7 },
                { min: 80, max: 89.9, grade: 'B', gpa: 3.0 },
                { min: 70, max: 79.9, grade: 'C', gpa: 2.0 },
                { min: 60, max: 69.9, grade: 'D', gpa: 1.0 },
                { min: 50, max: 59.9, grade: 'E', gpa: 0.5 },
                { min: 0, max: 49.9, grade: 'F', gpa: 0.0 }
            ],
            peakAlternative: [
                { grade: '8', min: 97, max: 100, gpa: 4.0, equivalent: 'A*' },
                { grade: '7', min: 93, max: 96.9, gpa: 4.0, equivalent: 'A' },
                { grade: '6', min: 90, max: 92.9, gpa: 3.7, equivalent: 'A-' },
                { grade: '5', min: 80, max: 89.9, gpa: 3.0, equivalent: 'B' },
                { grade: '4', min: 70, max: 79.9, gpa: 2.0, equivalent: 'C' },
                { grade: '3', min: 60, max: 69.9, gpa: 1.0, equivalent: 'D' },
                { grade: '2', min: 50, max: 59.9, gpa: 0.5, equivalent: 'E' },
                { grade: '1', min: 0, max: 49.9, gpa: 0.0, equivalent: 'F' }
            ],
            us: [
                { grade: 'A+', gpa: 4.0, min: 97, max: 100 },
                { grade: 'A', gpa: 4.0, min: 93, max: 96.9 },
                { grade: 'A-', gpa: 3.7, min: 90, max: 92.9 },
                { grade: 'B+', gpa: 3.3, min: 87, max: 89.9 },
                { grade: 'B', gpa: 3.0, min: 83, max: 86.9 },
                { grade: 'B-', gpa: 2.7, min: 80, max: 82.9 },
                { grade: 'C+', gpa: 2.3, min: 77, max: 79.9 },
                { grade: 'C', gpa: 2.0, min: 73, max: 76.9 },
                { grade: 'C-', gpa: 1.7, min: 70, max: 72.9 },
                { grade: 'D+', gpa: 1.3, min: 67, max: 69.9 },
                { grade: 'D', gpa: 1.0, min: 63, max: 66.9 },
                { grade: 'D-', gpa: 0.7, min: 60, max: 62.9 },
                { grade: 'F', gpa: 0.0, min: 0, max: 59.9 }
            ],
            uk: [
                { grade: 'A*', min: 90, max: 100, gpa: 4.0 },
                { grade: 'A', min: 80, max: 89.9, gpa: 4.0 },
                { grade: 'B', min: 70, max: 79.9, gpa: 3.0 },
                { grade: 'C', min: 60, max: 69.9, gpa: 2.0 },
                { grade: 'D', min: 50, max: 59.9, gpa: 1.0 },
                { grade: 'E', min: 40, max: 49.9, gpa: 0.0 },
                { grade: 'F', min: 0, max: 39.9, gpa: 0.0 }
            ],
            ib: [
                { grade: '7', min: 80, max: 100, gpa: 4.0, equivalent: 'A*' },
                { grade: '6', min: 70, max: 79.9, gpa: 3.8, equivalent: 'A' },
                { grade: '5', min: 60, max: 69.9, gpa: 3.3, equivalent: 'B' },
                { grade: '4', min: 50, max: 59.9, gpa: 2.8, equivalent: 'C' },
                { grade: '3', min: 40, max: 49.9, gpa: 2.3, equivalent: 'D' },
                { grade: '2', min: 30, max: 39.9, gpa: 1.8, equivalent: 'E' },
                { grade: '1', min: 0, max: 29.9, gpa: 0.0, equivalent: 'F' }
            ],
            cambridgeIGCSE: [
                { grade: 'A*', min: 90, max: 100, gpa: 4.0 },
                { grade: 'A', min: 80, max: 89.9, gpa: 4.0 },
                { grade: 'B', min: 70, max: 79.9, gpa: 3.0 },
                { grade: 'C', min: 60, max: 69.9, gpa: 2.0 },
                { grade: 'D', min: 50, max: 59.9, gpa: 1.0 },
                { grade: 'E', min: 40, max: 49.9, gpa: 0.0 },
                { grade: 'F', min: 30, max: 39.9, gpa: 0.0 },
                { grade: 'G', min: 20, max: 29.9, gpa: 0.0 },
                { grade: 'U', min: 0, max: 19.9, gpa: 0.0 }
            ],
            cambridgeGCSE: [
                { grade: '9', min: 90, max: 100, gpa: 4.0, equivalent: 'A*' },
                { grade: '8', min: 85, max: 89.9, gpa: 4.0, equivalent: 'A*' },
                { grade: '7', min: 80, max: 84.9, gpa: 4.0, equivalent: 'A' },
                { grade: '6', min: 70, max: 79.9, gpa: 3.7, equivalent: 'B' },
                { grade: '5', min: 60, max: 69.9, gpa: 3.3, equivalent: 'C' },
                { grade: '4', min: 50, max: 59.9, gpa: 3.0, equivalent: 'C' },
                { grade: '3', min: 40, max: 49.9, gpa: 2.0, equivalent: 'D' },
                { grade: '2', min: 30, max: 39.9, gpa: 1.0, equivalent: 'E' },
                { grade: '1', min: 0, max: 29.9, gpa: 0.0, equivalent: 'F/G' },
                { grade: 'U', min: 0, max: 19.9, gpa: 0.0, equivalent: 'U' }
            ],
            ace: [
                { grade: 'A*', min: 98, max: 100, gpa: 4.0 },
                { grade: 'A', min: 96, max: 97.9, gpa: 4.0 },
                { grade: 'B', min: 92, max: 95.9, gpa: 3.0 },
                { grade: 'C', min: 88, max: 91.9, gpa: 2.0 },
                { grade: 'D', min: 85, max: 87.9, gpa: 1.0 },
                { grade: 'E', min: 80, max: 84.9, gpa: 0.0 }
            ]
        };

        // Check if the input is a string representation of a single-digit integer
        if (/^[1-9]$/.test(grade) && ['peakAlternative', 'ib', 'cambridgeGCSE'].includes(fromSystem)) {
            numGrade = parseInt(grade);
            gradeInfo = gradeScales[fromSystem].find(g => g.grade === grade);
        } else if (!isNaN(grade)) {
            numGrade = parseFloat(grade);
            gradeInfo = gradeScales[fromSystem].find(g => numGrade >= g.min && numGrade <= g.max);
        } else {
            gradeInfo = gradeScales[fromSystem].find(g =>
                g.grade.toLowerCase() === grade.toLowerCase() ||
                (g.equivalent && g.equivalent.toLowerCase() === grade.toLowerCase())
            );
        }

        if (gradeInfo) {
            numGrade = (gradeInfo.min + gradeInfo.max) / 2;

            // Convert to all other systems
            const systems = ['peak', 'peakAlternative', 'us', 'uk', 'ib', 'cambridgeIGCSE', 'cambridgeGCSE', 'ace'];
            systems.forEach(system => {
                result[system] = convertBetweenSystems(numGrade, fromSystem, system);
            });
            result.gpa = gradeInfo.gpa;
        } else {
            return {};
        }

        return result;
    }

    // Convert between systems
    function convertBetweenSystems(numGrade, fromSystem, toSystem) {
        const fromScale = gradeScales[fromSystem];
        const toScale = gradeScales[toSystem];

        // Normalize the grade to a 0-1 scale
        const fromMin = fromScale[fromScale.length - 1].min;
        const fromMax = fromScale[0].max;
        const normalizedGrade = (numGrade - fromMin) / (fromMax - fromMin);

        // Convert the normalized grade to the target system
        const toMin = toScale[toScale.length - 1].min;
        const toMax = toScale[0].max;
        const convertedGrade = normalizedGrade * (toMax - toMin) + toMin;

        // Find the corresponding grade in the target system
        const targetGrade = toScale.find(g => convertedGrade >= g.min && convertedGrade <= g.max);

        if (targetGrade) {
            return targetGrade.grade;
        } else {
            // If no direct match is found, find the closest grade
            const closestGrade = toScale.reduce((prev, curr) => {
                return (Math.abs(curr.min - convertedGrade) < Math.abs(prev.min - convertedGrade) ? curr : prev);
            });
            return closestGrade.grade;
        }
    }

    // Initialize stored results list
    updateStoredResultsList();
});