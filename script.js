$(document).ready(function () {
  // Update jam realtime
  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    $("#clock").text(`${hours}:${minutes} ${ampm}`);
  }
  setInterval(updateClock, 1000);
  updateClock();

  // ===== APP WINDOWS =====
  function createWindow(id, title, content) {
    // Kalau window sudah ada, fokuskan
    if ($(`#${id}`).length) {
      $(`#${id}`).addClass("z-50");
      return;
    }

    const win = $(`
      <div id="${id}" class="absolute top-10 left-10 w-[400px] bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">
        <div class="flex justify-between items-center px-3 py-2 bg-gray-100 border-b cursor-move">
          <span class="font-semibold text-gray-700">${title}</span>
          <button class="closeBtn text-gray-500 hover:text-red-500">✖</button>
        </div>
        <div class="p-4 text-gray-800 text-sm overflow-y-auto h-[250px]">
          ${content}
        </div>
      </div>
    `);

    // Close button
    win.find(".closeBtn").on("click", function () {
      win.remove();
    });

    // Drag window
    let isDragging = false, offsetX, offsetY;
    win.find(".cursor-move").on("mousedown", function (e) {
      isDragging = true;
      offsetX = e.clientX - win.offset().left;
      offsetY = e.clientY - win.offset().top;
      $(document).on("mousemove.drag", function (e) {
        if (isDragging) {
          win.css({
            left: e.clientX - offsetX,
            top: e.clientY - offsetY
          });
        }
      }).on("mouseup.drag", function () {
        isDragging = false;
        $(document).off(".drag");
      });
    });

    $("#desktop").append(win);
  }

  // Open Notes
  $("#openNotes").on("click", function () {
    createWindow("notesApp", "Notes", `
      <textarea class="w-full h-full border rounded-lg p-2 resize-none focus:ring">${localStorage.getItem("notes") || "Tulis catatan di sini..."}</textarea>
      <button class="saveNotes mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
    `);

    // Save notes
    $(document).on("click", ".saveNotes", function () {
      const val = $("#notesApp textarea").val();
      localStorage.setItem("notes", val);
      alert("Notes saved!");
    });
  });

  // Open Gallery
  $("#openGallery").on("click", function () {
    createWindow("galleryApp", "Gallery", `
      <div class="grid grid-cols-3 gap-2">
        <img src="https://picsum.photos/100?1" class="rounded-lg shadow">
        <img src="https://picsum.photos/100?2" class="rounded-lg shadow">
        <img src="https://picsum.photos/100?3" class="rounded-lg shadow">
        <img src="https://picsum.photos/100?4" class="rounded-lg shadow">
        <img src="https://picsum.photos/100?5" class="rounded-lg shadow">
        <img src="https://picsum.photos/100?6" class="rounded-lg shadow">
      </div>
    `);
  });
});
