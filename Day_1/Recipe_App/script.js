const favList = document.getElementById('fav-food').getElementsByTagName('ul')[0]
const searchBox = document.getElementById('search-box');
const searchInput = searchBox.getElementsByTagName('input')[0]
const searchBtn = searchBox.getElementsByTagName('button')[0]
const recipeList = document.getElementById('recipe-list')
const recipeDetail = document.getElementById('recipe-detail')
const container = document.querySelector('.container')

getRandomMeal()
fetchFavMeals()

/**
 * 获取一个随机食谱
 */
async function getRandomMeal() {
  let url = 'https://www.themealdb.com/api/json/v1/1/random.php'
  try {
    let recipe = await fetch(url)
    const resData = await recipe.json()
    const randomMeal = resData.meals[0]
    getRecipeList(randomMeal, true)
    console.log('random Meal', randomMeal);

  } catch (error) {
    console.log('Request Failed', error)
  }
}

/**
 * 通过id获取相应食谱
 * @param {Number} id 食谱id
 */
async function getMealById(id) {
  let url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
  try {
    let meal = await fetch(url + id)
    const resData = await meal.json()
    return resData
  } catch (error) {
    console.log('Request Failed', error);
  }
}

/**
 * 通过食谱名称搜索食谱
 * @param {String} name 食谱名称
 */
async function getMealsBySearch(keywords) {
  let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + keywords
  try {
    const resData = await fetch(url)
    const searchRes = await resData.json()
    return searchRes
  } catch (error) {
    console.log('Request Failed', error);
  }
}

/**
 * 菜单列表
 * @param {Object} mealData 
 * @param {Boolean} random 是否是随机菜单
 */
function getRecipeList(mealData, random = false) {
  const recipeLi = document.createElement('li')
  recipeLi.innerHTML = `
  ${random ? `<div class="tag">Recommended today</div>` : ""}
  <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
  <div class="desc">
    <span>${mealData.strMeal}</span>
    <svg t="1626167963473" id="likebtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
      p-id="6658" width="20" height="20">
      <path
        d="M883.14 179.3C780.65 76.81 614.48 76.81 512 179.3c-102.49-102.49-268.65-102.49-371.14 0-102.48 102.48-102.48 268.7 0 371.13L512 921.57l371.14-371.14c102.48-102.43 102.48-268.65 0-371.13z"
        p-id="6659" fill="#bfbfbf"></path>
    </svg>
  </div>
  `
  recipeList.appendChild(recipeLi)
  let toggle = false
  recipeLi.querySelector('#likebtn').addEventListener('click', function (e) {
    toggle = !toggle
    const path = this.querySelector('path')
    if (toggle) {
      path.style.fill = 'red'
      storageFavId(mealData.idMeal)
    } else {
      path.style.fill = '#ccc'
      removeFromFav(mealData.idMeal)
    }
    favList.innerHTML = ''
    fetchFavMeals()
  })

  recipeLi.querySelector('img').addEventListener('click', function (e) {
    showRecipeDetail(mealData)
  })
}

/**
 * 点击喜欢按钮时，将当前食谱的id保存在localStorage中
 * @param {Number} id  当前食谱id
 */
function storageFavId(id) {
  const mealIds = getMealIds()
  if (!mealIds.includes(id)) {
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, id]))
  }
}

/**
 * 点击喜欢按钮，将其添加在喜欢的列表中
 * @param {Number} id 当前菜谱id
 */
async function addtoFavList(id) {
  const resData = await getMealById(id)
  const mealDetail = resData.meals[0]
  const favLi = document.createElement('li')
  favLi.innerHTML = `
     <img src="${mealDetail.strMealThumb}" alt="${mealDetail.strMealThumb}">
     <span>${mealDetail.strMeal}</span>
     <svg t="1626259235693" id="close" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
       p-id="2001" width="15" height="15">
       <path
         d="M597.795527 511.488347 813.564755 295.718095c23.833825-23.833825 23.833825-62.47489 0.001023-86.307691-23.832801-23.832801-62.47489-23.833825-86.307691 0L511.487835 425.180656 295.717583 209.410404c-23.833825-23.833825-62.475913-23.833825-86.307691 0-23.832801 23.832801-23.833825 62.47489 0 86.308715l215.769228 215.769228L209.410915 727.258599c-23.833825 23.833825-23.833825 62.47489 0 86.307691 23.832801 23.833825 62.473867 23.833825 86.307691 0l215.768205-215.768205 215.769228 215.769228c23.834848 23.833825 62.475913 23.832801 86.308715 0 23.833825-23.833825 23.833825-62.47489 0-86.307691L597.795527 511.488347z"
         p-id="2002" fill="#515151"></path>
    </svg>
  `
  favList.insertBefore(favLi, favList.firstChild)
  const closeBtn = favList.querySelector('#close')
  closeBtn.addEventListener('click', function () {
    removeFromFav(id)
    favList.innerHTML = ''
    fetchFavMeals()
  })
  favLi.addEventListener('click', function () {
    showRecipeDetail(mealDetail)
  })
}

/**
 * 获取在loaclStorage中保存的喜欢的食谱Ids
 */
function getMealIds() {
  const mealIds = JSON.parse(localStorage.getItem('mealIds'))
  return mealIds === null ? [] : mealIds
}

/**
 * 获取喜欢的食谱
 */
async function fetchFavMeals() {
  const mealIds = getMealIds()
  const favMeals = []
  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i]
    meal = await getMealById(mealId)
    favMeals.push(meal)
    addtoFavList(mealId)

  }
  console.log(favMeals);
}

/**
 * 删除喜欢的食谱
 * @param {Number} mealId 
 */
function removeFromFav(mealId) {
  const mealIds = getMealIds()
  localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)))
}

searchBtn.addEventListener('click', async function () {
  recipeList.innerHTML = ""
  const keywords = searchInput.value
  if (keywords) {
    const searchRes = await getMealsBySearch(keywords)
    if (searchRes) {
      const searchArr = searchRes.meals
      for (let i = 0; i < searchArr.length; i++) {
        getRecipeList(searchArr[i])
      }
    }
  }
})


/**
 * 显示详细食谱
 */
function showRecipeDetail(mealData) {
  recipeDetail.style.display = 'block'
  container.style.overflow = 'hidden'
  recipeDetail.style.height = container.scrollHeight + 'px'
  let ingredients = []
  for (let i = 0; i < 20; i++) {
    if (mealData['strIngredient' + i]) {
      ingredients.push(`${mealData['strIngredient' + i]} / ${mealData['strMeasure' + i]}`)
    }
  }

  recipeDetail.innerHTML = `
    <div class="detail-container">
    <h3>${mealData.strMeal}</h3>
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    <p>${mealData.strInstructions}</p>
    <h4>ingredients: </h4>
    <ul>
      ${ingredients.map(int => `<li>${int}</li>`).join("")}
    </ul>
    <svg t="1626342814766" class="closebtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
      p-id="2000" width="20" height="20">
      <path
        d="M597.795527 511.488347 813.564755 295.718095c23.833825-23.833825 23.833825-62.47489 0.001023-86.307691-23.832801-23.832801-62.47489-23.833825-86.307691 0L511.487835 425.180656 295.717583 209.410404c-23.833825-23.833825-62.475913-23.833825-86.307691 0-23.832801 23.832801-23.833825 62.47489 0 86.308715l215.769228 215.769228L209.410915 727.258599c-23.833825 23.833825-23.833825 62.47489 0 86.307691 23.832801 23.833825 62.473867 23.833825 86.307691 0l215.768205-215.768205 215.769228 215.769228c23.834848 23.833825 62.475913 23.832801 86.308715 0 23.833825-23.833825 23.833825-62.47489 0-86.307691L597.795527 511.488347z"
        p-id="2001" fill="#515151"></path>
    </svg>
</div>
  `
  const closeBtn = recipeDetail.querySelector('.closebtn')
  closeBtn.addEventListener('click', function (e) {
    recipeDetail.style.display = 'none'
    container.style.overflow = 'overlay'
  })
}



