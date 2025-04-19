const { jsPDF } = window.jspdf;

// Configurações ABNT atualizadas conforme normas vigentes
const ABNT_CONFIG = {
    margins: {
        left: 30,    // 3cm esquerda (ABNT)
        right: 20,   // 2cm direita
        top: 30,     // 3cm superior
        bottom: 20   // 2cm inferior
    },
    fonts: {
        normal: 'times',
        bold: 'times-bold',
        italic: 'times-italic'
    },
    sizes: {
        title: 14,
        section: 12,
        subsection: 12,
        text: 12,
        small: 10,
        footnote: 8
    },
    spacing: {
        line: 1.5,   // Espaçamento entre linhas
        paragraph: 4, // Espaçamento entre parágrafos
        section: 12   // Espaçamento entre seções
    },
    page: {
        width: 210,  // A4 em mm
        height: 297
    },
    structure: {
        requiredSections: [
            'Capa',
            'Folha de Rosto',
            'Folha de Aprovação',
            'Dedicatória (opcional)',
            'Agradecimentos (opcional)',
            'Epígrafe (opcional)',
            'Resumo',
            'Abstract (opcional)',
            'Lista de Ilustrações (se aplicável)',
            'Lista de Tabelas (se aplicável)',
            'Lista de Abreviaturas (se aplicável)',
            'Sumário',
            'Introdução',
            'Desenvolvimento',
            'Conclusão',
            'Referências',
            'Apêndices (se aplicável)',
            'Anexos (se aplicável)'
        ]
    }
};

// Objeto para armazenar as páginas de cada seção
const sectionPages = {
    'capa': { start: 1 },
    'folha_rosto': { start: 0 },
    'folha_aprovacao': { start: 0 },
    'dedicatoria': { start: 0 },
    'agradecimentos': { start: 0 },
    'epigrafe': { start: 0 },
    'resumo': { start: 0 },
    'abstract': { start: 0 },
    'lista_ilustracoes': { start: 0 },
    'lista_tabelas': { start: 0 },
    'lista_abreviaturas': { start: 0 },
    'sumario': { start: 0 },
    'introducao': { start: 0 },
    'desenvolvimento': { start: 0 },
    'conclusao': { start: 0 },
    'referencias': { start: 0 },
    'apendices': { start: 0 },
    'anexos': { start: 0 }
};

// Adiciona uma seção inicial de desenvolvimento
addDevelopmentSection();

// Funções para gerenciar seções de desenvolvimento
function addDevelopmentSection() {
    const container = document.getElementById('developmentSections');
    const sectionCount = container.children.length + 1;
    
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'development-section';
    sectionDiv.setAttribute('data-section', sectionCount);
    sectionDiv.innerHTML = `
        <div class="section-title">Seção 2.${sectionCount}</div>
        <input type="text" class="section-title-input" placeholder="Título da seção" required>
        
        <div class="content-options">
            <button type="button" class="btn-add-content" onclick="addTextArea(this)">+ Texto</button>
            <button type="button" class="btn-add-content" onclick="addListOptions(this)">+ Lista</button>
            <button type="button" class="btn-add-content" onclick="addImageInput(this)">+ Imagem</button>
            <button type="button" class="btn-add-content" onclick="addTableInput(this)">+ Tabela</button>
            <button type="button" class="btn-add-content" onclick="addFootnoteInput(this)">+ Nota de Rodapé</button>
        </div>
        
        <div class="section-content">
            <textarea class="content-text" rows="6" placeholder="Conteúdo textual (pressione Enter para novos parágrafos)"></textarea>
        </div>
        
        <button type="button" class="btn-remove" onclick="removeDevelopmentSection(this)">Remover Seção</button>
    `;
    
    container.appendChild(sectionDiv);
}

function removeDevelopmentSection(button) {
    const container = document.getElementById('developmentSections');
    if (container.children.length > 1) {
        button.parentElement.remove();
        // Renumerar as seções restantes
        document.querySelectorAll('.development-section').forEach((section, index) => {
            const sectionNumber = index + 1;
            section.setAttribute('data-section', sectionNumber);
            section.querySelector('.section-title').textContent = `Seção 2.${sectionNumber}`;
        });
    } else {
        alert('O trabalho deve ter pelo menos uma seção de desenvolvimento.');
    }
}

// Função para adicionar área de texto
function addTextArea(button) {
    const contentDiv = button.closest('.development-section').querySelector('.section-content');
    const textarea = document.createElement('textarea');
    textarea.className = 'content-text';
    textarea.rows = 6;
    textarea.placeholder = "Novo parágrafo de texto";
    contentDiv.appendChild(textarea);
}

// Função para adicionar opções de lista
function addListOptions(button) {
    const contentDiv = button.closest('.development-section').querySelector('.section-content');
    const listDiv = document.createElement('div');
    listDiv.className = 'list-type';
    
    listDiv.innerHTML = `
        <div style="margin-bottom: 10px;">
            <select class="list-style" style="width: auto; padding: 8px 12px;">
                <option value="disc">• Lista não ordenada</option>
                <option value="decimal">1. Lista numerada</option>
                <option value="lower-alpha">a. Lista alfabética</option>
                <option value="upper-alpha">A. Lista alfabética maiúscula</option>
                <option value="lower-roman">i. Lista romana</option>
            </select>
        </div>
        <button type="button" class="btn-add-content" onclick="addListItem(this)">+ Adicionar Item</button>
        
        <div class="list-items">
            <div class="list-item">
                <input type="text" class="list-item-input" placeholder="Digite um item da lista">
                <button type="button" class="btn-remove-item" onclick="removeListItem(this)">×</button>
            </div>
        </div>
    `;
    
    contentDiv.appendChild(listDiv);
}

// Função para adicionar item à lista
function addListItem(button) {
    const listItemsDiv = button.closest('.list-type').querySelector('.list-items');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'list-item';
    itemDiv.innerHTML = `
        <input type="text" class="list-item-input" placeholder="Digite um item da lista">
        <button type="button" class="btn-remove-item" onclick="removeListItem(this)">×</button>
    `;
    listItemsDiv.appendChild(itemDiv);
}

// Função para remover item da lista
function removeListItem(button) {
    const listItem = button.closest('.list-item');
    if (listItem.parentElement.children.length > 1) {
        listItem.remove();
    } else {
        alert('A lista deve ter pelo menos um item.');
    }
}

// Função para adicionar campo de imagem
function addImageInput(button) {
    const contentDiv = button.closest('.development-section').querySelector('.section-content');
    const imageDiv = document.createElement('div');
    imageDiv.className = 'image-upload';
    
    imageDiv.innerHTML = `
        <label>Imagem:</label>
        <input type="file" class="section-image" accept="image/*">
        <div style="margin-top: 10px;">
            <input type="text" class="image-caption" placeholder="Legenda da imagem (obrigatório)" style="width: 100%;">
            <input type="text" class="image-source" placeholder="Fonte da imagem (obrigatório)" style="width: 100%; margin-top: 5px;">
        </div>
        <img class="image-preview">
        <button type="button" class="btn-remove" onclick="removeImageInput(this)" style="margin-top: 10px;">Remover Imagem</button>
    `;
    
    // Adiciona evento para preview da imagem
    imageDiv.querySelector('.section-image').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            const previewImg = this.parentElement.querySelector('.image-preview');
            
            reader.onload = function(event) {
                previewImg.src = event.target.result;
                previewImg.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
    
    contentDiv.appendChild(imageDiv);
}

// Função para adicionar campo de tabela
function addTableInput(button) {
    const contentDiv = button.closest('.development-section').querySelector('.section-content');
    const tableDiv = document.createElement('div');
    tableDiv.className = 'table-upload';
    
    tableDiv.innerHTML = `
        <label>Tabela:</label>
        <div style="margin-top: 10px;">
            <input type="text" class="table-title" placeholder="Título da tabela (obrigatório)" style="width: 100%;">
            <input type="text" class="table-source" placeholder="Fonte da tabela (obrigatório)" style="width: 100%; margin-top: 5px;">
        </div>
        <div class="table-editor" style="margin-top: 10px;">
            <button type="button" class="btn-add-row" onclick="addTableRow(this)">+ Linha</button>
            <button type="button" class="btn-add-col" onclick="addTableColumn(this)">+ Coluna</button>
            <table class="table-preview" border="1" style="width: 100%; margin-top: 10px; border-collapse: collapse;">
                <tr>
                    <td contenteditable="true" style="padding: 5px;">Célula 1</td>
                </tr>
            </table>
        </div>
        <button type="button" class="btn-remove" onclick="removeTableInput(this)" style="margin-top: 10px;">Remover Tabela</button>
    `;
    
    contentDiv.appendChild(tableDiv);
}

// Função para adicionar linha à tabela
function addTableRow(button) {
    const table = button.closest('.table-editor').querySelector('.table-preview');
    const row = table.insertRow();
    const colCount = table.rows[0].cells.length;
    
    for (let i = 0; i < colCount; i++) {
        const cell = row.insertCell();
        cell.contentEditable = true;
        cell.style.padding = '5px';
        cell.textContent = `Célula ${table.rows.length}.${i+1}`;
    }
}

// Função para adicionar coluna à tabela
function addTableColumn(button) {
    const table = button.closest('.table-editor').querySelector('.table-preview');
    
    for (let i = 0; i < table.rows.length; i++) {
        const cell = table.rows[i].insertCell();
        cell.contentEditable = true;
        cell.style.padding = '5px';
        cell.textContent = `Célula ${i+1}.${table.rows[i].cells.length}`;
    }
}

// Função para adicionar nota de rodapé
function addFootnoteInput(button) {
    const contentDiv = button.closest('.development-section').querySelector('.section-content');
    const footnoteDiv = document.createElement('div');
    footnoteDiv.className = 'footnote-input';
    
    footnoteDiv.innerHTML = `
        <div style="margin-top: 10px;">
            <input type="text" class="footnote-marker" placeholder="Marcador no texto (ex: 1)" style="width: 30px;">
            <input type="text" class="footnote-text" placeholder="Texto da nota de rodapé" style="width: calc(100% - 40px); margin-left: 5px;">
        </div>
        <button type="button" class="btn-remove" onclick="removeFootnoteInput(this)" style="margin-top: 5px;">Remover Nota</button>
    `;
    
    contentDiv.appendChild(footnoteDiv);
}

// Função para remover campo de imagem
function removeImageInput(button) {
    button.parentElement.remove();
}

// Função para remover campo de tabela
function removeTableInput(button) {
    button.parentElement.remove();
}

// Função para remover nota de rodapé
function removeFootnoteInput(button) {
    button.parentElement.remove();
}

// Preview da logo da instituição
document.getElementById('institutionLogo').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.getElementById('logoPreview');
            img.src = event.target.result;
            img.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

async function generatePDF() {
    // Validar campos obrigatórios
    const requiredInputs = document.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#f44336';
            isValid = false;
        } else {
            input.style.borderColor = '#ced4da';
        }
    });
    
    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatórios marcados com *.');
        return;
    }
    
    // Coletar dados do formulário
    const logoFile = document.getElementById('institutionLogo').files[0];
    const institution = document.getElementById('institution').value;
    const faculty = document.getElementById('faculty').value;
    const course = document.getElementById('course').value;
    const title = document.getElementById('title').value;
    const subtitle = document.getElementById('subtitle').value;
    const author = document.getElementById('author').value;
    const professor = document.getElementById('professor').value;
    const discipline = document.getElementById('discipline').value;
    const city = document.getElementById('city').value;
    const year = document.getElementById('year').value;
    const frontPageText = document.getElementById('frontPageText').value;
    const approvalText = document.getElementById('approvalText').value;
    const dedication = document.getElementById('dedication').value;
    const acknowledgments = document.getElementById('acknowledgments').value;
    const epigraph = document.getElementById('epigraph').value;
    const abstract = document.getElementById('abstract').value;
    const englishAbstract = document.getElementById('englishAbstract').value;
    const keywords = document.getElementById('keywords').value;
    const englishKeywords = document.getElementById('englishKeywords').value;
    const introduction = document.getElementById('introduction').value;
    const conclusion = document.getElementById('conclusion').value;
    const references = document.getElementById('references').value.split('\n').filter(ref => ref.trim() !== '');
    const appendices = document.getElementById('appendices').value.split('\n').filter(app => app.trim() !== '');
    const annexes = document.getElementById('annexes').value.split('\n').filter(ann => ann.trim() !== '');
    
    // Coletar seções de desenvolvimento
    const developmentSections = [];
    document.querySelectorAll('.development-section').forEach(section => {
        const sectionData = {
            number: section.getAttribute('data-section'),
            title: section.querySelector('.section-title-input').value,
            contents: [],
            footnotes: []
        };
        
        // Processar cada elemento de conteúdo
        section.querySelectorAll('.section-content > *').forEach(element => {
            if (element.classList.contains('content-text') && element.value.trim() !== '') {
                sectionData.contents.push({
                    type: 'text',
                    value: element.value
                });
            } 
            else if (element.classList.contains('list-type')) {
                const style = element.querySelector('.list-style').value;
                const items = Array.from(element.querySelectorAll('.list-item-input'))
                                  .map(input => input.value)
                                  .filter(item => item.trim() !== '');
                
                if (items.length > 0) {
                    sectionData.contents.push({
                        type: 'list',
                        style: style,
                        items: items
                    });
                }
            } 
            else if (element.classList.contains('image-upload')) {
                const imageFile = element.querySelector('.section-image').files[0];
                const caption = element.querySelector('.image-caption').value;
                const source = element.querySelector('.image-source').value;
                
                if (imageFile) {
                    if (!caption.trim() || !source.trim()) {
                        alert('Por favor, adicione uma legenda e fonte para a imagem.');
                        throw new Error('Legenda ou fonte de imagem faltando');
                    }
                    
                    sectionData.contents.push({
                        type: 'image',
                        file: imageFile,
                        caption: caption,
                        source: source
                    });
                }
            }
            else if (element.classList.contains('table-upload')) {
                const tableTitle = element.querySelector('.table-title').value;
                const tableSource = element.querySelector('.table-source').value;
                const tableRows = [];
                
                const table = element.querySelector('.table-preview');
                for (let i = 0; i < table.rows.length; i++) {
                    const row = [];
                    for (let j = 0; j < table.rows[i].cells.length; j++) {
                        row.push(table.rows[i].cells[j].textContent);
                    }
                    tableRows.push(row);
                }
                
                if (tableTitle.trim() && tableSource.trim()) {
                    sectionData.contents.push({
                        type: 'table',
                        title: tableTitle,
                        source: tableSource,
                        rows: tableRows
                    });
                }
            }
            else if (element.classList.contains('footnote-input')) {
                const marker = element.querySelector('.footnote-marker').value;
                const text = element.querySelector('.footnote-text').value;
                
                if (marker.trim() && text.trim()) {
                    sectionData.footnotes.push({
                        marker: marker,
                        text: text
                    });
                }
            }
        });
        
        if (sectionData.contents.length > 0 || sectionData.footnotes.length > 0) {
            developmentSections.push(sectionData);
        }
    });
    
    // Coletar imagens para lista de ilustrações
    const illustrations = [];
    document.querySelectorAll('.image-upload').forEach((imageUpload, index) => {
        const caption = imageUpload.querySelector('.image-caption').value;
        if (caption.trim()) {
            illustrations.push({
                number: index + 1,
                caption: caption,
                page: 0 // Será atualizado depois
            });
        }
    });
    
    // Coletar tabelas para lista de tabelas
    const tables = [];
    document.querySelectorAll('.table-upload').forEach((tableUpload, index) => {
        const title = tableUpload.querySelector('.table-title').value;
        if (title.trim()) {
            tables.push({
                number: index + 1,
                title: title,
                page: 0 // Será atualizado depois
            });
        }
    });
    
    // Criar PDF com margens ABNT
    const doc = new jsPDF({
        unit: 'mm',
        format: 'a4'
    });
    
    // Configurações do documento
    const { margins, fonts, sizes, spacing, page } = ABNT_CONFIG;
    const contentWidth = page.width - margins.left - margins.right;
    let yPosition = margins.top;
    let currentPage = 1;
    let footnoteCount = 1;
    const footnotes = [];
    
    // Função para estimar altura do texto
    function estimateTextHeight(text, fontSize, lineSpacing) {
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(text, contentWidth);
        return lines.length * fontSize * lineSpacing * 0.35;
    }
    
    // Função para adicionar texto formatado
    function addText(text, fontSize = sizes.text, isBold = false, align = 'left', lineSpacing = spacing.line, isItalic = false) {
        doc.setFontSize(fontSize);
        doc.setFont(isBold ? fonts.bold : (isItalic ? fonts.italic : fonts.normal));
        
        const lines = doc.splitTextToSize(text, contentWidth);
        const lineHeight = fontSize * lineSpacing * 0.35;
        
        // Verifica se cabe na página
        if (yPosition + (lines.length * lineHeight) > page.height - margins.bottom) {
            addPage();
        }
        
        let xPosition = margins.left;
        if (align === 'center') {
            xPosition = page.width / 2;
        } else if (align === 'right') {
            xPosition = page.width - margins.right;
        }
        
        // Configuração para texto justificado
        const textOptions = {
            maxWidth: contentWidth,
            align: align === 'justify' ? 'left' : align
        };
        
        // Simular texto justificado
        if (align === 'justify') {
            const words = text.split(' ');
            let line = '';
            let justifiedLines = [];
            
            for (let i = 0; i < words.length; i++) {
                const testLine = line + words[i] + ' ';
                const testWidth = doc.getTextWidth(testLine);
                
                if (testWidth > contentWidth && i > 0) {
                    justifiedLines.push(line);
                    line = words[i] + ' ';
                } else {
                    line = testLine;
                }
            }
            justifiedLines.push(line);
            
            justifiedLines.forEach((line, idx) => {
                if (idx < justifiedLines.length - 1) {
                    // Distribuir espaços para linhas não finais
                    const words = line.trim().split(' ');
                    if (words.length > 1) {
                        const spaceWidth = (contentWidth - doc.getTextWidth(line.trim())) / (words.length - 1);
                        let x = margins.left;
                        
                        words.forEach((word, i) => {
                            doc.text(word, x, yPosition);
                            x += doc.getTextWidth(word + ' ') + (i < words.length - 1 ? spaceWidth : 0);
                        });
                        yPosition += lineHeight;
                    } else {
                        doc.text(line, margins.left, yPosition, textOptions);
                        yPosition += lineHeight;
                    }
                } else {
                    doc.text(line, margins.left, yPosition, textOptions);
                    yPosition += lineHeight;
                }
            });
            
            return;
        }
        
        doc.text(lines, xPosition, yPosition, textOptions);
        yPosition += lines.length * lineHeight;
    }
    
    // Função para adicionar título de seção
    function addSectionTitle(text, level = 1) {
        let fontSize, isBold, alignment;
        
        switch(level) {
            case 1: // Título principal (ex: 1 INTRODUÇÃO)
                fontSize = sizes.section;
                isBold = true;
                alignment = 'center';
                break;
            case 2: // Subseção (ex: 2.1 Metodologia)
                fontSize = sizes.subsection;
                isBold = true;
                alignment = 'left';
                break;
            case 3: // Subsubseção
                fontSize = sizes.text;
                isBold = true;
                alignment = 'left';
                break;
            default:
                fontSize = sizes.text;
                isBold = false;
                alignment = 'left';
        }
        
        // Verifica se cabe na página
        if (yPosition + (fontSize * spacing.line * 0.35) > page.height - margins.bottom) {
            addPage();
        }
        
        // Adiciona espaço antes do título
        yPosition += level === 1 ? 15 : 10;
        
        // Adiciona o título
        addText(text, fontSize, isBold, alignment, spacing.line);
        
        // Adiciona espaço após o título
        yPosition += 5;
    }
    
    // Função para adicionar parágrafo
    function addParagraph(text, indentFirstLine = true) {
        const formattedText = indentFirstLine ? '    ' + text : text; // Recuo de parágrafo (1.25cm)
        addText(formattedText, sizes.text, false, 'justify', spacing.line);
        yPosition += spacing.paragraph;
    }
    
    // Função para adicionar citação longa (ABNT)
    function addLongQuote(text, fontSize = sizes.small) {
        // Verifica se cabe na página
        const quoteHeight = estimateTextHeight(text, fontSize, 1.0);
        if (yPosition + quoteHeight > page.height - margins.bottom) {
            addPage();
        }
        
        // Configurações da citação
        const quoteIndent = 20;
        const lineHeight = fontSize * 1.0 * 0.35;
        
        // Posiciona a citação
        doc.setFontSize(fontSize);
        doc.setFont(fonts.italic);
        
        // Adiciona recuo e formatação
        const lines = doc.splitTextToSize(text, contentWidth - quoteIndent);
        lines.forEach((line, index) => {
            doc.text(line, margins.left + quoteIndent, yPosition + (index * lineHeight));
        });
        
        yPosition += lines.length * lineHeight + 10;
    }
    
    // Função para adicionar lista
    function addList(items, style, fontSize = sizes.text, lineSpacing = spacing.line) {
        const lineHeight = fontSize * lineSpacing * 0.35;
        
        items.forEach((item, index) => {
            let prefix = '';
            if (style === 'decimal') prefix = `${index + 1}. `;
            if (style === 'lower-alpha') prefix = `${String.fromCharCode(97 + index)}. `;
            if (style === 'upper-alpha') prefix = `${String.fromCharCode(65 + index)}. `;
            if (style === 'lower-roman') prefix = `${toRoman(index + 1)}. `;
            if (style === 'disc') prefix = '• ';
            
            const text = `${prefix}${item}`;
            
            // Verifica se cabe na página
            if (yPosition + lineHeight > page.height - margins.bottom) {
                addPage();
            }
            
            // Adiciona espaço antes do primeiro item se necessário
            if (index === 0) {
                yPosition += 5;
            }
            
            // Recuo para listas
            const listIndent = style === 'disc' ? 5 : 10;
            
            // Divide o texto em linhas se necessário
            const lines = doc.splitTextToSize(text, contentWidth - listIndent);
            lines.forEach((line, lineIndex) => {
                doc.text(line, margins.left + (lineIndex === 0 ? 0 : listIndent), yPosition + (lineIndex * lineHeight), {
                    maxWidth: contentWidth - listIndent,
                    align: 'left'
                });
            });
            
            yPosition += lines.length * lineHeight;
        });
        
        // Adiciona espaço após a lista
        yPosition += 8;
    }
    
    // Função para adicionar tabela
    function addTable(rows, title, source) {
        // Verifica se cabe na página
        const tableHeight = rows.length * 8 + 20; // Estimativa
        if (yPosition + tableHeight > page.height - margins.bottom) {
            addPage();
        }
        
        // Adiciona título da tabela
        addText(`Tabela ${tables.length + 1} - ${title}`, sizes.text, true, 'left');
        yPosition += 5;
        
        // Configurações da tabela
        const colCount = rows[0].length;
        const colWidth = contentWidth / colCount;
        const rowHeight = 8;
        const cellPadding = 2;
        
        // Desenha as bordas da tabela
        doc.setDrawColor(0);
        doc.setLineWidth(0.2);
        
        // Desenha cabeçalho (se necessário)
        doc.setFillColor(240, 240, 240);
        doc.rect(margins.left, yPosition, contentWidth, rowHeight, 'F');
        
        // Desenha células
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows[i].length; j++) {
                // Desenha borda da célula
                doc.rect(margins.left + (j * colWidth), yPosition + (i * rowHeight), colWidth, rowHeight);
                
                // Adiciona texto
                doc.setFontSize(sizes.text);
                doc.text(rows[i][j], 
                         margins.left + (j * colWidth) + cellPadding, 
                         yPosition + (i * rowHeight) + cellPadding + 4, {
                    maxWidth: colWidth - (cellPadding * 2)
                });
            }
        }
        
        yPosition += rows.length * rowHeight + 10;
        
        // Adiciona fonte
        addText(`Fonte: ${source}`, sizes.small, false, 'right');
        yPosition += 10;
    }
    
    // Função para adicionar nota de rodapé
    function addFootnote(marker, text) {
        // Verifica se há espaço na página atual
        const footnoteHeight = estimateTextHeight(`${marker} ${text}`, sizes.footnote, 1.0);
        if (yPosition + footnoteHeight > page.height - margins.bottom - 10) {
            addPage();
        }
        
        // Adiciona linha separadora
        doc.setDrawColor(150);
        doc.setLineWidth(0.1);
        doc.line(margins.left, yPosition, page.width - margins.right, yPosition);
        yPosition += 3;
        
        // Adiciona texto da nota
        doc.setFontSize(sizes.footnote);
        doc.text(`${marker} ${text}`, margins.left + 5, yPosition, {
            maxWidth: contentWidth - 5
        });
        
        yPosition += footnoteHeight + 5;
    }
    
    // Função auxiliar para números romanos
    function toRoman(num) {
        const roman = {
            M: 1000, CM: 900, D: 500, CD: 400,
            C: 100, XC: 90, L: 50, XL: 40,
            X: 10, IX: 9, V: 5, IV: 4, I: 1
        };
        let str = '';
        
        for (let i of Object.keys(roman)) {
            let q = Math.floor(num / roman[i]);
            num -= q * roman[i];
            str += i.repeat(q);
        }
        
        return str.toLowerCase();
    }
    
    // Função para adicionar imagem mantendo proporção
    async function addImage(imgData, maxWidth, maxHeight, caption = '', source = '') {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = function() {
                // Calcular dimensões mantendo proporção
                let width = img.width;
                let height = img.height;
                
                if (width > maxWidth) {
                    const ratio = maxWidth / width;
                    width = maxWidth;
                    height = height * ratio;
                }
                
                if (height > maxHeight) {
                    const ratio = maxHeight / height;
                    height = maxHeight;
                    width = width * ratio;
                }
                
                // Verificar se cabe na página
                if (yPosition + height > page.height - margins.bottom - (caption ? 15 : 0)) {
                    addPage();
                }
                
                // Centralizar imagem
                const xPosition = (page.width - width) / 2;
                
                // Adicionar espaço antes da imagem
                yPosition += 10;
                
                // Adicionar imagem
                doc.addImage(imgData, 'JPEG', xPosition, yPosition, width, height);
                yPosition += height + 5;
                
                // Adicionar legenda se existir
                if (caption) {
                    addText(`Figura ${illustrations.length}: ${caption}`, sizes.small, false, 'center', 1);
                    yPosition += 5;
                }
                
                // Adicionar fonte se existir
                if (source) {
                    addText(`Fonte: ${source}`, sizes.small, false, 'center', 1);
                    yPosition += 10;
                }
                
                resolve();
            };
            img.src = imgData;
        });
    }
    
    // Função para adicionar nova página
    function addPage() {
        doc.addPage();
        currentPage++;
        yPosition = margins.top;
        
        // Adicionar número da página (exceto na capa)
        if (currentPage > 1) {
            addPageNumber();
        }
    }
    
    // Função para adicionar número da página
    function addPageNumber() {
        doc.setFontSize(sizes.small);
        doc.setFont(fonts.normal);
        doc.text(`${currentPage}`, page.width - margins.right, 10);
    }
    
    // Função para adicionar item de sumário com pontos condutores
    function addSummaryItem(text, pageNum) {
        const textX = margins.left;
        const pageX = page.width - margins.right;
        const textY = yPosition;
        
        // Adicionar o texto
        doc.text(text, textX, textY);
        
        // Adicionar os pontos condutores
        const textWidth = doc.getTextWidth(text);
        const dotsStart = textX + textWidth + 2;
        const dotsEnd = pageX - doc.getTextWidth(pageNum.toString()) - 5;
        
        if (dotsEnd > dotsStart) {
            const dotsCount = Math.floor((dotsEnd - dotsStart) / 2);
            const dots = '.'.repeat(dotsCount);
            doc.text(dots, dotsStart, textY);
        }
        
        // Adicionar o número da página
        doc.text(pageNum.toString(), pageX, textY, { align: 'right' });
        
        yPosition += 8;
    }
    
    // CAPA (página 1)
    doc.setPage(1);
    sectionPages['capa'].start = 1;
    
    if (logoFile) {
        await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = async function(event) {
                const imgData = event.target.result;
                const img = new Image();
                img.onload = function() {
                    // Definir tamanho máximo para logo
                    const maxWidth = 50;
                    const maxHeight = 30;
                    let width = img.width;
                    let height = img.height;
                    
                    // Redimensionar mantendo proporção
                    if (width > maxWidth) {
                        const ratio = maxWidth / width;
                        width = maxWidth;
                        height = height * ratio;
                    }
                    
                    if (height > maxHeight) {
                        const ratio = maxHeight / height;
                        height = maxHeight;
                        width = width * ratio;
                    }
                    
                    // Centralizar
                    const centerX = (page.width - width) / 2;
                    
                    // Posicionar a logo
                    doc.addImage(imgData, 'JPEG', centerX, margins.top, width, height);
                    yPosition = margins.top + height + 20;
                    
                    // Restante da capa
                    addText(institution.toUpperCase(), sizes.section, true, 'center');
                    addText(faculty, sizes.text, false, 'center');
                    addText(course, sizes.text, false, 'center');
                    
                    // Espaço de 1/3 da página
                    yPosition = margins.top + (page.height / 3);
                    
                    // Título do trabalho (CAIXA ALTA, centralizado)
                    addText(title.toUpperCase(), sizes.title, true, 'center');
                    
                    // Subtítulo (se existir, centralizado)
                    if (subtitle) {
                        addText(subtitle, sizes.section, false, 'center');
                    }
                    
                    // Espaço de 2/3 da página
                    yPosition = margins.top + (page.height * 2/3);
                    
                    // Autor(es) (centralizado)
                    addText(author, sizes.text, false, 'center');
                    
                    // Local e data (centralizado, na parte inferior)
                    yPosition = page.height - margins.bottom - 20;
                    addText(`${city}`, sizes.text, false, 'center');
                    addText(`${year}`, sizes.text, false, 'center');
                    
                    resolve();
                };
                img.src = imgData;
            };
            reader.readAsDataURL(logoFile);
        });
    } else {
        // Versão sem logo
        addText(institution.toUpperCase(), sizes.section, true, 'center');
        addText(faculty, sizes.text, false, 'center');
        addText(course, sizes.text, false, 'center');
        
        // Espaço de 1/3 da página
        yPosition = margins.top + (page.height / 3);
        
        // Título do trabalho (CAIXA ALTA, centralizado)
        addText(title.toUpperCase(), sizes.title, true, 'center');
        
        // Subtítulo (se existir, centralizado)
        if (subtitle) {
            addText(subtitle, sizes.section, false, 'center');
        }
        
        // Espaço de 2/3 da página
        yPosition = margins.top + (page.height * 2/3);
        
        // Autor(es) (centralizado)
        addText(author, sizes.text, false, 'center');
        
        // Local e data (centralizado, na parte inferior)
        yPosition = page.height - margins.bottom - 20;
        addText(`${city}`, sizes.text, false, 'center');
        addText(`${year}`, sizes.text, false, 'center');
    }
    
    // Folha de rosto (página 2)
    addPage();
    sectionPages['folha_rosto'].start = currentPage;
    
    // Repete informações da capa com adicionais
    addText(institution.toUpperCase(), sizes.section, true, 'center');
    addText(faculty, sizes.text, false, 'center');
    addText(course, sizes.text, false, 'center');
    
    yPosition += 20;
    
    addText(title.toUpperCase(), sizes.title, true, 'center');
    if (subtitle) {
        addText(subtitle, sizes.section, false, 'center');
    }
    
    yPosition += 30;
    
    // Texto específico da folha de rosto (personalizável)
    const frontPageLines = frontPageText.split('\n').filter(line => line.trim() !== '');
    frontPageLines.forEach(line => {
        addText(line, sizes.text, false, 'right');
    });
    
    yPosition += 20;
    
    addText(`Professor: ${professor}`, sizes.text, false, 'center');
    addText(author, sizes.text, false, 'center');
    
    yPosition += 20;
    
    addText(`${city}`, sizes.text, false, 'center');
    addText(`${year}`, sizes.text, false, 'center');
    
    // Folha de aprovação (página 3)
    if (approvalText) {
        addPage();
        sectionPages['folha_aprovacao'].start = currentPage;
        
        addText('FOLHA DE APROVAÇÃO', sizes.section, true, 'center');
        yPosition += 20;
        
        const approvalLines = approvalText.split('\n').filter(line => line.trim() !== '');
        approvalLines.forEach(line => {
            addText(line, sizes.text, false, 'center');
        });
        
        yPosition += 20;
        
        // Adicionar linhas para assinaturas
        addText('_________________________________________', sizes.text, false, 'center');
        addText('Nome do Professor Orientador', sizes.text, false, 'center');
        yPosition += 20;
        
        addText('_________________________________________', sizes.text, false, 'center');
        addText('Nome do Avaliador 1', sizes.text, false, 'center');
        yPosition += 20;
        
        addText('_________________________________________', sizes.text, false, 'center');
        addText('Nome do Avaliador 2', sizes.text, false, 'center');
        yPosition += 20;
        
        addText(`Data de aprovação: ___/___/_______`, sizes.text, false, 'center');
    }
    
    // Dedicatória (opcional, página seguinte)
    if (dedication) {
        addPage();
        sectionPages['dedicatoria'].start = currentPage;
        
        yPosition = page.height / 2 - 20;
        addText('DEDICATÓRIA', sizes.section, true, 'center');
        yPosition += 20;
        
        const dedicationLines = dedication.split('\n').filter(line => line.trim() !== '');
        dedicationLines.forEach(line => {
            addText(line, sizes.text, false, 'center', 1.5);
            yPosition += 10;
        });
    }
    
    // Agradecimentos (opcional, página seguinte)
    if (acknowledgments) {
        addPage();
        sectionPages['agradecimentos'].start = currentPage;
        
        addText('AGRADECIMENTOS', sizes.section, true, 'center');
        yPosition += 20;
        
        const acknowledgmentLines = acknowledgments.split('\n').filter(line => line.trim() !== '');
        acknowledgmentLines.forEach(line => {
            addParagraph(line, false);
        });
    }
    
    // Epígrafe (opcional, página seguinte)
    if (epigraph) {
        addPage();
        sectionPages['epigrafe'].start = currentPage;
        
        yPosition = page.height / 2 - 20;
        addText('EPÍGRAFE', sizes.section, true, 'center');
        yPosition += 20;
        
        const epigraphLines = epigraph.split('\n').filter(line => line.trim() !== '');
        epigraphLines.forEach(line => {
            addText(line, sizes.text, true, 'center', 1.5);
            yPosition += 10;
        });
    }
    
    // Resumo (página seguinte)
    addPage();
    sectionPages['resumo'].start = currentPage;
    
    addText('RESUMO', sizes.section, true, 'center');
    yPosition += 15;
    
    // Texto do resumo
    addText(abstract, sizes.text, false, 'justify');
    yPosition += 10;
    
    // Palavras-chave
    if (keywords) {
        addText(`Palavras-chave: ${keywords}`, sizes.text, false, 'left');
    }
    
    // Abstract (opcional, página seguinte)
    if (englishAbstract) {
        addPage();
        sectionPages['abstract'].start = currentPage;
        
        addText('ABSTRACT', sizes.section, true, 'center');
        yPosition += 15;
        
        // Texto do abstract
        addText(englishAbstract, sizes.text, false, 'justify');
        yPosition += 10;
        
        // Keywords
        if (englishKeywords) {
            addText(`Keywords: ${englishKeywords}`, sizes.text, false, 'left');
        }
    }
    
    // Lista de ilustrações (se aplicável, página seguinte)
    if (illustrations.length > 0) {
        addPage();
        sectionPages['lista_ilustracoes'].start = currentPage;
        
        addText('LISTA DE ILUSTRAÇÕES', sizes.section, true, 'center');
        yPosition += 20;
        
        illustrations.forEach((illus, index) => {
            addSummaryItem(`Figura ${index + 1} - ${illus.caption}`, 0); // Página será atualizada depois
        });
    }
    
    // Lista de tabelas (se aplicável, página seguinte)
    if (tables.length > 0) {
        addPage();
        sectionPages['lista_tabelas'].start = currentPage;
        
        addText('LISTA DE TABELAS', sizes.section, true, 'center');
        yPosition += 20;
        
        tables.forEach((table, index) => {
            addSummaryItem(`Tabela ${index + 1} - ${table.title}`, 0); // Página será atualizada depois
        });
    }
    
    // Lista de abreviaturas (opcional, página seguinte)
    if (document.getElementById('abbreviations').value) {
        const abbreviations = document.getElementById('abbreviations').value.split('\n').filter(abbr => abbr.trim() !== '');
        if (abbreviations.length > 0) {
            addPage();
            sectionPages['lista_abreviaturas'].start = currentPage;
            
            addText('LISTA DE ABREVIATURAS E SIGLAS', sizes.section, true, 'center');
            yPosition += 20;
            
            abbreviations.forEach(abbr => {
                const [term, definition] = abbr.split(':').map(item => item.trim());
                if (term && definition) {
                    addText(`${term}`, sizes.text, true, 'left');
                    addText(definition, sizes.text, false, 'left');
                    yPosition += 8;
                }
            });
        }
    }
    
    // Sumário (página seguinte)
    addPage();
    const summaryPage = currentPage;
    sectionPages['sumario'].start = currentPage;
    
    addText('SUMÁRIO', sizes.section, true, 'center');
    yPosition += 20;
    
    // Introdução (página seguinte)
    addPage();
    sectionPages['introducao'].start = currentPage;
    addSectionTitle('1 INTRODUÇÃO', 1);
    const introParagraphs = introduction.split('\n').filter(p => p.trim() !== '');
    introParagraphs.forEach(p => addParagraph(p));
    
    // Desenvolvimento (página seguinte)
    addPage();
    sectionPages['desenvolvimento'].start = currentPage;
    addSectionTitle('2 DESENVOLVIMENTO', 1);
    
    // Processar cada seção de desenvolvimento
    for (const section of developmentSections) {
        addSectionTitle(`2.${section.number} ${section.title}`, 2);
        
        // Processar cada conteúdo da seção
        for (const content of section.contents) {
            if (content.type === 'text') {
                const paragraphs = content.value.split('\n').filter(p => p.trim() !== '');
                paragraphs.forEach(p => addParagraph(p));
            } 
            else if (content.type === 'list') {
                addList(content.items, content.style);
            } 
            else if (content.type === 'image') {
                await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = async function(event) {
                        // Atualizar página da ilustração
                        const illusIndex = illustrations.findIndex(i => i.caption === content.caption);
                        if (illusIndex !== -1) {
                            illustrations[illusIndex].page = currentPage;
                        }
                        
                        await addImage(event.target.result, contentWidth, 100, content.caption, content.source);
                        resolve();
                    };
                    reader.readAsDataURL(content.file);
                });
            }
            else if (content.type === 'table') {
                // Atualizar página da tabela
                const tableIndex = tables.findIndex(t => t.title === content.title);
                if (tableIndex !== -1) {
                    tables[tableIndex].page = currentPage;
                }
                
                addTable(content.rows, content.title, content.source);
            }
        }
        
        // Adicionar notas de rodapé da seção
        if (section.footnotes.length > 0) {
            for (const footnote of section.footnotes) {
                addFootnote(footnote.marker, footnote.text);
            }
        }
    }
    
    // Conclusão (página seguinte)
    addPage();
    sectionPages['conclusao'].start = currentPage;
    addSectionTitle('3 CONCLUSÃO', 1);
    const conclusionParagraphs = conclusion.split('\n').filter(p => p.trim() !== '');
    conclusionParagraphs.forEach(p => addParagraph(p));
    
    // Referências (nova página)
    addPage();
    sectionPages['referencias'].start = currentPage;
    addSectionTitle('REFERÊNCIAS', 1);
    
    // Ordenar referências alfabeticamente
    references.sort((a, b) => {
        // Extrai o sobrenome do autor (primeira palavra antes da vírgula)
        const getAuthor = (ref) => {
            const commaIndex = ref.indexOf(',');
            return commaIndex !== -1 ? ref.substring(0, commaIndex).toUpperCase() : ref.toUpperCase();
        };
        return getAuthor(a).localeCompare(getAuthor(b));
    });
    
    // Adicionar referências formatadas
    references.forEach(ref => {
        if (ref.trim()) {
            addText(ref.trim(), sizes.text, false, 'left', spacing.line);
            yPosition += 4; // Espaço entre referências
        }
    });
    
    // Apêndices (opcional, nova página)
    if (appendices.length > 0) {
        addPage();
        sectionPages['apendices'].start = currentPage;
        addSectionTitle('APÊNDICES', 1);
        
        appendices.forEach((app, index) => {
            const letter = String.fromCharCode(65 + index); // A, B, C, ...
            addSectionTitle(`APÊNDICE ${letter} - ${app}`, 2);
            yPosition += 15;
        });
    }
    
    // Anexos (opcional, nova página)
    if (annexes.length > 0) {
        addPage();
        sectionPages['anexos'].start = currentPage;
        addSectionTitle('ANEXOS', 1);
        
        annexes.forEach((ann, index) => {
            const letter = String.fromCharCode(65 + index); // A, B, C, ...
            addSectionTitle(`ANEXO ${letter} - ${ann}`, 2);
            yPosition += 15;
        });
    }
    
    // Atualizar o sumário com as páginas corretas
    doc.setPage(summaryPage);
    yPosition = margins.top + 20;
    
    // Adicionar título do sumário
    addText('SUMÁRIO', sizes.section, true, 'center');
    yPosition += 20;
    
    // Adicionar itens do sumário com pontos condutores
    if (sectionPages['resumo'].start) addSummaryItem('RESUMO', sectionPages['resumo'].start);
    if (sectionPages['abstract'].start) addSummaryItem('ABSTRACT', sectionPages['abstract'].start);
    if (sectionPages['lista_ilustracoes'].start) addSummaryItem('LISTA DE ILUSTRAÇÕES', sectionPages['lista_ilustracoes'].start);
    if (sectionPages['lista_tabelas'].start) addSummaryItem('LISTA DE TABELAS', sectionPages['lista_tabelas'].start);
    if (sectionPages['lista_abreviaturas'].start) addSummaryItem('LISTA DE ABREVIATURAS', sectionPages['lista_abreviaturas'].start);
    addSummaryItem('1 INTRODUÇÃO', sectionPages['introducao'].start);
    addSummaryItem('2 DESENVOLVIMENTO', sectionPages['desenvolvimento'].start);
    
    developmentSections.forEach(section => {
        addSummaryItem(`2.${section.number} ${section.title}`, sectionPages['desenvolvimento'].start);
    });
    
    addSummaryItem('3 CONCLUSÃO', sectionPages['conclusao'].start);
    addSummaryItem('REFERÊNCIAS', sectionPages['referencias'].start);
    if (sectionPages['apendices'].start) addSummaryItem('APÊNDICES', sectionPages['apendices'].start);
    if (sectionPages['anexos'].start) addSummaryItem('ANEXOS', sectionPages['anexos'].start);
    
    // Atualizar listas de ilustrações e tabelas com números de página
    if (illustrations.length > 0) {
        doc.setPage(sectionPages['lista_ilustracoes'].start);
        yPosition = margins.top + 20;
        addText('LISTA DE ILUSTRAÇÕES', sizes.section, true, 'center');
        yPosition += 20;
        
        illustrations.forEach((illus, index) => {
            addSummaryItem(`Figura ${index + 1} - ${illus.caption}`, illus.page);
        });
    }
    
    if (tables.length > 0) {
        doc.setPage(sectionPages['lista_tabelas'].start);
        yPosition = margins.top + 20;
        addText('LISTA DE TABELAS', sizes.section, true, 'center');
        yPosition += 20;
        
        tables.forEach((table, index) => {
            addSummaryItem(`Tabela ${index + 1} - ${table.title}`, table.page);
        });
    }
    
    // Atualizar números de página em todas as páginas (exceto capa)
    for (let i = 2; i <= doc.internal.pages.length; i++) {
        doc.setPage(i);
        doc.setFontSize(sizes.small);
        doc.setFont(fonts.normal);
        doc.text(`${i}`, page.width - margins.right, 10);
    }
    
    // Salvar o PDF
    const fileName = `Trabalho_${title.substring(0, 30).replace(/[^\w\s]/gi, '').replace(/\s+/g, '_')}.pdf`;
    doc.save(fileName);
}