const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const calendar = document.getElementById('days')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const eventList = document.getElementById('event_list').getElementsByTagName('ul')[0]
const addEventBtn = document.getElementById('add_event').getElementsByTagName('svg')[0]
const eventValue = document.getElementById('add_event').getElementsByTagName('input')[0]
const today = document.getElementById('today')
const todayOfDay = today.querySelector('.date')
const todayOfWeek = today.querySelector('.week')
const calendarBox = document.getElementById('calendar_box')
const eventBox = document.getElementById('event')

let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []
let nav = 0

function time(params) {
  const d = new Date()
  d.setDate(1)
  if (nav !== 0) {
    d.setMonth(new Date().getMonth() + nav)
  }
  const y = d.getFullYear()
  const m = d.getMonth()
  const day = new Date().toLocaleDateString('en-us', {
    day: 'numeric'
  })
  const weekday = new Date().toLocaleDateString('en-us', {
    weekday: 'long'
  })
  todayOfDay.innerHTML = day
  todayOfWeek.innerHTML = weekday
  
  // 获取本月有多少天
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  // 获取每月第一天
  const firstDayOfMonth = new Date(y, m, 1)
  // 将每个月的第一天转换成weekday, mm/dd/yyyy格式
  const dateFormat = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })
  // 获取每个月第一天是星期几
  const getWeekday = weekdays.indexOf(dateFormat.split(',')[0])

  document.getElementById('monthDisplay').innerText = `
    ${d.toLocaleDateString('en-us', { month: 'long' })}  ${y} 
  `
  calendar.innerHTML = ''

  for (let i = 1; i <= getWeekday + daysInMonth; i++) {
    const daySquare = document.createElement('div')
    daySquare.classList.add('day')

    if (i > getWeekday) {
      daySquare.innerText = i - getWeekday
      let clickDay = new Date(`${y}/${m + 1}/${i - getWeekday}`).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })
      let day = clickDay.split(',')[1].split('/')[1]
      let week = clickDay.split(',')[0]
      daySquare.addEventListener('click', () => {
        todayOfDay.innerHTML = day
        todayOfWeek.innerHTML = week.toUpperCase()
        eventTask(clickDay)
        initialTodos()
      })
    }
    calendar.appendChild(daySquare)
  }

  // 根据季节切换相应的背景图片
  if (m >= 2 && m < 5) {
    calendarBox.style.backgroundImage = "url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/36f07b32173281.5671e45e275da.jpg')"
    eventBox.style.backgroundColor = "#427157"
  } else if (m >= 5 && m < 9) {
    calendarBox.style.backgroundImage = "url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/0755ab32173281.5671e45e2660b.jpg')"
    eventBox.style.backgroundColor = "#F3EECF"
  } else if (m >= 9 && m < 12) {
    calendarBox.style.backgroundImage = "url('https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/a2f00832173281.5671e45e25443.jpg')"
    eventBox.style.backgroundColor = "#FCB7B0"
  } else {
    calendarBox.style.backgroundImage = "url('https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/cf61ab32173281.5671e45e28523.jpg')"
    eventBox.style.backgroundColor = "#E3E7FD"
  }
}

function changeMonth() {
  prevBtn.addEventListener('click', () => {
    nav--
    console.log(nav);
    time()
  })
  nextBtn.addEventListener('click', () => {
    nav++
    console.log(nav);
    time()
  })
}

let clickDay = new Date().toLocaleDateString('en-us', {
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
})
let eventsForDay = ''
function eventTask(day) {
  clickDay = day
  let eventForDay = events.find(e => e.date === day)
  events.push({
    date: day,
    todos: [],
  })
  if (!eventForDay) {
    localStorage.setItem('events', JSON.stringify(events))
    eventsForDay = events.find(e => e.date === clickDay)
  } else {
    eventsForDay = eventForDay
  }
}

addEventBtn.addEventListener('click', () => {
  eventsForDay.todos.push(eventValue.value)
  localStorage.setItem('event', JSON.stringify(events))
 
  if (eventValue.value) {
    const eventLi = document.createElement('li')
    eventLi.innerHTML = `
      <span>${eventValue.value}</span>
      <svg t="1627575632090" class="delete-btn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5488" width="10" height="10"><path d="M852.901888 256.671744L597.38466987 512.18896213l256.6422528 256.6422528c23.6519424 23.6519424 23.69672533 61.84850773 0.1867776 85.35845547-23.494656 23.494656-61.6923136 23.44987307-85.344256-0.20097707L512.2260992 597.34644053 256.70888107 852.86475093c-23.50230187 23.50230187-61.7447424 23.412736-85.344256-0.1867776-23.62135893-23.62135893-23.7109248-61.86379947-0.20862294-85.36610133l255.51721814-255.51721813-256.63460694-256.6356992c-23.60715947-23.60715947-23.68907947-61.84086187-0.1933312-85.33661014 23.5175936-23.5175936 61.75238827-23.4356736 85.35845547 0.17148587l256.6356992 256.6356992 255.50957227-255.50957227c23.53943893-23.53943893 61.73709653-23.4061824 85.35845546 0.2162688 23.5995136 23.59842133 23.7338624 61.79607893 0.19442347 85.33551787z m0 0" fill="#000000" p-id="5489"></path></svg>
    `
    eventList.appendChild(eventLi)
    eventValue.value = ''
  }
})

function initialTodos(params) {
  eventList.innerHTML =  ``
  if (eventsForDay.todos) {
    eventsForDay.todos.forEach(el => {
      const eventLi = document.createElement('li')
      eventLi.innerHTML = `
      <span>${el}</span>
      <svg t="1627575632090" class="delete-btn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5488" width="10" height="10"><path d="M852.901888 256.671744L597.38466987 512.18896213l256.6422528 256.6422528c23.6519424 23.6519424 23.69672533 61.84850773 0.1867776 85.35845547-23.494656 23.494656-61.6923136 23.44987307-85.344256-0.20097707L512.2260992 597.34644053 256.70888107 852.86475093c-23.50230187 23.50230187-61.7447424 23.412736-85.344256-0.1867776-23.62135893-23.62135893-23.7109248-61.86379947-0.20862294-85.36610133l255.51721814-255.51721813-256.63460694-256.6356992c-23.60715947-23.60715947-23.68907947-61.84086187-0.1933312-85.33661014 23.5175936-23.5175936 61.75238827-23.4356736 85.35845547 0.17148587l256.6356992 256.6356992 255.50957227-255.50957227c23.53943893-23.53943893 61.73709653-23.4061824 85.35845546 0.2162688 23.5995136 23.59842133 23.7338624 61.79607893 0.19442347 85.33551787z m0 0" fill="#000000" p-id="5489"></path></svg>
      `
  
      eventList.appendChild(eventLi)
    })
  }
}

eventTask(clickDay)
initialTodos()


























// let clickDay = ''
// let eventsArr = []

// function eventTask(day) {
//   eventList.innerHTML =  ``
//   clickDay = day
//   const eventForDay = events.find(e => e.date === clickDay)
//   console.log(eventForDay);
//   if (!eventForDay) {
//     addEventToLS(day)
//   } else {
//     initialTodo(eventForDay)
//   }
//   eventsArr = []
// }


// addEventBtn.addEventListener('click', () => {
//   if (eventValue.value) {
//     let eventArr = JSON.parse(localStorage.getItem('events')).find(e => e.date === clickDay).todos.push(eventValue)
//     eventsArr = eventArr
//     const eventLi = document.createElement('li')
//     eventLi.innerHTML = `
//       <span><input type="checkbox">${eventValue.value}</span>
//       <svg t="1627575632090" class="delete-btn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5488" width="10" height="10"><path d="M852.901888 256.671744L597.38466987 512.18896213l256.6422528 256.6422528c23.6519424 23.6519424 23.69672533 61.84850773 0.1867776 85.35845547-23.494656 23.494656-61.6923136 23.44987307-85.344256-0.20097707L512.2260992 597.34644053 256.70888107 852.86475093c-23.50230187 23.50230187-61.7447424 23.412736-85.344256-0.1867776-23.62135893-23.62135893-23.7109248-61.86379947-0.20862294-85.36610133l255.51721814-255.51721813-256.63460694-256.6356992c-23.60715947-23.60715947-23.68907947-61.84086187-0.1933312-85.33661014 23.5175936-23.5175936 61.75238827-23.4356736 85.35845547 0.17148587l256.6356992 256.6356992 255.50957227-255.50957227c23.53943893-23.53943893 61.73709653-23.4061824 85.35845546 0.2162688 23.5995136 23.59842133 23.7338624 61.79607893 0.19442347 85.33551787z m0 0" fill="#000000" p-id="5489"></path></svg>
//     `
//     eventList.appendChild(eventLi)
//     eventValue.value = ''
//   }
// })

// function initialTodo(eventForDay) {
//   eventForDay.todos.forEach( el => {
//     const eventLi = document.createElement('li')
//     eventLi.innerHTML = `
//     <span><input type="checkbox">${el}</span>
//     <svg t="1627575632090" class="delete-btn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5488" width="10" height="10"><path d="M852.901888 256.671744L597.38466987 512.18896213l256.6422528 256.6422528c23.6519424 23.6519424 23.69672533 61.84850773 0.1867776 85.35845547-23.494656 23.494656-61.6923136 23.44987307-85.344256-0.20097707L512.2260992 597.34644053 256.70888107 852.86475093c-23.50230187 23.50230187-61.7447424 23.412736-85.344256-0.1867776-23.62135893-23.62135893-23.7109248-61.86379947-0.20862294-85.36610133l255.51721814-255.51721813-256.63460694-256.6356992c-23.60715947-23.60715947-23.68907947-61.84086187-0.1933312-85.33661014 23.5175936-23.5175936 61.75238827-23.4356736 85.35845547 0.17148587l256.6356992 256.6356992 255.50957227-255.50957227c23.53943893-23.53943893 61.73709653-23.4061824 85.35845546 0.2162688 23.5995136 23.59842133 23.7338624 61.79607893 0.19442347 85.33551787z m0 0" fill="#000000" p-id="5489"></path></svg>
//     `
//     eventList.appendChild(eventLi)
//   });
// }

// function addEventToLS(day) {
//   console.log(day);
//   events.push({
//     date: day,
//     todos: eventsArr
//   })
//   localStorage.setItem('events', JSON.stringify(events))
// }

// function deleteTodo(params) {
  
// }

// const eventLis = eventList.getElementsByTagName('li')


time()
changeMonth()