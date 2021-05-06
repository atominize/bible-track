// const db = require("better-sqlite3")("bible-sqlite.db");
// import { require } from "../../node_modules/requirejs/require";

const books = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiates",
  "Song of Solomon",
  "Isaiah",
  "Jeremiah",
  "Lamentaions",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
];
const numChapters = [
  50,
  40,
  27,
  36,
  34,
  24,
  21,
  4,
  31,
  24,
  22,
  25,
  29,
  36,
  10,
  13,
  10,
  42,
  150,
  31,
  12,
  8,
  66,
  52,
  5,
  48,
  12,
  14,
  3,
  9,
  1,
  4,
  7,
  3,
  3,
  3,
  2,
  14,
  4,
  28,
  16,
  24,
  21,
  28,
  16,
  16,
  13,
  6,
  6,
  4,
  4,
  5,
  3,
  6,
  4,
  3,
  1,
  13,
  5,
  5,
  3,
  5,
  1,
  1,
  1,
  22,
];

const booksSelect = document.getElementById("books");
const chaptersSelect = document.getElementById("chapters");
const chapterView = document.getElementById("chapter-view");
const previousIcon = document.getElementById("previous-icon");
const recordIcon = document.getElementById("record-icon");
const nextIcon = document.getElementById("next-icon");

const loadBooks = () => {
  books.forEach((book, index) => {
    const option = document.createElement("option");
    option.innerText = book;
    option.value = index;
    booksSelect.appendChild(option);
  });
};

const loadChapters = (bookNumber) => {
  removeOptions();
  for (let i = 1; i <= numChapters[bookNumber]; i++) {
    const option = document.createElement("option");
    option.innerText = i;
    option.value = i;
    option.classList.add("options");
    chaptersSelect.appendChild(option);
  }
};

const removeOptions = () => {
  document.querySelectorAll(".options").forEach((option) => {
    option.remove();
  });
};

const loadVerses = (book, chapter) => {
  const chapTextList = [];
  let chapString = "";
  for (let i = 0; i < 31102; i++) {
    const verse = data.resultset.row[i];
    const bookNum = verse.field[1];
    const chapterNum = verse.field[2];
    if (bookNum === book + 1 && chapterNum === chapter) {
      chapTextList.push(verse.field[4]);
      chapString = `${chapString} ${verse.field[3]} ${verse.field[4]} \t`;
    }
  }
  chapterView.innerText = chapString;
  // Todo: scroll to top --- done
  chapterView.parentElement.scrollTo({ top: 0, behavior: "smooth" });
};

const addClicked = (icon) => {
  icon.classList.add("clicked");
  icon.nextElementSibling.classList.add("clicked");
};

const removeClicked = () => {
  [previousIcon, recordIcon, nextIcon].forEach((icon) => {
    icon.classList.remove("clicked");
    icon.nextElementSibling.classList.remove("clicked");
  });
};

const workWithIndexDb = () => {
  let openDb = indexedDB.open("readChapters", 1);
  openDb.onupgradeneeded = () => {};

  openDb.onerror = () => {
    console.error("Error", openDb.error);
  };

  openDb.onsuccess = () => {
    let db = openDb.result;
  };
};
