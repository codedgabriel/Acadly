document.addEventListener('DOMContentLoaded', function() {
    // Elementos globais
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const formSections = document.querySelectorAll('.form-section');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const resumeForm = document.getElementById('resume-form');
    const resumePreview = document.getElementById('resume-preview');
    const pdfDownloadBtn = document.getElementById('pdf-download-btn');
    
    // Contadores para itens dinâmicos
    let educationCount = 1;
    let experienceCount = 1;
    let projectCount = 1;
    let languageCount = 1;
    
    // Menu hamburger para mobile
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Navegação entre seções do formulário
    window.nextSection = function(currentId, nextId) {
        const currentSection = document.getElementById(currentId);
        const nextSection = document.getElementById(nextId);
        
        // Verifica se a seção está marcada para inclusão
        const includeCheckbox = currentSection.querySelector('input[type="checkbox"]');
        if (includeCheckbox && !includeCheckbox.checked) {
            // Seção não incluída, pode avançar sem validar
            updateProgressBar(nextId);
            switchSections(currentSection, nextSection);
            return;
        }
        
        // Validação dos campos obrigatórios
        const requiredInputs = currentSection.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#f72585';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        if (!isValid) {
            alert('Por favor, preencha todos os campos obrigatórios antes de prosseguir.');
            return;
        }
        
        updateProgressBar(nextId);
        switchSections(currentSection, nextSection);
    };
    
    window.prevSection = function(currentId, prevId) {
        const currentSection = document.getElementById(currentId);
        const prevSection = document.getElementById(prevId);
        
        updateProgressBar(prevId);
        switchSections(currentSection, prevSection);
    };
    
    function switchSections(current, next) {
        current.classList.remove('active');
        next.classList.add('active');
        next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Atualiza a barra de progresso
    function updateProgressBar(sectionId) {
        const sections = ['section-personal', 'section-education', 'section-experience', 
                         'section-skills', 'section-languages', 'section-projects'];
        const currentIndex = sections.indexOf(sectionId);
        const progressPercentage = (currentIndex / (sections.length - 1)) * 100;
        
        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `Passo ${currentIndex + 1} de ${sections.length}`;
    }
    
    // Upload de imagem de perfil
    const imageUpload = document.getElementById('image-upload');
    const previewImage = document.getElementById('preview-image');
    const removeImageBtn = document.getElementById('remove-image');
    const resumeProfileImage = document.getElementById('resume-profile-image');
    
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = function(event) {
                previewImage.src = event.target.result;
                previewImage.style.display = 'block';
                removeImageBtn.style.display = 'inline-block';
                
                // Atualiza a imagem no preview do currículo
                resumeProfileImage.src = event.target.result;
                document.querySelector('.profile-image-placeholder').style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });
    
    window.removeImage = function() {
        imageUpload.value = '';
        previewImage.src = '';
        previewImage.style.display = 'none';
        removeImageBtn.style.display = 'none';
        
        // Remove a imagem no preview do currículo
        resumeProfileImage.src = '';
        document.querySelector('.profile-image-placeholder').style.display = 'flex';
    };
    
    // Adicionar Formação Acadêmica
    window.addEducation = function() {
        const container = document.getElementById('education-container');
        const newItem = document.createElement('div');
        newItem.className = 'dynamic-item';
        newItem.innerHTML = `
            <div class="dynamic-item-content">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="education-degree-${educationCount}">Grau*</label>
                        <select id="education-degree-${educationCount}" required>
                            <option value="">Selecione</option>
                            <option value="Ensino Médio">Ensino Médio</option>
                            <option value="Técnico">Técnico</option>
                            <option value="Graduação">Graduação</option>
                            <option value="Pós-Graduação">Pós-Graduação</option>
                            <option value="Mestrado">Mestrado</option>
                            <option value="Doutorado">Doutorado</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="education-field-${educationCount}">Área de Estudo*</label>
                        <input type="text" id="education-field-${educationCount}" required>
                    </div>
                    <div class="form-group">
                        <label for="education-institution-${educationCount}">Instituição*</label>
                        <input type="text" id="education-institution-${educationCount}" required>
                    </div>
                    <div class="form-group">
                        <label for="education-start-${educationCount}">Ano de Início*</label>
                        <input type="number" id="education-start-${educationCount}" min="1900" max="2099" required>
                    </div>
                    <div class="form-group">
                        <label for="education-end-${educationCount}">Ano de Conclusão*</label>
                        <input type="number" id="education-end-${educationCount}" min="1900" max="2099" required>
                    </div>
                    <div class="form-group">
                        <label for="education-description-${educationCount}">Descrição</label>
                        <textarea id="education-description-${educationCount}"></textarea>
                        <small>Atividades acadêmicas relevantes, projetos, TCC, etc.</small>
                    </div>
                </div>
            </div>
            <button type="button" class="btn remove-btn" onclick="this.parentNode.remove()">
                <i class="fas fa-trash"></i> Remover
            </button>
        `;
        container.appendChild(newItem);
        educationCount++;
    };
    
    // Adicionar Experiência Profissional
    window.addExperience = function() {
        const container = document.getElementById('experience-container');
        const newItem = document.createElement('div');
        newItem.className = 'dynamic-item';
        newItem.innerHTML = `
            <div class="dynamic-item-content">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="experience-position-${experienceCount}">Cargo*</label>
                        <input type="text" id="experience-position-${experienceCount}" required>
                    </div>
                    <div class="form-group">
                        <label for="experience-company-${experienceCount}">Empresa*</label>
                        <input type="text" id="experience-company-${experienceCount}" required>
                    </div>
                    <div class="form-group">
                        <label for="experience-start-${experienceCount}">Data de Início*</label>
                        <input type="month" id="experience-start-${experienceCount}" required>
                    </div>
                    <div class="form-group">
                        <label for="experience-end-${experienceCount}">Data de Término</label>
                        <input type="month" id="experience-end-${experienceCount}">
                        <small>Deixe em branco se for o emprego atual</small>
                    </div>
                    <div class="form-group">
                        <label for="experience-description-${experienceCount}">Descrição das Atividades*</label>
                        <textarea id="experience-description-${experienceCount}" required></textarea>
                        <small>Descreva suas responsabilidades e conquistas</small>
                    </div>
                </div>
            </div>
            <button type="button" class="btn remove-btn" onclick="this.parentNode.remove()">
                <i class="fas fa-trash"></i> Remover
            </button>
        `;
        container.appendChild(newItem);
        experienceCount++;
    };
    
    // Adicionar Habilidades
    window.addSkill = function() {
        const skillInput = document.getElementById('skill-input');
        const skillsContainer = document.getElementById('skills-container');
        
        if (skillInput.value.trim() === '') {
            alert('Por favor, digite uma habilidade antes de adicionar.');
            return;
        }
        
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.innerHTML = `
            ${skillInput.value.trim()}
            <span class="remove-skill" onclick="this.parentNode.remove()">&times;</span>
        `;
        skillsContainer.appendChild(skillTag);
        skillInput.value = '';
    };
    
    // Adicionar Idioma
    window.addLanguage = function() {
        const container = document.getElementById('languages-container');
        const newItem = document.createElement('div');
        newItem.className = 'dynamic-item';
        newItem.innerHTML = `
            <div class="dynamic-item-content">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="language-name-${languageCount}">Idioma*</label>
                        <input type="text" id="language-name-${languageCount}" required>
                    </div>
                    <div class="form-group">
                        <label for="language-level-${languageCount}">Nível*</label>
                        <select id="language-level-${languageCount}" required>
                            <option value="">Selecione</option>
                            <option value="Básico">Básico</option>
                            <option value="Intermediário">Intermediário</option>
                            <option value="Avançado">Avançado</option>
                            <option value="Fluente">Fluente</option>
                            <option value="Nativo">Nativo</option>
                        </select>
                    </div>
                </div>
            </div>
            <button type="button" class="btn remove-btn" onclick="this.parentNode.remove()">
                <i class="fas fa-trash"></i> Remover
            </button>
        `;
        container.appendChild(newItem);
        languageCount++;
    };
    
    // Adicionar Projeto
    window.addProject = function() {
        const container = document.getElementById('projects-container');
        const newItem = document.createElement('div');
        newItem.className = 'dynamic-item';
        newItem.innerHTML = `
            <div class="dynamic-item-content">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="project-name-${projectCount}">Nome do Projeto*</label>
                        <input type="text" id="project-name-${projectCount}" required>
                    </div>
                    <div class="form-group">
                        <label for="project-role-${projectCount}">Seu Papel no Projeto*</label>
                        <input type="text" id="project-role-${projectCount}" required>
                    </div>
                    <div class="form-group">
                        <label for="project-date-${projectCount}">Data do Projeto</label>
                        <input type="month" id="project-date-${projectCount}">
                    </div>
                    <div class="form-group">
                        <label for="project-description-${projectCount}">Descrição do Projeto*</label>
                        <textarea id="project-description-${projectCount}" required></textarea>
                        <small>Descreva o projeto, tecnologias usadas e resultados alcançados</small>
                    </div>
                    <div class="form-group">
                        <label for="project-url-${projectCount}">URL (se aplicável)</label>
                        <input type="url" id="project-url-${projectCount}" placeholder="https://exemplo.com/projeto">
                    </div>
                </div>
            </div>
            <button type="button" class="btn remove-btn" onclick="this.parentNode.remove()">
                <i class="fas fa-trash"></i> Remover
            </button>
        `;
        container.appendChild(newItem);
        projectCount++;
    };
    
    // Gerar o currículo
    window.generateResume = function() {
        // Validação final
        const requiredInputs = document.querySelectorAll('#section-projects input[required], #section-projects textarea[required], #section-projects select[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#f72585';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        if (!isValid) {
            alert('Por favor, preencha todos os campos obrigatórios antes de gerar o currículo.');
            return;
        }
        
        // Coletar informações pessoais
        document.getElementById('resume-name').textContent = document.getElementById('full-name').value;
        document.getElementById('resume-title').textContent = document.getElementById('profession').value;
        document.getElementById('resume-about').textContent = document.getElementById('about').value;
        
        // Atualizar contatos
        updateContactInfo();
        
        // Atualizar seções opcionais
        updateOptionalSections();
        
        // Mostrar o preview e ocultar o formulário
        resumeForm.style.display = 'none';
        resumePreview.style.display = 'block';
        pdfDownloadBtn.style.display = 'inline-block';
        
        // Rolar para o preview
        resumePreview.scrollIntoView({ behavior: 'smooth' });
    };
    
    // Atualizar informações de contato
    function updateContactInfo() {
        const contactContainer1 = document.querySelectorAll('.resume-contact')[0];
        const contactContainer2 = document.querySelectorAll('.resume-contact')[1];
        contactContainer1.innerHTML = '';
        contactContainer2.innerHTML = '';
        
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const linkedin = document.getElementById('linkedin').value;
        const github = document.getElementById('github').value;
        const portfolio = document.getElementById('portfolio').value;
        
        if (email) {
            contactContainer1.innerHTML += `
                <div class="resume-contact-item">
                    <i class="fas fa-envelope"></i>
                    <span>${email}</span>
                </div>
            `;
        }
        
        if (phone) {
            contactContainer1.innerHTML += `
                <div class="resume-contact-item">
                    <i class="fas fa-phone"></i>
                    <span>${phone}</span>
                </div>
            `;
        }
        
        if (address) {
            contactContainer1.innerHTML += `
                <div class="resume-contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${address}</span>
                </div>
            `;
        }
        
        if (linkedin) {
            contactContainer2.innerHTML += `
                <div class="resume-contact-item">
                    <i class="fab fa-linkedin"></i>
                    <a href="${linkedin}" target="_blank">${linkedin.replace(/^https?:\/\//, '')}</a>
                </div>
            `;
        }
        
        if (github) {
            contactContainer2.innerHTML += `
                <div class="resume-contact-item">
                    <i class="fab fa-github"></i>
                    <a href="${github}" target="_blank">${github.replace(/^https?:\/\//, '')}</a>
                </div>
            `;
        }
        
        if (portfolio) {
            contactContainer2.innerHTML += `
                <div class="resume-contact-item">
                    <i class="fas fa-globe"></i>
                    <a href="${portfolio}" target="_blank">${portfolio.replace(/^https?:\/\//, '')}</a>
                </div>
            `;
        }
    }
    
    // Atualizar seções opcionais
    function updateOptionalSections() {
        // Formação Acadêmica
        const includeEducation = document.getElementById('include-education').checked;
        const educationSection = document.getElementById('resume-education-section');
        educationSection.innerHTML = '';
        
        if (includeEducation) {
            educationSection.innerHTML = '<h3 class="section-title-resume">Formação Acadêmica</h3>';
            
            const educationItems = document.querySelectorAll('#education-container .dynamic-item');
            educationItems.forEach((item, index) => {
                const degree = item.querySelector(`#education-degree-${index}`)?.value || '';
                const field = item.querySelector(`#education-field-${index}`)?.value || '';
                const institution = item.querySelector(`#education-institution-${index}`)?.value || '';
                const start = item.querySelector(`#education-start-${index}`)?.value || '';
                const end = item.querySelector(`#education-end-${index}`)?.value || '';
                const description = item.querySelector(`#education-description-${index}`)?.value || '';
                
                educationSection.innerHTML += `
                    <div class="resume-item">
                        <div class="item-header">
                            <h4 class="item-title">${degree} em ${field}</h4>
                            <span class="item-date">${start} - ${end || 'Atual'}</span>
                        </div>
                        <div class="item-subtitle">${institution}</div>
                        ${description ? `<p>${description}</p>` : ''}
                    </div>
                `;
            });
        }
        
        // Experiência Profissional
        const includeExperience = document.getElementById('include-experience').checked;
        const experienceSection = document.getElementById('resume-experience-section');
        experienceSection.innerHTML = '';
        
        if (includeExperience) {
            experienceSection.innerHTML = '<h3 class="section-title-resume">Experiência Profissional</h3>';
            
            const experienceItems = document.querySelectorAll('#experience-container .dynamic-item');
            experienceItems.forEach((item, index) => {
                const position = item.querySelector(`#experience-position-${index}`)?.value || '';
                const company = item.querySelector(`#experience-company-${index}`)?.value || '';
                const start = item.querySelector(`#experience-start-${index}`)?.value || '';
                const end = item.querySelector(`#experience-end-${index}`)?.value || '';
                const description = item.querySelector(`#experience-description-${index}`)?.value || '';
                
                // Formatar datas
                const startDate = start ? new Date(start).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : '';
                const endDate = end ? new Date(end).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Atual';
                
                experienceSection.innerHTML += `
                    <div class="resume-item">
                        <div class="item-header">
                            <h4 class="item-title">${position}</h4>
                            <span class="item-date">${startDate} - ${endDate}</span>
                        </div>
                        <div class="item-subtitle">${company}</div>
                        <p>${description.replace(/\n/g, '<br>')}</p>
                    </div>
                `;
            });
        }
        
        // Habilidades
        const includeSkills = document.getElementById('include-skills').checked;
        const skillsSection = document.getElementById('resume-skills-section');
        skillsSection.innerHTML = '';
        
        if (includeSkills) {
            skillsSection.innerHTML = '<h3 class="section-title-resume">Habilidades</h3>';
            
            const skills = document.querySelectorAll('#skills-container .skill-tag');
            if (skills.length > 0) {
                skillsSection.innerHTML += '<div class="skills-list"></div>';
                const skillsList = skillsSection.querySelector('.skills-list');
                
                skills.forEach(skill => {
                    const skillText = skill.textContent.replace('×', '').trim();
                    skillsList.innerHTML += `
                        <div class="skill-item">${skillText}</div>
                    `;
                });
            }
        }
        
        // Idiomas
        const includeLanguages = document.getElementById('include-languages').checked;
        const languagesSection = document.getElementById('resume-languages-section');
        languagesSection.innerHTML = '';
        
        if (includeLanguages) {
            languagesSection.innerHTML = '<h3 class="section-title-resume">Idiomas</h3>';
            
            const languageItems = document.querySelectorAll('#languages-container .dynamic-item');
            if (languageItems.length > 0) {
                languageItems.forEach((item, index) => {
                    const language = item.querySelector(`#language-name-${index}`)?.value || '';
                    const level = item.querySelector(`#language-level-${index}`)?.value || '';
                    
                    languagesSection.innerHTML += `
                        <div class="resume-item">
                            <p><strong>${language}:</strong> ${level}</p>
                        </div>
                    `;
                });
            }
        }
        
        // Projetos
        const includeProjects = document.getElementById('include-projects').checked;
        const projectsSection = document.getElementById('resume-projects-section');
        projectsSection.innerHTML = '';
        
        if (includeProjects) {
            projectsSection.innerHTML = '<h3 class="section-title-resume">Projetos Relevantes</h3>';
            
            const projectItems = document.querySelectorAll('#projects-container .dynamic-item');
            projectItems.forEach((item, index) => {
                const name = item.querySelector(`#project-name-${index}`)?.value || '';
                const role = item.querySelector(`#project-role-${index}`)?.value || '';
                const date = item.querySelector(`#project-date-${index}`)?.value || '';
                const description = item.querySelector(`#project-description-${index}`)?.value || '';
                const url = item.querySelector(`#project-url-${index}`)?.value || '';
                
                // Formatar data
                const projectDate = date ? new Date(date).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : '';
                
                projectsSection.innerHTML += `
                    <div class="resume-item">
                        <div class="item-header">
                            <h4 class="item-title">${name}</h4>
                            ${projectDate ? `<span class="item-date">${projectDate}</span>` : ''}
                        </div>
                        <div class="item-subtitle">${role}</div>
                        <p>${description.replace(/\n/g, '<br>')}</p>
                        ${url ? `<p><a href="${url}" target="_blank">Ver projeto</a></p>` : ''}
                    </div>
                `;
            });
        }
    }
    
    // Voltar ao formulário
    window.backToForm = function() {
        resumePreview.style.display = 'none';
        resumeForm.style.display = 'block';
        pdfDownloadBtn.style.display = 'none';
        
        // Rolar para o topo do formulário
        resumeForm.scrollIntoView({ behavior: 'smooth' });
    };
    
    // Gerar PDF - Versão corrigida
    window.generatePDF = function() {
        // Verifica se o jsPDF está disponível
        if (typeof jsPDF !== 'undefined') {
            const doc = new jsPDF('p', 'pt', 'a4');
            
            // Obtém o elemento do preview do currículo
            const element = document.getElementById('resume-preview');
            
            // Opções para a conversão
            const options = {
                callback: function(doc) {
                    doc.save('curriculo.pdf');
                },
                x: 15,
                y: 15,
                width: 570,
                windowWidth: element.scrollWidth
            };
            
            // Converte HTML para PDF
            doc.html(element, options);
        } else {
            alert('A biblioteca jsPDF não foi carregada corretamente. Por favor, recarregue a página.');
        }
    };
    
    // Carrega html2canvas dinamicamente se necessário
    if (typeof html2canvas === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        document.head.appendChild(script);
    }
    
    // Anima os cards de features quando entram na viewport
    const featureCards = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => {
        observer.observe(card);
    });
});