/**
 * ============================================================================
 * MarkViewer - Visor Moderno de Markdown con Drag & Drop
 * Solo HTML5, CSS3 y JavaScript (Vanilla)
 * ============================================================================
 */

(function () {
  'use strict';

  // --- Estado Global de la Aplicación ---
  const state = {
    files: [],            // Array de { id, name, content, originalContent, size, lastModified }
    activeFileId: null,   // ID del archivo actualmente visualizado
    viewMode: 'preview',  // 'preview' | 'split' | 'editor'
    theme: 'dark',        // 'dark' | 'light'
    sidebarOpen: true
  };

  // --- Referencias DOM ---
  const DOM = {
    html: document.documentElement,
    globalDropOverlay: document.getElementById('globalDropOverlay'),
    emptyDropzone: document.getElementById('emptyDropzone'),
    contentWorkspace: document.getElementById('contentWorkspace'),
    editorPane: document.getElementById('editorPane'),
    previewPane: document.getElementById('previewPane'),
    markdownInput: document.getElementById('markdownInput'),
    markdownOutput: document.getElementById('markdownOutput'),
    previewScrollable: document.getElementById('previewScrollable'),
    fileInput: document.getElementById('fileInput'),
    selectFileBtn: document.getElementById('selectFileBtn'),
    dzSelectBtn: document.getElementById('dzSelectBtn'),
    loadSampleBtn: document.getElementById('loadSampleBtn'),
    dzSampleBtn: document.getElementById('dzSampleBtn'),
    toggleSidebarBtn: document.getElementById('toggleSidebarBtn'),
    sidebar: document.getElementById('sidebar'),
    sidebarTabs: document.querySelectorAll('.sidebar-tab'),
    tabPanes: document.querySelectorAll('.sidebar-content-pane'),
    fileListContainer: document.getElementById('fileListContainer'),
    filesCountBadge: document.getElementById('filesCountBadge'),
    tocContainer: document.getElementById('tocContainer'),
    currentFileBadge: document.getElementById('currentFileBadge'),
    currentFileName: document.getElementById('currentFileName'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    themeIconSun: document.getElementById('themeIconSun'),
    themeIconMoon: document.getElementById('themeIconMoon'),
    hljsDark: document.getElementById('hljs-theme-dark'),
    hljsLight: document.getElementById('hljs-theme-light'),
    modePreviewBtn: document.getElementById('modePreviewBtn'),
    modeSplitBtn: document.getElementById('modeSplitBtn'),
    modeEditorBtn: document.getElementById('modeEditorBtn'),
    backToTopBtn: document.getElementById('backToTopBtn'),
    toastContainer: document.getElementById('toastContainer'),
    downloadPdfBtn: document.getElementById('downloadPdfBtn'),
    exportMenuBtn: document.getElementById('exportMenuBtn'),
    exportDropdown: document.getElementById('exportDropdown'),
    actionDownloadPdf: document.getElementById('actionDownloadPdf'),
    actionCopyMd: document.getElementById('actionCopyMd'),
    actionCopyHtml: document.getElementById('actionCopyHtml'),
    actionDownloadMd: document.getElementById('actionDownloadMd'),
    actionPrintPdf: document.getElementById('actionPrintPdf'),
    actionClear: document.getElementById('actionClear'),
    clearAllFilesBtn: document.getElementById('clearAllFilesBtn'),
    editorResetBtn: document.getElementById('editorResetBtn'),
    statWords: document.getElementById('statWords'),
    statChars: document.getElementById('statChars'),
    statLines: document.getElementById('statLines'),
    statReadingTime: document.getElementById('statReadingTime'),
    statFileSize: document.getElementById('statFileSize')
  };

  // --- Documento de demostración incorporado ---
  const SAMPLE_MARKDOWN = `# ¡Bienvenido a MarkViewer! 🚀

Un visor y editor web interactivo para tus archivos **Markdown**, construido con **HTML5**, **CSS3** y **JavaScript**.

---

## ✨ Características Principales

- 📂 **Arrastrar y Soltar (Drag & Drop)**: Arrastra cualquier archivo \`.md\`, \`.markdown\` o \`.txt\` directamente a esta ventana.
- 📑 **Selector Multi-Archivo**: Carga varios archivos a la vez y navega entre ellos en la barra lateral.
- 🎨 **Temas Claro y Oscuro**: Alterna fácilmente con el botón de sol/luna en la barra superior.
- ⚡ **Modo Dividido y Editor**: Edita el código Markdown en vivo mientras observas los cambios renderizados.
- 🗂️ **Índice Automático (TOC)**: Navega por los encabezados de tu documento al instante.
- 📋 **Resaltado y Copia de Código**: Bloques de código con detección de sintaxis y botón de copia con un clic.
- 🖨️ **Exportación a PDF**: Imprime o guarda como PDF optimizado sin menús ni elementos sobrantes.

---

## 💻 Ejemplos de Código

### JavaScript (Moderno)
\`\`\`javascript
// Función para procesar y renderizar Markdown
function renderMarkdown(rawText) {
  const dirtyHtml = marked.parse(rawText, { gfm: true, breaks: true });
  const cleanHtml = DOMPurify.sanitize(dirtyHtml);
  return cleanHtml;
}

console.log("¡MarkViewer listo para usar!");
\`\`\`

### Python
\`\`\`python
def fibonacci(n: int) -> list[int]:
    """Genera la secuencia de Fibonacci hasta n términos."""
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

print(fibonacci(10))
\`\`\`

### CSS (Variables y Glassmorphism)
\`\`\`css
.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
\`\`\`

---

## 📊 Tabla Comparativa

| Característica | MarkViewer Web | Visores Tradicionales |
| :--- | :---: | :---: |
| **Instalación requerida** | ❌ No (100% en navegador) | ⚠️ Requiere apps/extensiones |
| **Drag & Drop en pantalla completa** | ✅ Sí | ⚠️ Limitado |
| **Pestañas multi-archivo** | ✅ Sí | ❌ Solo uno |
| **Modo Editor en vivo** | ✅ Sí | ❌ Solo lectura |
| **Exportar a PDF limpio** | ✅ Sí (\`Ctrl+P\`) | ⚠️ Variable |

---

## ✅ Lista de Tareas y Verificación

- [x] Soporte para Drag & Drop interactivo
- [x] Selector de archivos local (\`.md\`, \`.markdown\`, \`.txt\`)
- [x] Sanitización segura contra ataques XSS con DOMPurify
- [x] Resaltado de sintaxis con Highlight.js
- [x] Copiar código de bloques con un clic
- [x] Métricas de palabras, caracteres y tiempo de lectura
- [ ] ¡Probar con tus propios archivos Markdown!

---

## 💬 Citas y Notas

> *"La simplicidad es el requisito previo para la fiabilidad."*  
> — **Edsger W. Dijkstra**

---

### Enlaces y Referencias
- Visita la [Guía de Sintaxis Markdown](https://www.markdownguide.org) para aprender más sobre el formato.
- Explora las opciones en la barra superior para alternar vistas o exportar.
`;

  // --- Inicialización de Marked.js ---
  function initMarked() {
    if (typeof marked !== 'undefined') {
      marked.setOptions({
        gfm: true,
        breaks: true,
        headerIds: true,
        mangle: false
      });
    }
  }

  // --- Sistema de Notificaciones (Toasts) ---
  function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '';
    if (type === 'success') {
      icon = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'error') {
      icon = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    } else {
      icon = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `${icon}<span>${message}</span>`;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  // --- Gestión de Tema (Claro / Oscuro) ---
  function initTheme() {
    const savedTheme = localStorage.getItem('markviewer_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(theme);
  }

  function setTheme(theme) {
    state.theme = theme;
    DOM.html.setAttribute('data-theme', theme);
    localStorage.setItem('markviewer_theme', theme);

    if (theme === 'dark') {
      DOM.themeIconSun.style.display = 'block';
      DOM.themeIconMoon.style.display = 'none';
      if (DOM.hljsDark) DOM.hljsDark.removeAttribute('disabled');
      if (DOM.hljsLight) DOM.hljsLight.setAttribute('disabled', 'true');
    } else {
      DOM.themeIconSun.style.display = 'none';
      DOM.themeIconMoon.style.display = 'block';
      if (DOM.hljsDark) DOM.hljsDark.setAttribute('disabled', 'true');
      if (DOM.hljsLight) DOM.hljsLight.removeAttribute('disabled');
    }
  }

  function toggleTheme() {
    setTheme(state.theme === 'dark' ? 'light' : 'dark');
  }

  // --- Modos de Visualización (Visor / Dividido / Editor) ---
  function setViewMode(mode) {
    state.viewMode = mode;

    DOM.contentWorkspace.classList.remove('view-preview', 'view-split', 'view-editor');
    DOM.contentWorkspace.classList.add(`view-${mode}`);

    DOM.modePreviewBtn.classList.toggle('active', mode === 'preview');
    DOM.modeSplitBtn.classList.toggle('active', mode === 'split');
    DOM.modeEditorBtn.classList.toggle('active', mode === 'editor');
  }

  // --- Carga y Gestión de Archivos ---
  function generateFileId() {
    return 'file_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  }

  function formatBytes(bytes, decimals = 1) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  async function handleFileList(fileList) {
    if (!fileList || fileList.length === 0) return;

    let addedCount = 0;
    for (const file of Array.from(fileList)) {
      // Admitir extensiones markdown o archivos de texto plano
      const validExtensions = ['.md', '.markdown', '.txt', '.mdown', '.mkd'];
      const ext = '.' + file.name.split('.').pop().toLowerCase();
      
      if (validExtensions.includes(ext) || file.type.startsWith('text/')) {
        try {
          const content = await file.text();
          const newDoc = {
            id: generateFileId(),
            name: file.name,
            content: content,
            originalContent: content,
            size: file.size,
            lastModified: file.lastModified
          };
          state.files.push(newDoc);
          state.activeFileId = newDoc.id;
          addedCount++;
        } catch (err) {
          console.error('Error al leer el archivo:', file.name, err);
          showToast(`Error al leer ${file.name}`, 'error');
        }
      } else {
        showToast(`Formato no soportado: ${file.name}`, 'error');
      }
    }

    if (addedCount > 0) {
      updateSidebarFileList();
      loadActiveDocument();
      showToast(addedCount === 1 ? 'Archivo cargado con éxito' : `${addedCount} archivos importados`, 'success');
    }
  }

  function loadSampleDocument() {
    const existingSample = state.files.find(f => f.name === 'ejemplo.md');
    if (existingSample) {
      setActiveFile(existingSample.id);
      showToast('Documento de ejemplo seleccionado', 'info');
      return;
    }

    const sampleDoc = {
      id: generateFileId(),
      name: 'ejemplo.md',
      content: SAMPLE_MARKDOWN,
      originalContent: SAMPLE_MARKDOWN,
      size: new Blob([SAMPLE_MARKDOWN]).size,
      lastModified: Date.now()
    };

    state.files.push(sampleDoc);
    state.activeFileId = sampleDoc.id;
    updateSidebarFileList();
    loadActiveDocument();
    showToast('Ejemplo cargado con éxito', 'success');
  }

  function setActiveFile(fileId) {
    state.activeFileId = fileId;
    updateSidebarFileList();
    loadActiveDocument();
  }

  function closeFile(fileId, event) {
    if (event) event.stopPropagation();

    const index = state.files.findIndex(f => f.id === fileId);
    if (index === -1) return;

    state.files.splice(index, 1);

    if (state.activeFileId === fileId) {
      if (state.files.length > 0) {
        state.activeFileId = state.files[Math.max(0, index - 1)].id;
      } else {
        state.activeFileId = null;
      }
    }

    updateSidebarFileList();
    loadActiveDocument();
    showToast('Archivo cerrado', 'info');
  }

  function clearAllFiles() {
    if (state.files.length === 0) return;
    state.files = [];
    state.activeFileId = null;
    updateSidebarFileList();
    loadActiveDocument();
    showToast('Todos los archivos han sido cerrados', 'info');
  }

  function getActiveFile() {
    return state.files.find(f => f.id === state.activeFileId) || null;
  }

  function loadActiveDocument() {
    const activeDoc = getActiveFile();

    if (!activeDoc) {
      DOM.emptyDropzone.style.display = 'flex';
      DOM.contentWorkspace.style.display = 'none';
      DOM.currentFileBadge.style.display = 'none';
      clearStats();
      clearToc();
      return;
    }

    DOM.emptyDropzone.style.display = 'none';
    DOM.contentWorkspace.style.display = 'flex';
    DOM.currentFileBadge.style.display = 'inline-flex';
    DOM.currentFileName.textContent = activeDoc.name;

    DOM.markdownInput.value = activeDoc.content;
    renderMarkdownContent(activeDoc.content);
    updateStats(activeDoc.content, activeDoc.size);
    DOM.previewScrollable.scrollTop = 0;
  }

  // --- Renderizado de Markdown y Post-procesamiento ---
  function renderMarkdownContent(rawMarkdown) {
    if (!rawMarkdown) {
      DOM.markdownOutput.innerHTML = '<p class="text-muted">El documento está vacío.</p>';
      clearToc();
      return;
    }

    try {
      // 1. Convertir Markdown a HTML con marked
      const rawHtml = marked.parse(rawMarkdown);

      // 2. Sanitizar HTML con DOMPurify para seguridad contra inyecciones XSS
      const cleanHtml = DOMPurify.sanitize(rawHtml, {
        ADD_ATTR: ['target', 'rel', 'checked', 'disabled'],
        USE_PROFILES: { html: true }
      });

      DOM.markdownOutput.innerHTML = cleanHtml;

      // 3. Post-procesamiento: resaltar código y añadir botones de copia
      enhanceCodeBlocks();

      // 4. Generar encabezados únicos y construir Tabla de Contenidos (TOC)
      buildTableOfContents();

      // 5. Configurar enlaces externos para abrir en nueva pestaña
      enhanceLinks();

    } catch (err) {
      console.error('Error al renderizar Markdown:', err);
      DOM.markdownOutput.innerHTML = `<div class="toast toast-error">Error al procesar el archivo Markdown: ${err.message}</div>`;
    }
  }

  // Mejorar bloques de código con cabecera y botón de copia
  function enhanceCodeBlocks() {
    const preBlocks = DOM.markdownOutput.querySelectorAll('pre');

    preBlocks.forEach((pre) => {
      // Evitar envolver dos veces
      if (pre.parentElement && pre.parentElement.classList.contains('code-block-wrapper')) return;

      const codeElement = pre.querySelector('code');
      if (!codeElement) return;

      // Detectar clase de lenguaje (ej: language-javascript)
      let lang = 'código';
      codeElement.classList.forEach((cls) => {
        if (cls.startsWith('language-')) {
          lang = cls.replace('language-', '');
        }
      });

      // Resaltar sintaxis con highlight.js si está disponible
      if (typeof hljs !== 'undefined') {
        hljs.highlightElement(codeElement);
      }

      // Crear envoltorio moderno
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';

      const header = document.createElement('div');
      header.className = 'code-block-header';
      header.innerHTML = `
        <span>${lang.toUpperCase()}</span>
        <button class="code-copy-btn" title="Copiar código al portapapeles">
          <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <span>Copiar</span>
        </button>
      `;

      const copyBtn = header.querySelector('.code-copy-btn');
      copyBtn.addEventListener('click', async () => {
        const textToCopy = codeElement.innerText;
        try {
          await navigator.clipboard.writeText(textToCopy);
          copyBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>¡Copiado!</span>
          `;
          copyBtn.style.color = 'var(--success-color)';
          setTimeout(() => {
            copyBtn.innerHTML = `
              <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copiar</span>
            `;
            copyBtn.style.color = '';
          }, 2000);
        } catch (e) {
          showToast('No se pudo copiar el código', 'error');
        }
      });

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);
    });
  }

  // Enlaces seguros hacia afuera
  function enhanceLinks() {
    const links = DOM.markdownOutput.querySelectorAll('a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  // Generador de Índice (TOC)
  function buildTableOfContents() {
    const headings = DOM.markdownOutput.querySelectorAll('h1, h2, h3, h4');
    DOM.tocContainer.innerHTML = '';

    if (headings.length === 0) {
      DOM.tocContainer.innerHTML = '<div class="empty-list-message">El documento no tiene encabezados detectados.</div>';
      return;
    }

    const fragment = document.createDocumentFragment();

    headings.forEach((heading, index) => {
      // Crear ID único para salto de navegación
      let id = heading.id;
      if (!id) {
        id = heading.textContent
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '') || `seccion-${index + 1}`;
        heading.id = id;
      }

      const level = parseInt(heading.tagName.substring(1), 10);
      const tocLink = document.createElement('a');
      tocLink.className = `toc-item toc-level-${level}`;
      tocLink.href = `#${id}`;
      tocLink.textContent = heading.textContent;
      tocLink.title = heading.textContent;

      tocLink.addEventListener('click', (e) => {
        e.preventDefault();
        const targetElement = document.getElementById(id);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });

      fragment.appendChild(tocLink);
    });

    DOM.tocContainer.appendChild(fragment);
  }

  function clearToc() {
    DOM.tocContainer.innerHTML = '<div class="empty-list-message">No hay archivo activo.</div>';
  }

  // Actualización de lista de archivos en el Sidebar
  function updateSidebarFileList() {
    DOM.filesCountBadge.textContent = state.files.length;
    DOM.fileListContainer.innerHTML = '';

    if (state.files.length === 0) {
      DOM.fileListContainer.innerHTML = '<div class="empty-list-message">No hay archivos cargados aún.</div>';
      return;
    }

    state.files.forEach((doc) => {
      const item = document.createElement('div');
      item.className = `file-item ${doc.id === state.activeFileId ? 'active' : ''}`;
      item.innerHTML = `
        <div class="file-item-info">
          <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          <span class="file-item-name" title="${doc.name}">${doc.name}</span>
        </div>
        <button class="file-item-close" title="Cerrar archivo">
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      `;

      item.addEventListener('click', () => setActiveFile(doc.id));
      const closeBtn = item.querySelector('.file-item-close');
      closeBtn.addEventListener('click', (e) => closeFile(doc.id, e));

      DOM.fileListContainer.appendChild(item);
    });
  }

  // Métricas del documento
  function updateStats(content, sizeBytes) {
    if (!content) {
      clearStats();
      return;
    }

    const words = content.trim() ? content.trim().split(/\s+/).filter(Boolean).length : 0;
    const chars = content.length;
    const lines = content.split('\n').length;
    const readingTimeMin = Math.ceil(words / 200);

    DOM.statWords.textContent = words.toLocaleString();
    DOM.statChars.textContent = chars.toLocaleString();
    DOM.statLines.textContent = lines.toLocaleString();
    DOM.statReadingTime.textContent = `${readingTimeMin} min`;
    DOM.statFileSize.textContent = formatBytes(sizeBytes || new Blob([content]).size);
  }

  function clearStats() {
    DOM.statWords.textContent = '0';
    DOM.statChars.textContent = '0';
    DOM.statLines.textContent = '0';
    DOM.statReadingTime.textContent = '0 min';
    DOM.statFileSize.textContent = '-';
  }

  // --- Sincronización del Editor en Vivo ---
  let debounceTimeout = null;
  DOM.markdownInput.addEventListener('input', () => {
    const activeDoc = getActiveFile();
    if (!activeDoc) return;

    activeDoc.content = DOM.markdownInput.value;

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      renderMarkdownContent(activeDoc.content);
      updateStats(activeDoc.content, new Blob([activeDoc.content]).size);
    }, 120);
  });

  // Restaurar cambios del editor
  DOM.editorResetBtn.addEventListener('click', () => {
    const activeDoc = getActiveFile();
    if (!activeDoc) return;
    activeDoc.content = activeDoc.originalContent;
    DOM.markdownInput.value = activeDoc.originalContent;
    renderMarkdownContent(activeDoc.originalContent);
    updateStats(activeDoc.originalContent, activeDoc.size);
    showToast('Contenido restaurado al original', 'info');
  });

  // --- Drag and Drop: Detección Global y Local ---
  let dragCounter = 0;

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
    window.addEventListener(eventName, (e) => e.preventDefault(), false);
  });

  window.addEventListener('dragenter', (e) => {
    dragCounter++;
    if (e.dataTransfer && Array.from(e.dataTransfer.types).includes('Files')) {
      DOM.globalDropOverlay.classList.add('active');
    }
  });

  window.addEventListener('dragleave', (e) => {
    dragCounter--;
    if (dragCounter <= 0) {
      dragCounter = 0;
      DOM.globalDropOverlay.classList.remove('active');
    }
  });

  window.addEventListener('drop', (e) => {
    dragCounter = 0;
    DOM.globalDropOverlay.classList.remove('active');
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileList(e.dataTransfer.files);
    }
  });

  // Drag & Drop en la tarjeta de bienvenida
  DOM.emptyDropzone.addEventListener('dragover', () => {
    const card = DOM.emptyDropzone.querySelector('.dropzone-card');
    if (card) card.classList.add('dragover');
  });

  DOM.emptyDropzone.addEventListener('dragleave', () => {
    const card = DOM.emptyDropzone.querySelector('.dropzone-card');
    if (card) card.classList.remove('dragover');
  });

  DOM.emptyDropzone.addEventListener('drop', () => {
    const card = DOM.emptyDropzone.querySelector('.dropzone-card');
    if (card) card.classList.remove('dragover');
  });

  // --- Selector de Archivos (Botones e Input) ---
  function openFileDialog() {
    DOM.fileInput.value = '';
    DOM.fileInput.click();
  }

  DOM.selectFileBtn.addEventListener('click', openFileDialog);
  DOM.dzSelectBtn.addEventListener('click', openFileDialog);
  DOM.fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileList(e.target.files);
    }
  });

  DOM.loadSampleBtn.addEventListener('click', loadSampleDocument);
  DOM.dzSampleBtn.addEventListener('click', loadSampleDocument);
  DOM.clearAllFilesBtn.addEventListener('click', clearAllFiles);

  // --- Sidebar Plegable y Pestañas ---
  DOM.toggleSidebarBtn.addEventListener('click', () => {
    state.sidebarOpen = !state.sidebarOpen;
    DOM.sidebar.classList.toggle('collapsed', !state.sidebarOpen);
  });

  DOM.sidebarTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      DOM.sidebarTabs.forEach(t => t.classList.remove('active'));
      DOM.tabPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      if (targetTab === 'files') document.getElementById('tabContentFiles').classList.add('active');
      if (targetTab === 'toc') document.getElementById('tabContentToc').classList.add('active');
      if (targetTab === 'stats') document.getElementById('tabContentStats').classList.add('active');
    });
  });

  // --- Botón Flotante "Volver Arriba" ---
  DOM.previewScrollable.addEventListener('scroll', () => {
    if (DOM.previewScrollable.scrollTop > 300) {
      DOM.backToTopBtn.classList.add('visible');
    } else {
      DOM.backToTopBtn.classList.remove('visible');
    }
  });

  DOM.backToTopBtn.addEventListener('click', () => {
    DOM.previewScrollable.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Modos de Vista ---
  DOM.modePreviewBtn.addEventListener('click', () => setViewMode('preview'));
  DOM.modeSplitBtn.addEventListener('click', () => setViewMode('split'));
  DOM.modeEditorBtn.addEventListener('click', () => setViewMode('editor'));

  // --- Menú de Exportación y Acciones ---
  DOM.exportMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isShown = DOM.exportDropdown.classList.contains('show');
    DOM.exportDropdown.classList.toggle('show', !isShown);
    DOM.exportMenuBtn.setAttribute('aria-expanded', String(!isShown));
  });

  document.addEventListener('click', (e) => {
    if (!DOM.exportDropdown.contains(e.target) && e.target !== DOM.exportMenuBtn) {
      DOM.exportDropdown.classList.remove('show');
      DOM.exportMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Copiar Markdown
  DOM.actionCopyMd.addEventListener('click', async () => {
    DOM.exportDropdown.classList.remove('show');
    const activeDoc = getActiveFile();
    if (!activeDoc) {
      showToast('No hay ningún documento activo para copiar', 'error');
      return;
    }
    try {
      await navigator.clipboard.writeText(activeDoc.content);
      showToast('Código Markdown copiado al portapapeles', 'success');
    } catch (err) {
      showToast('Error al copiar al portapapeles', 'error');
    }
  });

  // Copiar HTML renderizado
  DOM.actionCopyHtml.addEventListener('click', async () => {
    DOM.exportDropdown.classList.remove('show');
    const activeDoc = getActiveFile();
    if (!activeDoc) {
      showToast('No hay ningún documento activo para copiar', 'error');
      return;
    }
    try {
      await navigator.clipboard.writeText(DOM.markdownOutput.innerHTML);
      showToast('HTML renderizado copiado al portapapeles', 'success');
    } catch (err) {
      showToast('Error al copiar al portapapeles', 'error');
    }
  });

  // Descargar archivo .md
  DOM.actionDownloadMd.addEventListener('click', () => {
    DOM.exportDropdown.classList.remove('show');
    const activeDoc = getActiveFile();
    if (!activeDoc) {
      showToast('No hay documento activo para descargar', 'error');
      return;
    }
    const blob = new Blob([activeDoc.content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeDoc.name || 'documento.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Descargando ${link.download}`, 'info');
  });

  // --- Conversión y Descarga Directa a PDF ---
  async function downloadMarkdownAsPdf() {
    const activeDoc = getActiveFile();
    if (!activeDoc || !activeDoc.content || !activeDoc.content.trim()) {
      showToast('Abre o escribe un documento antes de descargar en PDF', 'error');
      return;
    }

    const btn = DOM.downloadPdfBtn;
    const originalBtnHtml = btn ? btn.innerHTML : '';
    if (btn) {
      btn.disabled = true;
      btn.style.opacity = '0.7';
      btn.innerHTML = `
        <svg class="spin-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span>Generando...</span>
      `;
    }

    showToast('Generando archivo PDF...', 'info');

    try {
      // Crear contenedor temporal para renderizado limpio
      const exportWrapper = document.createElement('div');
      exportWrapper.className = 'pdf-export-container';

      // Clonar el contenido HTML renderizado
      const clone = DOM.markdownOutput.cloneNode(true);

      // Eliminar elementos no deseados en la exportación (como botones de copia)
      clone.querySelectorAll('.code-copy-btn').forEach(el => el.remove());
      exportWrapper.appendChild(clone);

      const baseName = (activeDoc.name || 'documento')
        .replace(/\.(md|markdown|txt)$/i, '');
      const fileName = `${baseName}.pdf`;

      if (typeof html2pdf !== 'undefined') {
        const opt = {
          margin: [12, 12, 12, 12],
          filename: fileName,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            logging: false,
            backgroundColor: '#ffffff'
          },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
          },
          pagebreak: {
            mode: ['avoid-all', 'css', 'legacy']
          }
        };

        await html2pdf().set(opt).from(exportWrapper).save();
        showToast(`PDF descargado con éxito: ${fileName}`, 'success');
      } else {
        // En caso de que html2pdf no esté cargado, fallback a print
        window.print();
        showToast('Abriendo ventana de impresión para guardar PDF', 'info');
      }
    } catch (err) {
      console.error('Error al generar PDF:', err);
      showToast('Error al generar PDF directo. Abriendo diálogo de impresión...', 'error');
      window.print();
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.style.opacity = '';
        btn.innerHTML = originalBtnHtml;
      }
    }
  }

  // Evento botón Descargar PDF en barra superior
  if (DOM.downloadPdfBtn) {
    DOM.downloadPdfBtn.addEventListener('click', downloadMarkdownAsPdf);
  }

  // Evento opción Descargar PDF en menú desplegable
  if (DOM.actionDownloadPdf) {
    DOM.actionDownloadPdf.addEventListener('click', () => {
      DOM.exportDropdown.classList.remove('show');
      downloadMarkdownAsPdf();
    });
  }

  // Imprimir / Guardar en PDF (Diálogo nativo)
  DOM.actionPrintPdf.addEventListener('click', () => {
    DOM.exportDropdown.classList.remove('show');
    const activeDoc = getActiveFile();
    if (!activeDoc) {
      showToast('Abre un documento antes de imprimir o guardar en PDF', 'error');
      return;
    }
    window.print();
  });

  // Cerrar documento actual
  DOM.actionClear.addEventListener('click', () => {
    DOM.exportDropdown.classList.remove('show');
    if (state.activeFileId) {
      closeFile(state.activeFileId);
    }
  });

  // Cambio de Tema
  DOM.themeToggleBtn.addEventListener('click', toggleTheme);

  // --- Atajos de Teclado ---
  window.addEventListener('keydown', (e) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modifier = isMac ? e.metaKey : e.ctrlKey;

    if (modifier && e.key.toLowerCase() === 'o') {
      e.preventDefault();
      openFileDialog();
    } else if (modifier && e.key.toLowerCase() === 's') {
      e.preventDefault();
      DOM.actionDownloadMd.click();
    }
  });

  // --- Inicio de la Aplicación ---
  function init() {
    initTheme();
    initMarked();
    // Iniciar con la vista por defecto
    setViewMode('preview');
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
