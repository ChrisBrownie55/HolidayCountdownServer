(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict'
function getYear(date) {
    return date.getUTCFullYear()
}

function thisYear() {
    return getYear(new Date())
}

function getMonth(date) {
    return date.getUTCMonth() + 1
}

function thisMonth() {
    return getMonth(new Date())
}

function getDay(date) {
    return date.getUTCDate()
}

function thisDay() {
    return getDay(new Date())
}

function isPast(month, day) {
    return thisMonth() > month || (thisMonth() == month && thisDay() > day)
}

function nextOccurrence(month, day) {
    return `${thisYear() + (isPast(month, day) ? 1 : 0)}-${month}-${day}`
}

function diffTime(date1) {
    return function(date2) {
        return Math.abs( date1.getTime() - date2.getTime())
    }
}

function diffTimeNow(date) {
    return diffTime(new Date())(date)
}

function getFullDays(n) {
    return Math.floor(n / (1000 * 60 * 60 * 24))
}

function diffDays(date1) {
    return function(date2) {
        return getFullDays(diffTime(date1)(date2))
    }
}

function diffDaysNow(date) {
    return diffDays(new Date())(date)
}

function daysUntil(month, day) {
    return diffDaysNow(new Date(nextOccurrence(month, day)))
}

function getEaster(year) {
    var f = Math.floor,
        G = year % 19,
        C = f(year / 100),
        H = (C - f(C / 4) - f((8 * C + 13)/25) + 19 * G + 15) % 30,
        I = H - f(H/28) * (1 - f(29/(H + 1)) * f((21-G)/11)),
        J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
        L = I - J,
        month = 3 + f((L + 40)/44),
        day = L + 28 - 31 * f(month / 4)

    return [month,day]
}

function getThanksgiving(year) {
    return new Date(new Date(`thursday november ${year}`).getTime() + (1000 * 60 * 60 * 24 * 7 * 3))
}

const holidays = {
    'Christmas': () => daysUntil(12, 25),
    'Easter': () => {
        const day = getEaster(thisYear())
        if (isPast(...day))
            return daysUntil(...getEaster(thisYear() + 1))
         
         return daysUntil(...day)
    },
    'Valentines': () => daysUntil(2, 14),
    'Halloween': () => daysUntil(10, 31),
    'Saint Patrick\'s Day': () => daysUntil(3, 17),
    'New Year\'s Eve': () => daysUntil(12, 31),
    'Thanksgiving': () => {
        const date = getThanksgiving(thisYear())
        if (isPast(getMonth(date), getDay(date)))
            return diffDaysNow(getThanksgiving(thisYear() + 1))
         
         return diffDaysNow(date)
    }
}

let holidayDays = {}

Object.keys(holidays).forEach(key => holidayDays[key] = new Date((new Date()).getTime() + (holidays[key]() * 1000 * 60 * 60 * 24)).toLocaleString('en-us', {month:'long',day:'numeric', year: 'numeric'}))

module.exports.holidays = holidays
module.exports.holidayDays = holidayDays

},{}],2:[function(require,module,exports){
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
},{"holiday-countdown":1}]},{},[2]);
