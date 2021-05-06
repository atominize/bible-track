// var requirejs = require("requirejs");

requirejs.config({
  //By default load any module IDs from js/lib
  baseUrl: "js/lib",
  //except, if the module ID starts with "app",
  //load it from the js/app directory. paths
  //config is relative to the baseUrl, and
  //never includes a ".js" extension since
  //the paths config could be for a directory.
  paths: {
    app: "../app",
  },
  nodeRequire: require,
});

requirejs(
  ["localbase.dev", "app/bibleData", "app/index"],
  function (Localbase, bibleData, index) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.

    // console.log(window);
    const LASTOPENED = "lastOpenedChap";
    loadBooks();
    let lastOpenedChap;
    if (localStorage.getItem(LASTOPENED) === null) {
      lastOpenedChap = [0, 1];
    } else {
      lastOpenedChap = JSON.parse(localStorage.getItem(LASTOPENED));
    }
    // const chaptersOfBook = parseFloat(booksSelect.value);
    booksSelect.value = lastOpenedChap[0];
    loadChapters(lastOpenedChap[0]);
    chaptersSelect.value = lastOpenedChap[1];
    loadVerses(lastOpenedChap[0], lastOpenedChap[1]);

    let db = new Localbase("recordedChapDb");
    // db.config.debug = false;

    booksSelect.addEventListener("change", (e) => {
      const book = parseFloat(e.target.value);
      loadChapters(book);
      loadVerses(parseFloat(book), 1);
      localStorage.setItem(LASTOPENED, JSON.stringify([book, 1]));
    });

    chaptersSelect.addEventListener("change", (e) => {
      loadVerses(parseFloat(booksSelect.value), parseFloat(e.target.value));
      localStorage.setItem(
        LASTOPENED,
        JSON.stringify([
          parseFloat(booksSelect.value),
          parseFloat(e.target.value),
        ])
      );
    });

    previousIcon.onclick = () => {
      let currentChap = parseFloat(chaptersSelect.value);
      let currentBook = parseFloat(booksSelect.value);
      if (currentChap > 1) {
        chaptersSelect.value = --currentChap;
        loadVerses(currentBook, currentChap);
      } else {
        if (currentBook == 0) {
          currentBook = 66;
        }
        booksSelect.value = --currentBook;
        loadChapters(currentBook);
        currentChap = numChapters[currentBook];
        chaptersSelect.value = currentChap;
        loadVerses(currentBook, currentChap);
      }
      removeClicked();
      addClicked(previousIcon);
      localStorage.setItem(
        LASTOPENED,
        JSON.stringify([parseFloat(currentBook), parseFloat(currentChap)])
      );
    };
    nextIcon.onclick = () => {
      // Todo: change icon colors --- done
      let currentChap = parseFloat(chaptersSelect.value);
      let currentBook = parseFloat(booksSelect.value);
      const maxChapNum = numChapters[currentBook];
      if (currentChap < maxChapNum) {
        chaptersSelect.value = ++currentChap;
        loadVerses(currentBook, currentChap);
      } else {
        if (currentBook == 65) {
          currentBook = -1;
        }
        booksSelect.value = ++currentBook;
        loadChapters(currentBook);
        currentChap = 1;
        loadVerses(currentBook, currentChap);
      }
      removeClicked();
      addClicked(nextIcon);
      localStorage.setItem(
        LASTOPENED,
        JSON.stringify([parseFloat(currentBook), parseFloat(currentChap)])
      );
    };

    recordIcon.onclick = () => {
      // Todo
      const date = new Date();
      const currentChap = parseFloat(chaptersSelect.value);
      const currentBook = parseFloat(booksSelect.value);

      db.collection("chapters").add({
        id: [currentBook, currentChap],
        timestamp: date.getTime(),
      });

      // db.collection("chapters")
      //   .get()
      //   .then((chapters) => {
      //     chapters.forEach((chapter) => {
      //       const date = new Date(chapter.timestamp);
      //       console.log(date.toLocaleDateString());
      //     });
      //   });

      removeClicked();
      addClicked(recordIcon);
    };
  }
);
