// Part 1 - Gurkirat

const lodash = require('lodash')

const holidays = [
  {
    name: 'Christmas',
    date: new Date('12-25-2024',),
  },
  {
    name: 'Canada Day',
    date: new Date('7-1-2024'),
  },
  {
    name: 'My Holiday',
    date: new Date('08-24-2024'),
  },
];

const today = new Date()

holidays.forEach((holiday, i) => {
  const diffDays = Math.floor(Math.abs(holiday.date - today) / (1000 * 60 * 60 * 24))

  const engDate = `Difference in dates ${holiday.date.toLocaleDateString('en')} and ${today.toLocaleDateString('en')} is: ${diffDays} days.`

  console.log(engDate)
})

console.log(`Random date: ${lodash.sample(holidays).name} - ${lodash.sample(holidays).date}`)

console.log(lodash.findIndex(holidays, {name: 'Christmas'}))
console.log(lodash.findIndex(holidays, {name: 'Canada Day'}))