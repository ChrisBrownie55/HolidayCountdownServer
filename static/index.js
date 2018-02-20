const hc = require('holiday-countdown')

function createCard(title,subtitle,content) {
    const card = document.createElement('card'),
          titleEl = document.createElement('h1'),
          subtitleEl = document.createElement('h2'),
          contentEl = document.createElement('p')
    titleEl.innerText = title
    subtitleEl.innerText = subtitle
    contentEl.innerText = content
    card.appendChild(titleEl)
    card.appendChild(subtitleEl)
    card.appendChild(contentEl)
    document.body.appendChild(card)
}

document.addEventListener('DOMContentLoaded', () => {
    Object.keys(hc.holidays).forEach(key => createCard(key, hc.holidayDays[key], hc.holidays[key]()))
})