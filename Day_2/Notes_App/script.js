const addBtn = document.getElementById('addbtn')
const colorList = document.querySelector('.color-list')
const colorLis = colorList.querySelectorAll('li')
const notesBox = document.getElementById('notes-box')
const emptyMes = notesBox.querySelector('h1')

const notes = JSON.parse(localStorage.getItem('notes'))
if (notes) {
  notes.forEach(note => {
    addNotes(note.content, note.color, note.createTime)
  })
}

let colorToggle = false
addBtn.addEventListener('click', (e) => {
  if (!colorToggle) {
    colorToggle = true
    colorList.style.top = '20%'
    colorList.style.visibility = 'visible'
  } else {
    colorToggle = false
    colorList.style.top = '-20%'
    colorList.style.visibility = 'hidden'
  }
})

for (let i = 0; i < colorLis.length; i++) {
  colorLis[i].addEventListener('click', (e) => {
    addNotes("", e.target.style.backgroundColor, "")
  })
}

// 获取当前note创建时间
function getCreateTime() {
  const time = new Date()
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  const hour = time.getHours() > 10 ? time.getHours() : `0${getHours()}`
  const min = time.getMinutes() > 10 ? time.getMinutes() : `0${time.getMinutes()}`
  return `${year}-${month}-${day} ${hour}:${min} `
}

// 添加note
function addNotes(content = '', color, createTime = '') {
  const note = document.createElement('div')
  console.log(color);
  note.className = 'note'
  const currentTime = getCreateTime()
  note.innerHTML = `
    <textarea>${content}</textarea>
    <div class="markdown">${marked(content)}</div>
    <svg t="1626446042327" class="edit" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
    p-id="10768" width="18" height="18">
    <path
      d="M966.855111 202.254222a150.840889 150.840889 0 0 0-43.363555-96.597333l-6.200889-6.186667c-26.752-26.766222-61.923556-41.500444-99.000889-41.500444-35.057778 0-67.754667 13.383111-92.088889 37.717333L155.591111 666.311111c-44.046222 44.032-89.272889 222.947556-97.891555 258.360889-2.346667 9.671111 0.497778 19.84 7.523555 26.865778l6.186667 6.172444a28.344889 28.344889 0 0 0 26.225778 7.665778c36.138667-7.950222 218.638222-49.863111 262.883555-94.108444L931.185778 300.657778c25.258667-25.258667 37.930667-60.202667 35.669333-98.403556z m-257.052444 67.726222a14.179556 14.179556 0 0 0 20.110222 0l42.894222-42.894222 26.965333 26.951111-497.592888 497.592889-26.951112-26.951111 413.525334-413.511111a14.208 14.208 0 1 0-20.110222-20.110222L255.118222 704.568889l-28.672-28.686222 497.578667-497.564445 28.672 28.657778-42.894222 42.894222a14.222222 14.222222 0 0 0 0 20.110222zM350.933333 800.384l-28.657777-28.657778 497.592888-497.578666 28.672 28.657777-497.607111 497.578667zM146.204444 820.764444l58.126223 58.140445a1755.192889 1755.192889 0 0 1-81.848889 22.257778 1749.617778 1749.617778 0 0 1 23.722666-80.398223z m88.746667 48.540445l-78.634667-78.648889c14.094222-40.120889 28.359111-73.002667 39.495112-84.124444l10.524444-10.524445 38.712889 38.712889 0.014222 0.028444 0.028445 0.014223 85.731555 85.745777-10.524444 10.524445c-11.079111 11.079111-44.487111 24.860444-85.347556 38.272zM890.951111 260.408889l-22.300444 22.300444-85.76-85.76-0.014223-0.014222-0.028444-0.014222-38.698667-38.698667 22.300445-22.300444c13.582222-13.582222 32-21.048889 51.854222-21.048889 21.888 0 42.766222 8.817778 58.780444 24.832l6.186667 6.186667a93.155556 93.155556 0 0 1 26.808889 59.719111c1.265778 21.717333-5.518222 41.187556-19.128889 54.798222z"
      fill="#000000" p-id="10769"></path>
    </svg>
    <svg t="1626446247965" class="delete" viewBox="0 0 1024 1024" version="1.1"
    xmlns="http://www.w3.org/2000/svg" p-id="14228" width="18" height="18">
    <path
      d="M640 853.333333c12.8 0 21.333333-8.533333 21.333333-21.333333l32-512c0-12.8-8.533333-21.333333-21.333333-21.333333-12.8 0-21.333333 8.533333-21.333333 21.333333L618.666667 832C618.666667 842.666667 627.2 853.333333 640 853.333333zM810.666667 170.666667l-36.266667 0c-12.8-10.666667-25.6-23.466667-38.4-42.666667-19.2-32-49.066667-64-108.8-64-51.2 0-85.333333 12.8-104.533333 34.133333C520.533333 102.4 514.133333 106.666667 505.6 106.666667c-10.666667 0-21.333333-4.266667-27.733333-14.933333-8.533333-32-42.666667-49.066667-83.2-49.066667-40.533333 0-72.533333 23.466667-83.2 55.466667-42.666667 14.933333-74.666667 40.533333-85.333333 72.533333L213.333333 170.666667C200.533333 170.666667 192 179.2 192 192c0 0 0 0 0 0l42.666667 704c6.4 46.933333 38.4 85.333333 85.333333 85.333333l384 0c46.933333 0 76.8-38.4 85.333333-85.333333l42.666667-704c0 0 0 0 0 0C832 179.2 823.466667 170.666667 810.666667 170.666667zM326.4 138.666667c12.8-4.266667 23.466667-14.933333 27.733333-27.733333C356.266667 98.133333 371.2 85.333333 394.666667 85.333333s38.4 4.266667 40.533333 17.066667c2.133333 4.266667 4.266667 8.533333 6.4 12.8 14.933333 21.333333 38.4 32 61.866667 32 19.2 0 38.4-8.533333 51.2-21.333333 12.8-12.8 34.133333-21.333333 72.533333-21.333333 38.4 0 59.733333 21.333333 64 32 6.4 12.8 14.933333 23.466667 23.466667 32L275.2 168.533333C285.866667 157.866667 302.933333 147.2 326.4 138.666667zM746.666667 896c-2.133333 23.466667-19.2 42.666667-42.666667 42.666667L320 938.666667c-23.466667 0-38.4-19.2-42.666667-42.666667l-40.533333-682.666667 552.533333 0L746.666667 896zM512 853.333333c12.8 0 21.333333-8.533333 21.333333-21.333333L533.333333 320c0-12.8-8.533333-21.333333-21.333333-21.333333s-21.333333 8.533333-21.333333 21.333333l0 512C490.666667 844.8 499.2 853.333333 512 853.333333zM384 853.333333c12.8 0 21.333333-10.666667 21.333333-21.333333l-32-512c0-12.8-10.666667-21.333333-21.333333-21.333333-12.8 0-21.333333 10.666667-21.333333 21.333333L362.666667 832C362.666667 844.8 373.333333 853.333333 384 853.333333z"
      p-id="14229" fill="#000000"></path>
    </svg>
    <span class="create-time">${createTime ? createTime : currentTime}</span>
  `
  // note.style.backgroundColor = bgColor
  note.style.color = color
  notesBox.insertBefore(note, notesBox.firstChild)

  editNotes(color, currentTime)
  deleteNotes(note)

  if (notesBox.firstElementChild.nodeName === 'H1') {
    emptyMes.style.display = 'block'
  } else {
    emptyMes.style.display = 'none'
  }
}

// 编辑笔记
function editNotes(color, createTime) {
  const textarea = notesBox.getElementsByTagName('textarea')[0]
  const showarea = notesBox.querySelector('.markdown')
  const editbtn = notesBox.querySelector('.edit')
  textarea.setAttribute('noteColor', color)
  textarea.setAttribute('createTime', createTime)
  let isEdit = false
  textarea.addEventListener('input', (e) => {
    const { value } = e.target
    showarea.innerHTML = marked(value)
  })
  editbtn.addEventListener('click', () => {
    addToLS()

    isEdit = !isEdit
    if (isEdit) {
      showarea.style.display = 'none'
      textarea.style.display = 'block'
    } else {
      showarea.style.display = 'block'
      textarea.style.display = 'none'
    }
  })
}

// 删除笔记
function deleteNotes(currentNote) {
  const deleteBtn = notesBox.querySelector('.delete')
  deleteBtn.addEventListener('click', () => {
    if (notesBox.childElementCount <= 2) {
      emptyMes.style.display = 'block'
    } else {
      emptyMes.style.display = 'none'
    }
    console.log(currentNote);
    notesBox.removeChild(currentNote)
    addToLS()
  })
}

// 将笔记保存在localStorage中
function addToLS() {
  const notesContent = notesBox.querySelectorAll('textarea')
  const notesArr = []
  notesContent.forEach(note => {
    if (note.value) {
      const noteObj = { content: note.value, color: note.getAttribute('noteColor'), createTime: note.getAttribute('createTime') }
      notesArr.push(noteObj)
    }
  })
  localStorage.setItem('notes', JSON.stringify(notesArr))
}

// 使用Granim生成渐变背景
const granimInstance = new Granim({
  element: '#canvas-basic',
  direction: 'radial',
  isPausedWhenNotInView: true,
  states: {
    "default-state": {
      gradients: [
        ['#ff9966', '#ff5e62'],
        ['#00F260', '#0575E6'],
        ['#e1eec3', '#f05053']
      ]
    }
  }
})

