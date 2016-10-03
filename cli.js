#!/usr/bin/env node
const axios = require('axios')
const moment = require('moment')
const _ = require('lodash')

const baseUrl = 'https://clients6.google.com/calendar/v3/calendars/0pa55cqrvtpcalggvn5mr0kpio@group.calendar.google.com/events'

axios.get(baseUrl, {
  params: {
    calendarId: '0pa55cqrvtpcalggvn5mr0kpio@group.calendar.google.com',
    singleEvents: true,
    timeZone: 'America/New_York',
    maxAttendees: 1,
    maxResults: 250,
    timeMin: moment().toISOString(),
    timeMax: moment().add(4, 'days').toISOString(),
    orderBy: 'startTime',
    key: 'AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs'
  }
}).then((res) => {
  const items = res.data.items
  const groupedItems = _.groupBy(items, (item) => item.start.dateTime)

  Object.keys(groupedItems).forEach((date) => {
    const trucksOnDate = groupedItems[date]

    const usefulDate = moment(date)
    console.log(usefulDate.format('dddd, MMMM Do'))

    trucksOnDate.forEach((truck) => {
      console.log(`  ${truck.summary}`)
    })

    console.log('')
  })
}).catch((err) => {
  console.error(err)
})
