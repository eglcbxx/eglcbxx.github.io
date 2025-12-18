/* ============================================
   TEMPLATE ENGINE
   Loads and renders HTML templates with data
============================================ */

class TemplateEngine {
    constructor() {
        this.templateCache = {};
    }

    // Fetch template from file
    async loadTemplate(templateName) {
        if (this.templateCache[templateName]) {
            return this.templateCache[templateName];
        }

        try {
            const response = await fetch(`components/templates/${templateName}.html`);
            const template = await response.text();
            this.templateCache[templateName] = template;
            return template;
        } catch (error) {
            console.error(`Error loading template ${templateName}:`, error);
            return '';
        }
    }

    // Fetch data from JSON file
    async loadData(dataFile) {
        try {
            const response = await fetch(`data/${dataFile}.json`);
            return await response.json();
        } catch (error) {
            console.error(`Error loading data ${dataFile}:`, error);
            return null;
        }
    }

    // Replace placeholders with actual data
    render(template, data) {
        let rendered = template;

        // Handle arrays (like details, points)
        for (const key in data) {
            if (Array.isArray(data[key])) {
                // Convert array to list items
                const listItems = data[key].map(item => `<li>${item}</li>`).join('\n            ');
                rendered = rendered.replace(`{{${key}}}`, listItems);
            } else {
                // Simple string replacement
                const placeholder = new RegExp(`{{${key}}}`, 'g');
                rendered = rendered.replace(placeholder, data[key]);
            }
        }

        return rendered;
    }

    // Render multiple items from template
    async renderMultiple(templateName, items) {
        const template = await this.loadTemplate(templateName);
        return items.map(item => this.render(template, item)).join('\n');
    }

    // Render and inject into container
    async renderIntoContainer(containerId, templateName, dataFile, dataKey = null) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        const data = await this.loadData(dataFile);
        if (!data) return;

        const items = dataKey ? data[dataKey] : data;
        const html = await this.renderMultiple(templateName, items);
        container.innerHTML = html;
    }
}

// Global instance
window.templateEngine = new TemplateEngine();
