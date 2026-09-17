# Guía Completa de Markdown - Documento de Prueba

Bienvenido a tu visor web interactivo de **Markdown**. Este archivo demuestra cómo se procesan diferentes elementos de formato enriquecido.

---

## 📋 Tabla de Contenidos Rápida

- [Encabezados y Texto](#encabezados-y-texto)
- [Listas y Tareas](#listas-y-tareas)
- [Tablas](#tablas)
- [Bloques de Código](#bloques-de-código)
- [Citas y Notas](#citas-y-notas)

---

## ✍️ Encabezados y Texto

Puedes usar formato estándar para dar énfasis al texto:
- **Texto en negrita** o __también con guiones bajos__.
- *Texto en cursiva* o _así también_.
- ~~Texto tachado~~.
- `código en línea` para variables o comandos como `npm start`.

---

## 🎯 Listas y Tareas

### Tareas del Proyecto
- [x] Diseñar la interfaz con HTML y CSS
- [x] Implementar soporte de Drag & Drop
- [x] Integrar visor de código con resaltado de sintaxis
- [ ] Subir tus propios archivos `.md` o `.txt`
- [ ] Explorar el modo de pantalla dividida

### Lista Ordenada
1. Primero abre o arrastra un archivo.
2. Explora el contenido en el panel de lectura.
3. Si lo deseas, activa el modo **Dividido** para editar en caliente.
4. Exporta a PDF con `Ctrl+P`.

---

## 📊 Tablas

| Lenguaje | Paradigma | Tipado | Extensión |
| :--- | :--- | :--- | :---: |
| **JavaScript** | Multiparadigma / Orientado a Eventos | Dinámico | `.js` |
| **Python** | Multiparadigma / Funcional | Dinámico fuerte | `.py` |
| **Rust** | Funcional / Concurrente | Estático | `.rs` |
| **Markdown** | Lenguaje de Marcado Ligero | Texto Plano | `.md` |

---

## 💻 Bloques de Código

### TypeScript / JavaScript
```typescript
interface MarkdownDocument {
  id: string;
  name: string;
  content: string;
  size: number;
}

function processDocument(doc: MarkdownDocument): string {
  console.log(`Cargando ${doc.name} (${doc.size} bytes)`);
  return doc.content.toUpperCase();
}
```

### Python
```python
import os

def list_markdown_files(directory: str) -> list[str]:
    """Retorna una lista de archivos markdown en el directorio especificado."""
    return [
        f for f in os.listdir(directory) 
        if f.endswith(('.md', '.markdown'))
    ]

print("Archivos encontrados:", list_markdown_files("."))
```

### Shell / Bash
```bash
# Iniciar un servidor HTTP local para probar el visor
python -m http.server 8000
```

---

## 💡 Citas y Notas

> *"Cualquier código que tú o alguien más no haya mirado en seis meses bien podría haber sido escrito por otra persona."*  
> — **Eagleson's Law**

---

## 🌐 Enlaces e Imágenes

Puedes incluir enlaces como [Documentación de Markdown](https://www.markdownguide.org) y cualquier contenido multimedia compatible.
