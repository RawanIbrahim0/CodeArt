 
      const resizer = document.getElementById("resizer");
      const left = document.getElementById("problem");

      resizer.addEventListener("mousedown", (e) => {
        e.preventDefault();
        document.addEventListener("mousemove", resizeLeft);
        document.addEventListener("mouseup", stopResizeLeft);
      });

      function resizeLeft(e) {
        left.style.width = e.pageX + "px";
      }
      function stopResizeLeft() {
        document.removeEventListener("mousemove", resizeLeft);
        document.removeEventListener("mouseup", stopResizeLeft);
      }

      // --- Row Resizer ---
      const resizerRow = document.getElementById("resizerRow");
      const editor = document.getElementById("editor");
      const codeArea = document.querySelector(".code-area");

      resizerRow.addEventListener("mousedown", (e) => {
        e.preventDefault();
        document.addEventListener("mousemove", resizeRow);
        document.addEventListener("mouseup", stopResizeRow);
      });

      function resizeRow(e) {
        const offsetTop =
          codeArea.getBoundingClientRect().top +
          document.querySelector(".section-label").offsetHeight +
          45;
        const newHeight = e.pageY - offsetTop;
        editor.style.flex = "none";
        editor.style.height = newHeight + "px";
      }

      function stopResizeRow() {
        document.removeEventListener("mousemove", resizeRow);
        document.removeEventListener("mouseup", stopResizeRow);
      }

      // --- Run Button ---
      const runButton = document.getElementById("runButton");
      const consoleDiv = document.getElementById("console");

      runButton.addEventListener("click", () => {
        consoleDiv.textContent = "";
        const code = editor.textContent;
        try {
          const log = console.log;
          console.log = (msg) => {
            consoleDiv.textContent += "> " + msg + "\n";
          };
          new Function(code)();
          console.log = log;
        } catch (err) {
          consoleDiv.textContent = "Error: " + err.message;
        }
      });