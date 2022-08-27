/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"ZCRVGrrkCzIOyV0u","label":"reddit","bookmarks":[{"id":"oJ6ab04JYdHbx4n4","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"i4MpC0MgWqmJGTrd","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"8cmZKWoYizYdAKbv","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"kQSWLmrtnKyZv8lk","label":"design tools","bookmarks":[{"id":"jSCNsityPeyvBMBl","label":"facebook","url":"https://facebook.com"},{"id":"sc3hgKzhh0RtvqeE","label":"zalo","url":"https://zalo.com"},{"id":"6p7hSNOZv1pnDeO8","label":"haikei","url":"https://app.haikei.app/"},{"id":"QT4S3pPMi3DzEuYA","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"kA6sgC6yY4LpTUny","label":"worth reading","bookmarks":[{"id":"pVsf50YcUpADz5oQ","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"rgi3xaMnhBK0kAq2","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"29iOvAVsj2h31DZe","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"DJpUBCM71LauRzaN","label":"sources","bookmarks":[{"id":"i2NF3XO1iQPeEI6G","label":"icons","url":"https://feathericons.com/"},{"id":"BRLJU5yfPak53Ecj","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"ESoDvSt9EGVsAlID","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"19Px78JkDhpg0N61","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
