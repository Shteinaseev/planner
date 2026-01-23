class Planner {
    selectors = {
        panel: '[data-js-panel]',
        day: '[data-js-panel-day]',
        time: '[data-js-panel-time]'
    }

    days = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];


    constructor() {
        this.panel = document.querySelector(this.selectors.panel)
        this.day = this.panel.querySelector(this.selectors.day)
        this.time = this.panel.querySelector(this.selectors.time)
        this.getTime()
    }

    getTime() {
        const date = new Date()
        const dayName = this.days[date.getDay()];
        this.day.innerHTML = dayName + ' ' + date.toLocaleDateString()
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        this.time.innerHTML = hours + ':' + minutes + ':' + seconds
    }

}

new Planner()