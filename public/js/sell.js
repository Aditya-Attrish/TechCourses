document.addEventListener('DOMContentLoaded', function() {
    // Form steps navigation
    alert()
    let currentStep = 1;
    const totalSteps = 5;
    
    // Initialize Dropzone for thumbnail
    new Dropzone("#thumbnailUploadArea", {
        url: "/upload", // Replace with your upload endpoint
        paramName: "thumbnail",
        maxFiles: 1,
        acceptedFiles: "image/*",
        dictDefaultMessage: "",
        init: function() {
            this.on("addedfile", function(file) {
                if (this.files.length > 1) {
                    this.removeFile(this.files[0]);
                }
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('thumbnailPreview').style.display = 'block';
                    document.getElementById('thumbnailImage').src = e.target.result;
                };
                reader.readAsDataURL(file);
            });
        }
    });
    
    // Initialize Dropzone for video
    new Dropzone("#videoUploadArea", {
        url: "/upload", // Replace with your upload endpoint
        paramName: "video",
        maxFiles: 1,
        acceptedFiles: "video/*",
        dictDefaultMessage: "",
        init: function() {
            this.on("addedfile", function(file) {
                if (this.files.length > 1) {
                    this.removeFile(this.files[0]);
                }
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('videoPreview').style.display = 'block';
                    document.getElementById('promoVideo').src = e.target.result;
                };
                reader.readAsDataURL(file);
            });
        }
    });
    
    // Initialize Dropzone for resources
    new Dropzone("#resourcesUploadArea", {
        url: "/upload", // Replace with your upload endpoint
        paramName: "resources",
        dictDefaultMessage: "",
        addRemoveLinks: true
    });
    
    // Initialize Sortable for sections and lectures
    new Sortable(document.getElementById('courseSections'), {
        handle: '.handle',
        animation: 150
    });
    
    // Add new section
    document.querySelector('.add-section').addEventListener('click', function() {
        const sectionCount = document.querySelectorAll('.section').length + 1;
        const newSection = document.createElement('div');
        newSection.className = 'section mb-4 border p-3 rounded';
        newSection.innerHTML = `
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
        document.getElementById('courseSections').appendChild(newSection);
        addSectionEventListeners(newSection);
    });
    
    // Add event listeners to initial section
    document.querySelectorAll('.section').forEach(section => {
        addSectionEventListeners(section);
    });
    
    // Next step buttons
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                document.getElementById(`step${currentStep}`).style.display = 'none';
                currentStep++;
                document.getElementById(`step${currentStep}`).style.display = 'block';
                updateProgressIndicator();
                
                // Update summary on last step
                if (currentStep === totalSteps) {
                    updateSummary();
                }
            }
        });
    });
    
    // Previous step buttons
    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById(`step${currentStep}`).style.display = 'none';
            currentStep--;
            document.getElementById(`step${currentStep}`).style.display = 'block';
            updateProgressIndicator();
        });
    });
    
    // Form submission
    document.getElementById('courseForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateStep(currentStep)) {
            // Here you would collect all form data and send to server
            const formData = collectFormData();
            console.log('Form data ready for submission:', formData);
            
            // Simulate form submission
            alert('Course submitted successfully!');
        }
    });
    
    // Helper function to add event listeners to sections
    function addSectionEventListeners(section) {
        // Add lecture button
        section.querySelector('.add-lecture').addEventListener('click', function() {
            const lecturesContainer = section.querySelector('.lectures');
            const newLecture = document.createElement('div');
            newLecture.className = 'lecture mb-2 border-bottom pb-2';
            newLecture.innerHTML = `
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
            lecturesContainer.appendChild(newLecture);
        });
        
        // Remove section button
        section.querySelector('.remove-section').addEventListener('click', function() {
            if (document.querySelectorAll('.section').length > 1) {
                section.remove();
            } else {
                alert('A course must have at least one section');
            }
        });
        
        // Delegate remove lecture events
        section.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-lecture')) {
                const lecture = e.target.closest('.lecture');
                if (lecture.parentElement.querySelectorAll('.lecture').length > 1) {
                    lecture.remove();
                } else {
                    alert('A section must have at least one lecture');
                }
            }
        });
    }
    
    // Validate current step
    function validateStep(step) {
        let isValid = true;
        
        if (step === 1) {
            const requiredFields = document.querySelectorAll('#step1 [required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });
        }
        
        // Add validation for other steps as needed
        
        return isValid;
    }
    
    // Update progress indicator
    function updateProgressIndicator() {
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            step.classList.remove('active', 'complete');
            if (index + 1 === currentStep) {
                step.classList.add('active');
            } else if (index + 1 < currentStep) {
                step.classList.add('complete');
            }
        });
    }
    
    // Update summary information
    function updateSummary() {
        document.getElementById('summaryTitle').textContent = document.getElementById('courseTitle').value;
        document.getElementById('summaryCategory').textContent = document.getElementById('courseCategory').options[document.getElementById('courseCategory').selectedIndex].text;
        document.getElementById('summaryLevel').textContent = document.getElementById('courseLevel').options[document.getElementById('courseLevel').selectedIndex].text;
        document.getElementById('summaryPrice').textContent = document.getElementById('coursePrice').value;
        document.getElementById('summarySections').textContent = document.querySelectorAll('.section').length;
        document.getElementById('summaryLanguage').textContent = document.getElementById('courseLanguage').options[document.getElementById('courseLanguage').selectedIndex].text;
    }
    
    // Collect all form data
    function collectFormData() {
        const formData = {
            title: document.getElementById('courseTitle').value,
            subtitle: document.getElementById('courseSubtitle').value,
            description: document.getElementById('courseDescription').value,
            category: document.getElementById('courseCategory').value,
            level: document.getElementById('courseLevel').value,
            price: document.getElementById('coursePrice').value,
            discountPrice: document.getElementById('courseDiscount').value,
            language: document.getElementById('courseLanguage').value,
            certificateAvailable: document.getElementById('certificateAvailable').checked,
            featuredCourse: document.getElementById('featuredCourse').checked,
            publishOption: document.getElementById('publishOptions').value,
            sections: []
        };
        
        // Collect sections and lectures
        document.querySelectorAll('.section').forEach(section => {
            const sectionData = {
                title: section.querySelector('.section-title').value,
                description: section.querySelector('.section-description').value,
                lectures: []
            };
            
            section.querySelectorAll('.lecture').forEach(lecture => {
                sectionData.lectures.push({
                    title: lecture.querySelector('.lecture-title').value,
                    type: lecture.querySelector('.lecture-type').value
                });
            });
            
            formData.sections.push(sectionData);
        });
        
        return formData;
    }
});