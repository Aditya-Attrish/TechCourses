document.addEventListener('DOMContentLoaded', function () {
    let currentStep = 1;
    const totalSteps = 5;
    addNewSection();
    const progressBar = document.querySelector('.progress-bar');

    // Section management
    document.querySelector('.add-section').addEventListener('click', addNewSection);

    function updateProgressBar() {
        const progressPercentage = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function addNewSection() {
        const sectionCount = document.querySelectorAll('.section').length + 1;
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'section mb-4 border p-3 rounded';
        sectionDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5>Section ${sectionCount}</h5>
                <button type="button" class="btn btn-sm btn-outline-danger remove-section">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            
            <div class="mb-3">
                <label class="form-label">Section Title*</label>
                <input type="text" class="form-control section-title" required placeholder="Section title">
            </div>
            
            <div class="mb-3">
                <label class="form-label">Section Description</label>
                <textarea class="form-control section-description" rows="2" placeholder="What will students learn in this section?"></textarea>
            </div>
            
            <div class="lectures mb-3">
                <div class="lecture mb-2 border-bottom pb-2">
                    <div class="d-flex align-items-center">
                        <i class="fas fa-grip-vertical handle me-2 text-muted"></i>
                        <input type="text" class="form-control form-control-sm lecture-title" placeholder="Lecture title" required>
                        <select class="form-select form-select-sm lecture-type ms-2" style="width: 120px;">
                            <option value="video">Video</option>
                            <option value="article">Article</option>
                            <option value="quiz">Quiz</option>
                            <option value="exercise">Exercise</option>
                        </select>
                        <button type="button" class="btn btn-sm btn-outline-danger ms-2 remove-lecture">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <button type="button" class="btn btn-sm btn-outline-primary add-lecture">
                <i class="fas fa-plus me-1"></i> Add Lecture
            </button>
        `;
        
        document.getElementById('courseSections').appendChild(sectionDiv);
        
        // Add event listeners for the new section
        sectionDiv.querySelector('.add-lecture').addEventListener('click', function() {
            addNewLecture(this.closest('.section').querySelector('.lectures'));
        });
        
        sectionDiv.querySelector('.remove-section').addEventListener('click', function() {
            if (document.querySelectorAll('.section').length > 1) {
                this.closest('.section').remove();
                // Renumber sections
                document.querySelectorAll('.section h5').forEach((header, index) => {
                    header.textContent = `Section ${index + 1}`;
                });
            } else {
                alert('Your course must have at least one section.');
            }
        });
    }

    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', function () {
            if (validateStep(currentStep)) {
                document.getElementById(`step${currentStep}`).classList.remove('active');
                currentStep++;
                document.getElementById(`step${currentStep}`).classList.add('active');
                updateProgressBar();

                // Update summary on last step
                if (currentStep === totalSteps) {
                    updateSummary();
                }
            }
        });
    });

    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById(`step${currentStep}`).classList.remove('active');
            currentStep--;
            document.getElementById(`step${currentStep}`).classList.add('active');
            updateProgressBar();
        });
    });

    function validateStep(step) {
        let isValid = true;
        if (step === 1) {
            const requiredFields = ['courseTitle', 'courseSubtitle', 'courseDescription', 'courseCategory', 'courseLevel'];
            requiredFields.forEach(id => {
                const field = document.getElementById(id);
                if (!field.value) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });
        } else if (step === 3) {
            if (!document.getElementById('thumbnailFile').value) {
                document.getElementById('thumbnailUploadArea').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('thumbnailUploadArea').classList.remove('is-invalid');
            }
        } else if (step === 5) {
            if (!document.getElementById('publishOptions').value) {
                document.getElementById('publishOptions').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('publishOptions').classList.remove('is-invalid');
            }
            
            if (!document.getElementById('termsAgreement').checked) {
                document.getElementById('termsAgreement').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('termsAgreement').classList.remove('is-invalid');
            }
        }

        return isValid;
    }

    function addNewLecture(lecturesContainer) {
        const lectureDiv = document.createElement('div');
        lectureDiv.className = 'lecture mb-2 border-bottom pb-2';
        lectureDiv.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-grip-vertical handle me-2 text-muted"></i>
                <input type="text" class="form-control form-control-sm lecture-title" placeholder="Lecture title" required>
                <select class="form-select form-select-sm lecture-type ms-2" style="width: 120px;">
                    <option value="video">Video</option>
                    <option value="article">Article</option>
                    <option value="quiz">Quiz</option>
                    <option value="exercise">Exercise</option>
                </select>
                <button type="button" class="btn btn-sm btn-outline-danger ms-2 remove-lecture">
                    <i class="fas fa-times"></i>
                </button>
                </div>
                `;
                
                lecturesContainer.appendChild(lectureDiv);
                
                // Add event listener for remove button
                lectureDiv.querySelector('.remove-lecture').addEventListener('click', function() {
                    if (lecturesContainer.querySelectorAll('.lecture').length > 1) {
                        this.closest('.lecture').remove();
                    } else {
                        alert('Each section must have at least one lecture.');
                    }
                });
            }

            function updateSummary() {
                document.getElementById('summaryTitle').textContent = document.getElementById('courseTitle').value;
                document.getElementById('summaryCategory').textContent = document.getElementById('courseCategory').options[document.getElementById('courseCategory').selectedIndex].text;
                document.getElementById('summaryLevel').textContent = document.getElementById('courseLevel').options[document.getElementById('courseLevel').selectedIndex].text;
                document.getElementById('summaryPrice').textContent = document.getElementById('coursePrice').value;
                document.getElementById('summarySections').textContent = document.querySelectorAll('.section').length;
                document.getElementById('summaryLanguage').textContent = document.getElementById('courseLanguage').options[document.getElementById('courseLanguage').selectedIndex].text;

                if (thumbnailPreview.src && thumbnailPreview.src !== '#') {
                    const thumbnailSummary = document.getElementById('thumbnailSummary');
                    thumbnailSummary.innerHTML = '<img src="' + thumbnailPreview.src + '" class="img-fluid rounded" style="max-height: 150px;">';
                }
            }

            // Initialize file input click handlers
            document.getElementById('thumbnailUploadArea').addEventListener('click', function() {
                document.getElementById('thumbnailInput').click();
            });
            
            document.getElementById('videoUploadArea').addEventListener('click', function() {
                document.getElementById('videoInput').click();
            });

            // Handle file selection
            document.getElementById('thumbnailInput').addEventListener('change', function(e) {
                if (e.target.files.length) {
                    const file = e.target.files[0];
                    const preview = document.getElementById('thumbnailPreview');
                    preview.src = URL.createObjectURL(file);
                    preview.style.display = 'block';
                    document.getElementById('thumbnailFile').value = file.name;
                }
            });

            document.getElementById('videoInput').addEventListener('change', function(e) {
                if (e.target.files.length) {
                    const file = e.target.files[0];
                    const preview = document.getElementById('videoPreview');
                    preview.src = URL.createObjectURL(file);
                    preview.style.display = 'block';
                    document.getElementById('videoFile').value = file.name;
                }
            });
});