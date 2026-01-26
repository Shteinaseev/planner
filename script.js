class Planner {
    selectors = {
        panel: '[data-js-panel]',
        dateEl: '[data-js-panel-date]',
        clockEl: '[data-js-panel-clock]',
        form: '[data-js-form]'
    }

    days = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];

    constructor() {
        this.panel = document.querySelector(this.selectors.panel)
        this.dateEl = this.panel.querySelector(this.selectors.dateEl)
        this.clockEl = this.panel.querySelector(this.selectors.clockEl)
        this.showTime()
        setInterval(this.showTime.bind(this), 1000);

    }

    showTime() {
        this.updateClock()

        this.updateDate()
    }

    updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        this.clockEl.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateDate() {
        const now = new Date();
        this.dateEl.textContent =
            String(now.getDate()).padStart(2, '0') + '.' +
            String(now.getMonth() + 1).padStart(2, '0') + '.' +
            now.getFullYear();
    }

}

new Planner()
